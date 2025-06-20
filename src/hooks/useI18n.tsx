
import { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations, type Translations } from '../utils/i18n';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to get saved language from localStorage
    const saved = localStorage.getItem('loglings-language');
    if (saved && saved in translations) {
      return saved as Language;
    }
    
    // Try to detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('zh')) return 'zh';
    
    return 'en'; // Default fallback
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('loglings-language', lang);
  };

  const t = translations[language];

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    console.error('useI18n must be used within an I18nProvider');
    // Return fallback values to prevent crash
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: translations.en
    };
  }
  return context;
};
