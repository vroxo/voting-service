import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '@voting-service/core/user/application';
import { UserSeed } from '@voting-service/core/user/infra';

@Injectable()
export class SeedService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  public async run(): Promise<void> {
    await new UserSeed(this.createUserUseCase).run();
  }
}
