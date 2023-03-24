import { LoggerAdapter } from '@service-template/core/@shared/domain';
import { PinoLoggerAdapter } from '@service-template/core/@shared/infra';
import { CreateUserUseCase } from '@service-template/core/user/application';
import { UserRepository } from '@service-template/core/user/domain';
import {
  UserInMemoryRepository,
  UserTypeORMRepository,
} from '@service-template/core/user/infra';
import { DataSource } from 'typeorm';
import { UsersWebSocketGateway } from './websocket/users.websocket.gateway';

export namespace USERS_PROVIDERS {
  export namespace USE_CASES {
    export const CREATE_USER_USE_CASE = {
      provide: CreateUserUseCase.UseCase,
      useFactory: (logger: LoggerAdapter, repo: UserRepository.Repository) => {
        return new CreateUserUseCase.UseCase(logger, repo);
      },
      inject: [PinoLoggerAdapter, 'UserRepository'],
    };
  }

  export namespace REPOSITORIES {
    export const IN_MEMORY_REPOSITORY = {
      provide: UserInMemoryRepository,
      useClass: UserInMemoryRepository,
    };

    export const TYPE_ORM_RESPOSITORY = {
      provide: 'UserRepository',
      useFactory: (dataSource: DataSource) => {
        return new UserTypeORMRepository(dataSource);
      },
      inject: [DataSource],
    };
  }

  export namespace GATEWAYS {
    export const WEB_SOCKET_GATEWAY = UsersWebSocketGateway;
  }
}
