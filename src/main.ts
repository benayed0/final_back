import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const fs = require('fs');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = [
    'http://localhost:4200',
    'https://final-front-two.vercel.app',
  ]; //configService.get<string>('ALLOWED_ORIGINS').split(',');

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000);
}

bootstrap();
