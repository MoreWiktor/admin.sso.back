import { FieldsResourceOptions } from '@api/admin-panel/types';
import { UserEntity } from '@core/user/entities';
import { PropertyOptions } from 'adminjs';

export const properties: Partial<Record<keyof UserEntity, PropertyOptions>> = {
  id: {
    type: 'uuid',
    description: 'ID пользователя',
    position: 0,
    isSortable: false,
    isRequired: true,
    isId: true,
  },
  email: {
    type: 'string',
    description: 'email пользователя',
    position: 1,
    isSortable: false,
    isRequired: true,
  },
  firstname: {
    type: 'string',
    description: 'Имя пользователя',
    position: 2,
    isSortable: false,
    isRequired: true,
  },
  lastname: {
    type: 'string',
    description: 'Фамилия пользователя',
    position: 3,
    isSortable: false,
    isRequired: true,
  },
  company: {
    type: 'string',
    description: 'Компания',
    position: 4,
    isSortable: false,
    isRequired: true,
  },
  createdAt: {
    type: 'datetime',
    description: 'Создано',
    position: 5,
  },
  updatedAt: {
    type: 'datetime',
    description: 'Редактровано',
    position: 6,
  },
};

export const fields: FieldsResourceOptions<UserEntity> = {
  properties,
  listProperties: ['email', 'createdAt', 'updatedAt'],
  editProperties: ['email', 'firstname', 'lastname', 'company'],
  filterProperties: [
    'email',
    'firstname',
    'lastname',
    'createdAt',
    'updatedAt',
  ],
  showProperties: [
    'id',
    'email',
    'firstname',
    'lastname',
    'company',
    'createdAt',
    'updatedAt',
  ],
  titleProperty: 'email',
};
