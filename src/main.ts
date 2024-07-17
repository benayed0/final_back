import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const fs = require('fs');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = process.env.FRONT_URL;
  console.log(allowedOrigins, process.env);

  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT);
}

bootstrap();
