import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Sample')
@Controller()
export class SampleController {
  @Version('1')
  @Get('')
  testRoute() {
    return {
      sample: true,
    };
  }

  @Version('2')
  @Get('')
  testRouteV2() {
    return {
      sampleV2: 'v2',
    };
  }
}
