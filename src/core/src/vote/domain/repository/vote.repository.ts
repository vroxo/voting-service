import { RepositoryInterface } from '@shared/domain';
import { Vote } from '../entity';

export type FindBySessionIdAndUserIdOptions = {
  session_id: string;
  user_id: string;
};

export interface VoteRepository extends RepositoryInterface<Vote> {
  findBySessionIdAndUserId(
    options: FindBySessionIdAndUserIdOptions,
  ): Promise<Vote[]>;
}
