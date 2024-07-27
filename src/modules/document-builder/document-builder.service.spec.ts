import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { writeFileSync } from 'node:fs';
import swaggerJSDoc from 'swagger-jsdoc';
import { MockConfigService } from './../../common/mocks/config.service';
import { DocumentBuilderService } from './document-builder.service';

jest.mock('node:fs');
jest.mock('node:path');
jest.mock('swagger-jsdoc', () => ({
  _esModule: true,
  default: jest.fn(),
}));

describe('DocumentBuilderService', () => {
  let service: DocumentBuilderService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentBuilderService,
        {
          provide: ConfigService,
          useClass: MockConfigService,
        },
      ],
    }).compile();

    service = module.get<DocumentBuilderService>(DocumentBuilderService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should call generateSwaggerDocument', async () => {
      const generateSwaggerDocumentSpy = jest.spyOn(
        service,
        'generateSwaggerDocument',
      );
      await service.onModuleInit();
      expect(generateSwaggerDocumentSpy).toHaveBeenCalled();
    });
  });

  describe('generateSwaggerDocument', () => {
    it('should not generate swagger document if env is not development', async () => {
      jest.spyOn(configService, 'get').mockReturnValueOnce('production');

      await service.generateSwaggerDocument();

      expect(writeFileSync).not.toHaveBeenCalled();
    });

    it('should not generate swagger document if documentation is not enabled', async () => {
      jest.spyOn(configService, 'get').mockReturnValueOnce('development');

      await service.generateSwaggerDocument();

      expect(writeFileSync).not.toHaveBeenCalled();
    });

    it('should generate swagger document if env is development and documentation is enabled', async () => {
      jest.spyOn(configService, 'get').mockReturnValueOnce('development');
      jest.spyOn(configService, 'get').mockReturnValueOnce({
        enabled: true,
        openApiDocsPath: 'docs.yaml',
        definition: {},
      });

      await service.generateSwaggerDocument();

      expect(writeFileSync).toHaveBeenCalled();
      expect(swaggerJSDoc).toHaveBeenCalled();
    });
  });
});
