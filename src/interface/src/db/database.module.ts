import { userSchema } from '@service-template/core/user/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIG),
    TypeOrmModule.forFeature([userSchema]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
