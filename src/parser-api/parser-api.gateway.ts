import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { SocketParserApi } from '../constants/socket.constants';
import { SendChatGptCommonMessageRequest } from './greet.pb';
import { ParserApiService } from './parser-api.service';

@WebSocketGateway()
export class ParserApiGateway {
  constructor(private readonly parserApiService: ParserApiService) {}

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

    console.log(body);

    const response = await this.parserApiService.sendChatGptCommonMessage(body);
    const observer = {
      next: (response) => {
        console.log(response);
        this.server
          .to(client.id)
          .emit(
            SocketParserApi.PARSER_API_SEND_CHAT_GPT_COMMON_MESSAGE,
            response,
          );
      },
    };
    response.subscribe(observer);
  }
}
