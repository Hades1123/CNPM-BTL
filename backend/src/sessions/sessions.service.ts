import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/database.service';

@Injectable()
export class SessionsService {
    constructor(private prisma: PrismaService) {}

    async getAllSessions() {
        return this.prisma.session.findMany({
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
    }

    async registerForSession(sessionId: number, studentId: number) {
        // 1. Check session exists
        const session = await this.prisma.session.findUnique({
            where: { id: sessionId },
            include: {
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
        });

        if (!session) {
            throw new Error('Session not found');
        }

        // 2. Check student hasn't already registered
        const existingRegistration = await this.prisma.registration.findUnique({
            where: {
                studentId_sessionId: {
                    studentId,
                    sessionId,
                },
            },
        });

        if (existingRegistration) {
            throw new Error('Already registered for this session');
        }

        // 3. Check if session is full
        const currentStudents = session._count.registrations;
        if (currentStudents >= session.maxStudents) {
            throw new Error('Session is full');
        }

        // 4. Check session hasn't ended
        // if (new Date(session.endTime) < new Date()) {
        //     throw new Error('Cannot register for past sessions');
        // }

        // 5. Create registration
        const registration = await this.prisma.registration.create({
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
    }
}
