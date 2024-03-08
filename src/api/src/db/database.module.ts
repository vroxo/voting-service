import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { CONFIG_SCHEMA_TYPE } from 'src/config/config.module';
import { DATABASE_PROVIDER } from './database.provider';
import { SeedService } from './config/seed/seed.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService<CONFIG_SCHEMA_TYPE>) => {
        return {
          type: 'postgres',
          url: config.get<CONFIG_SCHEMA_TYPE['DB_URL']>('DB_URL'),
          entities: [...DATABASE_PROVIDER.SCHEMAS],
          migrations: [__dirname + '/config/migrations/**/*{.ts,.js}'],
          synchronize: false,
          logging: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [SeedService],
  exports: [TypeOrmModule, SeedService],
})
export class DatabaseModule {}
