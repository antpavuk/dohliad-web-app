import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationUA from './locales/ua/translation.json';

//set i18n-js config
i18n.use(initReactI18next).init(
  {
    resources: {
      en: {
        translation: translationEN
      },
      ua: {
        translation: translationUA
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: true
    },
    compatibilityJSON: 'v3'
  },
  (err, t) => {
    console.log(err, t);
  }
);
export default i18n;
