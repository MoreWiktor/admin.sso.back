import { LocaleTranslationsBlock, PropertyOptions } from 'adminjs';

export type FieldsResourceOptions<T> = Partial<{
  listProperties: (keyof T)[];
  editProperties: (keyof T)[];
  filterProperties: (keyof T)[];
  showProperties: (keyof T)[];
  titleProperty: keyof T;
  properties: Partial<Record<keyof T, PropertyOptions>>;
  translations: {
    [language: string]: LocaleTranslationsBlock;
  };
}>;
