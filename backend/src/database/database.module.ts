import { Module } from '@nestjs/common';
import { PrismaService } from './database.service';
import { SeedDatabaseService } from './database.seed.service';

@Module({
    providers: [PrismaService, SeedDatabaseService],
    exports: [PrismaService, SeedDatabaseService],
})
export class DatabaseModule {}
