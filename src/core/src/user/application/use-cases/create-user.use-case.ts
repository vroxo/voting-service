import { default as DefaultUseCase } from '@shared/application/use-cases/use-case';
import { LoggerAdapter } from '@shared/domain';
import { User, UserRepository } from '@user/domain';

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    private repo: UserRepository.Repository;
    private logger: LoggerAdapter;

    constructor(logger: LoggerAdapter, repo: UserRepository.Repository) {
      this.logger = logger;
      this.repo = repo;
    }

    async execute(input: Input): Promise<Output> {
      this.logger.info({ msg: 'Creating user...', input });
      const entity = new User(input);
      await this.repo.insert(entity);
      this.logger.info({ msg: 'User created!', user: entity.toJSON() });
      return entity.toJSON();
    }
  }

  export type Input = {
    name: string;
    email?: string;
    is_active?: boolean;
  };

  export type Output = {
    id: string;
    name: string;
    email: string | null;
    is_active: boolean;
    created_at: Date;
  };
}

export default CreateUserUseCase;
