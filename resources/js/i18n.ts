import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from '../../lang/fr.json';
import en from '../../lang/en.json';

const defaultResources = {
    fr: { translation: fr },
    en: { translation: en },
};

if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
        resources: defaultResources,
        lng: 'fr',
        fallbackLng: 'fr',
        interpolation: {
            escapeValue: false,
        },
        react: {
            useSuspense: false,
        },
    });
}

/**
 * Synchronize i18n instance with Inertia shared props.
 */
export function updateI18nLocale(locale: string, translations?: Record<string, unknown>): void {
    if (!locale) {
        return;
    }

    if (translations && Object.keys(translations).length > 0) {
        i18n.addResourceBundle(locale, 'translation', translations, true, true);
    }

    if (i18n.language !== locale) {
        i18n.changeLanguage(locale);
    } else {
        i18n.emit('languageChanged', locale);
    }

    if (typeof document !== 'undefined') {
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    }
}

export default i18n;
