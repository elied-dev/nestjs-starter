import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app/app.module';
import { PinoLogger } from './logger/pino.logger';
import { setRequestId } from './utils/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: new PinoLogger(),
  });

  const appPort = process.env.APP_PORT || 3000;
  await app.listen(appPort);
}
bootstrap();
