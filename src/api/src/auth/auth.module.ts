import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLoggerAdapter } from '@voting-service/core/@shared/infra';
import { authSchema } from '@voting-service/core/auth/infra';
import { AUTH_PROVIDERS } from './auth.provider';
import { AuthStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CONFIG_SCHEMA_TYPE } from 'src/config/config.module';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([authSchema]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService<CONFIG_SCHEMA_TYPE>) => ({
        secret:
          configService.get<CONFIG_SCHEMA_TYPE['AUTH_SECRET_KEY']>(
            'AUTH_SECRET_KEY',
          ),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthStrategy,
    PinoLoggerAdapter,
    ...Object.values(AUTH_PROVIDERS.REPOSITORIES),
    ...Object.values(AUTH_PROVIDERS.USE_CASES),
  ],
  exports: [...Object.values(AUTH_PROVIDERS.REPOSITORIES)],
})
export class AuthModule {}
