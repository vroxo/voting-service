import { ClassValidatorFields } from '../../../@shared/domain/validators/class-validator-fields';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserProperties } from '../entities/user';

export class UserRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @IsDate()
  @IsOptional()
  created_at: Date;

  constructor({ name, email, is_active, created_at }: UserProperties) {
    Object.assign(this, { name, email, is_active, created_at });
  }
}

export class UserValidator extends ClassValidatorFields<UserRules> {
  validate(data: UserProperties): boolean {
    return super.validate(new UserRules(data ?? ({} as any)));
  }
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}
