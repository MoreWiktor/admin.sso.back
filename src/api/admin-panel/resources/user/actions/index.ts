import { PasswordEntity, UserEntity } from '@core/user/entities';
import { ResourceOptions } from 'adminjs';
import { Repository } from 'typeorm';
import { newUserActionFactory } from './new.action';

export const getActions = (
  userRepository: Repository<UserEntity>,
  passwordRepository: Repository<PasswordEntity>,
): ResourceOptions['actions'] => ({
  new: newUserActionFactory(userRepository, passwordRepository),
});
