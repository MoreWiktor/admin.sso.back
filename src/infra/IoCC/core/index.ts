import { CompanyCoreModule } from './company';
import { ServiceCoreModule } from './service';
import { UserCoreModule } from './user';
import { PageCoreModule } from './page';

export const coreModules = [
  CompanyCoreModule,
  ServiceCoreModule,
  UserCoreModule,
  PageCoreModule,
];
export * from './core.module';
