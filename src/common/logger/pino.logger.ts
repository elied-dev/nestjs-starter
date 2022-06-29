import { LoggerService, LogLevel } from '@nestjs/common';
import pinoLogger from 'pino';
import { pinoConfig } from './pino.config';

export class PinoLogger implements LoggerService {
  private logger = pinoLogger(pinoConfig());

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }

  info(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    this.logger.trace(message, ...optionalParams);
  }

  setLogLevels?(levels: LogLevel[]) {
    throw new Error('Method not implemented.');
  }
}
