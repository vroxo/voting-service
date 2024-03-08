import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLoggerAdapter } from '@voting-service/core/@shared/infra';
import { userSchema } from '@voting-service/core/user/infra';
import { UsersController } from './users.controller';
import { USERS_PROVIDERS } from './users.provider';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([userSchema]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [
    PinoLoggerAdapter,
    ...Object.values(USERS_PROVIDERS.REPOSITORIES),
    ...Object.values(USERS_PROVIDERS.USE_CASES),
  ],
  exports: [
    ...Object.values(USERS_PROVIDERS.REPOSITORIES),
    ...Object.values(USERS_PROVIDERS.USE_CASES),
  ],
})
export class UsersModule {}
