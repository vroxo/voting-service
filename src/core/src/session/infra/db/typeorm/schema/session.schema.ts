import { Session } from '@session/domain';
import { EntitySchema } from 'typeorm';

export const sessionSchema = new EntitySchema<Session>({
  name: 'sessions',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    init: {
      type: 'timestamp with time zone',
      nullable: false,
    },
    end: {
      type: 'timestamp with time zone',
      nullable: false,
    },
    created_at: {
      type: 'timestamp with time zone',
      createDate: true,
    },
    updated_at: {
      type: 'timestamp with time zone',
      createDate: true,
    },
  },
  relations: {
    topic: {
      type: 'many-to-one',
      target: 'topics',
      inverseSide: 'sessions',
      joinColumn: {
        name: 'topic_id',
      },
    },
    votes: {
      type: 'one-to-many',
      target: 'votes',
      inverseSide: 'session',
    },
  },
});
