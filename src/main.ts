import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { PinoLogger } from './logger/pino.logger';
import { config } from 'dotenv';
import { Config, loadConfig } from './config';

const loadEnvVariables = (environment = 'dev') => {
  const envPath = __dirname + `/../env/${environment || ''}.env`;
  config({ path: envPath });
};

async function bootstrap() {
  const logger = new PinoLogger();

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger,
  });

  const appPort = Config.config.running.port;

  await app.listen(appPort, () => {
    logger.warn('App listening on port ' + appPort);
  });
}
const environment = process.argv[2] || 'dev';
loadEnvVariables(environment);
loadConfig();
bootstrap();
