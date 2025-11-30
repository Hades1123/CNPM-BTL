import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/database.service';
import { ISessionRequest } from './dto/newSession-request';
import { ScheduleConflictException } from '@/common/exceptions/session.exceptions';

@Injectable()
export class TutorSessionsService {
    constructor(private prisma: PrismaService) {}

    async getTutorSessions(tutorId: number) {
        const sessions = await this.prisma.session.findMany({
            where: {
                tutorId,
            },
            include: {
                materials: {
                    select: {
                        id: true,
                        fileName: true,
                        fileUrl: true,
                        createdAt: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
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

        return sessions.map((session) => ({
            ...session,
            currentStudents: session._count.registrations,
            availableSlots: session.maxStudents - session._count.registrations,
            isFull: session._count.registrations >= session.maxStudents,
            isOngoing: new Date(session.startTime) <= new Date() && new Date(session.endTime) > new Date(),
            isPast: new Date(session.endTime) <= new Date(),
        }));
    }

    async getSessionDetails(sessionId: number, tutorId: number) {
        const session = await this.prisma.session.findFirst({
            where: {
                id: sessionId,
                tutorId, // Ensure tutor owns this session
            },
            include: {
                materials: {
                    select: {
                        id: true,
                        fileName: true,
                        fileUrl: true,
                        createdAt: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                registrations: {
                    where: {
                        status: 'REGISTERED',
                    },
                    include: {
                        student: {
                            select: {
                                id: true,
                                username: true,
                                name: true,
                                email: true,
                                faculty: true,
                            },
                        },
                    },
                    orderBy: {
                        registeredAt: 'desc',
                    },
                },
            },
        });

        if (!session) {
            throw new Error('Session not found or access denied');
        }

        return {
            ...session,
            currentStudents: session.registrations.length,
            availableSlots: session.maxStudents - session.registrations.length,
            isFull: session.registrations.length >= session.maxStudents,
            isOngoing: new Date(session.startTime) <= new Date() && new Date(session.endTime) > new Date(),
            isPast: new Date(session.endTime) <= new Date(),
            registeredStudents: session.registrations.map((reg) => reg.student),
        };
    }

    async createNewSession(sessionRequest: ISessionRequest, tutorId: number) {
        // 1. Check if new session schedule is conflict with exist sessions
        const checkConflict = await this.prisma.session.findFirst({
            where: {
                startTime: {
                    gte: sessionRequest.startTime,
                },
                endTime: {
                    lte: sessionRequest.endTime,
                },
            },
        });

        if (checkConflict) {
            throw new ScheduleConflictException();
        }

        const result = this.prisma.session.create({
            data: {
                tutorId: tutorId,
                title: sessionRequest.title,
                description: sessionRequest.description,
                startTime: sessionRequest.startTime,
                endTime: sessionRequest.endTime,
                location: sessionRequest.location,
                maxStudents: sessionRequest.maxStudents,
                createdAt: sessionRequest.createdAt,
                updatedAt: sessionRequest.upDatedAt,
            },
        });
        return result;
    }
}
