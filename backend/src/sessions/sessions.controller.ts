import { Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';

@ApiTags('Sessions')
@ApiBearerAuth()
@UseFilters(AllExceptionsFilter)
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @Get()
    async getAllSessions(@Request() req) {
        try {
            const { sub } = req.user; // Lấy user ID từ JWT token
            const sessions = await this.sessionsService.getAllSessions(sub as number);

            return {
                success: true,
                message: 'Sessions retrieved successfully',
                data: sessions,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post(':id/register')
    @ApiParam({ name: 'id', type: 'number', description: 'Session ID' })
    async registerSession(@Param('id') sessionId: number, @Request() req) {
        const { sub } = req.user; // Lấy user ID từ JWT token
        const result = await this.sessionsService.registerForSession(+sessionId, sub as number);

        return {
            success: true,
            message: result.message,
            data: result.registration,
        };
    }
}
