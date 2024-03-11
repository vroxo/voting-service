import { TopicRepository } from '@topic/domain';
import { LoggerAdapter } from '@shared/domain';
import { TopicNotFoundError } from '@topic/domain';
import { GetTopicUseCase } from './get-topic.use-case';

describe('GetTopicUseCase', () => {
  let useCase: GetTopicUseCase;
  let logger: LoggerAdapter;
  let topicRepository: TopicRepository;

  beforeEach(() => {
    logger = {
      info: jest.fn(),
      error: jest.fn(),
    } as unknown as LoggerAdapter;

    topicRepository = {
      findById: jest.fn(),
    } as unknown as TopicRepository;

    useCase = new GetTopicUseCase(logger, topicRepository);
  });

  it('should get a topic for a valid id', async () => {
    const id = 'valid-topic-id';

    const mockTopic = {
      id,
      title: 'Valid Topic',
      description: 'Valid Description',
      created_at: new Date(),
      toJSON: jest.fn().mockReturnValue({
        id,
        title: 'Valid Topic',
        description: 'Valid Description',
        created_at: new Date(),
      }),
    };

    (topicRepository.findById as jest.Mock).mockResolvedValue(mockTopic);

    const result = await useCase.execute({ id });

    expect(result).toBeDefined();
    expect(result.title).toBe('Valid Topic');
    expect(result.description).toBe('Valid Description');
    expect(topicRepository.findById).toHaveBeenCalledTimes(1);
  });

  it('should throw TopicNotFoundError when topic is not found', async () => {
    const id = 'invalid-topic-id';

    (topicRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute({ id })).rejects.toThrow(TopicNotFoundError);

    expect(topicRepository.findById).toHaveBeenCalledTimes(1);
  });
});
