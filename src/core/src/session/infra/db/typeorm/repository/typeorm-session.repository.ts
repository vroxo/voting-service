import { Session, SessionRepository } from '@session/domain';
import { UniqueEntityId } from '@shared/domain';
import {
  DataSource,
  FindOneOptions,
  FindOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { sessionSchema } from '../schema';
import { Topic } from '@topic/domain';

export class TypeORMSessionRepository implements SessionRepository {
  private typeOrmRepository: Repository<Session>;

  constructor(private readonly datasource: DataSource) {
    this.typeOrmRepository =
      this.datasource.getRepository<Session>(sessionSchema);
  }

  async findByTopic(topic: Topic): Promise<Session[]> {
    const sessions = await this.typeOrmRepository.find({ where: { topic } });
    const entities: Session[] = [];

    sessions.forEach((session) => {
      entities.push(Session.create(session, new UniqueEntityId(session.id)));
    });

    return entities;
  }

  async insert(entity: Session): Promise<void> {
    const session = this.typeOrmRepository.create(entity);
    await this.typeOrmRepository.save(session);
  }

  async findAll(): Promise<Session[]> {
    return await this.typeOrmRepository.find();
  }

  async findById(id: string | UniqueEntityId): Promise<Session> {
    let options: FindOneOptions<Session> = { where: { id: id as string } };

    if (id instanceof UniqueEntityId)
      options = { where: { id: id.toString() } };

    const session = await this.typeOrmRepository.findOne(options);

    if (session) {
      return Session.create(session, new UniqueEntityId(session.id as string));
    }
  }

  async update(entity: Session): Promise<void> {
    await this.typeOrmRepository.save(entity.toJSON());
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    let options: FindOptionsWhere<Session> = { id: id as string };

    if (id instanceof UniqueEntityId) options = { id: id.toString() };

    await this.typeOrmRepository.delete(options);
  }
}
