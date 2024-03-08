import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '@voting-service/core/auth/application';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post()
  async login(@Body() body: { username: string; password: string }) {
    return await this.loginUseCase.execute({ ...body });
  }
}
