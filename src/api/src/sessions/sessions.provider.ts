import { LoggerAdapter } from '@voting-service/core/@shared/domain';
import { SessionRepository } from '@voting-service/core/session/domain';
import { TypeORMSessionRepository } from '@voting-service/core/session/infra';
import { DataSource } from 'typeorm';
import { CreateSessionUseCase } from '@voting-service/core/session/application';
import { TopicRepository } from '@voting-service/core/topic/domain';
import { PinoLoggerAdapter } from '@voting-service/core/@shared/infra';

export namespace SESSION_PROVIDERS {
  export namespace USE_CASES {
    export const CREATE_SESSION_USE_CASE = {
      provide: CreateSessionUseCase,
      useFactory: (
        logger: LoggerAdapter,
        sessionRepository: SessionRepository,
        topicRepository: TopicRepository,
      ) => {
        return new CreateSessionUseCase(
          logger,
          sessionRepository,
          topicRepository,
        );
      },
      inject: [PinoLoggerAdapter, 'SessionRepository', 'TopicRepository'],
    };
  }

  export namespace REPOSITORIES {
    export const SESSION_TYPEORM_REPOSITORY = {
      provide: 'SessionRepository',
      useFactory: (dataSource: DataSource) => {
        return new TypeORMSessionRepository(dataSource);
      },
      inject: [DataSource],
    };
  }
}
