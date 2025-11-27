import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'The username of the user',
        example: 'tutor_hung',
        type: String,
    })
    @IsString({ message: 'Tên đăng nhập phải là chuỗi ký tự' })
    @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
    username: string;

    @ApiProperty({
        description: 'The password of the user',
        example: '12345',
        type: String,
    })
    @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
    @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
    password: string;
}
