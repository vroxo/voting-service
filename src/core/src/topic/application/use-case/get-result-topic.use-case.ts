import { UseCase } from '@shared/application';
import { LoggerAdapter } from '@shared/domain';
import { TopicNotFoundError, TopicRepository } from '@topic/domain';

export class GetResultTopicUseCase implements UseCase<Input, Output> {
  private logger: LoggerAdapter;
  private topicRepository: TopicRepository;

  constructor(logger: LoggerAdapter, topicRepository: TopicRepository) {
    this.logger = logger;
    this.topicRepository = topicRepository;
  }

  async execute({ id }: Input): Promise<Output> {
    try {
      this.logger.info({
        msg: 'Getting topic results',
        data: { id },
      });

      const votes = { yes: 0, no: 0 };

      const topic = await this.topicRepository.findById(id);

      if (!topic) throw new TopicNotFoundError();

      this.logger.info({
        msg: 'Topic found.',
        data: topic.toJSON(),
      });

      const { sessions } = topic;

      this.logger.info({
        msg: 'Counting topic results.',
      });

      for (const session of sessions) {
        const { votes: session_votes } = session;

        const result = session_votes.reduce(
          (acc, vote) => {
            if (vote.yes) acc.yes++;
            else acc.no++;

            return acc;
          },
          { yes: 0, no: 0 },
        );

        votes.yes += result.yes;
        votes.no += result.no;
      }

      const output = {
        id: topic.id,
        title: topic.title,
        description: topic.description,
        sessions: sessions.length,
        votes,
        created_at: topic.created_at,
      } as Output;

      this.logger.info({
        msg: 'Topic results counted.',
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
type Output = {
  id: string;
  title: string;
  description: string;
  sessions: number;
  votes: { yes: number; no: number };
  created_at: Date;
};
