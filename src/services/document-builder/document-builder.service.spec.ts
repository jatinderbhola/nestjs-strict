import { Test, TestingModule } from '@nestjs/testing';
import { DocumentBuilder } from './document-builder.service';

describe('DocumentBuilder', () => {
  let service: DocumentBuilder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentBuilder],
    }).compile();

    service = module.get<DocumentBuilder>(DocumentBuilder);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
