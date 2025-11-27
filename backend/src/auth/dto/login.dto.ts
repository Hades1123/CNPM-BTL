import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        description: 'The username of the user',
        example: 'tutor_hung',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'The password of the user',
        example: '12345',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}

export interface ILoginDto {
    username: string;
    password: string;
}
