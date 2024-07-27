import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AppModule } from './app.module';
import { bootstrap } from './main';

describe('bootstrap', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should start the application', async () => {
    await bootstrap();

    expect(app).toBeDefined();
    expect(app.getHttpServer()).toBeDefined();
  });
});
