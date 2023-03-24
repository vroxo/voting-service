import { Module } from '@nestjs/common';
import { PinoLoggerAdapter } from '@service-template/core/@shared/infra';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, PinoLoggerAdapter],
})
export class AppModule {}
