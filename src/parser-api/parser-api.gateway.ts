import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SocketParserApi } from '../constants/socket.constants';
import {
  SendChatGptCommonMessageRequest,
  SendChatGptCommonMessageResponse,
} from './greet.pb';
import { ParserApiService, UserObservables } from './parser-api.service';
import { BehaviorSubject, Observer, ReplaySubject, Subject } from 'rxjs';
import { EventsService } from '../events/events.service';

@WebSocketGateway()
export class ParserApiGateway implements OnGatewayDisconnect {
  constructor(
    private readonly parserApiService: ParserApiService,
    private readonly eventsService: EventsService,
  ) {}

  private readonly logger = new Logger(ParserApiGateway.name);

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(SocketParserApi.PARSER_API_SEND_CHAT_GPT_COMMON_MESSAGE)
  async sendChatGptCommonMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: SendChatGptCommonMessageRequest,
  ) {
    this.logger.debug(
      `[${SocketParserApi.PARSER_API_SEND_CHAT_GPT_COMMON_MESSAGE}] client ${client.id}`,
    );

    const userConnections =
      await this.eventsService.getSocketConnectionsByUserId(body.userId);

    let userObservables = this.parserApiService.getObservablesByUserId(
      body.userId,
    );

    if (userObservables) {
      const requestObservable = userObservables[0];
      requestObservable.next(body);
    } else {
      const requestObservable =
        new ReplaySubject<SendChatGptCommonMessageRequest>();
      const responseObservable =
        this.parserApiService.sendChatGptCommonMessage(requestObservable);

      const observer: Observer<SendChatGptCommonMessageResponse> = {
        next: (response: SendChatGptCommonMessageResponse) => {
          console.log(response);
          this.server
            .to(userConnections.map((u) => u.socketId))
            .emit(
              SocketParserApi.PARSER_API_SEND_CHAT_GPT_COMMON_MESSAGE,
              response,
            );
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        },
      };

      responseObservable.subscribe(observer);

      userObservables = [
        requestObservable,
        responseObservable,
        client.id,
      ] as UserObservables;

      this.parserApiService.setObservablesByUserId(
        body.userId,
        userObservables,
        client.id,
      );

      requestObservable.next(body);
    }
  }

  public async handleDisconnect(client: Socket): Promise<void> {
    this.logger.debug(
      `[${SocketParserApi.PARSER_API_SEND_CHAT_GPT_COMMON_MESSAGE}] client ${client.id}`,
    );

    const userConnections =
      await this.eventsService.getSocketConnectionBySocketId(client.id);

    if (userConnections.length === 0) {
      this.parserApiService.deleteObservablesByClientId(client.id);
    }
  }
}
