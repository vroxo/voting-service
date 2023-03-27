import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLoggerAdapter } from '@service-template/core/@shared/infra';
import { userSchema } from '@service-template/core/user/infra';
import { UsersController } from './users.controller';
import { USERS_PROVIDERS } from './users.provider';

@Module({
  imports: [TypeOrmModule.forFeature([userSchema])],
  controllers: [UsersController],
  providers: [
    PinoLoggerAdapter,
    USERS_PROVIDERS.GATEWAYS.WEB_SOCKET_GATEWAY,
    ...Object.values(USERS_PROVIDERS.REPOSITORIES),
    ...Object.values(USERS_PROVIDERS.USE_CASES),
  ],
})
export class UsersModule {}
