import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/database/database.service';

@Injectable()
export class MaterialService {
    constructor(private prisma: PrismaService) {}

    async createMaterial(sessionId: number, fileName: string, fileUrl: string, tutorId: number) {
        // Check if session exists and user is the tutor
        const session = await this.prisma.session.findUnique({
            where: { id: sessionId },
            select: { tutorId: true, title: true },
        });

        if (!session) {
            throw new NotFoundException('Session not found');
        }

        if (session.tutorId !== tutorId) {
            throw new ForbiddenException('Only tutor can add materials to their sessions');
        }

        return this.prisma.material.create({
            data: {
                fileName,
                fileUrl,
                sessionId,
            },
            include: {
                session: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
    }

    async getMaterialsBySession(sessionId: number) {
        return this.prisma.material.findMany({
            where: { sessionId },
            orderBy: { createdAt: 'desc' },
            include: {
                session: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
    }
}
