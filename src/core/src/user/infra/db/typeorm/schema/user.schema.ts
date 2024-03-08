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
    cpf: {
      type: 'varchar',
      nullable: false,
      length: 11,
    },
    name: {
      type: 'varchar',
      nullable: false,
      length: 255,
    },
    role: {
      type: 'enum',
      enum: ['ADMIN', 'USER'],
      default: 'USER',
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
});
