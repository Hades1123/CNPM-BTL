import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Delete,
    Request,
    UseFilters,
    Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';
import { type ApiResponse } from '@/types/global';
import {
    GetAllSessionsApiDoc,
    RegisterSessionApiDoc,
    CancelRegistrationApiDoc,
    GetMyRegistrationsApiDoc,
} from './docs/sessions.api.docs';

@ApiTags('Sessions')
@ApiBearerAuth()
@UseFilters(AllExceptionsFilter)
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @Get()
    @GetAllSessionsApiDoc()
    @ApiQuery({ name: 'search', required: false, description: 'Search by session title or tutor name' })
    async getAllSessions(@Request() req, @Query('search') search?: string): Promise<ApiResponse<any>> {
        try {
            const { sub } = req.user; // Lấy user ID từ JWT token
            const sessions = await this.sessionsService.getAllSessions(sub as number, search);

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
    @RegisterSessionApiDoc()
    async registerSession(@Param('id') sessionId: number, @Request() req): Promise<ApiResponse<any>> {
        const { sub } = req.user; // Lấy user ID từ JWT token
        const result = await this.sessionsService.registerForSession(+sessionId, sub as number);

        return {
            success: true,
            message: result.message,
            data: result.registration,
        };
    }

    @Delete(':id/register')
    @CancelRegistrationApiDoc()
    async cancelRegistration(@Param('id') sessionId: number, @Request() req): Promise<ApiResponse<any>> {
        const { sub } = req.user; // Lấy user ID từ JWT token
        const result = await this.sessionsService.cancelRegistration(+sessionId, sub as number);

        return {
            success: true,
            message: result.message,
            data: result.registration,
        };
    }

    @Get('my-registrations')
    @GetMyRegistrationsApiDoc()
    async getMyRegistrations(@Request() req): Promise<ApiResponse<any>> {
        try {
            const { sub } = req.user; // Lấy user ID từ JWT token
            const registrations = await this.sessionsService.getStudentRegistrations(sub as number);

            return {
                success: true,
                message: 'Student registrations retrieved successfully',
                data: registrations,
            };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
