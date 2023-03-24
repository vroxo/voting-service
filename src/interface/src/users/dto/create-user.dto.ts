import { CreateUserUseCase } from '@service-template/core/user/application';

export class CreateUserDto implements CreateUserUseCase.Input {
  name: string;
  email?: string;
  is_active?: boolean;
}
