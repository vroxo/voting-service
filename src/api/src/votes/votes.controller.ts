import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateVoteDto } from './dto/create-vote.dto';
import { CreateVoteUseCase } from '@voting-service/core/vote/application';
import { UserNotFoundError } from '@voting-service/core/user/domain';
import {
  SessionClosedError,
  SessionNotFoundError,
} from '@voting-service/core/session/domain';
import { VoteAlreadyExistsError } from '@voting-service/core/vote/domain';

@UseGuards(AuthGuard('jwt'))
@Controller('votes')
export class VotesController {
  constructor(private readonly createVoteUseCase: CreateVoteUseCase) {}
  @Post()
  async create(@Request() request: any, @Body() body: CreateVoteDto) {
    try {
      const { id } = request.user;
      const { session_id, yes, no } = body;

      return await this.createVoteUseCase.execute({
        user_id: id,
        session_id,
        yes,
        no,
      });
    } catch (error: any) {
      if (
        error instanceof UserNotFoundError ||
        error instanceof SessionNotFoundError
      ) {
        throw new NotFoundException(error.message);
      }

      if (
        error instanceof SessionClosedError ||
        error instanceof VoteAlreadyExistsError
      ) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
