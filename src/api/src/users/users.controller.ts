import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from '@voting-service/core/user/application';
import { AuthGuard } from '@nestjs/passport';
import { AuthAdminGuard } from 'src/auth/auth-admin.guard';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @UseGuards(AuthAdminGuard)
  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      return await this.createUserUseCase.execute(body);
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
