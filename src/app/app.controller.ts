import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Common')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): { message: string } {
    return {
      message: 'App running...',
    };
  }

  @Get('ping')
  ping(): { ping: string } {
    return {
      ping: 'pong',
    };
  }

  @Get('error/:error_status_code')
  error(
    @Param('error_status_code') errorStatusCode: number,
  ): Record<string, string> {
    throw new HttpException(
      'Generating error ' + errorStatusCode,
      errorStatusCode || 400,
    );
  }
}
