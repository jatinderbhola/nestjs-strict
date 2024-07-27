import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FeatureFlagClient } from '@ssense/feature-flag';
import { AppLogger } from '@ssense/logger';
import { FeatureFlagProvider } from './feature-flag';
import { FeatureFlagType } from './feature-flag.type';

describe('FeatureFlagProvider', () => {
  let featureFlagClient: FeatureFlagClient<FeatureFlagType>;
  let mockConfigService: ConfigService;
  let mockAppLogger: AppLogger;

  beforeEach(async () => {
    mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        const config: { [key: string]: string | FeatureFlagType } = {
          env: 'development',
          launchDarklySDKKey: 'test-key',
          featureFlags: {} as FeatureFlagType,
        };
        return config[key];
      }),
    } as unknown as ConfigService;

    mockAppLogger = {} as AppLogger;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeatureFlagProvider,
        { provide: ConfigService, useValue: mockConfigService },
        { provide: AppLogger, useValue: mockAppLogger },
      ],
    }).compile();

    featureFlagClient =
      module.get<FeatureFlagClient<FeatureFlagType>>(FeatureFlagClient);
  });

  it('should be defined', () => {
    expect(featureFlagClient).toBeDefined();
  });
});
