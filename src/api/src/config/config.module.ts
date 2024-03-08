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

type AUTH_CONFIG_TYPE = {
  AUTH_SECRET_KEY: string;
};

export const DB_CONFIG_SCHEMA: Joi.StrictSchemaMap<AUTH_CONFIG_TYPE> = {
  AUTH_SECRET_KEY: Joi.string().required().uuid(),
};

export const AUTH_CONFIG_SCHEMA: Joi.StrictSchemaMap<DB_CONFIG_TYPE> = {
  DB_URL: Joi.string()
    .required()
    .uri({ scheme: ['postgres'] }),
};

export type CONFIG_SCHEMA_TYPE = DB_CONFIG_TYPE & AUTH_CONFIG_TYPE;

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
      validationSchema: Joi.object({
        ...DB_CONFIG_SCHEMA,
        ...AUTH_CONFIG_SCHEMA,
      }),
      ...options,
    });
  }
}
