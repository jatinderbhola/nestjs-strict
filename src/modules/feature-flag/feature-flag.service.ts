import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FeatureFlagClient } from '@ssense/feature-flag';
import { FeatureFlagMethods } from '@ssense/feature-flag/lib/entities/FeatureFlagMethods';
import { LoggerService } from '../logger/logger.service';
import { FeatureFlagClientType, FeatureFlagType } from './feature-flag.type';

@Injectable()
export class FeatureFlagService {
  private readonly ffClient: FeatureFlagClientType;

  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
  ) {
    const env = configService.get<string>('env');
    const IS_OFFLINE = ['qa', 'production'].includes(env!) === false;
    const featureFlagOptions = IS_OFFLINE ? { offline: true } : {};
    this.ffClient = new FeatureFlagClient(
      configService.get<string>('launchDarklySDKKey')!,
      configService.get<FeatureFlagType>('featureFlags')!,
      loggerService.logger,
      featureFlagOptions,
    );
  }

  get flags(): FeatureFlagMethods<FeatureFlagType> {
    return this.ffClient.flags;
  }
}
