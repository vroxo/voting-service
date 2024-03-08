import { topicSchema } from '@voting-service/core/topic/infra';
import { sessionSchema } from '@voting-service/core/session/infra';
import { userSchema } from '@voting-service/core/user/infra';
import { voteSchema } from '@voting-service/core/vote/infra';
import { authSchema } from '@voting-service/core/auth/infra';

export namespace DATABASE_PROVIDER {
  export const SCHEMAS = [
    topicSchema,
    sessionSchema,
    userSchema,
    voteSchema,
    authSchema,
  ];
}
