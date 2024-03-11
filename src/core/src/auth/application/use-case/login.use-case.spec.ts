import { Auth, AuthRepository, InvalidCredentialsError } from '@auth/domain';
import { LoggerAdapter } from '@shared/domain';
import { UserRole } from '@user/domain';
import { hash } from 'bcrypt';
import { LoginUseCase } from './login.use-case';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let mockAuthRepository: AuthRepository;
  let mockLogger: LoggerAdapter;
  const mockAuthSecretKey = 'my-secret-key';

  beforeEach(() => {
    mockAuthRepository = {
      findByUsername: jest.fn(),
    } as unknown as AuthRepository;

    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
    } as unknown as LoggerAdapter;

    loginUseCase = new LoginUseCase(
      mockLogger,
      mockAuthRepository,
      mockAuthSecretKey,
    );
  });

  it('should log in successfully with valid credentials', async () => {
    const mockUsername = 'testuser';
    const mockPassword = 'testpassword';
    const mockHashedPassword = await hash(mockPassword, 10);
    const mockUser = {
      id: 'user-id',
      role: UserRole.USER,
    };

    const mockAuth = {
      toJSON: jest.fn().mockReturnValue({
        user: mockUser,
        password: mockHashedPassword,
      }),
    };

    (mockAuthRepository.findByUsername as jest.Mock).mockResolvedValue(
      mockAuth,
    );

    const result = await loginUseCase.execute({
      username: mockUsername,
      password: mockPassword,
    });

    expect(result).toEqual({
      username: mockUsername,
      role: mockUser.role,
      access_token: expect.any(String),
    });

    expect(mockLogger.info).toHaveBeenCalledWith({
      msg: 'Logged in!',
      data: { username: mockUsername, access_token: expect.any(String) },
    });
  });

  it('should throw InvalidCredentialsError when username is not found', async () => {
    (mockAuthRepository.findByUsername as jest.Mock).mockResolvedValue(null);

    await expect(
      loginUseCase.execute({
        username: 'nonexistentuser',
        password: 'testpassword',
      }),
    ).rejects.toThrow(InvalidCredentialsError);

    expect(mockLogger.error).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should throw InvalidCredentialsError when password is invalid', async () => {
    const mockAuth = {
      toJSON: jest.fn().mockReturnValue({
        user: { id: 'user-id', role: UserRole.USER },
        password: 'hashed-password',
      }),
    } as unknown as AuthRepository;

    (mockAuthRepository.findByUsername as jest.Mock).mockResolvedValue(
      mockAuth,
    );

    await expect(
      loginUseCase.execute({ username: 'testuser', password: 'wrongpassword' }),
    ).rejects.toThrow(InvalidCredentialsError);

    expect(mockLogger.error).toHaveBeenCalledWith(expect.any(Error));
  });
});
