import { serviceEntities } from './service';
import { companyEntities } from './company';
import { userEntities } from './user';

export const entities = [
  ...companyEntities,
  ...serviceEntities,
  ...userEntities,
];
