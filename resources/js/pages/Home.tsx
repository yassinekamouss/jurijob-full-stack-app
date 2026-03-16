import { useEffect } from 'react';
import About from '@/components/home/About';
import CallToAction from '@/components/home/CallToAction';
import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import Pricing from '@/components/home/Pricing';
import Testimonials from '@/components/home/Testimonials';
import WhyChooseUs from '@/components/home/WhyChooseUs';

export default function Home() {
    useEffect(() => {
        // Preload Outfit Font if not already
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    return (
        <div className="min-h-screen text-zinc-900 flex flex-col relative overflow-clip" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {/* Soft Organic Grain Texture */}
            <div className="pointer-events-none fixed inset-0 z-[100] mix-blend-multiply opacity-[0.25]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            
            <Header />
            <main className="flex-1 w-full pt-12">
                <Hero />
                <WhyChooseUs />
                <HowItWorks />
                <Testimonials />
                <Pricing />
                <About />
            </main>
            <CallToAction />
            <Footer />
        </div>
    );
}
