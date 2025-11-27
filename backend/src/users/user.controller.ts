import { Controller, Get, Param, Request } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

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

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    getUserById(@Param('id') id: number) {
        return this.userService.findUserById(+id);
    }
}
