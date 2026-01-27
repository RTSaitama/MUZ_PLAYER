import i18n from "i18next";
import { initReactI18next } from "react-i18next";
 

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'HERO HEADING':'WHAT\`S NEW?',
          'library':'library',
          'genre':'genre',
          'discover':'discover',
          'top charts': 'top charts',
          'podcast': 'podcast',
          'favourites': 'favourites',
          'playlist': 'playlist',
          'latest albums': 'latest albums',
          'latest songs': 'latest songs',
          'TOP ALBUMS': 'TOP ALBUMS',
          'podcasts loading': 'podcasts loading',
          'podcast not found': 'podcast not found',
          'tracks loading':  'tracks loading',
          'albums loading':  'albums loading',
        }
      },
      ua: {
        translation: {
          'HERO HEADING':'Що нового?',
          'library':'бібліотека',
          'genre': 'жанри',
          'discover':'шукай натхнення',
          'top charts': 'чарти',
          'podcast': 'подкасти',
          'favourites': 'улюблені',
          'playlist': 'плейлісти',
          'latest albums': 'свіжі альбоми ',
          'latest songs': 'свіжі пісні ',
          'TOP ALBUMS': 'ТОП АЛЬБОМИ ',
          'podcasts loading': 'завантаження підкастів',
          'podcast not found': 'підкаст не знайдено',
          'tracks loading':  'завантаження треків',
          'albums loading':  'завантаження альбомів',

        }
      }
    },

    lng: "en",
    fallbackLng: "ua",

    interpolation: {
      escapeValue: false
    }
  });

 
export default i18n;