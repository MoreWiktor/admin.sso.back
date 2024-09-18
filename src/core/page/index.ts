import {
  BackgroundEntity,
  ButtonEntity,
  FieldEntity,
  FormEntity,
  PageEntity,
  StylePatternEntity,
} from './entities';
import { PageService } from './services';

export const pageProviders = [PageService];
export const pageExports = [PageService];
export const pageEntities = [
  BackgroundEntity,
  ButtonEntity,
  FieldEntity,
  FormEntity,
  PageEntity,
  StylePatternEntity,
];
