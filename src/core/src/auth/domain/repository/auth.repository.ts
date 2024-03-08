import { RepositoryInterface } from '@shared/domain';
import { Auth } from '../entity';

export interface AuthRepository extends RepositoryInterface<Auth> {
  findByUsername(username: string): Promise<Auth | undefined>;
}
