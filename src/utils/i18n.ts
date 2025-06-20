
export type Language = 'en' | 'es' | 'fr' | 'ja' | 'ko' | 'zh';

export const languageNames = {
  en: 'English',
  es: 'Español', 
  fr: 'Français',
  ja: '日本語',
  ko: '한국어',
  zh: '中文'
};

export const getLanguageFlag = (lang: Language): string => {
  const flags = {
    en: '🇺🇸',
    es: '🇪🇸',
    fr: '🇫🇷', 
    ja: '🇯🇵',
    ko: '🇰🇷',
    zh: '🇨🇳'
  };
  return flags[lang];
};

export { type Translations, translations } from './translations';
