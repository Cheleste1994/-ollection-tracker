import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,

    exposedHeaders: 'Set-Cookie',
  });

  const configService = app.get(ConfigService);

  const port = configService.get('PORT') || 3000;

  await app.listen(port, () => console.log(`Server starting on port:${port}`));
}
bootstrap();
