import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { LEAD_GENERATION_MANAGER_SERVICE_NAME } from 'src/parser-api/greet.pb';
import { HEALTH_SERVICE_NAME, HealthClient, Stub } from './health-check.pb';

@Injectable()
export class HealthCheckService implements OnModuleInit {
  private parserApiClient: HealthClient;

  @Inject(LEAD_GENERATION_MANAGER_SERVICE_NAME)
  private readonly grpcParserApiClient: ClientGrpc;

  constructor(private readonly configService: ConfigService) {}

  public onModuleInit(): void {
    this.parserApiClient =
      this.grpcParserApiClient.getService<HealthClient>(HEALTH_SERVICE_NAME);
  }

  public async check(request: Stub): Promise<any> {
    let parserApiHealth: any;

    try {
      parserApiHealth = await firstValueFrom(
        this.parserApiClient.check(request),
      );
    } catch {
      parserApiHealth = { status: 2 };
    }

    return {
      parserApiHealth,
    };
  }
}
