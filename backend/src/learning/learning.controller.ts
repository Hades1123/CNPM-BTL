import { Controller, Get, Headers, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { LearningService } from './learning.service';
import { Public } from '@/decorators/customize';

@Controller('learning')
@Public()
export class LearningController {
    constructor(private readonly learningService: LearningService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    getText() {
        return 'This is get method';
    }

    @Get(':id/:cnt')
    getParams_1(@Param('cnt') param: number, @Headers() header: any) {
        return header;
    }
}
