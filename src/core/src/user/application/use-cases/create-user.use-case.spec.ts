import { UserRepository, UserProperties } from '@user/domain';
import { AuthRepository, AuthProperties } from '@auth/domain';
import { LoggerAdapter } from '@shared/domain';
import { hash } from 'bcrypt';
import { CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let logger: LoggerAdapter;
  let userRepository: UserRepository;
  let authRepository: AuthRepository;

  beforeEach(() => {
    logger = {
      info: jest.fn(),
      error: jest.fn(),
    } as unknown as LoggerAdapter;

    userRepository = {
      insert: jest.fn(),
    } as unknown as UserRepository;

    authRepository = {
      insert: jest.fn(),
    } as unknown as AuthRepository;

    useCase = new CreateUserUseCase(logger, userRepository, authRepository);
  });

  it('should create a user and credentials successfully', async () => {
    const userProperties: UserProperties = {
      cpf: '12345678900',
      name: 'Test User',
    };
    const authProperties: AuthProperties = {
      username: 'testuser',
      password: 'testpassword',
    };
    const input = { ...userProperties, credentials: authProperties };

    const hashedPassword = await hash(authProperties.password, 10);

    const result = await useCase.execute(input);

    expect(result).toBeDefined();
    expect(result.cpf).toBe(userProperties.cpf.replace(/\D/g, ''));
    expect(result.name).toBe(userProperties.name);
    expect(result.credentials.username).toBe(authProperties.username);
    expect(userRepository.insert).toHaveBeenCalledTimes(1);
    expect(authRepository.insert).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when user creation fails', async () => {
    const userProperties: UserProperties = {
      cpf: '12345678900',
      name: 'Test User',
    };
    const authProperties: AuthProperties = {
      username: 'testuser',
      password: 'testpassword',
    };
    const input = { ...userProperties, credentials: authProperties };

    (userRepository.insert as jest.Mock).mockImplementation(() => {
      throw new Error('Insertion Error');
    });

    await expect(useCase.execute(input)).rejects.toThrow('Insertion Error');

    expect(userRepository.insert).toHaveBeenCalledTimes(1);
    expect(authRepository.insert).toHaveBeenCalledTimes(0);
    expect(logger.error).toHaveBeenCalledTimes(1);
  });
});
