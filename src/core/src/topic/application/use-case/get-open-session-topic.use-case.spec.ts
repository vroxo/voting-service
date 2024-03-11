import { TopicRepository } from '@topic/domain';
import { LoggerAdapter } from '@shared/domain';
import { SessionOpenNotFoundError, SessionStatus } from '@session/domain';
import { TopicNotFoundError } from '@topic/domain';
import { GetOpenSessionTopicUseCase } from './get-open-session-topic';

describe('GetOpenSessionTopicUseCase', () => {
  let useCase: GetOpenSessionTopicUseCase;
  let mockLogger: LoggerAdapter;
  let mockTopicRepository: TopicRepository;

  beforeEach(() => {
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
    } as unknown as LoggerAdapter;

    mockTopicRepository = {
      findById: jest.fn(),
    } as unknown as TopicRepository;

    useCase = new GetOpenSessionTopicUseCase(mockLogger, mockTopicRepository);
  });

  it('should get an open session for a valid topic', async () => {
    const topic_id = 'a071d5c9-a94a-473f-87d6-b4ca8a01b692';

    (mockTopicRepository.findById as jest.Mock).mockResolvedValue({
      id: topic_id,
      name: 'topic-name',
      sessions: [
        {
          id: 'a071d5c9-a94a-473f-87d6-b4ca8a01b692',
          status: SessionStatus.OPEN,
        },
      ],
    });

    const result = await useCase.execute({ topic_id });

    expect(result).toBeDefined();
    expect(result.status).toBe(SessionStatus.OPEN);
    expect(mockTopicRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockLogger.info).toHaveBeenCalledTimes(2);
  });

  it('should throw TopicNotFoundError when topic is not found', async () => {
    const topic_id = 'a071d5c9-a94a-473f-87d6-b4ca8a01b692';

    (mockTopicRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute({ topic_id })).rejects.toThrow(
      TopicNotFoundError,
    );

    expect(mockTopicRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockLogger.info).toHaveBeenCalledTimes(1);
  });

  it('should throw SessionOpenNotFoundError when there is no open session', async () => {
    const topic_id = 'a071d5c9-a94a-473f-87d6-b4ca8a01b692';

    const testDate = new Date('2021-01-01T00:00:00Z');

    (mockTopicRepository.findById as jest.Mock).mockResolvedValue({
      id: topic_id,
      name: 'Valid Topic',
      sessions: [
        {
          id: 'a071d5c9-a94a-473f-87d6-b4ca8a01b692',
          init: testDate,
          end: testDate,
        },
      ],
    });

    await expect(useCase.execute({ topic_id })).rejects.toThrow(
      SessionOpenNotFoundError,
    );

    expect(mockTopicRepository.findById).toHaveBeenCalledTimes(1);
    expect(mockLogger.info).toHaveBeenCalledTimes(1);
  });
});
