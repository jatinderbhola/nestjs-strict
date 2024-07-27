import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessLogger, AppLogger } from '@ssense/logger';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService, ConfigService],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('logger', () => {
    it('should return an instance of AppLogger', () => {
      expect(service.logger).toBeInstanceOf(AppLogger);
    });
  });

  describe('accessLogger', () => {
    it('should return an instance of AccessLogger', () => {
      expect(service.accessLogger).toBeInstanceOf(AccessLogger);
    });
  });
});
