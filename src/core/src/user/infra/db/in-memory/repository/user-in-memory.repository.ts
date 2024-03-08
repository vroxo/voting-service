import { InMemoryRepository } from '@shared/domain';
import { User } from '@user/domain/entity/user.entity';
import { UserRepository } from '@user/domain/repository/user.repository';

export class UserInMemoryRepository
  extends InMemoryRepository<User>
  implements UserRepository {}
