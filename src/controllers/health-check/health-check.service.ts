import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheckService {
  findAll(): string {
    return 'This action returns all health-check';
  }
}
