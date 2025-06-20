
import { Translations, Language } from './types';
import { englishTranslations } from './en';

// For now, using English as fallback for all other languages
const spanishTranslations: Translations = { ...englishTranslations };
const frenchTranslations: Translations = { ...englishTranslations };
const japaneseTranslations: Translations = { ...englishTranslations };
const koreanTranslations: Translations = { ...englishTranslations };
const chineseTranslations: Translations = { ...englishTranslations };

export const translations = {
  en: englishTranslations,
  es: spanishTranslations,
  fr: frenchTranslations,
  ja: japaneseTranslations,
  ko: koreanTranslations,
  zh: chineseTranslations
};

export { type Translations, type Language } from './types';
