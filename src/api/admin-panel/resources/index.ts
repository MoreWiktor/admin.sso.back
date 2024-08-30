import { ResourceWithOptions } from 'adminjs';
import { Repository } from 'typeorm';
import { PasswordEntity, UserEntity } from '@core/user/entities';
import { CompanyEntity } from '@core/company/entities';
import { userResourceFactory } from './user';
import { companyResourceFactory } from './company';

export const resourceFactory = (
  companyRepository: Repository<CompanyEntity>,
  userRepository: Repository<UserEntity>,
  passwordRepository: Repository<PasswordEntity>,
): ResourceWithOptions[] => [
  companyResourceFactory(companyRepository),
  userResourceFactory(userRepository, passwordRepository),
];
