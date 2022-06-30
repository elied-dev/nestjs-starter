import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app/app.module';
import { ApiModule } from '../src/api/api.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ApiModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({ message: 'App running...' });
  });

  it('/ping (GET)', () => {
    return request(app.getHttpServer())
      .get('/ping')
      .expect(200)
      .expect({ ping: 'pong' });
  });

  describe('error/:status_code', () => {
    const testErrorCode = (num: number) =>
      request(app.getHttpServer()).get(`/error/${num}`).expect(num);
    it('/error/404 (GET)', async () => {
      return testErrorCode(404);
    });

    it('/error/500 (GET)', async () => {
      return testErrorCode(500);
    });

    it('/error/401 (GET)', async () => {
      return testErrorCode(401);
    });
  });
});
