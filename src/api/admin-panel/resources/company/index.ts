import { CompanyEntity } from '@core/company/entities';
import { ResourceWithOptions } from 'adminjs';
import { Repository } from 'typeorm';
import { getCompanyActions } from './actions';
import { fields } from './fields';
import { navigations } from '@api/admin-panel/navigation';

export const companyResourceFactory = (
  companyRepository: Repository<CompanyEntity>,
): ResourceWithOptions => ({
  resource: CompanyEntity,
  options: {
    id: 'Company',
    navigation: navigations.main,
    sort: {
      direction: 'asc',
      sortBy: 'createdAt',
    },
    ...fields,
    // actions: getCompanyActions(companyRepository),
  },
});
