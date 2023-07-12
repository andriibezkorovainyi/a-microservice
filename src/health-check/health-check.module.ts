import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';
import { grpcParserApiOptions } from '../config/grpc.config';

@Module({
  imports: [ClientsModule.register([grpcParserApiOptions])],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
