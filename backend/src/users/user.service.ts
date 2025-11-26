import { PrismaService } from '@/database/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async findUser(username: string) {
        const user = this.prismaService.user.findUnique({ where: { username } });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }

    async findAllUser() {
        return this.prismaService.user.findMany();
    }

    async findUserById(id: number) {
        return this.prismaService.user.findUnique({ where: { id } });
    }
}
