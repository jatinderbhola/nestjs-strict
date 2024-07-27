import { Test, TestingModule } from '@nestjs/testing';
import { FeatureFlagService } from './feature-flag';

describe('FeatureFlagService', () => {
  let provider: FeatureFlagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeatureFlagService],
    }).compile();

    provider = module.get<FeatureFlagService>(FeatureFlagService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
