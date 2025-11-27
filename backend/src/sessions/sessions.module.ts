import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TutorSessionsService } from './sessions.tutor.service';
import { TutorSessionsController } from './sessions.tutor.controller';
import { AuthModule } from '@/auth/auth.module';
import { DatabaseModule } from '@/database/database.module';

@Module({
    imports: [AuthModule, DatabaseModule],
    controllers: [SessionsController, TutorSessionsController],
    providers: [SessionsService, TutorSessionsService],
    exports: [SessionsService, TutorSessionsService],
})
export class SessionsModule {}
