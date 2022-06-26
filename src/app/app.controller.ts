import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from 'src/logger/logging.interceptor';
import { AppService } from './app.service';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  ping(): Record<string, string> {
    return {
      ping: 'pong',
    };
  }
}
