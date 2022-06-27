import { Controller, Get } from '@nestjs/common';

@Controller()
export class SampleController {
  @Get('')
  testRoute() {
    return {
      sample: true,
    };
  }
}
