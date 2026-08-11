import { router, usePage } from '@inertiajs/react';
import { useTransition } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
    className?: string;
}

export function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
    const { props } = usePage();
    const currentLocale = (props.locale as string) || 'fr';
    const [isPending, startTransition] = useTransition();
    const { t } = useTranslation();

    const handleSwitch = (newLocale: 'fr' | 'en') => {
        if (newLocale === currentLocale || isPending) return;

        startTransition(() => {
            router.post(
                `/locale/${newLocale}`,
                {},
                {
                    preserveState: false,
                    preserveScroll: true,
                    onSuccess: () => {
                        window.location.reload();
                    },
                },
            );
        });
    };

    return (
        <div className={`inline-flex items-center gap-1 text-xs font-medium ${className}`}>
            <button
                type="button"
                onClick={() => handleSwitch('fr')}
                disabled={isPending || currentLocale === 'fr'}
                aria-label={t('language.french', 'Français')}
                className={`px-2 py-1 transition-colors ${
                    currentLocale === 'fr'
                        ? 'font-bold text-[#1a1f1e] underline underline-offset-4'
                        : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e]'
                }`}
            >
                FR
            </button>
            <span className="text-[#1a1f1e]/30">|</span>
            <button
                type="button"
                onClick={() => handleSwitch('en')}
                disabled={isPending || currentLocale === 'en'}
                aria-label={t('language.english', 'English')}
                className={`px-2 py-1 transition-colors ${
                    currentLocale === 'en'
                        ? 'font-bold text-[#1a1f1e] underline underline-offset-4'
                        : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e]'
                }`}
            >
                EN
            </button>
        </div>
    );
}

export default LanguageSwitcher;
