import { PasswordEntity, UserEntity } from '@core/user/entities';
import { ResourceWithOptions } from 'adminjs';
import { Repository } from 'typeorm';
import { getActions } from './actions';
import { fields } from './fields';
import { navigations } from '@api/admin-panel/navigation';

export const userResourceFactory = (
  userRepository: Repository<UserEntity>,
  passwordRepository: Repository<PasswordEntity>,
): ResourceWithOptions => ({
  resource: UserEntity,
  options: {
    id: 'User',
    navigation: navigations.main,
    sort: {
      direction: 'asc',
      sortBy: 'createdAt',
    },
    ...fields,
    actions: getActions(userRepository, passwordRepository),
  },
});
