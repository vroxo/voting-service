import { IsCPF } from '@voting-service/core/@shared/infra';
import { UserRole } from '@voting-service/core/user/domain';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

export class CreateUserDto {
  @IsCPF({ message: 'Invalid CPF' })
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => CreateAuthDto)
  credentials: CreateAuthDto;
}
