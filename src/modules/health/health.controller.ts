import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('Health Checks Endpoints')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ]);
  }

  @Get('healthcheck')
  getHealthCheck() {
    return {
      healthy: true,
    };
  }

  @Get('liveness')
  getLiveness() {
    return {
      healthy: true,
    };
  }

  @Get('readiness')
  getReadiness() {
    return {
      healthy: true,
    };
  }
}
