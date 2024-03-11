import { TopicRepository } from '@topic/domain';
import { LoggerAdapter } from '@shared/domain';
import { CreateTopicUseCase } from './create-topic.use-case';

describe('CreateTopicUseCase', () => {
  let useCase: CreateTopicUseCase;
  let mockLogger: LoggerAdapter;
  let mockTopicRepository: TopicRepository;

  beforeEach(() => {
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
    } as unknown as LoggerAdapter;

    mockTopicRepository = {
      insert: jest.fn(),
    } as unknown as TopicRepository;

    useCase = new CreateTopicUseCase(mockLogger, mockTopicRepository);
  });

  it('should create a topic successfully', async () => {
    const title = 'Test Title';
    const description = 'Test Description';

    const result = await useCase.execute({ title, description });

    expect(result).toBeDefined();
    expect(result.title).toBe(title);
    expect(result.description).toBe(description);
    expect(mockTopicRepository.insert).toHaveBeenCalledTimes(1);
    expect(mockLogger.info).toHaveBeenCalledTimes(2);
  });

  it('should throw an error when topic creation fails', async () => {
    const title = 'Test Title';
    const description = 'Test Description';

    (mockTopicRepository.insert as jest.Mock).mockImplementation(() => {
      throw new Error('Insertion Error');
    });

    await expect(useCase.execute({ title, description })).rejects.toThrow(
      'Insertion Error',
    );

    expect(mockTopicRepository.insert).toHaveBeenCalledTimes(1);
    expect(mockLogger.error).toHaveBeenCalledTimes(1);
  });
});
