import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureFlagService } from './modules/feature-flag/feature-flag.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: FeatureFlagService,
          useValue: {
            flags: {},
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('getAppInfo', () => {
    it('should return app info', async () => {
      const appInfo = 'Your app info'; // Replace with the expected app info

      jest.spyOn(appService, 'getAppInfo').mockResolvedValue(appInfo);

      const result = await appController.getAppInfo();

      expect(result).toBe(appInfo);
    });
  });
});
