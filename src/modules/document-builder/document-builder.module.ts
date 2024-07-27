import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DocumentBuilderService } from './document-builder.service';

@Module({
  imports: [ConfigModule],
  providers: [DocumentBuilderService],
  exports: [DocumentBuilderService],
})
export class DocumentationModule {}
