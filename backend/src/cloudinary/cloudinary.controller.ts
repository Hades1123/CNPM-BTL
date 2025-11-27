import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { ApiTags } from '@nestjs/swagger';
import { UploadSingleDocument } from './docs/upload';
import { Public } from '@/decorators/customize';

@Controller()
@ApiTags('Upload document')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @Public()
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    @UploadSingleDocument()
    uploadImage(@UploadedFile() file: Express.Multer.File) {
        return this.cloudinaryService.uploadFile(file);
    }
}
