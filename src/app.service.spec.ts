import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { MockConfigService } from './common/mocks/config.service';
import { FeatureFlagService } from './modules/feature-flag/feature-flag.service';

describe('AppService', () => {
  let service: AppService;
  let configService: ConfigService;
  let ffClient: FeatureFlagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: ConfigService,
          useClass: MockConfigService,
        },
        {
          provide: FeatureFlagService,
          useValue: {
            flags: {
              flag1: jest.fn().mockResolvedValue(true),
              flag2: jest.fn().mockResolvedValue(false),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    configService = module.get<ConfigService>(ConfigService);
    ffClient = module.get<FeatureFlagService>(FeatureFlagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAppInfo', () => {
    it('should return app info', async () => {
      const appName = 'Test App';
      const appVersion = '1.0.0';
      const nodeEnv = 'test';
      const uptime = 123;
      const nodeVersion = 'v20.0.0';
      const platform = 'win32';
      const memoryUsage = {
        rss: 123456,
        heapTotal: 654321,
        heapUsed: 234567,
        external: 12345,
        arrayBuffers: 6789,
      };
      const cpuUsage = { user: 100, system: 50 };
      const featureFlags = { flag1: true, flag2: false };

      jest.spyOn(process, 'uptime').mockReturnValueOnce(uptime);

      Object.defineProperty(process, 'version', {
        value: nodeVersion,
        writable: true,
      });
      Object.defineProperty(process, 'platform', {
        value: platform,
        writable: true,
      });
      Object.defineProperty(process, 'memoryUsage', {
        value: () => memoryUsage,
      });
      Object.defineProperty(process, 'cpuUsage', { value: () => cpuUsage });

      // jest
      //   .spyOn(ffClient, 'flags')
      //   .mockImplementation(() => Promise.resolve(featureFlags));

      const result = await service.getAppInfo();

      expect(result).toEqual({
        app_id: appName,
        app_version: appVersion,
        uptime,
        environment: nodeEnv,
        node_version: nodeVersion,
        platform,
        memory_usage: memoryUsage,
        cpu_usage: cpuUsage,
        feature_flags: featureFlags,
      });
    });
  });
});
