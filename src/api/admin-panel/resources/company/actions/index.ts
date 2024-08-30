import { CompanyEntity } from '@core/company/entities';
import { ResourceOptions } from 'adminjs';
import { Repository } from 'typeorm';
import { newCompanyActionFactory } from './new.action';

export const getCompanyActions = (
  companyRepository: Repository<CompanyEntity>,
): ResourceOptions['actions'] => ({
  new: newCompanyActionFactory(companyRepository),
});
