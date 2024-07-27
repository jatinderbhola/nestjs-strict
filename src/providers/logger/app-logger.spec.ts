import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppLogger } from '@ssense/logger';
import { AppLoggerProvider } from './app-logger';

describe('AppLoggerProvider', () => {
  let provider: AppLogger;
  let mockConfigService: ConfigService;

  beforeEach(async () => {
    mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        const config: { [key: string]: any } = {
          env: 'development',
          appName: 'test-app',
          logger: {
            level: 'info',
            enabled: true,
          },
        };
        return config[key];
      }),
    } as unknown as ConfigService;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppLoggerProvider,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    provider = module.get<AppLogger>(AppLogger);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should create AppLogger with correct configuration', () => {
    expect(provider).toBeInstanceOf(AppLogger);

    expect(provider['appId']).toBe('test-app');
    expect(provider['pretty']).toBe(true);
    expect(provider['level']).toBe('info');
  });
});
