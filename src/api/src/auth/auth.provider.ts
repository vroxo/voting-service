import { DataSource } from 'typeorm';
import { TypeORMAuthRepository } from '@voting-service/core/auth/infra';
import { LoginUseCase } from '@voting-service/core/auth/application';
import { ConfigService } from '@nestjs/config';
import { CONFIG_SCHEMA_TYPE } from 'src/config/config.module';
import { LoggerAdapter } from '@voting-service/core/@shared/domain';
import { AuthRepository } from '@voting-service/core/auth/domain';
import { PinoLoggerAdapter } from '@voting-service/core/@shared/infra';

export namespace AUTH_PROVIDERS {
  export namespace USE_CASES {
    export const LOGIN_USE_CASE = {
      provide: LoginUseCase,
      useFactory: (
        configService: ConfigService<CONFIG_SCHEMA_TYPE>,
        logger: LoggerAdapter,
        authRepository: AuthRepository,
      ) => {
        const authSecretKey =
          configService.get<CONFIG_SCHEMA_TYPE['AUTH_SECRET_KEY']>(
            'AUTH_SECRET_KEY',
          );
        return new LoginUseCase(logger, authRepository, authSecretKey);
      },
      inject: [ConfigService, PinoLoggerAdapter, 'AuthRepository'],
    };
  }
  export namespace REPOSITORIES {
    export const TYPEORM_AUTH_RESPOSITORY = {
      provide: 'AuthRepository',
      useFactory: (dataSource: DataSource) => {
        return new TypeORMAuthRepository(dataSource);
      },
      inject: [DataSource],
    };
  }
}
