import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import type { DisplayCategory } from './categoryConfig';

export const SUPPORTED_LANGS = ['en', 'ml', 'hi'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

/** Map i18n lang code → SpeechRecognition locale + speechSynthesis voice locale. */
export function recognitionLocale(lang: string): string {
  if (lang.startsWith('ml')) return 'ml-IN';
  if (lang.startsWith('hi')) return 'hi-IN';
  return 'en-IN';
}

const resources = {
  en: {
    translation: {
      app: { title: 'Tourism Intel' },
      categories: {
        all: 'All',
        transport: 'Transport',
        meals: 'Meals',
        boating: 'Boating',
        rentals: 'Rentals',
        hospitals: 'Hospitals',
      },
      buttons: {
        addBill: 'Add Bill',
        stampGps: 'Stamp GPS',
        cancel: 'Cancel',
        submit: 'Submit & Recalculate Band',
        merchantPortal: 'Merchant Portal',
        backToMap: 'Back to Map',
      },
      chat: {
        title: 'Ask Vallikavu AI',
        placeholder: 'Ask about food, buses, fares, places...',
        send: 'Send',
        listening: 'Listening…',
        speak: 'Speak',
        botGreeting: 'Hello! Ask me about places, prices, buses, or things to know around Vallikavu.',
        notSupported: 'Voice input is not supported in this browser.',
        chooseLang: 'Language',
      },
    },
  },
  ml: {
    translation: {
      app: { title: 'ടൂറിസം ഇൻ്റലിജൻസ്' },
      categories: {
        all: 'എല്ലാം',
        transport: 'യാത്ര',
        meals: 'ഭക്ഷണം',
        boating: 'ബോട്ടിംഗ്',
        rentals: 'വാടകയ്ക്ക്',
        hospitals: 'ആശുപത്രികൾ',
      },
      buttons: {
        addBill: 'ബിൽ ചേർക്കുക',
        stampGps: 'ജിപിഎസ് രേഖപ്പെടുത്തുക',
        cancel: 'റദ്ദാക്കുക',
        submit: 'സമർപ്പിച്ച് വില പുനഃകണക്കാക്കുക',
        merchantPortal: 'വ്യാപാരി പോർട്ടൽ',
        backToMap: 'മാപ്പിലേക്ക് മടങ്ങുക',
      },
      chat: {
        title: 'വള്ളിക്കാവ് എഐ ചോദിക്കൂ',
        placeholder: 'ഭക്ഷണം, ബസുകൾ, നിരക്കുകൾ, സ്ഥലങ്ങൾ...',
        send: 'അയയ്ക്കുക',
        listening: 'കേൾക്കുന്നു…',
        speak: 'സംസാരിക്കുക',
        botGreeting: 'നമസ്കാരം! വള്ളിക്കാവിന് ചുറ്റുമുള്ള സ്ഥലങ്ങൾ, വിലകൾ, ബസുകൾ എന്നിവയെ കുറിച്ച് ചോദിക്കൂ.',
        notSupported: 'ഈ ബ്രൗസറിൽ ശബ്ദ ഇൻപുട്ട് പിന്തുണയ്ക്കുന്നില്ല.',
        chooseLang: 'ഭാഷ',
      },
    },
  },
  hi: {
    translation: {
      app: { title: 'पर्यटन इंटेलिजेंस' },
      categories: {
        all: 'सभी',
        transport: 'परिवहन',
        meals: 'भोजन',
        boating: 'नौकायन',
        rentals: 'किराया',
        hospitals: 'अस्पताल',
      },
      buttons: {
        addBill: 'बिल जोड़ें',
        stampGps: 'जीपीएस दर्ज करें',
        cancel: 'रद्द करें',
        submit: 'जमा करें और दर पुनर्गणना करें',
        merchantPortal: 'व्यापारी पोर्टल',
        backToMap: 'मानचित्र पर लौटें',
      },
      chat: {
        title: 'वल्लीकावु एआई से पूछें',
        placeholder: 'भोजन, बसें, किराया, स्थान...',
        send: 'भेजें',
        listening: 'सुन रहा है…',
        speak: 'बोलें',
        botGreeting: 'नमस्ते! वल्लीकावु के आसपास के स्थानों, कीमतों, बसों के बारे में पूछें।',
        notSupported: 'इस ब्राउज़र में वॉइस इनपुट समर्थित नहीं है।',
        chooseLang: 'भाषा',
      },
    },
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: [...SUPPORTED_LANGS],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

/** Translate a display category to the active language. */
export function categoryLabel(cat: DisplayCategory): string {
  const keyMap: Record<DisplayCategory, string> = {
    TRANSPORT: 'transport',
    MEALS: 'meals',
    BOATS: 'boating',
    RENTALS: 'rentals',
    HOSPITALS: 'hospitals',
  };
  return i18n.t(`categories.${keyMap[cat]}`);
}

export default i18n;