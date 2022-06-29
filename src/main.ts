import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { PinoLogger } from './common/logger/pino.logger';
import { config } from 'dotenv';
import { Config, loadConfig } from './config';
import { LoggingInterceptor } from './common/logger/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { ResponseInterceptor } from './common/response/response.interceptor';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { VersioningType } from '@nestjs/common';

const loadEnvVariables = (environment = 'dev') => {
  const envPath = __dirname + `/../env/${environment || ''}.env`;
  config({ path: envPath });
};

const getSwaggerDocumentConfig = () => {
  const config = new DocumentBuilder()
    .setTitle('Example Nest Application')
    .setDescription('Sample Nest Application for NestJS Starter')
    .setVersion(Config._.running.version)
    .build();
  return config;
};

async function bootstrap() {
  const logger = new PinoLogger();

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger,
  });

  //  loggingInterceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  //  response interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  //  exception interceptor
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  //  set swagger configuration
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    getSwaggerDocumentConfig(),
  );
  SwaggerModule.setup('swagger', app, swaggerDocument);
  writeFileSync(
    __dirname +
      `/../docs/swagger-${new Date().toISOString().slice(0, 10)}.json`,
    JSON.stringify(swaggerDocument),
  );

  const appPort = Config._.running.port;

  await app.listen(appPort, () => {
    logger.warn('App listening on port ' + appPort);
  });
}

const environment = process.argv[2] || 'dev';
loadEnvVariables(environment);
loadConfig();
bootstrap();
