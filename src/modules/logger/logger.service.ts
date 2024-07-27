import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccessLogger, AppLogger, LogLevel } from '@ssense/logger';
import tracer from './tracer';

@Injectable()
export class LoggerService {
  private readonly _logger: AppLogger;
  private readonly _accessLogger: AccessLogger;

  constructor(private readonly config: ConfigService) {
    const appId = config.get<string>('appName')!;
    const isDevEnv = config.get<string>('env')! === 'development';

    this._logger = new AppLogger(appId, config.get<LogLevel>('logger.level'));
    this._logger.enable(config.get<boolean>('logger.enabled')!);
    this._logger.setTracer(tracer);
    this._logger.setPretty(isDevEnv);

    this._accessLogger = new AccessLogger(appId);
    this._accessLogger.enable(config.get<boolean>('accessLogger.enabled')!);
    this._accessLogger.setTracer(tracer);
    this._accessLogger.setPretty(isDevEnv);
  }

  get logger(): AppLogger {
    return this._logger;
  }

  get accessLogger(): AccessLogger {
    return this._accessLogger;
  }
}
