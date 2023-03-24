import { userSchema } from '@service-template/core/user/infra';

export namespace DATABASE_PROVIDER {
  export const SCHEMAS = [userSchema];
}
