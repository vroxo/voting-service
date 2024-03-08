import { UseCase } from '@shared/application';
import { LoggerAdapter } from '@shared/domain';
import {
  TopicNotFoundError,
  TopicProperties,
  TopicRepository,
} from '@topic/domain';

export class GetTopicUseCase implements UseCase<Input, Output> {
  private logger: LoggerAdapter;
  private topicRepository: TopicRepository;

  constructor(logger: LoggerAdapter, topicRepository: TopicRepository) {
    this.logger = logger;
    this.topicRepository = topicRepository;
  }

  async execute({ id }: Input): Promise<Output> {
    try {
      this.logger.info({ msg: 'Get topic.', data: { id } });

      const topic = await this.topicRepository.findById(id);

      if (!topic) throw new TopicNotFoundError();

      const output = topic.toJSON();

      this.logger.info({
        msg: 'Topic found.',
        data: output,
      });

      return output;
    } catch (error: any) {
      this.logger.error(error);
      throw error;
    }
  }
}

type Input = { id: string };
type Output = { id: string } & TopicProperties;
