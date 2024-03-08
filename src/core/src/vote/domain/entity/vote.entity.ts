import { Session } from '@session/domain';
import { Entity, UniqueEntityId } from '@shared/domain';
import { NonPositiveVoteError } from '../error/non-positive-vote.error';
import { User } from '@user/domain';

export type VoteProperties = {
  yes?: boolean;
  no?: boolean;
  session?: Session;
  user?: User;
  created_at?: Date;
};

export class Vote extends Entity<VoteProperties> {
  private constructor(props: VoteProperties, id?: UniqueEntityId) {
    super(props, id);

    this.apply_vote({ yes: props.yes, no: props.no });
    this.created_at = props.created_at;
  }

  static create(props: VoteProperties, id?: UniqueEntityId): Vote {
    return new Vote(props, id);
  }

  private apply_vote({ yes, no }: { yes?: boolean; no?: boolean }) {
    if (!yes && !no) throw new NonPositiveVoteError();

    if (yes) {
      this.props.yes = yes;
      this.props.no = !yes;
    } else {
      this.props.no = no;
      this.props.yes = !no;
    }
  }

  get yes(): boolean {
    return this.props.yes;
  }

  get no(): boolean {
    return this.props.no;
  }

  get session(): Session {
    return this.props.session;
  }

  get user(): User {
    return this.props.user;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  set created_at(created_at: Date) {
    this.props.created_at = created_at ?? new Date();
  }
}
