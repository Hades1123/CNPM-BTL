import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '@/database/database.service';
import {
    SessionNotFoundException,
    AlreadyRegisteredException,
    SessionFullException,
    SessionExpiredException,
    RegistrationNotFoundException,
    CannotCancelPastSessionException,
} from '@/common/exceptions/session.exceptions';

@Injectable()
export class SessionsService {
    constructor(private prisma: PrismaService) {}

    async getAllSessions(userId?: number, search?: string) {
        // Build where clause for search
        const whereClause = search
            ? {
                  OR: [
                      { title: { contains: search, mode: 'insensitive' as const } },
                      { tutor: { name: { contains: search, mode: 'insensitive' as const } } },
                  ],
              }
            : {};

        const sessions = await this.prisma.session.findMany({
            where: whereClause,
            include: {
                tutor: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        email: true,
                        role: true,
                        faculty: true,
                    },
                },
                _count: {
                    select: {
                        registrations: {
                            where: {
                                status: 'REGISTERED',
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        // If userId is provided, check registration status for each session
        if (userId) {
            const sessionIds = sessions.map((s) => s.id);
            const userRegistrations = await this.prisma.registration.findMany({
                where: {
                    studentId: userId,
                    sessionId: { in: sessionIds },
                    status: 'REGISTERED',
                },
                select: {
                    sessionId: true,
                    id: true,
                    registeredAt: true,
                    status: true,
                },
            });

            // Create a map for quick lookup
            const registrationMap = new Map(userRegistrations.map((reg) => [reg.sessionId, reg]));

            // Add registration info to each session
            return sessions.map((session) => ({
                ...session,
                userRegistration: registrationMap.get(session.id) || null,
            }));
        }

        return sessions;
    }

    async registerForSession(sessionId: number, studentId: number) {
        // Use transaction to ensure data consistency
        return this.prisma.$transaction(async (tx) => {
            // 1. Check session exists and get basic info
            const session = await tx.session.findUnique({
                where: { id: sessionId },
                select: {
                    id: true,
                    title: true,
                    maxStudents: true,
                    endTime: true,
                },
            });

            if (!session) {
                throw new SessionNotFoundException();
            }

            // 2. Check if user already registered (more efficient)
            const existingRegistration = await tx.registration.findUnique({
                where: {
                    studentId_sessionId: {
                        studentId,
                        sessionId,
                    },
                },
                select: { id: true },
            });

            if (existingRegistration) {
                throw new AlreadyRegisteredException();
            }

            // 3. Check current registered count efficiently
            const currentRegisteredCount = await tx.registration.count({
                where: {
                    sessionId,
                    status: 'REGISTERED',
                },
            });

            if (currentRegisteredCount >= session.maxStudents) {
                throw new SessionFullException();
            }

            // 4. Check session hasn't ended
            if (new Date(session.endTime) < new Date()) {
                throw new SessionExpiredException();
            }

            // 5. Create registration
            const registration = await tx.registration.create({
                data: {
                    studentId,
                    sessionId,
                    status: 'REGISTERED',
                },
                include: {
                    student: {
                        select: {
                            id: true,
                            username: true,
                            name: true,
                            email: true,
                        },
                    },
                    session: {
                        select: {
                            id: true,
                            title: true,
                            startTime: true,
                            endTime: true,
                        },
                    },
                },
            });

            return {
                message: 'Successfully registered for session',
                registration,
            };
        });
    }

    async cancelRegistration(sessionId: number, studentId: number) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Check session exists and get timing info
            const session = await tx.session.findUnique({
                where: { id: sessionId },
                select: {
                    id: true,
                    title: true,
                    startTime: true,
                    endTime: true,
                },
            });

            if (!session) {
                throw new SessionNotFoundException();
            }

            // 2. Check if registration exists
            const registration = await tx.registration.findUnique({
                where: {
                    studentId_sessionId: {
                        studentId,
                        sessionId,
                    },
                },
                select: {
                    id: true,
                    status: true,
                },
            });

            if (!registration) {
                throw new RegistrationNotFoundException();
            }

            // 3. Check if registration is already cancelled
            if (registration.status === 'CANCELLED') {
                throw new HttpException('Registration already cancelled', HttpStatus.CONFLICT);
            }

            // 4. Check if session has started (prevent cancellation of ongoing/past sessions)
            if (new Date(session.startTime) <= new Date()) {
                throw new CannotCancelPastSessionException();
            }

            // 5. Update registration status to CANCELLED
            const updatedRegistration = await tx.registration.update({
                where: {
                    studentId_sessionId: {
                        studentId,
                        sessionId,
                    },
                },
                data: {
                    status: 'CANCELLED',
                },
                include: {
                    student: {
                        select: {
                            id: true,
                            username: true,
                            name: true,
                            email: true,
                        },
                    },
                    session: {
                        select: {
                            id: true,
                            title: true,
                            startTime: true,
                            endTime: true,
                        },
                    },
                },
            });

            return {
                message: 'Registration cancelled successfully',
                registration: updatedRegistration,
            };
        });
    }

    async getStudentRegistrations(studentId: number) {
        const registrations = await this.prisma.registration.findMany({
            where: {
                studentId,
                status: 'REGISTERED',
            },
            include: {
                session: {
                    include: {
                        tutor: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                email: true,
                            },
                        },
                        materials: {
                            select: {
                                id: true,
                                fileName: true,
                                fileUrl: true,
                                createdAt: true,
                            },
                        },
                        _count: {
                            select: {
                                registrations: {
                                    where: {
                                        status: 'REGISTERED',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                registeredAt: 'desc',
            },
        });

        return registrations.map((reg) => ({
            registration: {
                id: reg.id,
                status: reg.status,
                registeredAt: reg.registeredAt,
            },
            session: {
                id: reg.session.id,
                title: reg.session.title,
                description: reg.session.description,
                startTime: reg.session.startTime,
                endTime: reg.session.endTime,
                location: reg.session.location,
                maxStudents: reg.session.maxStudents,
                createdAt: reg.session.createdAt,
                updatedAt: reg.session.updatedAt,
                currentStudents: reg.session._count.registrations,
                availableSlots: reg.session.maxStudents - reg.session._count.registrations,
                tutor: reg.session.tutor,
                materials: reg.session.materials,
            },
        }));
    }
}
