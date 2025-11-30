import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty() // Hoặc @IsOptional() nếu mssv không bắt buộc
    mssv: string;

    @IsString()
    @IsNotEmpty() // Dòng này quan trọng, vì DB yêu cầu NOT NULL
    faculty: string;

    @IsEnum(['STUDENT', 'TUTOR', 'ADMIN']) // Validate role
    @IsNotEmpty()
    role: 'STUDENT' | 'TUTOR' | 'ADMIN';
}
