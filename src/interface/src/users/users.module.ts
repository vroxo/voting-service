import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserInMemoryRepository } from '@service-template/core/user/infra';
import { CreateUserUseCase } from '@service-template/core/user/application';
import { UserRepository } from '@service-template/core/user/domain';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: CreateUserUseCase.UseCase,
      useFactory: (repo: UserRepository.Repository) => {
        return new CreateUserUseCase.UseCase(repo);
      },
      inject: ['UserRepository'],
    },
  ],
})
export class UsersModule {}
