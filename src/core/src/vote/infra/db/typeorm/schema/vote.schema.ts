import { Vote } from '@vote/domain';
import { EntitySchema } from 'typeorm';

export const voteSchema = new EntitySchema<Vote>({
  name: 'votes',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    yes: {
      type: 'boolean',
      default: false,
    },
    no: {
      type: 'boolean',
      default: false,
    },
    created_at: {
      type: 'timestamp with time zone',
      createDate: true,
    },
  },
  relations: {
    session: {
      type: 'many-to-one',
      target: 'sessions',
      inverseSide: 'votes',
      joinColumn: {
        name: 'session_id',
      },
    },
    user: {
      type: 'many-to-one',
      target: 'users',
      inverseSide: 'votes',
      joinColumn: {
        name: 'user_id',
      },
    },
  },
});
