import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { TooltipProvider } from '@/components/ui/tooltip';
import i18n, { updateI18nLocale } from '@/i18n';

const appName = import.meta.env.VITE_APP_NAME || 'JuriJob';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => {
            if (!title) return appName;
            return title.toLowerCase().includes(appName.toLowerCase())
                ? title
                : `${title} - ${appName}`;
        },
        resolve: (name) =>
            resolvePageComponent(
                `./pages/${name}.tsx`,
                import.meta.glob('./pages/**/*.tsx'),
            ),
        setup: ({ App, props }) => {
            const locale = (props.initialPage.props.locale as string) || 'fr';
            const translations = props.initialPage.props.translations as Record<string, unknown>;
            updateI18nLocale(locale, translations);

            return (
                <I18nextProvider i18n={i18n}>
                    <TooltipProvider delayDuration={0}>
                        <App {...props} />
                    </TooltipProvider>
                </I18nextProvider>
            );
        },
    }),
);
