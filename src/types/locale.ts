export type Locale = 'ru' | 'en';

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'en', name: 'English', nativeName: 'English' }
];

export const DEFAULT_LOCALE: Locale = 'ru';