import { UseCase } from '@shared/application';
import { LoggerAdapter } from '@shared/domain';
import { UserProperties, UserRepository } from '@user/domain';
import { UserNotFoundError } from '@user/domain/error/user-not-found.error';

export class GetUserUseCase implements UseCase<Input, Output> {
  private logger: LoggerAdapter;
  private userRepository: UserRepository;

  constructor(logger: LoggerAdapter, userRepository: UserRepository) {
    this.logger = logger;
    this.userRepository = userRepository;
  }

  async execute({ id }: Input): Promise<Output> {
    try {
      this.logger.info({ msg: 'Getting user.', data: { id } });
      const user = await this.userRepository.findById(id);

      if (!user) throw new UserNotFoundError();

      const output = user.toJSON();

      this.logger.info({ msg: 'User found.', data: output });

      return output;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

type Input = { id: string };
type Output = { id: string } & UserProperties;
