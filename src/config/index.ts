import { Level } from 'pino';
import { Environments } from 'src/models/environments.enum';
import { Configuration } from './config.interface';

class ConfigUtils {
  static parseBoolean(val: string): boolean {
    return val === 'true';
  }

  static parseInt(val: string): number {
    return parseInt(val, 10) || 0;
  }

  static parseArrayString(val: string): string[] {
    if (!val) return [];
    return val.split(',') || [];
  }
}

export class Config {
  private static _config: Configuration = null;

  public static get config(): Configuration {
    if (!this._config) {
      this._config = {
        running: {
          port: ConfigUtils.parseInt(process.env.PORT) || 3000,
          environment:
            Environments[process.env.NODE_ENV] || Environments.DEVELOPMENT,
          version: process.env.APP_VERSION || '1.0.0',
        },
        logging: {
          logLevel: <Level>process.env.LOG_LEVEL || 'info',
          useLogWrapper: ConfigUtils.parseBoolean(process.env.USE_LOG_WRAPPER),
          logWrapperKey: process.env.LOG_WRAPPER_KEY || 'payload',
          prettifyLogs: ConfigUtils.parseBoolean(process.env.PRETTIFY_LOGS),
          excludeLoggingPaths: ConfigUtils.parseArrayString(
            process.env.EXLUDE_LOGGING_PATHS || '/ping,/health',
          ),
        },
      };
    }
    return this._config;
  }
}

export const loadConfig = () => Config.config;
