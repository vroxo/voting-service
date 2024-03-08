import { Auth, AuthRepository } from '@auth/domain';
import { CreateUserUseCase } from '@user/application';
import { User, UserRepository, UserRole } from '@user/domain';
import { hash } from 'bcrypt';

export class UserSeed {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  public async run(): Promise<void> {
    // const user = User.create({
    //   cpf: '57715675660',
    //   name: 'User Admin',
    //   role: UserRole.ADMIN,
    // });
    // await this.userRepository.insert(user);
    // const auth = Auth.create({
    //   username: 'admin',
    //   password: await hash('admin', 10),
    //   user,
    // });
    // await this.authRepository.insert(auth);

    await this.createUserUseCase.execute({
      credentials: {
        username: 'admin',
        password: 'admin',
      },
      cpf: '57715675660',
      name: 'User Admin',
      role: UserRole.ADMIN,
    });
  }
}
