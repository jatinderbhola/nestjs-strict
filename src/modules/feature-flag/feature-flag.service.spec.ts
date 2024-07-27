import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger/logger.service';
import { MockConfigService } from './../../common/mocks/config.service';
import { MockLoggerService } from './../../common/mocks/logger.service'; 
import { FeatureFlagService } from './feature-flag.service';

describe('FeatureFlagService', () => {
  let service: FeatureFlagService;
  let configService: ConfigService;
  let loggerService: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeatureFlagService,
        { provide: ConfigService, useClass: MockConfigService },
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    }).compile();

    service = module.get<FeatureFlagService>(FeatureFlagService);
    configService = module.get<ConfigService>(ConfigService);
    loggerService = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('flags', () => {
    it('should return the feature flag methods', () => {
      const flags = service.flags;
      expect(flags).toBeDefined();
      // Add more assertions as needed
    });
  });
});
