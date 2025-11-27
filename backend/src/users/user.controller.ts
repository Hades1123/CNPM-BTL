import { Controller, Get, Param, Request } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { type ApiResponse } from '@/types/global';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UsersService) {}

    @Get('profile')
    getProfile(@Request() req): ApiResponse<any> {
        const { sub } = req.user;
        return {
            data: this.userService.findUserById(sub as number),
            message: 'Get user by id successfully',
            success: true,
        };
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
    getUserById(@Param('id') id: number): ApiResponse<any> {
        return {
            data: this.userService.findUserById(+id),
            message: 'Success',
            success: true,
        };
    }
}
