import {
    BadRequestException,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    UseInterceptors,
} from '@nestjs/common';
import { LearningService } from './learning.service';
import { Public } from '@/decorators/customize';
import { ExcludeNullInterceptor } from '@/common/interceptors/excludeNull.interceptor';

@Controller('learning')
@Public()
@UseInterceptors(ExcludeNullInterceptor)
export class LearningController {
    constructor(private readonly learningService: LearningService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getText() {
        throw new HttpException('custom message', HttpStatus.BAD_GATEWAY, {
            cause: new Error(),
            description: 'error kkk',
        });
    }

    @Get(':id/:cnt')
    getParams_1(@Param('cnt') param: number, @Headers() header: any) {
        return header;
    }

    @Get('null')
    getNullResponse() {
        return null;
    }
}
