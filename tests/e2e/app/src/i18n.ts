import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import messagesEn from './locales/en/messages.json';
import dashboardEn from './locales/en/dashboard.json';
import fruitsEn from './locales/en/fruits.json';
import greetingEn from './locales/en/greeting.json';
import jsonTranslationsEn from './locales/en/json-translations.json';
import complexEn from './locales/en/complex.json';
import messagesEs from './locales/es/messages.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        messages: messagesEn,
        dashboard: dashboardEn,
        fruits: fruitsEn,
        greeting: greetingEn,
        'json-translations': jsonTranslationsEn,
        complex: complexEn,
      },
      es: {
        messages: messagesEs,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    ns: ['messages', 'dashboard', 'fruits', 'greeting', 'json-translations', 'complex'],
    defaultNS: 'messages',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
