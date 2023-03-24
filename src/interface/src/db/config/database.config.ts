import { DATABASE_PROVIDER } from '../database.provider';

export const DATABASE_CONFIG: any = {
  type: 'postgres',
  url: 'postgres://postgres:postgres@localhost:5432/users-db',
  entities: [...DATABASE_PROVIDER.SCHEMAS],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
};
