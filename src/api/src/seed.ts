import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeedService } from './db/config/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  await app.get(SeedService).run();
  await app.close();
}

bootstrap();
