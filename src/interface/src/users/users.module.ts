import { Module } from '@nestjs/common';
import { PinoLoggerAdapter } from '@service-template/core/@shared/infra';
import { UsersController } from './users.controller';
import { USERS_PROVIDERS } from './users.provider';

@Module({
  controllers: [UsersController],
  providers: [
    PinoLoggerAdapter,
    USERS_PROVIDERS.GATEWAYS.WEB_SOCKET_GATEWAY,
    ...Object.values(USERS_PROVIDERS.REPOSITORIES),
    ...Object.values(USERS_PROVIDERS.USE_CASES),
  ],
})
export class UsersModule {}
