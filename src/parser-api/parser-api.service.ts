import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import {
  LEAD_GENERATION_MANAGER_SERVICE_NAME,
  LeadGenerationManagerClient,
  SendChatGptCommonMessageRequest,
  SendChatGptCommonMessageResponse,
} from './greet.pb';

export type UserObservables = [
  ReplaySubject<SendChatGptCommonMessageRequest>,
  Observable<SendChatGptCommonMessageResponse>,
  string,
];

@Injectable()
export class ParserApiService implements OnModuleInit {
  private svc: LeadGenerationManagerClient;
  public userObservables: Record<string, UserObservables> = {};

  @Inject(LEAD_GENERATION_MANAGER_SERVICE_NAME)
  private readonly grpcParserApiClientGrpc: ClientGrpc;

  public onModuleInit(): void {
    this.svc =
      this.grpcParserApiClientGrpc.getService<LeadGenerationManagerClient>(
        LEAD_GENERATION_MANAGER_SERVICE_NAME,
      );
  }

  public sendChatGptCommonMessage(
    requestObservable: Observable<SendChatGptCommonMessageRequest>,
  ): Observable<SendChatGptCommonMessageResponse> {
    return this.svc.sendChatGptCommonMessage(requestObservable);
  }

  public getObservablesByUserId(userId: number): UserObservables | undefined {
    return this.userObservables[String(userId)];
  }

  public setObservablesByUserId(
    userId: number,
    observables: UserObservables,
    clientId: string,
  ): void {
    this.userObservables[String(userId)] = observables;
    this.userObservables[String(userId)][2] = clientId;
  }

  public deleteObservablesByClientId(clientId: string): void {
    const userObservables = Object.entries(this.userObservables);

    for (const [userId, observables] of userObservables) {
      if (observables[2] === clientId) {
        delete this.userObservables[userId];
        break;
      }
    }
  }
}
