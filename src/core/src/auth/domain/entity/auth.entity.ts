import { Entity, UniqueEntityId } from '@shared/domain';
import { User } from '@user/domain';

export type AuthProperties = {
  username: string;
  password: string;
  user?: User;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export class Auth extends Entity<AuthProperties> {
  private constructor(props: AuthProperties, id?: UniqueEntityId) {
    super(props, id);

    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static create(props: AuthProperties, id?: UniqueEntityId): Auth {
    return new Auth(props, id);
  }

  get username() {
    return this.props.username;
  }

  get password() {
    return this.props.password;
  }

  get user() {
    return this.props.user;
  }

  get is_active() {
    return this.props.is_active;
  }

  set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }

  set created_at(value: Date) {
    this.props.created_at = value ?? new Date();
  }

  get updated_at() {
    return this.props.updated_at;
  }

  set updated_at(value: Date) {
    this.props.updated_at = value ?? new Date();
  }
}
