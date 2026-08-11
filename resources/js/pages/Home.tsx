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

const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': 'https://jurijob.ma/#organization',
            name: 'JuriJob',
            url: 'https://jurijob.ma',
            logo: 'https://jurijob.ma/logo-512x512.png',
            description:
                "Plateforme spécialisée dans le sourcing et la sélection de tous les profils et experts du droit au Maroc et en Afrique francophone.",
            parentOrganization: {
                '@type': 'Organization',
                name: 'Sentissi Legal Advisory',
                url: 'https://sentissilegal.com/'
            },
            sameAs: [
                'https://sentissilegal.com/'
            ],
            founder: {
                '@type': 'Person',
                '@id': 'https://jurijob.ma/#founder',
                name: 'Mohammed Sentissi',
                jobTitle: 'Expert Juridique & Fondateur',
                description: 'Expert juridique, ex-Directeur juridique de holdings au Maroc et en Afrique...',
                worksFor: {
                    '@type': 'Organization',
                    name: 'Sentissi Legal Advisory'
                },
                sameAs: [
                    'https://www.linkedin.com/in/mohammed-sentissi/'
                ]
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
            publisher: {
                '@id': 'https://jurijob.ma/#organization',
            },
        },
    ],
};

export default function Home() {
    return (
        <div
            className="relative flex min-h-screen flex-col overflow-clip bg-[#FDFCF8] text-[#1a1f1e]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
            <SEO
                title="JuriJob - Sourcing & Recrutement Juridique au Maroc & Afrique Francophone"
                description="Plateforme spécialisée dans le sourcing et la sélection de juristes d'affaires, avocats et experts du droit au Maroc et en Afrique francophone. Short-lists qualifiées sous 48h."
                canonical="https://jurijob.ma"
                jsonLd={homeJsonLd}
            />

            <Header />

            <main className="w-full flex-1 pt-12">
                <Hero />
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