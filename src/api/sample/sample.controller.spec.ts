import { Test, TestingModule } from '@nestjs/testing';
import { SampleController } from './sample.controller';

describe('AppController', () => {
  let sampleController: SampleController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SampleController],
    }).compile();

    sampleController = app.get<SampleController>(SampleController);
  });

  describe('testRoute', () => {
    it('should test sample route v1', () => {
      expect(sampleController.testRoute()).toEqual({
        sample: true,
      });
    });

    it('should test sample route v2', () => {
      expect(sampleController.testRouteV2()).toEqual({
        sampleV2: 'v2',
      });
    });
  });
});
