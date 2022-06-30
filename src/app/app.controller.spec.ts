import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('GET /', () => {
    it('should return root message', () => {
      expect(appController.getRoot()).toEqual({ message: 'App running...' });
    });
  });

  describe('GET /ping', () => {
    it('should return ping message', () => {
      expect(appController.ping()).toEqual({ ping: 'pong' });
    });
  });

  describe('GET /error/:status_code', () => {
    const generateError = (num: number) => {
      try {
        appController.error(num);
      } catch (err) {
        expect(err.message).toBe('Generating error ' + num);
        expect(err.status).toEqual(num);
      }
    };

    it('should return 404 error message', () => {
      generateError(404);
    });

    it('should return 401 error message', () => {
      generateError(401);
    });

    it('should return 500 error message', () => {
      generateError(500);
    });
  });
});
