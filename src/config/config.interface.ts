import { Level } from 'pino';
import { Environments } from 'src/models/environments.enum';
interface LoggingConfiguration {
  logLevel: Level;
  useLogWrapper: boolean;
  logWrapperKey: string;
  prettifyLogs: boolean;
  excludeLoggingPaths: string[];
}

interface RunningConfiguration {
  port: number;
  environment: Environments;
}

export interface Configuration {
  running: RunningConfiguration;
  logging: LoggingConfiguration;
}
