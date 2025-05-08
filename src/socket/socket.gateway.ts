import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WebSocketEvent } from 'src/socket/enums/ws-events.enum';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger('SocketGateway');

  afterInit() {
    this.logger.log('WebSocket server initialized');
  }

  emitMessage(event: WebSocketEvent, message: unknown): void {
    try {
      this.logger.log('Emitting message');
      this.server.emit(event, message);
      this.logger.log('Message emitted');
    } catch (error) {
      console.error(error);
      // We could have another service handle this (prefrably a globla error service) and also use error management toolings such as Sentry, but simplicity we're only logging the erroor
    }
  }
}
