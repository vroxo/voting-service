import { UserRepository, UserProperties } from '@user/domain';
import { LoggerAdapter } from '@shared/domain';
import { UserNotFoundError } from '@user/domain/error/user-not-found.error';
import { GetUserUseCase } from './get-user.use-case';

describe('GetUserUseCase', () => {
  let useCase: GetUserUseCase;
  let logger: LoggerAdapter;
  let userRepository: UserRepository;

  beforeEach(() => {
    logger = {
      info: jest.fn(),
      error: jest.fn(),
    } as unknown as LoggerAdapter;

    userRepository = {
      findById: jest.fn(),
    } as unknown as UserRepository;

    useCase = new GetUserUseCase(logger, userRepository);
  });

  it('should get a user for a valid id', async () => {
    const id = 'valid-user-id';
    const userProperties: UserProperties = {
      cpf: '12345678900',
      name: 'Test User',
    };

    const mockUser = {
      id,
      ...userProperties,
      toJSON: jest.fn().mockReturnValue({
        id,
        ...userProperties,
      }),
    };

    (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);

    const result = await useCase.execute({ id });

    expect(result).toBeDefined();
    expect(result.cpf).toBe(userProperties.cpf);
    expect(result.name).toBe(userProperties.name);
    expect(userRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('should throw UserNotFoundError when user is not found', async () => {
    const id = 'invalid-user-id';

    (userRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute({ id })).rejects.toThrow(UserNotFoundError);

    expect(userRepository.findById).toHaveBeenCalledTimes(1);
  });
});
