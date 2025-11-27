import { Controller, Get, Post, Param, Request, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags, ApiBody } from '@nestjs/swagger';
import { MaterialService } from './material.service';
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';
import { type ApiResponse } from '@/types/global';
import { CreateMaterialDto } from './dto/create-material.dto';

@ApiTags('Materials')
@ApiBearerAuth()
@UseFilters(AllExceptionsFilter)
@Controller('materials')
export class MaterialController {
    constructor(private readonly materialService: MaterialService) {}

    @Post('sessions/:sessionId')
    @ApiParam({ name: 'sessionId', type: 'number', description: 'Session ID' })
    @ApiBody({ type: CreateMaterialDto })
    async createMaterial(@Param('sessionId') sessionId: number, @Request() req): Promise<ApiResponse<any>> {
        const { sub } = req.user; // tutor ID
        const { fileName, fileUrl } = req.body;

        const material = await this.materialService.createMaterial(+sessionId, fileName, fileUrl, sub as number);

        return {
            success: true,
            message: 'Material created successfully',
            data: material,
        };
    }

    @Get('sessions/:sessionId')
    @ApiParam({ name: 'sessionId', type: 'number', description: 'Session ID' })
    async getMaterialsBySession(@Param('sessionId') sessionId: number): Promise<ApiResponse<any>> {
        const materials = await this.materialService.getMaterialsBySession(+sessionId);

        return {
            success: true,
            message: 'Materials retrieved successfully',
            data: materials,
        };
    }
}
