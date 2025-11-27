import { Controller, Get, Request } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Get('profile')
    getProfile(@Request() req) {
        const { sub } = req.user;
        return this.userService.findUserById(sub as number);
    }
}
