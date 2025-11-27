import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@/database/database.module';
@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
