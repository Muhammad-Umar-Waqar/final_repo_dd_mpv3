import React from 'react';
import { useRouter } from 'next/router';
import { enTranslations } from '../locales/en';
import { esTranslations } from '../locales/es';

const translations = {
  'en': enTranslations,
  'es': esTranslations
};

// Map URL locales to database locales
const databaseLocales = {
  'en': 'en-us',
  'es': 'es-es'
};

export const useTranslations = () => {
  const router = useRouter();
  const { locale = 'en', defaultLocale = 'en' } = router;

  // Get the database locale for queries
  const getDatabaseLocale = React.useCallback((urlLocale) => {
    return databaseLocales[urlLocale] || urlLocale;
  }, []);

  const t = React.useCallback((key) => {
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
  }, [locale, defaultLocale]);

  const changeLanguage = React.useCallback((newLocale) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  }, [router]);

  return {
    t,
    locale,
    changeLanguage,
    getDatabaseLocale
  };
};
