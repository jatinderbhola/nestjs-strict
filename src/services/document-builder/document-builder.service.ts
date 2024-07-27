import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { dump } from 'js-yaml';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import { DocumentationOptions } from './document-builder.type';

@Injectable()
export class DocumentBuilderService {
  private readonly env: string | undefined= this.configService.get<string>('env');
  private readonly documentationOptions: DocumentationOptions | undefined = this.configService.get<DocumentationOptions>('documentation');

  constructor(
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (this.env === 'development') {
      await this.generateSwaggerDocument();
    }
  }

  async generateSwaggerDocument() {
		if (this.documentationOptions?.enabled) {
			const options: Options = {
				definition : this.documentationOptions?.definition,
				apis: [`${__dirname}/../controllers/*.ts`],
			};
      writeFileSync(join(__dirname, '../../../', this.documentationOptions.openApiDocsPath), dump(swaggerJSDoc(options)));
		}
  }

}
