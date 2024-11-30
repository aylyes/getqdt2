import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Initialize i18next
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    // Add these options to prevent suspense issues
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
    },

    // Load all namespaces on init
    ns: [
      'common',
      'auth',
      'errors',
      'pages',
      'cloud/jobs',
      'cloud/connectors',
      'cloud/scenarios'
    ],
    defaultNS: 'common',

    // Preload languages
    preload: ['en', 'fr'],
  });

export default i18n;