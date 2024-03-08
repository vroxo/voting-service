import { DataSource } from 'typeorm';
import { DATABASE_CONFIG } from './database.config';

export const DATA_SOURCE: DataSource = new DataSource(DATABASE_CONFIG);
