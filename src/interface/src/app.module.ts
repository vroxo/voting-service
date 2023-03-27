import { Module } from '@nestjs/common';
import { PinoLoggerAdapter } from '@service-template/core/@shared/infra';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './db/database.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PinoLoggerAdapter],
  imports: [ConfigModule.forRoot(), UsersModule, DatabaseModule],
})
export class AppModule {}
