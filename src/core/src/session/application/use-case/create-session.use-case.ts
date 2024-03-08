import {
  Session,
  SessionProperties,
  SessionRepository,
  SessionStatus,
} from '@session/domain';
import { UseCase } from '@shared/application';
import { LoggerAdapter } from '@shared/domain';
import { TopicNotFoundError, TopicRepository } from '@topic/domain';
import { addMinutes } from 'date-fns';

export class CreateSessionUseCase implements UseCase<Input, Output> {
  private logger: LoggerAdapter;
  private sessionRepository: SessionRepository;
  private topicRepository: TopicRepository;

  constructor(
    logger: LoggerAdapter,
    sessionRepository: SessionRepository,
    topicRepository: TopicRepository,
  ) {
    this.logger = logger;
    this.sessionRepository = sessionRepository;
    this.topicRepository = topicRepository;
  }

  async execute({ topic_id, duration }: Input) {
    const init = new Date();

    this.logger.info({
      msg: 'Creating session',
      data: { topic_id, init, duration },
    });
    const topic = await this.topicRepository.findById(topic_id);

    if (!topic) {
      throw new TopicNotFoundError();
    }

    this.logger.info({ msg: 'Topic found', data: topic.toJSON() });

    const end = addMinutes(init, duration ?? 1);

    const session = Session.create({
      init,
      end,
      topic,
    });

    await this.sessionRepository.insert(session);

    const output = session.toJSON();

    this.logger.info({ msg: 'Session created', data: output });

    return { ...output, status: session.status };
  }
}
type Input = {
  topic_id: string;
  duration: number;
};

type Output = { id: string } & SessionProperties & { status: SessionStatus };
