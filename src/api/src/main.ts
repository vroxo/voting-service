import { NestFactory } from '@nestjs/core';
import { PinoLoggerAdapter } from '@voting-service/core/@shared/infra';
import { AppModule } from './app.module';

import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const loggerAdapter = app.get(PinoLoggerAdapter);

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
  );

  app.useLogger(loggerAdapter);

  await app.listen(3000);
}
bootstrap();
