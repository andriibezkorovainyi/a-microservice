import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';
import {
  LEAD_GENERATION_MANAGER_SERVICE_NAME,
  LeadGenerationManagerClient,
  SendChatGptCommonMessageRequest,
  SendChatGptCommonMessageResponse,
} from './greet.pb';

@Injectable()
export class ParserApiService implements OnModuleInit {
  private svc: LeadGenerationManagerClient;

  @Inject(LEAD_GENERATION_MANAGER_SERVICE_NAME)
  private readonly grpcParserApiClientGrpc: ClientGrpc;

  public onModuleInit(): void {
    this.svc =
      this.grpcParserApiClientGrpc.getService<LeadGenerationManagerClient>(
        LEAD_GENERATION_MANAGER_SERVICE_NAME,
      );
  }

  public sendChatGptCommonMessage(
    body: SendChatGptCommonMessageRequest,
  ): Observable<SendChatGptCommonMessageResponse> {
    const requestStream = new Observable<SendChatGptCommonMessageRequest>(
      (sub) => {
        sub.next(body);
      },
    );
    return this.svc.sendChatGptCommonMessage(requestStream);
  }
}
