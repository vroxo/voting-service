import { LoggerAdapter } from '@voting-service/core/@shared/domain';
import { PinoLoggerAdapter } from '@voting-service/core/@shared/infra';
import { CreateVoteUseCase } from '@voting-service/core/vote/application';
import { UserRepository } from '@voting-service/core/user/domain';
import { TypeORMVoteRepository } from '@voting-service/core/vote/infra';
import { DataSource } from 'typeorm';
import { VoteRepository } from '@voting-service/core/vote/domain';
import { SessionRepository } from '@voting-service/core/session/domain';

export namespace VOTES_PROVIDERS {
  export namespace USE_CASES {
    export const CREATE_VOTE_USE_CASE = {
      provide: CreateVoteUseCase,
      useFactory: (
        logger: LoggerAdapter,
        voteRepository: VoteRepository,
        userRepository: UserRepository,
        sessionRepository: SessionRepository,
      ) => {
        return new CreateVoteUseCase(
          logger,
          voteRepository,
          userRepository,
          sessionRepository,
        );
      },
      inject: [
        PinoLoggerAdapter,
        'VoteRepository',
        'UserRepository',
        'SessionRepository',
      ],
    };
  }

  export namespace REPOSITORIES {
    export const TYPE_ORM_VOTE_RESPOSITORY = {
      provide: 'VoteRepository',
      useFactory: (dataSource: DataSource) => {
        return new TypeORMVoteRepository(dataSource);
      },
      inject: [DataSource],
    };
  }
}
