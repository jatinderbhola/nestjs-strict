import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessLogger } from '@ssense/logger';
import { AccessLoggerProvider } from './access-logger';

describe('AccessLoggerProvider', () => {
  let provider: AccessLogger;
  let mockConfigService: ConfigService;

  beforeEach(async () => {
    // Mock the ConfigService
    mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        const config: { [key: string]: any } = {
          env: 'development',
          appName: 'test-app',
          accessLogger: {
            enabled: true,
          },
        };
        return config[key];
      }),
    } as unknown as ConfigService;

    // Create the testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessLoggerProvider,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    provider = module.get<AccessLogger>(AccessLogger);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should create AccessLogger with correct configuration', () => {
    expect(provider).toBeInstanceOf(AccessLogger);

    expect(provider['appId']).toBe('test-app');
    expect(provider['pretty']).toBe(true);
  });
});
