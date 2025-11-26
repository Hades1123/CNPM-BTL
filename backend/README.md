OK bạn, chơi thủ công cho lẹ\! Dân code mình nhiều khi viết SQL insert cái vèo vào phpMyAdmin hoặc MySQL Workbench còn nhanh hơn ngồi viết script seed :))

Vậy thì trong **File Markdown tổng hợp** cuối cùng, mình sẽ **bỏ phần bước 5 (Seeding)** đi.

Tuy nhiên, lưu ý nhỏ: Vì trong code `integration.service.ts` mình đang giả lập logic **"hễ username có chữ `tutor` thì là Giảng viên"**, nên khi bạn insert tay, nhớ đặt `username` đúng quy tắc đó nhé.

Dưới đây là mấy câu SQL mẫu bạn copy paste vào MySQL chạy cho nhanh, đỡ phải gõ từng dòng:

### 📜 SQL Insert Data Mẫu (Chạy trong MySQL Workbench/Adminer)

**1. Tạo 2 ông Thầy (Tutor)**
_Lưu ý: username phải có chữ "tutor" để code giả lập nhận diện đúng role._

```sql
INSERT INTO "User" ("username", "ssoId", "fullName", "role", "faculty", "studentCode")
VALUES
('tutor_hung', 'sso_tutor_hung', 'Thầy Hưng (Web)', 'TUTOR', 'KHMT', 'GV01'),
('tutor_lan', 'sso_tutor_lan', 'Cô Lan (AI)', 'TUTOR', 'KTMT', 'GV02');
```

**2. Tạo 2 Sinh viên**

```sql
INSERT INTO "User" ("username", "ssoId", "fullName", "role", "faculty", "studentCode")
VALUES
('sv_an', 'sso_sv_an', 'Nguyễn Văn An', 'STUDENT', 'Dien-DienTu', 'SV2024'),
('sv_binh', 'sso_sv_binh', 'Trần Bình', 'STUDENT', 'KHMT', 'SV2025');
```

**3. Tạo Lớp học (Classes)**
_Lưu ý: `tutorId` phải lấy đúng ID của mấy ông thầy vừa tạo ở trên (thường là 1 hoặc 2)._

```sql
INSERT INTO "Class" ("title", "time", "status", "tutorId")
VALUES
('Lập trình Web (ReactJS)', 'Thứ 2, Tiết 1-3', 'OPEN', 1),
('Trí tuệ nhân tạo', 'Thứ 4, Tiết 7-9', 'OPEN', 2),
('Cấu trúc dữ liệu', 'Thứ 6, Tiết 1-3', 'FULL', 1);
```

---

### Cập nhật lại Markdown Plan (Final Version)

Dưới đây là file markdown **chốt cuối cùng** (đã bỏ phần Seed, thay bằng Manual Insert) để bạn lưu lại nhé.

````markdown
# 🚀 Kế hoạch Triển khai Backend: Tutor Support System (Simplified)

## 1. Mục tiêu & Phạm vi

- **Công nghệ:** NestJS, Prisma ORM, MySQL (hoặc PostgreSQL).
- **Tính năng:**
    1.  Đăng nhập (Giả lập tích hợp SSO & DataCore).
    2.  Tutor tạo lịch dạy.
    3.  Sinh viên xem lịch và đăng ký.
- **Phương pháp:** Đơn giản hóa tối đa, Insert dữ liệu bằng tay vào DB.

---

## 2. Bước 1: Cấu hình Database (`schema.prisma`)

Chạy lệnh `npx prisma db push` sau khi lưu file này.

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql" // Đã đổi sang mysql theo yêu cầu
  url      = env("DATABASE_URL")
}

model User {
  id          Int     @id @default(autoincrement())
  username    String  @unique
  ssoId       String? @unique
  fullName    String?
  studentCode String?
  faculty     String?
  role        String          // "TUTOR" hoặc "STUDENT"

  classesTeaching Class[]
  bookings        Booking[]
}

model Class {
  id        Int      @id @default(autoincrement())
  title     String
  time      String
  status    String   @default("OPEN")

  tutorId   Int
  tutor     User     @relation(fields: [tutorId], references: [id])
  bookings  Booking[]
}

model Booking {
  id        Int      @id @default(autoincrement())
  classId   Int
  class     Class    @relation(fields: [classId], references: [id])
  studentId Int
  student   User     @relation(fields: [studentId], references: [id])

  @@unique([studentId, classId])
}
```
````

---

## 3\. Bước 2: Giả lập Hệ thống ngoài (`src/integration.service.ts`)

File này giúp bạn "chém gió" trong báo cáo về việc tích hợp hệ thống.

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class IntegrationService {
    // 1. Giả lập SSO: Trả về token định danh
    async loginSSO(username: string): Promise<string> {
        if (username) return `sso_token_${username}_123`;
        throw new UnauthorizedException('Login Failed');
    }

    // 2. Giả lập DataCore: Trả về thông tin chi tiết
    async getUserProfileFromDataCore(ssoId: string) {
        // QUY ƯỚC QUAN TRỌNG: Username chứa 'tutor' thì là Giảng viên
        const isTutor = ssoId.includes('tutor');

        if (isTutor) {
            return { fullName: 'Giảng Viên Mẫu', code: 'GV001', faculty: 'KHMT', role: 'TUTOR' };
        } else {
            return { fullName: 'Sinh Viên Mẫu', code: 'SV2024', faculty: 'KTMT', role: 'STUDENT' };
        }
    }
}
```

---

## 4\. Bước 3: Hiện thực API (`src/app.controller.ts`)

Nhớ thêm `IntegrationService` vào `providers` trong `app.module.ts`.

```typescript
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { IntegrationService } from './integration.service';

@Controller('api')
export class AppController {
    constructor(
        private prisma: PrismaService,
        private integration: IntegrationService,
    ) {}

    // --- Login & Sync Data ---
    @Post('login')
    async login(@Body() body: { username: string }) {
        const ssoId = await this.integration.loginSSO(body.username);
        const profile = await this.integration.getUserProfileFromDataCore(ssoId);

        // Tự động lưu hoặc cập nhật user vào DB
        return this.prisma.user.upsert({
            where: { username: body.username },
            update: { ...profile, ssoId },
            create: { username: body.username, ...profile, ssoId },
        });
    }

    // --- Tutor tạo lớp ---
    @Post('classes')
    async createClass(@Body() body: { title: string; time: string; tutorId: number }) {
        return this.prisma.class.create({
            data: { title: body.title, time: body.time, tutorId: body.tutorId, status: 'OPEN' },
        });
    }

    // --- SV xem lớp ---
    @Get('classes')
    async getClasses() {
        return this.prisma.class.findMany({ where: { status: 'OPEN' }, include: { tutor: true } });
    }

    // --- SV đăng ký ---
    @Post('classes/:id/book')
    async bookClass(@Param('id') classId: string, @Body() body: { studentId: number }) {
        return this.prisma.booking.create({
            data: { classId: Number(classId), studentId: body.studentId },
        });
    }
}
```

---

## 5\. Hướng dẫn Test (Kịch bản Demo)

1.  **Chuẩn bị DB:** Dùng MySQL Workbench insert tay dữ liệu Tutor & Class (hoặc để API Login tự tạo User cũng được).
2.  **Chạy Server:** `npm run start:dev`
3.  **Demo:**
    - **Login GV:** POST `/api/login` -\> `{ "username": "tutor_hung" }` (Hệ thống tự nhận diện là Tutor).
    - **Login SV:** POST `/api/login` -\> `{ "username": "sinhvien_a" }`.
    - **Xem Lớp:** GET `/api/classes`.
    - **Đăng Ký:** POST `/api/classes/1/book` -\> `{ "studentId": ... }`.

<!-- end list -->

```

```
