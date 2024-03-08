import { Entity, UniqueEntityId } from '@shared/domain';
import { Topic } from '@topic/domain';
import { SessionStatus } from '../enum/session.enum';
import { Vote } from '@vote/domain';

export type SessionProperties = {
  init: Date;
  end: Date;
  topic?: Topic;
  votes?: Vote[];
  created_at?: Date;
  updated_at?: Date;
};

export class Session extends Entity<SessionProperties> {
  private constructor(props: SessionProperties, id?: UniqueEntityId) {
    super(props, id);

    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static create(props: SessionProperties, id?: UniqueEntityId): Session {
    return new Session(props, id);
  }

  get init(): Date {
    return this.props.init;
  }

  get end(): Date {
    return this.props.end;
  }

  get topic(): Topic {
    return this.props.topic;
  }

  get votes(): Vote[] {
    return this.props.votes;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  set created_at(value: Date) {
    this.props.created_at = value ?? new Date();
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  set updated_at(value: Date) {
    this.props.updated_at = value ?? new Date();
  }

  get status(): SessionStatus {
    console.log('status');
    console.log(this.end);
    const now = new Date();

    if (now > this.end) {
      return SessionStatus.CLOSED;
    }
    return SessionStatus.OPEN;
  }
}
