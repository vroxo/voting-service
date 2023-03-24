import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Inject } from '@nestjs/common';
import { PinoLoggerAdapter } from '@service-template/core/@shared/infra';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserUseCase } from '@service-template/core/user/application';

@WebSocketGateway({ namespace: 'users', cors: true })
export class UsersWebSocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  @Inject(CreateUserUseCase.UseCase)
  private readonly createUserUseCase: CreateUserUseCase.UseCase;

  @Inject(PinoLoggerAdapter)
  private readonly logger: PinoLoggerAdapter;

  handleConnection(client: any, ...args: any[]) {
    this.logger.info({ message: 'Client connected!', client_id: client.id });
  }

  handleDisconnect(client: any) {
    this.logger.info({ message: 'Client disconnected!', client_id: client.id });
  }

  afterInit(_: Server) {
    this.logger.info('WebSocket initialized');
  }

  @SubscribeMessage('create-user')
  handleMessage(@MessageBody() payload: CreateUserDto) {
    this.createUserUseCase.execute(payload);
    this.server.emit('response', { reponse: 'Message received!' });
  }
}
