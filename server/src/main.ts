import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    exposedHeaders: 'set-cookie',
  });

  const configService = app.get(ConfigService);

  const port = configService.get('PORT') || 3000;

  await app.listen(port, () => console.log(`Server starting on port:${port}`));
}
bootstrap();
