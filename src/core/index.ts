import { serviceEntities } from './service';
import { companyEntities } from './company';
import { userEntities } from './user';
import { pageEntities } from './page';

export const entities = [
  ...companyEntities,
  ...serviceEntities,
  ...userEntities,
  ...pageEntities,
];
