import { Routes } from 'nest-router';
import { CardTokenizationModule } from './card-tokenization/card-tokenization.module';

export const routes:Routes = [
  {
    path: '/apiv1',
    children: [
      {
        path: '/',
        module: CardTokenizationModule
      }
    ]
  }
]