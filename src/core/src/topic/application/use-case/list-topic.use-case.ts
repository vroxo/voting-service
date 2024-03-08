import { UseCase } from '@shared/application';
import { LoggerAdapter } from '@shared/domain';
import { Topic, TopicRepository } from '@topic/domain';

export class ListTopicUseCase implements UseCase<undefined, Output> {
  private logger: LoggerAdapter;
  private topicRepository: TopicRepository;

  constructor(logger: LoggerAdapter, topicRepository: TopicRepository) {
    this.logger = logger;
    this.topicRepository = topicRepository;
  }

  async execute(): Promise<Output> {
    try {
      this.logger.info({ msg: 'List topics.' });

      const topics = await this.topicRepository.findAll();

      this.logger.info({
        msg: 'Topics found.',
        data: topics,
      });

      return topics;
    } catch (error: any) {
      this.logger.error(error);
      throw error;
    }
  }
}

type Output = Topic[];
