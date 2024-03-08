import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSessionUseCase } from '@voting-service/core/session/application';
import { TopicNotFoundError } from '@voting-service/core/topic/domain';
import { CreateSessionDto } from './dto/create-session.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('sessions')
export class SessionsController {
  constructor(private readonly createSessionUseCase: CreateSessionUseCase) {}

  @Post()
  async create(@Body() body: CreateSessionDto) {
    try {
      return await this.createSessionUseCase.execute({ ...body });
    } catch (error: any) {
      if (error instanceof TopicNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
