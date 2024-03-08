import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLoggerAdapter } from '@voting-service/core/@shared/infra';
import { User } from '@voting-service/core/user/domain';
import { voteSchema } from '@voting-service/core/vote/infra';
import { SessionsModule } from 'src/sessions/sessions.module';
import { UsersModule } from 'src/users/users.module';
import { VOTES_PROVIDERS } from './votes.provider';
import { VotesController } from './votes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([voteSchema]),
    UsersModule,
    SessionsModule,
  ],
  controllers: [VotesController],
  providers: [
    PinoLoggerAdapter,
    ...Object.values(VOTES_PROVIDERS.REPOSITORIES),
    ...Object.values(VOTES_PROVIDERS.USE_CASES),
  ],
  exports: [...Object.values(VOTES_PROVIDERS.REPOSITORIES)],
})
export class VotesModule {}
