import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { updateI18nLocale } from '@/i18n';

export function useI18nSync(): void {
    const { locale, translations } = usePage().props as {
        locale?: string;
        translations?: Record<string, unknown>;
    };

    useEffect(() => {
        if (locale && translations) {
            updateI18nLocale(locale, translations);
        }
    }, [locale, translations]);
}

export default useI18nSync;
