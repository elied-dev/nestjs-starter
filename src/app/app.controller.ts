import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
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

  @Get('error')
  error(): Record<string, string> {
    const x = undefined;
    x.hello = 2;
    throw new BadRequestException();
  }
}
