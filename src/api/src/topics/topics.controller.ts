import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateTopicUseCase,
  GetResultTopicUseCase,
  GetTopicUseCase,
  ListTopicUseCase,
  GetOpenSessionTopicUseCase,
} from '@voting-service/core/topic/application';
import { CreateTopicDto } from './dto/create-topic.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthAdminGuard } from 'src/auth/auth-admin.guard';
import { TopicNotFoundError } from '@voting-service/core/topic/domain';
import { SessionOpenNotFoundError } from '@voting-service/core/session/domain';

@UseGuards(AuthGuard('jwt'))
@Controller('topics')
export class TopicController {
  constructor(
    private readonly createTopicUseCase: CreateTopicUseCase,
    private readonly getResultTopicUseCase: GetResultTopicUseCase,
    private readonly getTopicUseCase: GetTopicUseCase,
    private readonly listTopicUseCase: ListTopicUseCase,
    private readonly getOpenSessionsUseCase: GetOpenSessionTopicUseCase,
  ) {}

  @UseGuards(AuthAdminGuard)
  @Post()
  async create(@Body() { title, description }: CreateTopicDto) {
    try {
      return await this.createTopicUseCase.execute({ title, description });
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id/results')
  async getResults(@Param('id') id: string) {
    try {
      return await this.getResultTopicUseCase.execute({ id });
    } catch (error: any) {
      if (error instanceof TopicNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    try {
      return await this.getTopicUseCase.execute({ id });
    } catch (error: any) {
      if (error instanceof TopicNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  @Get()
  async list() {
    try {
      return this.listTopicUseCase.execute();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get(':id/open-session')
  async getOpenSessions(@Param('id') id: string) {
    try {
      console.log('id', id);
      return await this.getOpenSessionsUseCase.execute({ topic_id: id });
    } catch (error: any) {
      if (
        error instanceof SessionOpenNotFoundError ||
        error instanceof TopicNotFoundError
      ) {
        throw new NotFoundException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
