import {
  Entity,
  EntityValidationError,
  UniqueEntityId,
} from '../../../@shared/domain';
import { UserValidatorFactory } from '../validators/user.validator';

export type UserProperties = {
  name: string;
  email?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class User extends Entity<UserProperties> {
  constructor(public readonly props: UserProperties, id?: UniqueEntityId) {
    User.validate(props);

    super(props, id);
    this.props.name = props.name;
    this.email = props.email;
    this.is_active = props.is_active;
    this.created_at = props.created_at;
  }

  static validate(props: UserProperties) {
    const validator = UserValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) throw new EntityValidationError(validator.errors);
  }

  activate() {
    this.props.is_active = true;
  }

  deactivate() {
    this.props.is_active = false;
  }

  update(name: string, email: string) {
    User.validate({ name, email });

    this.props.name = name;
    this.email = email;
  }

  get name() {
    return this.props.name;
  }

  private set email(value: string) {
    this.props.email = value ?? null;
  }

  get email() {
    return this.props.email;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set created_at(value: Date) {
    this.props.created_at = value ?? new Date();
  }

  get created_at() {
    return this.props.created_at;
  }
}
