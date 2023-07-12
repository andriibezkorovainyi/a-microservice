import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './config/app.config';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';
import { ParserApiModule } from './parser-api/parser-api.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      load: [appConfig],
    }),
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        pinoHttp:
          configService.get<string>('app.nodeEnv') === 'development'
            ? {
                level: configService.get<string>('app.logLevel'),
                transport: {
                  target: 'pino-pretty',
                  options: {
                    levelFirst: true,
                    translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l',
                    singleLine: true,
                    colorize: true,
                  },
                },
              }
            : {
                level: configService.get<string>('app.logLevel'),
                transport: {
                  target: 'pino-pretty',
                  options: {
                    levelFirst: true,
                    translateTime: 'UTC:yyyy-mm-dd HH:MM:ss.l',
                    singleLine: true,
                    colorize: true,
                  },
                },
                stream: pino.destination({
                  dest: configService.get<string>('app.logFile'),
                  minLength: 4096,
                  sync: false,
                }),
              },
      }),
      inject: [ConfigService],
    }),
    ParserApiModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
