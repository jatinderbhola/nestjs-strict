import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly appName: string | undefined;
  private readonly appVersion: string | undefined;
  private readonly nodeEnv: string | undefined;

  constructor(private configService: ConfigService) {
    this.appName = this.configService.get<string>('appName');
    this.appVersion = this.configService.get<string>('version');
    this.nodeEnv = this.configService.get<string>('env');
  }

  getAppInfo(): any {
    return {
      app_id: this.appName,
      app_version: this.appVersion,
      uptime: process.uptime(),
      environment: this.nodeEnv,
      node_version: process.version,
      platform: process.platform,
      memory_usage: process.memoryUsage(),
      cpu_usage: process.cpuUsage(),
      feature_flags: [],
    };
  }
}
