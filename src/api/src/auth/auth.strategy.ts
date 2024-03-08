import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { GetUserUseCase } from '@voting-service/core/user/application';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONFIG_SCHEMA_TYPE } from 'src/config/config.module';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService<CONFIG_SCHEMA_TYPE>,
    private getUserUseCase: GetUserUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<CONFIG_SCHEMA_TYPE['AUTH_SECRET_KEY']>(
          'AUTH_SECRET_KEY',
        ),
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.getUserUseCase.execute({ id: payload.id });
      return { id: user.id, username: payload.username, role: user.role };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
