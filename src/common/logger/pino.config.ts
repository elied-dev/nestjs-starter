import { Config } from 'src/config';

export function pinoConfig() {
  return {
    level: Config._.logging.logLevel,
    messageKey: 'message',
    nestedKey: Config._.logging.useLogWrapper
      ? Config._.logging.logWrapperKey || 'payload'
      : undefined,
    formatters: {
      level: (level: string, severity: number) => ({
        level: level.toUpperCase(),
        severity,
      }),
    },
    ...(Config._.logging.prettifyLogs
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
          transport: {
            target: 'pino/file',
            options: {
              destination: 1,
            },
          },
        }),
  };
}
