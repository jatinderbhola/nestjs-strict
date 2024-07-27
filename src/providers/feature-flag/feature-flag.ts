import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FeatureFlagClient } from '@ssense/feature-flag';
import { AppLogger } from '@ssense/logger';
import { FeatureFlagClientType, FeatureFlagType } from './feature-flag.type';

export const FeatureFlagProvider: Provider = {
  provide: FeatureFlagClient,
  inject: [ConfigService, AppLogger],
  useFactory: (
    configService: ConfigService,
    logger: AppLogger,
  ): FeatureFlagClientType => {
    const env = configService.get<string>('env');
    const IS_OFFLINE = ['qa', 'production'].includes(env!) === false;
    const featureFlagOptions = IS_OFFLINE ? { offline: true } : {};
    return new FeatureFlagClient(
      configService.get<string>('launchDarklySDKKey')!,
      configService.get<FeatureFlagType>('featureFlags')!,
      logger,
      featureFlagOptions,
    );
  },
};
