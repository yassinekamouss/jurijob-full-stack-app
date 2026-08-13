import { Scale, CheckCircle, Shield, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/home/Reveal';

export default function WhyChooseUs() {
    const { t } = useTranslation();

    const features = [
        {
            symbol: <Scale />,
            title: t('home.why_choose_us.feature1.title'),
            description: t('home.why_choose_us.feature1.description'),
        },
        {
            symbol: <CheckCircle />,
            title: t('home.why_choose_us.feature2.title'),
            description: t('home.why_choose_us.feature2.description'),
        },
        {
            symbol: <Shield />,
            title: t('home.why_choose_us.feature3.title'),
            description: t('home.why_choose_us.feature3.description'),
        },
        {
            symbol: <Clock />,
            title: t('home.why_choose_us.feature4.title'),
            description: t('home.why_choose_us.feature4.description'),
        },
    ];

    return (
        <section
            id="why-choose-us"
            className="relative border-t border-b border-[#FDFCF8]/10 bg-[#1a1f1e] py-16 lg:py-32 text-[#FDFCF8]"
        >
            <div className="pointer-events-none absolute top-0 right-1/4 hidden h-full w-[1px] bg-white/5 md:block"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
                {/* Header */}
                <div className="mb-12 lg:mb-32 grid items-end gap-6 lg:gap-12 grid-cols-1 lg:grid-cols-2">
                    <Reveal direction="up">
                        <h2
                            className="mb-3 text-4xl sm:text-5xl lg:text-7xl leading-[1.1] tracking-tight"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            {t('home.why_choose_us.title_part1')}{' '}
                            <span className="text-[#C06041] italic">
                                {t('home.why_choose_us.title_part2')}
                            </span>
                        </h2>
                        <p className="text-xs uppercase tracking-widest text-[#C06041] font-medium">
                            {t('home.why_choose_us.badge')}
                        </p>
                    </Reveal>
                    <Reveal direction="up" delay={0.1}>
                        <p className="border-b border-[#FDFCF8]/20 pb-4 text-base sm:text-lg lg:text-xl leading-relaxed font-light text-[#FDFCF8]/60">
                            {t('home.why_choose_us.subtitle1')}
                        </p>
                        <p className="border-b border-[#FDFCF8]/20 pb-4 text-base sm:text-lg lg:text-xl leading-relaxed font-light text-[#FDFCF8]/80">
                            {t('home.why_choose_us.subtitle2')}
                        </p>
                    </Reveal>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-x-8 lg:gap-x-12 gap-y-10 lg:gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <Reveal key={index} delay={index * 0.1} direction="up">
                            <div className="group relative flex h-full flex-col">
                                {/* Numéro & Ligne */}
                                <div className="mb-6 lg:mb-8 flex items-center space-x-4">
                                    <span className="text-sm font-medium tracking-widest text-[#C06041]">
                                        0{index + 1}
                                    </span>
                                    <div className="h-[1px] flex-grow bg-[#FDFCF8]/20 transition-colors duration-500 group-hover:bg-[#C06041]"></div>
                                </div>

                                {/* Symbol */}
                                <div className="mb-4 lg:mb-6 text-3xl text-[#C06041] font-serif transition-transform duration-500 group-hover:-translate-y-1">
                                    {feature.symbol}
                                </div>

                                <h3
                                    className="mb-3 lg:mb-4 text-xl sm:text-2xl"
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                    }}
                                >
                                    {feature.title}
                                </h3>

                                <p className="text-sm leading-relaxed font-light text-[#FDFCF8]/70">
                                    {feature.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

