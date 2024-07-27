import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dump } from 'js-yaml';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { DocumentationOptions } from './document-builder.type';

@Injectable()
export class DocumentBuilderService {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.generateSwaggerDocument();
  }

  async generateSwaggerDocument() {
    const env = this.configService.get<string>('env');
    const documentationOptions =
      this.configService.get<DocumentationOptions>('documentation');
    if (env !== 'development' || !documentationOptions?.enabled) {
      return;
    }

    if (documentationOptions?.enabled) {
      const options: Options = {
        definition: documentationOptions?.definition,
        apis: [`${__dirname}/../controllers/*.ts`],
      };
      writeFileSync(
        join(__dirname, '../../../', documentationOptions.openApiDocsPath),
        dump(swaggerJSDoc(options)),
      );
    }
  }
}
