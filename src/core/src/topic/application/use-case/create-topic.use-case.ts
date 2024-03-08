import { UseCase } from '@shared/application';
import { LoggerAdapter } from '@shared/domain';
import { Topic, TopicProperties, TopicRepository } from '@topic/domain';

export class CreateTopicUseCase implements UseCase<Input, Output> {
  private logger: LoggerAdapter;
  private topicRepository: TopicRepository;

  constructor(logger: LoggerAdapter, topicRepository: TopicRepository) {
    this.logger = logger;
    this.topicRepository = topicRepository;
  }

  async execute({ title, description }: Input): Promise<Output> {
    try {
      this.logger.info({
        msg: 'Creating a new topic',
        data: { title, description },
      });

      const topic = Topic.create({ title, description });

      await this.topicRepository.insert(topic);

      const output = topic.toJSON();

      this.logger.info({
        msg: 'Topic created',
        data: output,
      });

      return output;
    } catch (error: any) {
      this.logger.error(error);
      throw error;
    }
  }
}

type Input = { title: string; description: string };
type Output = { id: string } & TopicProperties;
