import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { PinoLoggerAdapter } from '@service-template/core/@shared/infra';
import { AppModule } from './app.module';

import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerAdapter = app.get(PinoLoggerAdapter);

  app.useLogger(loggerAdapter);
  app.use(compression());
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(3000);
}
bootstrap();
