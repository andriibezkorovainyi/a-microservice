/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable, Subject } from "rxjs";

export const protobufPackage = "LeadGenerationManager";

export interface SendChatGptCommonMessageRequest {
  userId?: number | undefined;
  message?: string | undefined;
  observables?: [Subject<any>, Observable<any>] | undefined;
}

export interface SendChatGptCommonMessageResponse {
  message?: ChatGptCommonMessageItem | undefined;
}

export interface ChatGptCommonMessageItem {
  userId?: number | undefined;
  message?: string | undefined;
  date?: string | undefined;
}

export const LEAD_GENERATION_MANAGER_PACKAGE_NAME = "LeadGenerationManager";

/** The greeting service definition. */

export interface LeadGenerationManagerClient {
  sendChatGptCommonMessage(
    request: Observable<SendChatGptCommonMessageRequest>,
    metadata?: Metadata,
  ): Observable<SendChatGptCommonMessageResponse>;
}

/** The greeting service definition. */

export interface LeadGenerationManagerController {
  sendChatGptCommonMessage(
    request: Observable<SendChatGptCommonMessageRequest>,
    metadata?: Metadata,
  ): Observable<SendChatGptCommonMessageResponse>;
}

export function LeadGenerationManagerControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("LeadGenerationManager", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = ["sendChatGptCommonMessage"];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("LeadGenerationManager", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const LEAD_GENERATION_MANAGER_SERVICE_NAME = "LeadGenerationManager";
