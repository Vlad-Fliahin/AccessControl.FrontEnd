import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { format as formatDate, isDate } from "date-fns";
import { enUS, uk } from "date-fns/locale"; // import all locales we need

const locales = { enUS, uk }; // used to look up the required locale

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      format: (value, format, lng) => {
        if (isDate(value)) {
            const locale = locales[lng];
            return formatDate(value, format, { locale });
        }
      }
    },
    resources: {
      en: {
        translation: {
          // here we will place our translations...
          navbar: {
              home: "Home",
              info: "Info",
              stats: "Stats",
              living: "Living",
              database: "Database",
              profiles: "Profiles",
              certificates: "Certificates",
              login: "Sign In",
              register: "Sign Up",
              logout: "Log out"
          },
          login: {
              username: "Username",
              password: "Password",
          },
          register: {
            confirmPassword: "Confirm password",
            email: "E-mail",
            firstName: "First name",
            lastName: "Last name",
            phoneNumber: "Phone number",
          },
          database: {
            backup: "",
            save: "Save",
          },
          alert: {
            register: "",
            backup: "",
          },
          students: {
              count: "Students living right now"
          }
        }
      },
      ua: {
        translation: {
          navbar: {
            home: 'Головна',
            info: 'Профіль',
            stats: "Статистика",
            living: "Проживають",
            database: "Резервні копії",
            profiles: "Користувачі",
            certificates: "Сертифікати",
            login: "Авторизуватися",
            register: "Зареєструватися",
            logout: "Вийти"
          },
          login: {
            username: "Логін",
            password: "Пароль",
            login: "Увійти"
          },
          register: {
            confirmPassword: "Підтвердіть пароль",
            email: "Пошта",
            firstName: "Ім'я",
            lastName: "Прізвище",
            phoneNumber: "Телефон",
          },
          database: {
            backup: "",
            save: "Зберегти",
          },
          alert: {
            register: "",
            backup: "",
          },
          students: {
            count: "Кількість проживаючих студентів",
        }
        }
      }
    }
  });

export default i18n;