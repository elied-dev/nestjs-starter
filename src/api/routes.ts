import { Routes } from '@nestjs/core';
import { ApiV1Module } from './api-v1.module';
import { SampleModule } from './sample/sample.module';

export const routes: Routes = [
  {
    path: 'api/v1',
    module: ApiV1Module,
    children: [
      {
        path: 'sample',
        module: SampleModule,
      },
    ],
  },
];
