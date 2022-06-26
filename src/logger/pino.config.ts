import { LoggerOptions } from 'pino';

export const pinoConfig: LoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  messageKey: 'message',
  ...(process.env.USE_LOG_WRAPPER === 'true' ? { nestedKey: 'payload' } : {}),
  formatters: {
    level: (level, severity) => ({ level: level.toUpperCase(), severity }),
  },
  ...(process.env.PRETTIFY_LOGS === 'true' || true
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            levelFirst: true,
            translateTime: "yyyy-MM-dd'T'HH:mm:ss.sss+0000",
            ignore: ['pid', 'hostname'].join(','),
          },
        },
      }
    : {
        target: 'pino/file',
        options: {
          destination: 1,
        },
      }),
};
