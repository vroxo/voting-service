import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { CONFIG_SCHEMA_TYPE } from 'src/config/config.module';
import { DATABASE_PROVIDER } from './database.provider';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService<CONFIG_SCHEMA_TYPE>) => {
        return {
          type: 'postgres',
          url: config.get<CONFIG_SCHEMA_TYPE['DB_URL']>('DB_URL'),
          entities: [...DATABASE_PROVIDER.SCHEMAS],
          migrations: [__dirname + '/config/migrations/**/*{.ts,.js}'],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
