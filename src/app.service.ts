import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FeatureFlagService } from './modules/feature-flag/feature-flag.service';
import {
  FeatureFlagClientType,
  FeatureFlagType,
} from './modules/feature-flag/feature-flag.type';

@Injectable()
export class AppService {
  private readonly appName: string | undefined;
  private readonly appVersion: string | undefined;
  private readonly nodeEnv: string | undefined;

  constructor(
    private configService: ConfigService,
    private ffClient: FeatureFlagService,
  ) {
    this.appName = this.configService.get<string>('appName');
    this.appVersion = this.configService.get<string>('version');
    this.nodeEnv = this.configService.get<string>('env');
  }

  async getAppInfo(): Promise<any> {
    return {
      app_id: this.appName,
      app_version: this.appVersion,
      uptime: process.uptime(),
      environment: this.nodeEnv,
      node_version: process.version,
      platform: process.platform,
      memory_usage: process.memoryUsage(),
      cpu_usage: process.cpuUsage(),
      feature_flags: await this.getFeatureFlags(),
    };
  }

  private async getFeatureFlags(): Promise<
    Record<string, string | boolean | number | any[] | object>
  > {
    const flags = Object.keys(this.ffClient.flags) as (keyof FeatureFlagType)[];
    const results = await Promise.all(
      flags.map(async (flag) => ({
        [flag]: await this.ffClient.flags[flag](),
      })),
    );
    return results.reduce((acc, result) => ({ ...acc, ...result }), {});
  }
}
