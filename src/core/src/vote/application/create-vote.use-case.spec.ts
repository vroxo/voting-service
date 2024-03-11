import { VoteRepository } from '@vote/domain';
import { UserRepository } from '@user/domain';
import { SessionRepository, SessionStatus } from '@session/domain';
import { LoggerAdapter } from '@shared/domain';
import { UserNotFoundError } from '@user/domain/error/user-not-found.error';
import { CreateVoteUseCase } from './create-vote.use-case';

describe('CreateVoteUseCase', () => {
  let useCase: CreateVoteUseCase;
  let logger: LoggerAdapter;
  let voteRepository: VoteRepository;
  let userRepository: UserRepository;
  let sessionRepository: SessionRepository;

  beforeEach(() => {
    logger = {
      info: jest.fn(),
      error: jest.fn(),
    } as unknown as LoggerAdapter;

    voteRepository = {
      insert: jest.fn(),
      findBySessionIdAndUserId: jest.fn(),
    } as unknown as VoteRepository;

    userRepository = {
      findById: jest.fn(),
    } as unknown as UserRepository;

    sessionRepository = {
      findById: jest.fn(),
    } as unknown as SessionRepository;

    useCase = new CreateVoteUseCase(
      logger,
      voteRepository,
      userRepository,
      sessionRepository,
    );
  });

  it('should create a vote for a valid user and session', async () => {
    const user_id = 'valid-user-id';
    const session_id = 'valid-session-id';
    const yes = true;
    const no = false;
    const input = { user_id, session_id, yes, no };

    const mockUser = {
      id: user_id,
      cpf: '12345678900',
      email: 'test@test.com',
      name: 'Test User',
      toJSON: jest.fn().mockReturnValue({
        id: user_id,
        cpf: '12345678900',
        email: 'test@test.com',
        name: 'Test User',
      }),
    };

    (userRepository.findById as jest.Mock).mockResolvedValue(mockUser);

    const mockSession = {
      id: session_id,
      status: SessionStatus.OPEN,
      toJSON: jest.fn().mockReturnValue({
        id: session_id,
        status: SessionStatus.OPEN,
      }),
    };

    (sessionRepository.findById as jest.Mock).mockResolvedValue(mockSession);

    (voteRepository.findBySessionIdAndUserId as jest.Mock).mockResolvedValue(
      [],
    );

    const result = await useCase.execute(input);

    expect(result).toBeDefined();
    expect(result.yes).toBe(yes);
    expect(result.no).toBe(no);
    expect(userRepository.findById).toHaveBeenCalledTimes(1);
    expect(sessionRepository.findById).toHaveBeenCalledTimes(1);
    expect(voteRepository.findBySessionIdAndUserId).toHaveBeenCalledTimes(1);
    expect(voteRepository.insert).toHaveBeenCalledTimes(1);
  });

  it('should throw UserNotFoundError when user is not found', async () => {
    const user_id = 'invalid-user-id';
    const session_id = 'valid-session-id';
    const yes = true;
    const no = false;
    const input = { user_id, session_id, yes, no };

    (userRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute(input)).rejects.toThrow(UserNotFoundError);

    expect(userRepository.findById).toHaveBeenCalledTimes(1);
    expect(sessionRepository.findById).toHaveBeenCalledTimes(0);
    expect(voteRepository.findBySessionIdAndUserId).toHaveBeenCalledTimes(0);
    expect(voteRepository.insert).toHaveBeenCalledTimes(0);
  });
});
