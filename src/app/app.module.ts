import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { ApiModule } from '../api/api.module';
import { routes } from '../api/routes';
import { pinoConfig } from '../common/logger/pino.config';
import { ClsMiddleware } from '../utils/cls-middleware/cls.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: () => ({ pinoHttp: { ...pinoConfig(), autoLogging: false } }),
    }),
    RouterModule.register(routes),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware).forRoutes('*');
  }
}
