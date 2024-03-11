import { TopicRepository } from '@topic/domain';
import { LoggerAdapter } from '@shared/domain';
import { ListTopicUseCase } from './list-topic.use-case';

describe('ListTopicUseCase', () => {
  let useCase: ListTopicUseCase;
  let logger: LoggerAdapter;
  let topicRepository: TopicRepository;

  beforeEach(() => {
    logger = {
      info: jest.fn(),
      error: jest.fn(),
    } as unknown as LoggerAdapter;

    topicRepository = {
      findAll: jest.fn(),
    } as unknown as TopicRepository;

    useCase = new ListTopicUseCase(logger, topicRepository);
  });

  it('should list all topics', async () => {
    const topics = [
      { id: 'topic-id-1', title: 'Topic 1', description: 'Description 1' },
      { id: 'topic-id-2', title: 'Topic 2', description: 'Description 2' },
    ];

    (topicRepository.findAll as jest.Mock).mockResolvedValue(topics);

    const result = await useCase.execute();

    expect(result).toEqual(topics);
    expect(topicRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when listing topics fails', async () => {
    (topicRepository.findAll as jest.Mock).mockImplementation(() => {
      throw new Error('FindAll Error');
    });

    await expect(useCase.execute()).rejects.toThrow('FindAll Error');

    expect(topicRepository.findAll).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledTimes(1);
  });
});
