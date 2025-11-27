import { Controller, Get, Param, Request, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { TutorSessionsService } from './sessions.tutor.service';
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';
import { type ApiResponse } from '@/types/global';

@ApiTags('Tutor Sessions')
@ApiBearerAuth()
@UseFilters(AllExceptionsFilter)
@Controller('tutor/sessions')
export class TutorSessionsController {
    constructor(private readonly tutorSessionsService: TutorSessionsService) {}

    @Get()
    async getMySessions(@Request() req): Promise<ApiResponse<any>> {
        try {
            const { sub } = req.user; // Lấy tutor ID từ JWT token
            const sessions = await this.tutorSessionsService.getTutorSessions(sub as number);

            return {
                success: true,
                message: 'Tutor sessions retrieved successfully',
                data: sessions
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @ApiParam({ name: 'id', type: 'number', description: 'Session ID' })
    async getSessionDetails(@Param('id') sessionId: number, @Request() req): Promise<ApiResponse<any>> {
        try {
            const { sub } = req.user; // Lấy tutor ID từ JWT token
            const session = await this.tutorSessionsService.getSessionDetails(+sessionId, sub as number);

            return {
                success: true,
                message: 'Session details retrieved successfully',
                data: session
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}