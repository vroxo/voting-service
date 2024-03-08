import { AuthRepository, InvalidCredentialsError } from '@auth/domain';
import { UseCase } from '@shared/application';
import { LoggerAdapter } from '@shared/domain';
import { UserRole } from '@user/domain';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export class LoginUseCase implements UseCase<Input, Output> {
  private logger: LoggerAdapter;
  private authRepository: AuthRepository;
  private authSecretKey: string;

  constructor(
    logger: LoggerAdapter,
    authRepository: AuthRepository,
    authSecretKey: string,
  ) {
    this.logger = logger;
    this.authRepository = authRepository;
    this.authSecretKey = authSecretKey;
  }

  async execute({ username, password }: Input) {
    try {
      this.logger.info({ msg: 'Logging in.', data: { username } });

      const auth = await this.authRepository.findByUsername(username);
      if (!auth) throw new InvalidCredentialsError('username not found.');

      const { user, ...credentials } = auth.toJSON();

      this.logger.info({ msg: 'Checking password.' });
      const isValidPassword = await compare(password, credentials.password);

      if (!isValidPassword)
        throw new InvalidCredentialsError('invalid password.');

      this.logger.info({ msg: 'Password is valid.' });
      const payload = { username, id: user.id, role: user.role };

      const access_token = sign(payload, this.authSecretKey);

      this.logger.info({ msg: 'Logged in!', data: { username, access_token } });

      return { username, role: user.role, access_token };
    } catch (error: any) {
      this.logger.error(error);
      throw error;
    }
  }
}

type Input = { username: string; password: string };
type Output = { username: string; role: UserRole; access_token: string };
