import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinoLoggerAdapter } from '@voting-service/core/@shared/infra';
import { topicSchema } from '@voting-service/core/topic/infra';
import { TOPIC_PROVIDERS } from './topics.provider';
import { TopicController } from './topics.controller';
import { SessionsModule } from 'src/sessions/sessions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([topicSchema]),
    forwardRef(() => SessionsModule),
  ],
  controllers: [TopicController],
  providers: [
    PinoLoggerAdapter,
    ...Object.values(TOPIC_PROVIDERS.USE_CASES),
    ...Object.values(TOPIC_PROVIDERS.REPOSITORIES),
  ],
  exports: [...Object.values(TOPIC_PROVIDERS.REPOSITORIES)],
})
export class TopicModule {}
