import { DATABASE_PROVIDER } from '../database.provider';
import dotenv from 'dotenv';

const path = `${process.cwd()}/envs/.env`;
dotenv.config({ path });

export const DATABASE_CONFIG: any = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [...DATABASE_PROVIDER.SCHEMAS],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  synchronize: false,
};
