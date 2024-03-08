import { Auth, AuthProperties, AuthRepository } from '@auth/domain';
import { UseCase } from '@shared/application';
import { LoggerAdapter } from '@shared/domain';
import { User, UserProperties, UserRepository } from '@user/domain';
import { hash } from 'bcrypt';

export class CreateUserUseCase implements UseCase<Input, Output> {
  private logger: LoggerAdapter;
  private userRepository: UserRepository;
  private authRepository: AuthRepository;

  constructor(
    logger: LoggerAdapter,
    userRepository: UserRepository,
    authRepository: AuthRepository,
  ) {
    this.logger = logger;
    this.userRepository = userRepository;
    this.authRepository = authRepository;
  }

  async execute({ credentials, ...input }: Input): Promise<Output> {
    try {
      this.logger.info({ msg: 'Creating a new User.', data: { ...input } });
      const user = User.create({ ...input, cpf: input.cpf.replace(/\D/g, '') });
      await this.userRepository.insert(user);
      const userOutput = user.toJSON();
      this.logger.info({ msg: 'User created!', data: userOutput });

      this.logger.info({
        msg: 'Creating credentials to user.',
        data: { username: credentials.username },
      });

      const hashPassword = await hash(credentials.password, 10);

      const auth = Auth.create({
        ...credentials,
        password: hashPassword,
        user,
      });

      await this.authRepository.insert(auth);
      const authOutput = auth.toJSON();

      delete authOutput.password;
      delete authOutput.user;

      this.logger.info({
        msg: 'Credentials created.',
        data: authOutput,
      });

      return { ...userOutput, credentials: authOutput };
    } catch (error: any) {
      this.logger.error(error);
      throw error;
    }
  }
}

type Input = UserProperties & {
  credentials: AuthProperties;
};
type Output = { id: string } & UserProperties & {
    credentials: Omit<AuthProperties, 'password'>;
  };
