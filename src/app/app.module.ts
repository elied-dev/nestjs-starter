import { MiddlewareConsumer, Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { LoggerModule } from 'nestjs-pino';
import { ApiV1Module } from 'src/api/api-v1.module';
import { routes } from 'src/api/routes';
import { pinoConfig } from 'src/logger/pino.config';
import { ClsMiddleware } from 'src/utils/cls-middleware/cls.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: () => ({ pinoHttp: { ...pinoConfig(), autoLogging: false } }),
    }),
    RouterModule.forRoutes(routes),
    ApiV1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClsMiddleware).forRoutes('*');
  }
}
