import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, type ILoginDto } from './dto/login.dto';
import { Public } from '@/decorators/customize';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'User login',
        description: 'Authenticate user with username and password and return JWT access token',
    })
    @ApiBody({
        type: LoginDto,
        description: 'User login credentials',
    })
    @ApiResponse({
        status: 200,
        description: 'Login successful',
        schema: {
            type: 'object',
            properties: {
                access_token: {
                    type: 'string',
                    description: 'JWT access token for authentication',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
            },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized - Invalid credentials',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 401,
                },
                message: {
                    type: 'string',
                    example: 'username or password is invalid !!!',
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Missing or invalid input',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 400,
                },
                message: {
                    type: 'array',
                    items: {
                        type: 'string',
                        example: 'username should not be empty',
                    },
                },
            },
        },
    })
    async login(@Body() loginDto: ILoginDto) {
        return this.authService.signIn(loginDto.username, loginDto.password);
    }
}
