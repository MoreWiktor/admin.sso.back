import { CompanyCoreModule } from './company';
import { ServiceCoreModule } from './service';
import { UserCoreModule } from './user';

export const coreModules = [
  CompanyCoreModule,
  ServiceCoreModule,
  UserCoreModule,
];
export * from './core.module';
