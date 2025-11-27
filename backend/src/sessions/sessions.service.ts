import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/database.service';

@Injectable()
export class SessionsService {
    constructor(private prisma: PrismaService) {}
}
