import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
// import jwtDecode from 'jwt-decode';
// import { AuthService } from '../auth/auth.service';
import { EventsService } from './events.service';
import { SocketUserEvents } from '../constants/socket.constants';
// import { SocketConnectedUserDto } from '../user/dto/socket-connected-user.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(EventsGateway.name);

  @WebSocketServer()
  server: Server;

  constructor(
    // private authService: AuthService,
    private eventsService: EventsService,
  ) {}

  async afterInit() {
    // await this.eventsService.deleteSocketSession(null);
  }

  async handleDisconnect(client: Socket) {
    this.logger.debug(`[handleDisconnect] client ${client.id}`);
    // await this.eventsService.deleteSocketSession(client.id);

    this.server.emit(
      SocketUserEvents.USER_GET_CONNECTED_USERS,
      // await this.eventsService.getSocketConnectedUsers(),
    );
  }

  // @SubscribeMessage(SocketUserEvents.USER_GET_CONNECTED_USERS)
  // handleMessage(): Promise<SocketConnectedUserDto[]> {
  //   return this.eventsService.getSocketConnectedUsers();
  // }

  async handleConnection(client: Socket) {
    this.logger.debug(`[handleConnection] client ${client.id}`);

    // if (!client.handshake.query.token) {
    //   client.disconnect()
    //   // throw new WsException('Invalid credentials.');
    // }
    //
    // const token = String(client.handshake.query.token);
    // const verify = await this.authService.verify({ token });
    //
    // if (!verify.isValid) {
    //   client.disconnect()
    //   // throw new WsException('Invalid credentials.');
    // }
    // const { userId }: any = jwtDecode(token);
    // await this.eventsService.addSocketSession(client.id, userId);
    //
    // this.server.emit(
    //   SocketUserEvents.USER_GET_CONNECTED_USERS,
    //   await this.eventsService.getSocketConnectedUsers(),
    // );
  }
}
