import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from '@/common/filters/all-exceptions.filter';
import { ValidationPipe } from '@/common/pipes/validation.pipe';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // Accept cors policy
    app.enableCors({
        origin: 'http://localhost:5173', // FE React
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    });

    // Apply global exception filter
    app.useGlobalFilters(new AllExceptionsFilter());

    // Apply global validation pipe
    app.useGlobalPipes(new ValidationPipe());

    // Establish swagger document
    const config = new DocumentBuilder()
        .setTitle('CNPM Backend API')
        .setDescription('API documentation for CNPM project backend services')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    SwaggerModule.setup('swagger', app, documentFactory, {
        jsonDocumentUrl: 'swagger/json',
    });

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
