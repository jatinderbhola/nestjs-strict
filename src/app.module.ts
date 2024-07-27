import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/default';
import { DocumentationModule } from './modules/document-builder/document-builder.module';
import { FeatureFlagModule } from './modules/feature-flag/feature-flag.module';
import { HealthModule } from './modules/health/health.module';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
    }),
    TerminusModule,
    HealthModule,
    LoggerModule,
    DocumentationModule,
    FeatureFlagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // exports: [
  //   AppService,
  //   AppLoggerProvider,
  //   FeatureFlagProvider,
  // ],
})
export class AppModule {}
