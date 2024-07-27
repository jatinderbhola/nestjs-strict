import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '../logger/logger.module';
import { FeatureFlagService } from './feature-flag.service';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [FeatureFlagService],
  exports: [FeatureFlagService],
})
export class FeatureFlagModule {}
