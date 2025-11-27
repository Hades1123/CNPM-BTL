import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateMaterialDto {
    @ApiProperty({
        description: 'Original filename of the material',
        example: 'slide_nestjs.pdf',
        type: String,
    })
    @IsString({ message: 'Tên file phải là chuỗi ký tự' })
    @IsNotEmpty({ message: 'Tên file không được để trống' })
    fileName: string;

    @ApiProperty({
        description: 'URL of the uploaded file from Cloudinary',
        example: 'https://res.cloudinary.com/demo/raw/upload/v1234567890/slide_nestjs.pdf',
        type: String,
    })
    @IsString({ message: 'File URL phải là chuỗi ký tự' })
    @IsNotEmpty({ message: 'File URL không được để trống' })
    @IsUrl({}, { message: 'File URL không hợp lệ' })
    fileUrl: string;
}
