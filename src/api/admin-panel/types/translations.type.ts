import { LocaleTranslationsBlock } from 'adminjs/types/src';

enum SupportedLanguages {
  RU = 'RU',
  EN = 'EN',
}

export type Translations = Partial<
  Record<SupportedLanguages, LocaleTranslationsBlock>
>;
