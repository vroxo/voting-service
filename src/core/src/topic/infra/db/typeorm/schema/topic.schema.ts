import { Topic } from '@topic/domain';
import { EntitySchema } from 'typeorm';

export const topicSchema = new EntitySchema<Topic>({
  name: 'topics',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    title: {
      type: 'varchar',
      nullable: false,
      length: 255,
    },
    description: {
      type: 'varchar',
      length: 255,
    },
    is_active: {
      type: 'boolean',
      default: true,
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
    sessions: {
      type: 'one-to-many',
      target: 'sessions',
      inverseSide: 'topic',
    },
  },
});
