import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WebSocketEvent } from 'src/pricing/enums/ws-events.enum';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger('SocketGateway');

  constructor() {}

  afterInit() {
    this.logger.log('WebSocket server initialized');
  }

  emitMessage(event: WebSocketEvent, message: unknown) {
    this.logger.log('Emitting message');
    this.server.emit(WebSocketEvent.PRICE_UPDATE, message);
    this.logger.log('Message emitted');
  }
}
