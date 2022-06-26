import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ClsUtils } from 'src/utils/cls-middleware/cls.utils';
import { PinoLogger } from './pino.logger';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  logger = new PinoLogger();
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();

    const startRequestTime = Date.now();
    ClsUtils.set('startRequestTime', startRequestTime);

    const { method, url } = req;
    const requestId = ClsUtils.get('requestId');

    this.logger.info(
      { ...requestInfo(req), startRequestTime },
      `Request started ${requestId} - ${method} ${url}`,
    );

    return next.handle().pipe(
      tap((data) => {
        const res: Response = context.switchToHttp().getResponse();

        const endRequestTime = Date.now();
        ClsUtils.set('endRequestTime', endRequestTime);

        this.logger.info(
          {
            ...responseInfo(req, res, data),
            startRequestTime,
            endRequestTime,
            duration: `${endRequestTime - startRequestTime}ms`,
          },
          `Request completed ${requestId} - ${method} ${url}`,
        );
      }),
    );
  }
}

const defaultInfo = () => {
  return {
    requestId: ClsUtils.get('requestId'),
  };
};

const requestInfo = (req: Request) => {
  const { method, body, url, params, headers, query } = req;
  return {
    ...defaultInfo(),
    req: { method, url, body, params, query, headers },
  };
};

const responseInfo = (req: Request, res: Response, data: any) => {
  const { statusCode } = res;
  return {
    ...defaultInfo(),
    res: { statusCode, data },
    ...requestInfo(req),
  };
};
