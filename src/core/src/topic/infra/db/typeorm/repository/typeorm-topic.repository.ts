import { UniqueEntityId } from '@shared/domain';
import { Topic, TopicRepository } from '@topic/domain';
import {
  DataSource,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { topicSchema } from '../schema';

export class TypeormTopicRepository implements TopicRepository {
  private typeOrmRepository: Repository<Topic>;

  constructor(private readonly datasource: DataSource) {
    this.typeOrmRepository = this.datasource.getRepository<Topic>(topicSchema);
  }

  async insert(entity: Topic): Promise<void> {
    const topic = this.typeOrmRepository.create(entity);
    await this.typeOrmRepository.save(topic);
  }

  async findAll(): Promise<Topic[]> {
    return await this.typeOrmRepository.find({
      where: { is_active: true },
    });
  }

  async findById(id: string | UniqueEntityId): Promise<Topic> {
    let options: FindOneOptions<Topic> = {
      where: { id: id as string, is_active: true },
      relations: ['sessions', 'sessions.votes'],
    };

    if (id instanceof UniqueEntityId)
      options = {
        where: { id: id.toString() },
        relations: ['sessions', 'sessions.votes'],
      };

    console.log({ options });
    const topic = await this.typeOrmRepository.findOne(options);
    console.log({ topic });

    if (topic) {
      return Topic.create(topic, new UniqueEntityId(topic.id as string));
    }
  }

  async update(entity: Topic): Promise<void> {
    await this.typeOrmRepository.save(entity.toJSON());
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    let options: FindOptionsWhere<Topic> = { id: id as string };

    if (id instanceof UniqueEntityId) options = { id: id.toString() };

    await this.typeOrmRepository.delete(options);
  }
}
