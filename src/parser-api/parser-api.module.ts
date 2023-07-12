import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcParserApiOptions } from 'src/config/grpc.config';
import { ParserApiController } from './parser-api.controller';
import { ParserApiService } from './parser-api.service';
import { ParserApiGateway } from './parser-api.gateway';

@Module({
  imports: [ClientsModule.register([grpcParserApiOptions])],
  controllers: [ParserApiController],
  providers: [ParserApiGateway, ParserApiService],
})
export class ParserApiModule {}
