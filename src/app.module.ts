import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/default';
import { HealthModule } from './modules/health/health.module';
import { FeatureFlagService } from './providers/feature-flag/feature-flag';
import { DocumentBuilderService } from './services/document-builder/document-builder';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
    }),
    TerminusModule,

    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DocumentBuilderService, FeatureFlagService],
})
export class AppModule {}
