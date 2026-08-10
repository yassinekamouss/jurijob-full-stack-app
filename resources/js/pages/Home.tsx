import { useEffect } from 'react';
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

export default function Home() {
    useEffect(() => {
        const link = document.createElement('link');

        link.href =
            'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap';

        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    return (
        <div
            className="relative flex min-h-screen flex-col overflow-clip bg-[#FDFCF8] text-[#1a1f1e]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
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