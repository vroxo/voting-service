import {
  SessionClosedError,
  SessionNotFoundError,
  SessionRepository,
  SessionStatus,
} from '@session/domain';
import { UseCase } from '@shared/application';
import { LoggerAdapter } from '@shared/domain';
import { UserNotFoundError, UserRepository } from '@user/domain';
import {
  Vote,
  VoteAlreadyExistsError,
  VoteProperties,
  VoteRepository,
} from '@vote/domain';

export class CreateVoteUseCase implements UseCase<Input, Output> {
  private logger: LoggerAdapter;
  private voteRepository: VoteRepository;
  private userRepository: UserRepository;
  private sessionRepository: SessionRepository;

  constructor(
    logger: LoggerAdapter,
    voteRepository: VoteRepository,
    userRepository: UserRepository,
    sessionRepository: SessionRepository,
  ) {
    this.logger = logger;
    this.voteRepository = voteRepository;
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
  }

  async execute({ user_id, session_id, yes, no }: Input): Promise<Output> {
    try {
      this.logger.info({
        msg: 'Creating a new vote',
        data: { user_id, session_id, yes, no },
      });

      this.logger.info({ msg: 'Finding user', data: { user_id } });
      const user = await this.userRepository.findById(user_id);
      if (!user) throw new UserNotFoundError();
      this.logger.info({ msg: 'User found', data: user.toJSON() });

      this.logger.info({ msg: 'Finding session', data: { session_id } });
      const session = await this.sessionRepository.findById(session_id);
      if (!session) throw new SessionNotFoundError();
      this.logger.info({ msg: 'Session found', data: session.toJSON() });

      this.logger.info({
        msg: 'Checking if session is closed',
        data: { status: session.status },
      });
      if (session.status === SessionStatus.CLOSED)
        throw new SessionClosedError();

      this.logger.info({ msg: 'Checking if user already voted' });
      const existsVotesFromUserInSession =
        await this.voteRepository.findBySessionIdAndUserId({
          session_id,
          user_id,
        });

      if (existsVotesFromUserInSession.length)
        throw new VoteAlreadyExistsError();

      const vote = Vote.create({ yes, no, session, user });

      await this.voteRepository.insert(vote);

      const output = vote.toJSON();

      this.logger.info({ msg: 'Vote created', data: output });

      return output;
    } catch (error: any) {
      this.logger.error(error);
      throw error;
    }
  }
}

type Input = {
  user_id: string;
  session_id: string;
  yes?: boolean;
  no?: boolean;
};

type Output = { id: string } & VoteProperties;
