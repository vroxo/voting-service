import { RepositoryInterface, UniqueEntityId } from '@shared/domain';
import { User } from '@user/domain';
import {
  DataSource,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { userSchema } from '../schema/user.schema';

export class UserTypeORMRepository implements RepositoryInterface<User> {
  private typeOrmRepository: Repository<User>;

  constructor(private readonly datasource: DataSource) {
    this.typeOrmRepository = this.datasource.getRepository<User>(userSchema);
  }

  async insert(entity: User): Promise<void> {
    const user = this.typeOrmRepository.create(entity);
    await this.typeOrmRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.typeOrmRepository.find();
  }

  async findById(id: string | UniqueEntityId): Promise<User> {
    let options: FindOneOptions<User> = { where: { id: id as string } };

    if (id instanceof UniqueEntityId)
      options = { where: { id: id.toString() } };

    const user = await this.typeOrmRepository.findOne(options);

    if (user) {
      return User.create(user, new UniqueEntityId(user.id as string));
    }
  }

  async update(entity: User): Promise<void> {
    await this.typeOrmRepository.save(entity);
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    let options: FindOptionsWhere<User> = { id: id as string };

    if (id instanceof UniqueEntityId) options = { id: id.toString() };

    this.typeOrmRepository.delete(options);
  }
}
