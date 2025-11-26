import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type ILoginDto } from './dto/login.dto';
import { Public } from '@/decorators/customize';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    async login(@Body() loginDto: ILoginDto) {
        return this.authService.signIn(loginDto.username, loginDto.password);
    }
}
