import {
  DiskHealthIndicator,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

type HealthCheckFunction = () => Promise<any>;

class MockHealthCheckService {
  async check(
    checks: HealthCheckFunction[],
  ): Promise<{ status: string; details: { [key: string]: any } }> {
    return Promise.resolve({
      status: 'ok',
      details: await this.executeChecks(checks),
    });
  }

  private async executeChecks(
    checks: HealthCheckFunction[],
  ): Promise<{ [key: string]: any }> {
    const results = await Promise.all(
      checks.map(async (check) => {
        const result = await check();
        return { [check.name]: result };
      }),
    );

    return results.reduce((acc, result) => ({ ...acc, ...result }), {});
  }
}

export class MockDiskHealthIndicator {
  checkStorage() {
    return Promise.resolve({ status: 'ok' });
  }
}

export class MockMemoryHealthIndicator {
  checkHeap() {
    return Promise.resolve({ status: 'ok' });
  }
}

describe('HealthController', () => {
  let controller: HealthController;
  let diskHealthIndicator: DiskHealthIndicator;
  let memoryHealthIndicator: MemoryHealthIndicator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        { provide: HealthCheckService, useClass: MockHealthCheckService },
        { provide: DiskHealthIndicator, useClass: MockDiskHealthIndicator },
        { provide: MemoryHealthIndicator, useClass: MockMemoryHealthIndicator },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    diskHealthIndicator = module.get<DiskHealthIndicator>(DiskHealthIndicator);
    memoryHealthIndicator = module.get<MemoryHealthIndicator>(
      MemoryHealthIndicator,
    );
  });

  describe('check', () => {
    it('should return health check result', async () => {
      const diskCheckSpy = jest.spyOn(diskHealthIndicator, 'checkStorage');
      const memoryCheckSpy = jest.spyOn(memoryHealthIndicator, 'checkHeap');

      await controller.check();

      expect(diskCheckSpy).toHaveBeenCalledWith('storage', {
        path: '/',
        thresholdPercent: 0.5,
      });
      expect(memoryCheckSpy).toHaveBeenCalledWith(
        'memory_heap',
        150 * 1024 * 1024,
      );
    });
  });

  describe('getHealthCheck', () => {
    it('should return healthy status', () => {
      const result = controller.getHealthCheck();

      expect(result).toEqual({ healthy: true });
    });
  });

  describe('getLiveness', () => {
    it('should return healthy status', () => {
      const result = controller.getLiveness();

      expect(result).toEqual({ healthy: true });
    });
  });

  describe('getReadiness', () => {
    it('should return healthy status', () => {
      const result = controller.getReadiness();

      expect(result).toEqual({ healthy: true });
    });
  });
});
