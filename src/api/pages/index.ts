import { InitPagesController } from './controllers';
import { GetPageInitDataUseCase } from './use-case';
import { GetPageInitDataProfile, PageInitDataProfile } from './profiles';

export const pageControllers = [InitPagesController];
export const pageProviders = [
  GetPageInitDataUseCase,
  GetPageInitDataProfile,
  PageInitDataProfile,
];
