import { TypeormTopicRepository } from '@voting-service/core/topic/infra';
import {
  CreateTopicUseCase,
  GetResultTopicUseCase,
  ListTopicUseCase,
  GetTopicUseCase,
  GetOpenSessionTopicUseCase,
} from '@voting-service/core/topic/application';

import { DataSource } from 'typeorm';
import { LoggerAdapter } from '@voting-service/core/@shared/domain';
import { TopicRepository } from '@voting-service/core/topic/domain';
import { PinoLoggerAdapter } from '@voting-service/core/@shared/infra';
import { SessionRepository } from '@voting-service/core/session/domain';

export namespace TOPIC_PROVIDERS {
  export namespace USE_CASES {
    export const CREATE_TOPIC_USE_CASE = {
      provide: CreateTopicUseCase,
      useFactory: (logger: LoggerAdapter, topicRepository: TopicRepository) => {
        return new CreateTopicUseCase(logger, topicRepository);
      },
      inject: [PinoLoggerAdapter, 'TopicRepository'],
    };

    export const GET_RESULT_TOPIC_USE_CASE = {
      provide: GetResultTopicUseCase,
      useFactory: (logger: LoggerAdapter, topicRepository: TopicRepository) => {
        return new GetResultTopicUseCase(logger, topicRepository);
      },
      inject: [PinoLoggerAdapter, 'TopicRepository'],
    };

    export const GET__TOPIC_USE_CASE = {
      provide: GetTopicUseCase,
      useFactory: (logger: LoggerAdapter, topicRepository: TopicRepository) => {
        return new GetTopicUseCase(logger, topicRepository);
      },
      inject: [PinoLoggerAdapter, 'TopicRepository'],
    };

    export const LIST_TOPIC_USE_CASE = {
      provide: ListTopicUseCase,
      useFactory: (logger: LoggerAdapter, topicRepository: TopicRepository) => {
        return new ListTopicUseCase(logger, topicRepository);
      },
      inject: [PinoLoggerAdapter, 'TopicRepository'],
    };

    export const GET_TOPIC_OPEN_SESSION_USE_CASE = {
      provide: GetOpenSessionTopicUseCase,
      useFactory: (logger: LoggerAdapter, topicRepository: TopicRepository) => {
        return new GetOpenSessionTopicUseCase(logger, topicRepository);
      },
      inject: [PinoLoggerAdapter, 'TopicRepository'],
    };
  }

  export namespace REPOSITORIES {
    export const TOPIC_TYPEORM_REPOSITORY = {
      provide: 'TopicRepository',
      useFactory: (dataSource: DataSource) => {
        return new TypeormTopicRepository(dataSource);
      },
      inject: [DataSource],
    };
  }
}
