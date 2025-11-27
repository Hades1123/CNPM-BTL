import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { AuthModule } from '@/auth/auth.module';
import { DatabaseModule } from '@/database/database.module';
import { TutorSessionsService } from './sessions.tutor.service';

@Module({
    imports: [AuthModule, DatabaseModule],
    controllers: [SessionsController],
    providers: [SessionsService, TutorSessionsService],
    exports: [SessionsService, TutorSessionsService],
})
export class SessionsModule {}
