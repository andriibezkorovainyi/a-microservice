import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  name: process.env.APP_NAME,
  workingDirectory: process.env.PWD || process.cwd(),
  url: `${process.env.APP_IP}:${process.env.APP_PORT}` || '0.0.0.0:3000',
  logLevel: process.env.LOG_LEVEL,
  logFile: process.env.LOG_FILE || 'app.log',
}));
