import { InfraModule } from '@infra/IoCC/infra/infra.module';
import { ApiModule } from './api';
import { CoreModule } from './core';

export const appModules = [ApiModule, CoreModule, InfraModule];
export * from './app.module';
