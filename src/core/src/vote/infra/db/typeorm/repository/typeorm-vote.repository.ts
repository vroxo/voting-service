import { UniqueEntityId } from '@shared/domain';
import { Vote } from '@vote/domain';
import {
  FindBySessionIdAndUserIdOptions,
  VoteRepository,
} from '@vote/domain/repository/vote.repository';
import {
  DataSource,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { voteSchema } from '../schema';

export class TypeORMVoteRepository implements VoteRepository {
  private typeOrmRepository: Repository<Vote>;

  constructor(private readonly datasource: DataSource) {
    this.typeOrmRepository = this.datasource.getRepository<Vote>(voteSchema);
  }

  async findBySessionIdAndUserId({
    session_id,
    user_id,
  }: FindBySessionIdAndUserIdOptions): Promise<Vote[]> {
    return await this.typeOrmRepository.find({
      where: { session: { id: session_id }, user: { id: user_id } },
    });
  }

  async insert(entity: Vote): Promise<void> {
    const vote = this.typeOrmRepository.create(entity);
    await this.typeOrmRepository.save(vote);
  }

  async findAll(): Promise<Vote[]> {
    return await this.typeOrmRepository.find();
  }

  async findById(id: string | UniqueEntityId): Promise<Vote> {
    let options: FindOneOptions<Vote> = { where: { id: id as string } };

    if (id instanceof UniqueEntityId)
      options = { where: { id: id.toString() } };

    const vote = await this.typeOrmRepository.findOne(options);

    if (vote) {
      return Vote.create(vote, new UniqueEntityId(vote.id as string));
    }
  }

  async update(entity: Vote): Promise<void> {
    await this.typeOrmRepository.save(entity.toJSON());
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    let options: FindOptionsWhere<Vote> = { id: id as string };

    if (id instanceof UniqueEntityId) options = { id: id.toString() };

    await this.typeOrmRepository.delete(options);
  }
}
