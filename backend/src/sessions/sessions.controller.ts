import { Controller, Get, Param, Post, Request, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';

@ApiTags('Sessions')
@ApiBearerAuth()
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @Get()
    async getAllSessions() {
        return this.sessionsService.getAllSessions();
    }

    @Post(':id/register')
    @ApiParam({ name: 'id', type: 'number', description: 'Session ID' })
    async registerSession(@Param('id') sessionId: number, @Request() req) {
        try {
            const { sub } = req.user; // Lấy user ID từ JWT token
            return this.sessionsService.registerForSession(+sessionId, sub as number);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
