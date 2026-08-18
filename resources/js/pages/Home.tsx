import { useTranslation } from 'react-i18next';
import About from '@/components/home/About';
import CallToAction from '@/components/home/CallToAction';
import FounderMessage from '@/components/home/FounderMessage';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import Pricing from '@/components/home/Pricing';
import Testimonials from '@/components/home/Testimonials';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import SEO from '@/components/SEO';

type Props = {
    activeCandidats: number;
};

export default function Home({ activeCandidats }: Props) {
    const { t, i18n } = useTranslation();

    const homeJsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': 'https://jurijob.ma/#organization',
                name: 'JuriJob',
                url: 'https://jurijob.ma',
                logo: 'https://jurijob.ma/logo-512x512.png',
                description: t('home.seo.jsonld.org_description'),
                parentOrganization: {
                    '@type': 'Organization',
                    name: 'Sentissi Legal Advisory',
                    url: 'https://sentissilegal.com/',
                },
                sameAs: ['https://sentissilegal.com/'],
                founder: {
                    '@type': 'Person',
                    '@id': 'https://jurijob.ma/#founder',
                    name: 'Mohammed Sentissi',
                    jobTitle: t('home.seo.jsonld.founder_job_title'),
                    description: t('home.seo.jsonld.founder_description'),
                    worksFor: {
                        '@type': 'Organization',
                        name: 'Sentissi Legal Advisory',
                    },
                    sameAs: ['https://www.linkedin.com/in/mohammed-sentissi/'],
                },
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Casablanca',
                    addressCountry: 'MA',
                },
                contactPoint: {
                    '@type': 'ContactPoint',
                    email: 'recrutement@sentissilegal.com',
                    contactType: 'customer service',
                },
            },
            {
                '@type': 'WebSite',
                '@id': 'https://jurijob.ma/#website',
                url: 'https://jurijob.ma',
                name: 'JuriJob',
                inLanguage: i18n.language,
                publisher: {
                    '@id': 'https://jurijob.ma/#organization',
                },
            },
        ],
    };

    return (
        <div
            className="relative flex min-h-screen flex-col overflow-clip bg-[#FDFCF8] text-[#1a1f1e]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
            <SEO
                title={t('home.seo.title')}
                description={t('home.seo.description')}
                canonical="https://jurijob.ma"
                jsonLd={homeJsonLd}
            />

            <Header />

            <main className="w-full flex-1 pt-12">
                <Hero activeCandidats={activeCandidats} />
                <WhyChooseUs />
                <HowItWorks />
                <Testimonials />
                <Pricing />
                <About />
                <FounderMessage />
            </main>

            <CallToAction />
            <Footer />
        </div>
    );
}