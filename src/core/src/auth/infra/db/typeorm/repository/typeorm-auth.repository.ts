import { Auth, AuthRepository } from '@auth/domain';
import { UniqueEntityId } from '@shared/domain';
import {
  DataSource,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { authSchema } from '../schema';

export class TypeORMAuthRepository implements AuthRepository {
  private typeOrmRepository: Repository<Auth>;

  constructor(private readonly dataSource: DataSource) {
    this.typeOrmRepository = this.dataSource.getRepository<Auth>(authSchema);
  }

  async findByUsername(username: string): Promise<Auth> {
    const options: FindOneOptions<Auth> = {
      where: { username, is_active: true },
      relations: ['user'],
    };

    const auth = await this.typeOrmRepository.findOne(options);

    if (auth) {
      return Auth.create(auth, new UniqueEntityId(auth.id as string));
    }
  }

  async insert(entity: Auth): Promise<void> {
    const auth = this.typeOrmRepository.create(entity);
    await this.typeOrmRepository.save(auth);
  }

  async findAll(): Promise<Auth[]> {
    return await this.typeOrmRepository.find();
  }

  async findById(id: string | UniqueEntityId): Promise<Auth> {
    let options: FindOneOptions<Auth> = { where: { id: id as string } };

    if (id instanceof UniqueEntityId)
      options = { where: { id: id.toString() } };

    const auth = await this.typeOrmRepository.findOne(options);

    if (auth) {
      return Auth.create(auth, new UniqueEntityId(auth.id as string));
    }
  }

  async update(entity: Auth): Promise<void> {
    await this.typeOrmRepository.save(entity.toJSON());
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    let options: FindOptionsWhere<Auth> = { id: id as string };

    if (id instanceof UniqueEntityId) options = { id: id.toString() };

    await this.typeOrmRepository.delete(options);
  }
}
