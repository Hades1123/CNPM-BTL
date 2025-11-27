import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/database.service';
import {
    SessionNotFoundException,
    AlreadyRegisteredException,
    SessionFullException,
    SessionExpiredException,
} from '@/common/exceptions/session.exceptions';

@Injectable()
export class SessionsService {
    constructor(private prisma: PrismaService) {}

    async getAllSessions(userId?: number) {
        const sessions = await this.prisma.session.findMany({
            include: {
                tutor: {
                    select: {
                        id: true,
                        username: true,
                        name: true,
                        email: true,
                        role: true,
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
            // if (new Date(session.endTime) < new Date()) {
            //     throw new SessionExpiredException();
            // }

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
}
