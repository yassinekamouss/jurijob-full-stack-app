import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { TooltipProvider } from '@/components/ui/tooltip';
import '../css/app.css';
import { initializeTheme } from '@/hooks/use-appearance';
import i18n, { updateI18nLocale } from '@/i18n';

const appName = import.meta.env.VITE_APP_NAME || 'JuriJob';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const locale = (props.initialPage.props.locale as string) || 'fr';
        const translations = props.initialPage.props.translations as Record<string, unknown>;
        updateI18nLocale(locale, translations);

        const root = createRoot(el);

        root.render(
            <StrictMode>
                <I18nextProvider i18n={i18n}>
                    <TooltipProvider delayDuration={0}>
                        <App {...props} />
                    </TooltipProvider>
                </I18nextProvider>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

router.on('navigate', (event) => {
    const locale = (event.detail.page.props.locale as string) || 'fr';
    const translations = event.detail.page.props.translations as Record<string, unknown>;
    updateI18nLocale(locale, translations);
});

// This will set light / dark mode on load...
initializeTheme();
