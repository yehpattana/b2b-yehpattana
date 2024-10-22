// Import i18next and types
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import language files
import translationEN from '../../locales/en.json';
import translationTH from '../../locales/th.json'

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      th: { translation: translationTH }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
