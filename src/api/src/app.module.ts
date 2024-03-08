import { Module } from '@nestjs/common';
import { PinoLoggerAdapter } from '@voting-service/core/@shared/infra';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './db/database.module';
import { TopicModule } from './topics/topics.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { VotesModule } from './votes/votes.module';

@Module({
  controllers: [AppController],
  providers: [AppService, PinoLoggerAdapter],
  imports: [
    ConfigModule.forRoot(),
    TopicModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    VotesModule,
    DatabaseModule,
  ],
  exports: [UsersModule],
})
export class AppModule {}
