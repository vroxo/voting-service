import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLoggerAdapter } from '@voting-service/core/@shared/infra';
import { sessionSchema } from '@voting-service/core/session/infra';
import { TopicModule } from 'src/topics/topics.module';
import { SESSION_PROVIDERS } from './sessions.provider';
import { SessionsController } from './sessions.controller';

@Module({
  controllers: [SessionsController],
  providers: [
    PinoLoggerAdapter,
    ...Object.values(SESSION_PROVIDERS.USE_CASES),
    ...Object.values(SESSION_PROVIDERS.REPOSITORIES),
  ],
  imports: [
    TypeOrmModule.forFeature([sessionSchema]),
    forwardRef(() => TopicModule),
  ],
  exports: [...Object.values(SESSION_PROVIDERS.REPOSITORIES)],
})
export class SessionsModule {}
