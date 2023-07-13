import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcParserApiOptions } from 'src/config/grpc.config';
import { ParserApiController } from './parser-api.controller';
import { ParserApiService } from './parser-api.service';
import { ParserApiGateway } from './parser-api.gateway';
import { EventsService } from '../events/events.service';

@Module({
  imports: [ClientsModule.register([grpcParserApiOptions])],
  controllers: [ParserApiController],
  providers: [ParserApiGateway, ParserApiService, EventsService],
})
export class ParserApiModule {}
