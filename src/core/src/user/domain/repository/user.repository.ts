import { RepositoryInterface } from '@shared/domain';
import { User } from '../entity/user.entity';

export type UserRepository = RepositoryInterface<User>;
