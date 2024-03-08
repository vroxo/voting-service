import { RepositoryInterface } from '@shared/domain';
import { Session } from '../entity';
import { Topic } from '@topic/domain';

export interface SessionRepository extends RepositoryInterface<Session> {
  findByTopic(topic: Topic): Promise<Session[]>;
}
