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
  // private svc: TestStreamServiceClient;
  //
  // @Inject(TEST_STREAM_SERVICE_NAME)
  // private readonly grpcTestClientGrpc: ClientGrpc;
  //
  // public onModuleInit(): void {
  //   this.svc = this.grpcTestClientGrpc.getService<TestStreamServiceClient>(
  //     TEST_STREAM_SERVICE_NAME,
  //   );
  // }

  constructor(private readonly parserApiService: ParserApiService) {}

  private readonly logger = new Logger(ParserApiGateway.name);

  // private connections = {};

  @WebSocketServer()
  server: Server;

  // async handleConnection(socket: Socket) {
  //   this.logger.debug(
  //     `${SocketParserApi.PARSER_API_HANDLE_CONNECTION} client ${socket.id}`,
  //   );
  //
  //   // const requestStream = new Subject();
  //   // const responseStream = this.svc.sendChatGptCommonMessage(requestStream);
  //   //
  //   // this.connections[socket.id] = [requestStream, responseStream];
  // }

  @SubscribeMessage(SocketParserApi.PARSER_API_SEND_CHAT_GPT_COMMON_MESSAGE)
  async sendChatGptCommonMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: SendChatGptCommonMessageRequest,
  ) {
    this.logger.debug(
      `[${SocketParserApi.PARSER_API_SEND_CHAT_GPT_COMMON_MESSAGE}] client ${client.id}`,
    );

    console.log(JSON.parse(body as any));

    const response = await this.parserApiService.sendChatGptCommonMessage(
      JSON.parse(body as any),
    );
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

    // const [requestStream, responseStream] = this.connections[client.id];
    //
    // const observer = {
    //   next: (response) => {
    //     console.log(response);
    //     this.server.to(client.id).emit(SocketParserApi.PARSER_API_SEND_CHAT_GPT_COMMON_MESSAGE, response)
    //   },
    //   error: (error) => {console.log(error)},
    // }
    //
    // responseStream.subscribe(observer);
    //
    // requestStream.next(body);

    // this.server
    //   .to(client.id)
    //   .emit(
    //     SocketParserApi.PARSER_API_SEND_CHAT_GPT_COMMON_MESSAGE,
    //     this.parserApiService.sendChatGptCommonMessage(body),
    //   );
  }
}
