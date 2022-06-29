import { Routes } from '@nestjs/core';
import { ApiModule } from './api.module';
import { SampleModule } from './sample/sample.module';

export const routes: Routes = [
  {
    path: 'api',
    module: ApiModule,
    children: [
      {
        path: 'sample',
        module: SampleModule,
      },
    ],
  },
];
