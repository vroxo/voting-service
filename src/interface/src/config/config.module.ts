import { DynamicModule, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  ConfigModuleOptions,
} from '@nestjs/config';
import * as Joi from 'joi';
import { join } from 'path';

type DB_CONFIG_TYPE = {
  DB_URL: string;
};

export const DB_CONFIG_SCHEMA: Joi.StrictSchemaMap<DB_CONFIG_TYPE> = {
  DB_URL: Joi.string()
    .required()
    .uri({ scheme: ['postgres'] }),
};

export type CONFIG_SCHEMA_TYPE = DB_CONFIG_TYPE;

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    const { envFilePath } = options;

    return super.forRoot({
      isGlobal: true,
      envFilePath: [
        ...(Array.isArray(envFilePath) ? envFilePath : [envFilePath]),
        join(__dirname, `../../envs/.env.${process.env.NODE_ENV}`),
        join(__dirname, '../../envs/.env'),
      ],
      validationSchema: Joi.object({ ...DB_CONFIG_SCHEMA }),
      ...options,
    });
  }
}
