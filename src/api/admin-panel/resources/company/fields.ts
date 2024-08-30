import { PropertyOptions } from 'adminjs';
import { FieldsResourceOptions } from '@api/admin-panel/types';
import { CompanyEntity } from '@core/company/entities';
import { Translations } from '@api/admin-panel/types';

export const properties: Partial<Record<keyof CompanyEntity, PropertyOptions>> =
  {
    id: {
      type: 'uuid',
      description: 'ID компании',
      position: 0,
      isSortable: false,
      isRequired: true,
      isId: true,
    },
    title: {
      type: 'string',
      description: 'Название компании',
      position: 1,
      isRequired: true,
    },
    secretString: {
      type: 'string',
      description: 'Ключ интеграции',
      position: 2,
      isSortable: false,
      isRequired: false,
      isDisabled: true,
    },
    createdAt: {
      type: 'datetime',
      description: 'Создано',
      position: 3,
    },
    updatedAt: {
      type: 'datetime',
      description: 'Редактровано',
      position: 4,
    },
  };

const translations: Translations = {};

export const fields: FieldsResourceOptions<CompanyEntity> = {
  properties,
  listProperties: ['title', 'createdAt', 'updatedAt'],
  editProperties: ['title', 'secretString'],
  filterProperties: ['title', 'createdAt', 'updatedAt'],
  showProperties: ['id', 'title', 'secretString', 'createdAt', 'updatedAt'],
  titleProperty: 'title',
  translations,
};
