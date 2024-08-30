import { Repository } from 'typeorm';
import { CompanyEntity } from '@core/company/entities';
import { resourceFactory } from './resources';
import { AdminModuleOptions } from './types';
import { UserEntity, PasswordEntity } from '@core/user/entities';

export const adminModuleFactory = (
  companyRepository: Repository<CompanyEntity>,
  userRepository: Repository<UserEntity>,
  passwordRepository: Repository<PasswordEntity>,
): AdminModuleOptions => ({
  adminJsOptions: {
    rootPath: '/admin',
    resources: resourceFactory(
      companyRepository,
      userRepository,
      passwordRepository,
    ),
  },
});
