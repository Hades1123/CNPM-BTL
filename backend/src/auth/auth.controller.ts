import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '@/decorators/customize';
import { ApiTags } from '@nestjs/swagger';
import { LoginApiDoc } from './docs/api.docs';

@ApiTags('Authentication')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @LoginApiDoc()
    async login(@Body() loginDto: LoginDto) {
        return this.authService.signIn(loginDto.username, loginDto.password);
    }
}
