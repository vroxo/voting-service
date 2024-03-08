import { Entity, UniqueEntityId } from '../../../@shared/domain';
import { UserRole } from '../enum/user-type.enum';

export type UserProperties = {
  cpf: string;
  name: string;
  role?: UserRole;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export class User extends Entity<UserProperties> {
  private constructor(props: UserProperties, id?: UniqueEntityId) {
    super(props, id);

    this.role = props.role;
    this.is_active = props.is_active;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static create(props: UserProperties, id?: UniqueEntityId) {
    return new User(props, id);
  }

  activate() {
    this.props.is_active = true;
    this.updated_at = new Date();
  }

  deactivate() {
    this.props.is_active = false;
    this.updated_at = new Date();
  }

  update(name: string) {
    this.props.name = name;
    this.updated_at = new Date();
  }

  get cpf() {
    return this.props.cpf;
  }

  get name() {
    return this.props.name;
  }

  get role() {
    return this.props.role;
  }

  set role(value: UserRole) {
    this.props.role = value ?? UserRole.USER;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get is_active() {
    return this.props.is_active;
  }

  set created_at(value: Date) {
    this.props.created_at = value ?? new Date();
  }

  get created_at() {
    return this.props.created_at;
  }

  set updated_at(value: Date) {
    this.props.updated_at = value ?? new Date();
  }

  get updated_at() {
    return this.props.updated_at;
  }
}
