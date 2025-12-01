import { Controller, Get, Param, Request, UseFilters, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TutorSessionsService } from './sessions.tutor.service';
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';
import { type ApiResponse } from '@/types/global';
import { GetTutorSessionsApiDoc, GetTutorSessionDetailsApiDoc } from './docs/tutor-sessions.api.docs';
import type { ISessionRequest } from './dto/newSession-request';

@ApiTags('Tutor Sessions')
@ApiBearerAuth()
@UseFilters(AllExceptionsFilter)
@Controller('tutor/sessions')
export class TutorSessionsController {
    constructor(private readonly tutorSessionsService: TutorSessionsService) {}

    @Get()
    @GetTutorSessionsApiDoc()
    async getMySessions(@Request() req): Promise<ApiResponse<any>> {
        try {
            const { sub } = req.user; // Lấy tutor ID từ JWT token
            const sessions = await this.tutorSessionsService.getTutorSessions(sub as number);

            return {
                success: true,
                message: 'Tutor sessions retrieved successfully',
                data: sessions,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    @GetTutorSessionDetailsApiDoc()
    async getSessionDetails(@Param('id') sessionId: number, @Request() req): Promise<ApiResponse<any>> {
        try {
            const { sub } = req.user; // Lấy tutor ID từ JWT token
            const session = await this.tutorSessionsService.getSessionDetails(+sessionId, sub as number);

            return {
                success: true,
                message: 'Session details retrieved successfully',
                data: session,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async postCreateNewSession(@Request() req: ISessionRequest): Promise<ApiResponse<any>> {
        const { sub } = req.user;
        const response = await this.tutorSessionsService.createNewSession(req, +sub);
        return {
            data: response,
            message: 'Success',
            success: true,
        };
    }
}
