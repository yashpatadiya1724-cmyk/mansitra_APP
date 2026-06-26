import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@data/i18n/en.json'
import hi from '@data/i18n/hi.json'
import gu from '@data/i18n/gu.json'
import mr from '@data/i18n/mr.json'
import bn from '@data/i18n/bn.json'
import ta from '@data/i18n/ta.json'
import te from '@data/i18n/te.json'
import kn from '@data/i18n/kn.json'
import ml from '@data/i18n/ml.json'
import pa from '@data/i18n/pa.json'
import hg from '@data/i18n/hg.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    gu: { translation: gu },
    mr: { translation: mr },
    bn: { translation: bn },
    ta: { translation: ta },
    te: { translation: te },
    kn: { translation: kn },
    ml: { translation: ml },
    pa: { translation: pa },
    hg: { translation: hg },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
