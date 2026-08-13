import { useTranslation } from 'react-i18next';
import Reveal from '@/components/home/Reveal';

export default function HowItWorks() {
    const { t } = useTranslation();

    return (
        <section
            id="how-it-works"
            className="overflow-hidden border-b border-[#1a1f1e]/10 bg-[#FDFCF8] py-16 lg:py-32 text-[#1a1f1e] antialiased"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
                {/* Header Section */}
                <div className="mb-12 lg:mb-32 flex flex-col items-start lg:items-end justify-between border-b border-[#1a1f1e]/20 pb-6 lg:pb-8 lg:flex-row gap-4 lg:gap-0">
                    <Reveal direction="up" className="mb-2 lg:mb-0">
                        <h2
                            className="text-4xl sm:text-5xl lg:text-7xl leading-[1] tracking-tight"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            {t('home.how_it_works.title_part1')}{' '}
                            <span className="font-light text-[#C06041] italic">
                                {t('home.how_it_works.title_part2')}
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal direction="up" delay={0.1}>
                        <p className="max-w-sm text-base sm:text-lg lg:text-xl leading-relaxed font-light text-[#1a1f1e]/70">
                            {t('home.how_it_works.subtitle')}
                        </p>
                    </Reveal>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                        {/* Step 1 */}
                        <div className="flex flex-col border border-[#1a1f1e] bg-white p-6 sm:p-8 lg:p-10 shadow-[8px_8px_0_0_rgba(26,31,30,1)]">
                            <Reveal direction="up" delay={0.2}>
                                <div className="mb-4 lg:mb-6 text-sm font-medium tracking-widest text-[#C06041]">
                                    {t('home.how_it_works.step1.number')}
                                </div>
                                <h3
                                    className="mb-3 lg:mb-4 text-xl sm:text-2xl"
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                    }}
                                >
                                    {t('home.how_it_works.step1.title')}
                                </h3>
                                <p className="text-sm leading-relaxed font-light text-[#1a1f1e]/70">
                                    {t('home.how_it_works.step1.description')}
                                </p>
                            </Reveal>
                        </div>

                        {/* Step 2 */}
                        <div className="flex translate-y-0 lg:translate-y-8 transform flex-col border border-[#1a1f1e] bg-[#1a1f1e] p-6 sm:p-8 lg:p-10 text-[#FDFCF8] shadow-[8px_8px_0_0_rgba(192,96,65,1)]">
                            <Reveal direction="up" delay={0.3}>
                                <div className="mb-4 lg:mb-6 text-sm font-medium tracking-widest text-[#C06041]">
                                    {t('home.how_it_works.step2.number')}
                                </div>
                                <h3
                                    className="mb-3 lg:mb-4 text-xl sm:text-2xl"
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                    }}
                                >
                                    {t('home.how_it_works.step2.title')}
                                </h3>
                                <p className="text-sm leading-relaxed font-light text-[#FDFCF8]/70">
                                    {t('home.how_it_works.step2.description')}
                                </p>
                            </Reveal>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col border border-[#1a1f1e] bg-white p-6 sm:p-8 lg:p-10 shadow-[8px_8px_0_0_rgba(26,31,30,1)]">
                            <Reveal direction="up" delay={0.4}>
                                <div className="mb-4 lg:mb-6 text-sm font-medium tracking-widest text-[#C06041]">
                                    {t('home.how_it_works.step3.number')}
                                </div>
                                <h3
                                    className="mb-3 lg:mb-4 text-xl sm:text-2xl"
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                    }}
                                >
                                    {t('home.how_it_works.step3.title')}
                                </h3>
                                <p className="text-sm leading-relaxed font-light text-[#1a1f1e]/70">
                                    {t('home.how_it_works.step3.description')}
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

