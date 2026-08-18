import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    ogLocale?: string;
    jsonLd?: Record<string, any> | Record<string, any>[];
    noindex?: boolean;
}

export default function SEO({
    title,
    description,
    canonical,
    ogImage = 'https://jurijob.ma/logo-512x512.png',
    ogType = 'website',
    ogLocale,
    jsonLd,
    noindex = false,
}: SEOProps) {
    const { i18n } = useTranslation();
    const fullTitle = title.includes('JuriJob') ? title : `${title} | JuriJob`;
    const defaultCanonical = typeof window !== 'undefined' ? window.location.href : (canonical || 'https://jurijob.ma');
    const currentCanonical = canonical || defaultCanonical;
    const computedOgLocale = ogLocale || (i18n.language === 'en' ? 'en_US' : 'fr_FR');

    return (
        <Head title={title}>
            <meta name="description" content={description} />
            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow" />
            )}
            <link rel="canonical" href={currentCanonical} />

            {/* Open Graph Tags */}
            <meta property="og:site_name" content="JuriJob" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={currentCanonical} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:secure_url" content={ogImage} />
            <meta property="og:image:width" content="512" />
            <meta property="og:image:height" content="512" />
            <meta property="og:image:alt" content="JuriJob - Smart Recrutement Juridique" />
            <meta property="og:locale" content={computedOgLocale} />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:image:alt" content="JuriJob - Smart Recrutement Juridique" />

            {/* Structured Data (JSON-LD) */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Head>
    );
}
