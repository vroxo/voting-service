import { default as DefaultUseCase } from '@shared/application/use-cases/use-case';
import { User, UserRepository } from '@user/domain';

export namespace CreateUserUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private repo: UserRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = new User(input);
      await this.repo.insert(entity);
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
