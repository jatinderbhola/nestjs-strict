import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLogger, LogLevel } from '@ssense/logger';

export const AppLoggerProvider: Provider = {
  provide: AppLogger,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): AppLogger => {
    const isDevEnv = configService.get<string>('env') === 'development';
    const appId = configService.get<string>('appName')!;
    const logger = new AppLogger(
      appId,
      configService.get<LogLevel>('logger.level'),
    );
    logger.enable(configService.get<boolean>('logger.enabled')!);
    // logger.setTracer(tracer);
    logger.setPretty(isDevEnv);
    return logger;
  },
};
