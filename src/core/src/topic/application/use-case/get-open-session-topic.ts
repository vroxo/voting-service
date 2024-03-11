import {
  Session,
  SessionOpenNotFoundError,
  SessionProperties,
  SessionStatus,
} from '@session/domain';
import { UseCase } from '@shared/application';
import { LoggerAdapter, UniqueEntityId } from '@shared/domain';
import { TopicNotFoundError, TopicRepository } from '@topic/domain';

export class GetOpenSessionTopicUseCase implements UseCase<Input, Output> {
  private logger: LoggerAdapter;
  private topicRepository: TopicRepository;

  constructor(logger: LoggerAdapter, topicRepository: TopicRepository) {
    this.logger = logger;
    this.topicRepository = topicRepository;
  }

  async execute({ topic_id }: Input): Promise<Output | undefined> {
    this.logger.info({
      msg: 'Getting open session from topic.',
      data: { topic_id },
    });

    const topic = await this.topicRepository.findById(topic_id);

    if (!topic) {
      throw new TopicNotFoundError();
    }

    const sessions: Session[] = [];

    topic.sessions.forEach((session) => {
      const entity = Session.create(session, new UniqueEntityId(session.id));
      sessions.push(entity);
    });

    const openSession = sessions.find(
      (session) => session.status === SessionStatus.OPEN,
    );

    if (!openSession) {
      throw new SessionOpenNotFoundError();
    }

    const output = { ...openSession.toJSON(), status: openSession.status };

    this.logger.info({
      msg: 'Open session found.',
      data: output,
    });

    return output;
  }
}

export type Input = { topic_id: string };

export type Output = { id: string } & SessionProperties & {
    status: SessionStatus;
  };
