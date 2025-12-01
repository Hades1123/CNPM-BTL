import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LearningService } from './learning.service';
import { LearningController } from './learning.controller';
import { LoggerMiddleware } from '@/middlewares/logger.middleware';

@Module({
    controllers: [LearningController],
    providers: [LearningService],
})
export class LearningModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('learning');
    }
}
