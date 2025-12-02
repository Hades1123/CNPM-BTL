import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from './database.service';

@Injectable()
export class SeedDatabaseService implements OnModuleInit {
    private readonly logger = new Logger(SeedDatabaseService.name);

    constructor(private readonly prismaService: PrismaService) {}

    async onModuleInit() {
        // Chỉ seed khi database trống
        const userCount = await this.prismaService.user.count();
        if (userCount === 0) {
            this.logger.log('Database is empty, seeding initial data...');
            await this.ExecuteRawSQL();
            this.logger.log('Database seeded successfully!');
        } else {
            this.logger.log('Database already has data, skipping seed.');
        }
    }

    async ExecuteRawSQL() {
        // Seed users
        await this.prismaService.$executeRaw`
            INSERT INTO users (id, email, username, password, mssv, name, faculty, role) VALUES 
            (1, 'tutor.hung@hcmut.edu.vn', 'tutor_hung', '12345', 'GV001', 'Nguyễn Thanh Hưng', 'Khoa học máy tính', 'TUTOR'),
            (2, 'tutor.lan@hcmut.edu.vn',  'tutor_lan',  '12345', 'GV002', 'Trần Thị Lan',  'Kỹ thuật máy tính', 'TUTOR'),
            (3, 'sv.an@hcmut.edu.vn',      'sv_an',      '12345', '2010001', 'Lê Văn An',    'Khoa học máy tính', 'STUDENT'),
            (4, 'sv.binh@hcmut.edu.vn',    'sv_binh',    '12345', '2010002', 'Phạm Thị Bình',  'Khoa học Máy tính', 'STUDENT'),
            (5, 'sv.cuong@hcmut.edu.vn',   'sv_cuong',   '12345', '2010003', 'Hoàng Quốc Cường',  'Kỹ thuật máy tính', 'STUDENT')
        `;

        // Seed sessions
        await this.prismaService.$executeRaw`
            INSERT INTO sessions (id, title, description, startTime, endTime, location, maxStudents, tutorId, createdAt, updatedAt) VALUES 
            (1, 'Lập trình Web (ReactJS)', 'Học cơ bản về React và NestJS', '2025-12-01 07:00:00', '2025-12-01 11:00:00', 'H6-301', 50, 1, NOW(), NOW()),
            (2, 'NodeJS Backend Nâng cao', 'Kiến trúc Microservices',       '2025-12-07 07:00:00', '2025-12-07 11:00:00', 'Online Meet', 40, 1, NOW(), NOW()),
            (3, 'Nhập môn Trí tuệ nhân tạo', 'Các thuật toán tìm kiếm',     '2025-12-06 13:00:00', '2025-12-06 16:00:00', 'H6-302', 45, 2, NOW(), NOW()),
            (4, 'Machine Learning',        'Hồi quy tuyến tính',            '2025-12-04 13:00:00', '2025-12-04 16:00:00', 'H6-303', 30, 2, NOW(), NOW()),
            (5, 'Vibe coding',      'Hướng dẫn sử dụng claude code hiệu quả','2025-12-05 08:00:00', '2025-12-05 10:00:00', 'Online', 5, 1, NOW(), NOW()),
            (6, 'Vibe coding with github copilot',      'Hướng dẫn sử dụng github copilot hiệu quả','2025-12-02 08:00:00', '2025-12-02 10:00:00', 'Online', 5, 1, NOW(), NOW())
        `;

        // Seed materials
        await this.prismaService.$executeRaw`
            INSERT INTO materials (id, fileName, fileUrl, sessionId, createdAt) VALUES 
            (1, 'Slide Chuong 1.pdf',      'https://res.cloudinary.com/dd8pxfuen/image/upload/SE251__ProjectDesc__Tutor_v1_jyebab.pdf', 1, NOW()),
            (2, 'Source Code Demo.zip',    'https://res.cloudinary.com/dd8pxfuen/image/upload/SE251__ProjectDesc__Tutor_v1_jyebab.pdf', 1, NOW()),
            (3, 'Microservices Guide.pdf', 'https://res.cloudinary.com/dd8pxfuen/image/upload/SE251__ProjectDesc__Tutor_v1_jyebab.pdf', 2, NOW()),
            (4, 'AI Introduction.pptx',    'https://res.cloudinary.com/dd8pxfuen/image/upload/SE251__ProjectDesc__Tutor_v1_jyebab.pdf', 3, NOW()),
            (5, 'Dataset Kaggle.csv',      'https://res.cloudinary.com/dd8pxfuen/image/upload/SE251__ProjectDesc__Tutor_v1_jyebab.pdf', 4, NOW()),
            (6, 'Vibe coding kiếm pháp',      'https://res.cloudinary.com/dd8pxfuen/image/upload/SE251__ProjectDesc__Tutor_v1_jyebab.pdf', 6, NOW())
        `;

        // Seed registrations
        await this.prismaService.$executeRaw`
            INSERT INTO registrations (id, status, registeredAt, studentId, sessionId) VALUES 
            (1, 'COMPLETED', '2025-11-20 10:00:00', 3, 1),
            (2, 'REGISTERED', NOW(), 3, 3),
            (3, 'REGISTERED', NOW(), 4, 1),
            (4, 'REGISTERED', NOW(), 4, 2),
            (5, 'CANCELLED', NOW(), 5, 4),
            (6, 'COMPLETED', '2025-11-20 11:00:00', 3, 6)
        `;
    }
}
