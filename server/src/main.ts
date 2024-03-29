import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { graphqlUploadExpress } from 'graphql-upload';
const cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(graphqlUploadExpress({ maxFileSize: 10 * 1000 * 1000, maxFiles: 10 }));
  app.use(cookieParser());

  const configService = app.get(ConfigService);

  app.enableCors({
    credentials: true,
    origin: [configService.get('APP_DOMAIN') || 'http://localhost:3000'],
    exposedHeaders: 'Set-Cookie',
  });

  const port = configService.get('PORT') || 4000;

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
