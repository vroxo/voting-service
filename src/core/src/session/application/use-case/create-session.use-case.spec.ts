import { SessionRepository } from '@session/domain';
import { TopicRepository } from '@topic/domain';
import { LoggerAdapter } from '@shared/domain';
import { TopicNotFoundError } from '@topic/domain';
import { CreateSessionUseCase } from './create-session.use-case';

describe('CreateSessionUseCase', () => {
  let useCase: CreateSessionUseCase;
  let mockLogger: LoggerAdapter;
  let mockSessionRepository: SessionRepository;
  let mockTopicRepository: TopicRepository;

  beforeEach(() => {
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
    } as unknown as LoggerAdapter;

    mockSessionRepository = {
      insert: jest.fn(),
    } as unknown as SessionRepository;

    mockTopicRepository = {
      findById: jest.fn(),
    } as unknown as TopicRepository;

    useCase = new CreateSessionUseCase(
      mockLogger,
      mockSessionRepository,
      mockTopicRepository,
    );
  });

  it('should create a session for a valid topic', async () => {
    const topic_id = 'valid-topic-id';
    const duration = 60;

    const mockTopic = {
      toJSON: jest.fn().mockReturnValue({
        id: topic_id,
        name: 'Valid Topic',
      }),
    };

    (mockTopicRepository.findById as jest.Mock).mockResolvedValue(mockTopic);

    const result = await useCase.execute({ topic_id, duration });

    expect(result).toBeDefined();
    expect(result.status).toBe('OPEN');
    expect(mockSessionRepository.insert).toHaveBeenCalledTimes(1);
    expect(mockLogger.info).toHaveBeenCalledTimes(3);
  });

  it('should throw TopicNotFoundError when topic is not found', async () => {
    const topic_id = 'invalid-topic-id';
    const duration = 60;

    (mockTopicRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute({ topic_id, duration })).rejects.toThrow(
      TopicNotFoundError,
    );

    expect(mockSessionRepository.insert).toHaveBeenCalledTimes(0);
    expect(mockLogger.info).toHaveBeenCalledTimes(1);
  });
});
