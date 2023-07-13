import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { resolve } from 'node:path';
import {
  LEAD_GENERATION_MANAGER_PACKAGE_NAME,
  LEAD_GENERATION_MANAGER_SERVICE_NAME,
} from 'src/parser-api/greet.pb';
import { HEALTH_CHECK_PACKAGE_NAME } from '../health-check/health-check.pb';

export const grpcParserApiOptions = {
  name: LEAD_GENERATION_MANAGER_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: process.env.GRPC_PARSER_API_SERVICE_HOST || 'localhost:50065',
    package: [HEALTH_CHECK_PACKAGE_NAME, LEAD_GENERATION_MANAGER_PACKAGE_NAME],
    protoPath: [
      resolve(__dirname, '../_proto/health-check/health-check.proto'),
      resolve(__dirname, '../_proto/parser-api/greet.proto'),
    ],
    loader: {
      keepCase: true,
      longs: String,
      defaults: true,
      oneofs: true,
    },
  },
} as ClientProviderOptions;
