import { Auth } from '@auth/domain';
import { EntitySchema } from 'typeorm';

export const authSchema = new EntitySchema<Auth>({
  name: 'credentials',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    username: {
      type: 'varchar',
      nullable: false,
      length: 255,
    },
    password: {
      type: 'varchar',
      nullable: false,
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
    user: {
      type: 'one-to-one',
      target: 'users',
      joinColumn: {
        name: 'user_id',
      },
      cascade: false,
    },
  },
});
