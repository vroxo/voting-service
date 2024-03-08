import { LoggerAdapter } from '@voting-service/core/@shared/domain';
import { PinoLoggerAdapter } from '@voting-service/core/@shared/infra';
import { AuthRepository } from '@voting-service/core/auth/domain';
import {
  CreateUserUseCase,
  GetUserUseCase,
} from '@voting-service/core/user/application';
import { UserRepository } from '@voting-service/core/user/domain';
import {
  UserInMemoryRepository,
  UserTypeORMRepository,
} from '@voting-service/core/user/infra';
import { DataSource } from 'typeorm';

export namespace USERS_PROVIDERS {
  export namespace USE_CASES {
    export const CREATE_USER_USE_CASE = {
      provide: CreateUserUseCase,
      useFactory: (
        logger: LoggerAdapter,
        userRepository: UserRepository,
        authRepository: AuthRepository,
      ) => {
        return new CreateUserUseCase(logger, userRepository, authRepository);
      },
      inject: [PinoLoggerAdapter, 'UserRepository', 'AuthRepository'],
    };

    export const GET_USER_USE_CASE = {
      provide: GetUserUseCase,
      useFactory: (logger: LoggerAdapter, userRepository: UserRepository) => {
        return new GetUserUseCase(logger, userRepository);
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
}
