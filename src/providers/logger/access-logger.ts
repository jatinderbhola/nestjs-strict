import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccessLogger } from '@ssense/logger';

export const AccessLoggerProvider: Provider = {
  provide: AccessLogger,
  inject: [ConfigService],
  useFactory: (configService: ConfigService): AccessLogger => {
    const isDevEnv = configService.get<string>('env') === 'development';
    const appId = configService.get<string>('appName')!;
    const accessLogger = new AccessLogger(appId);
    accessLogger.enable(configService.get<boolean>('accessLogger.enabled')!);
    // accessLogger.setTracer(tracer);
    accessLogger.setPretty(isDevEnv);
    return accessLogger;
  },
};
