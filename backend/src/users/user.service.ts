import { PrismaService } from '@/database/database.service';
import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterDto } from '@/auth/dto/register.dto';
@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) {}

    async findUser(username: string) {
        const user = this.prismaService.user.findUnique({ where: { username } });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }

    async findAllUser() {
        return this.prismaService.user.findMany();
    }

    async findUserById(id: number) {
        return this.prismaService.user.findUnique({ where: { id } });
    }

    async createUser(data: RegisterDto) {
        try {
            // 1. Kiểm tra kỹ trùng lặp cho cả Username, Email và MSSV
            const existingUser = await this.prismaService.user.findFirst({
                where: {
                    OR: [
                        { username: data.username },
                        { email: data.email },
                        // Chỉ check MSSV nếu nó có giá trị (tránh lỗi null)
                        ...(data.mssv ? [{ mssv: data.mssv }] : []),
                    ],
                },
            });

            if (existingUser) {
                // Trả về lỗi 409 (Conflict) thay vì để sập server 500
                throw new HttpException('Username, Email hoặc MSSV đã tồn tại!', HttpStatus.CONFLICT);
            }

            // 2. Validate Role (tránh gửi rỗng)
            // Nếu không có role, mặc định gán là STUDENT
            const validRole = data.role && ['STUDENT', 'TUTOR'].includes(data.role) ? data.role : 'STUDENT';

            // 3. Tạo User
            const newUser = await this.prismaService.user.create({
                data: {
                    username: data.username,
                    password: data.password, // Giữ nguyên pass thô theo ý bạn
                    email: data.email,
                    name: data.name,
                    mssv: data.mssv,
                    faculty: data.faculty || '',
                    role: validRole as any, // Sử dụng role đã validate
                },
            });

            return newUser;
        } catch (error) {
            // Nếu lỗi là do mình throw (409) thì ném tiếp ra ngoài
            if (error instanceof HttpException) throw error;

            // Các lỗi khác (DB chết, v.v...) thì log ra xem
            console.error('Lỗi đăng ký:', error);
            throw new HttpException('Lỗi server khi tạo tài khoản', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
