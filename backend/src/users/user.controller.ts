import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '@/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getAllUsers() {
        try {
            const users = await this.userService.findAllUser();
            return users;
        } catch (error) {
            console.error('Error getting users:', error);
            throw error;
        }
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        const { sub } = req.user;
        return this.userService.findUserById(sub as number);
    }
}
