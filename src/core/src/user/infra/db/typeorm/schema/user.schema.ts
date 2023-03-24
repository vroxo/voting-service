import { User } from '@user/domain';
import { EntitySchema } from 'typeorm';

export const userSchema = new EntitySchema<User>({
  name: 'users',
  columns: {
    id: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    name: {
      type: 'varchar',
      nullable: false,
      length: 255,
    },
    email: {
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
  },
});
