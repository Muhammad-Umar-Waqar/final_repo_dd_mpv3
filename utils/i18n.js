// utils/i18n.js
import { useRouter } from 'next/router';
import { enTranslations } from '../locales/en';
import { esTranslations } from '../locales/es';

const translations = {
  en: enTranslations,
  es: esTranslations
};

export const useTranslations = () => {
  const router = useRouter();
  const { locale = 'en', defaultLocale = 'en' } = router;

  const t = (key) => {
    const currentTranslations = translations[locale] || translations[defaultLocale];
    const keys = key.split('.');
    let result = currentTranslations;
    
    for (const k of keys) {
      result = result?.[k];
      if (!result) {
        // If translation is not found, return last part of the key
        return keys[keys.length - 1];
      }
    }

    return result;
  };

  const changeLanguage = (newLocale) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return {
    t,
    locale,
    changeLanguage
  };
};