import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/home/Reveal';

export default function Pricing() {
    const { t } = useTranslation();

    const graduateFeatures = [
        t('home.pricing.graduates.feature1'),
        t('home.pricing.graduates.feature2'),
        t('home.pricing.graduates.feature3'),
        t('home.pricing.graduates.feature4'),
    ];

    const recruiterFeatures = [
        t('home.pricing.recruiters.feature1'),
        t('home.pricing.recruiters.feature2'),
        t('home.pricing.recruiters.feature3'),
        t('home.pricing.recruiters.feature4'),
    ];

    return (
        <section
            id="pricing"
            className="border-b border-[#1a1f1e]/10 bg-[#FDFCF8] py-24 md:py-32"
        >
            <div className="mx-auto max-w-7xl px-8 md:px-16">
                {/* Section Header */}
                <div className="mb-16 text-center md:mb-24">
                    <Reveal direction="up">
                        <h2
                            className="mb-6 text-5xl tracking-tight text-[#1a1f1e] md:text-7xl"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            {t('home.pricing.title_part1')}
                            <span className="font-light text-[#C06041] italic">
                                {t('home.pricing.title_part2')}
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal direction="up" delay={0.1}>
                        <p className="mx-auto max-w-2xl text-lg font-light text-[#1a1f1e]/70 md:text-xl">
                            {t('home.pricing.subtitle')}
                        </p>
                    </Reveal>
                </div>

                {/* Pricing Cards */}
                <div className="mx-auto grid max-w-5xl gap-0 border border-[#1a1f1e] md:grid-cols-2">
                    {/* For Graduates */}
                    <Reveal direction="up" delay={0.2}>
                        <div className="flex h-full flex-col border-b border-[#1a1f1e] bg-[#FDFCF8] p-12 md:border-r md:border-b-0 md:p-16">
                            <div className="mb-10">
                                <h3 className="mb-4 text-sm font-medium tracking-widest text-[#C06041] uppercase">
                                    {t('home.pricing.graduates.badge')}
                                </h3>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span
                                        className="text-5xl text-[#1a1f1e] md:text-6xl"
                                        style={{
                                            fontFamily:
                                                'Cormorant Garamond, serif',
                                        }}
                                    >
                                        {t('home.pricing.graduates.price')}
                                    </span>
                                    <span className="font-light text-[#1a1f1e]/50 italic">
                                        {t('home.pricing.graduates.period')}
                                    </span>
                                </div>
                                <p className="mt-6 text-sm leading-relaxed font-light text-[#1a1f1e]/70">
                                    {t('home.pricing.graduates.description')}
                                </p>
                            </div>

                            <ul className="mb-12 flex-grow space-y-5">
                                {graduateFeatures.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="h-1.5 w-1.5 flex-shrink-0 bg-[#C06041]"></div>
                                        <span className="text-sm font-light text-[#1a1f1e]/80">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/register/candidat"
                                className="w-full bg-[#1a1f1e] py-5 text-center text-xs font-medium tracking-widest text-[#FDFCF8] uppercase transition-colors duration-500 hover:bg-[#C06041]"
                            >
                                {t('home.pricing.graduates.cta')}
                            </Link>
                        </div>
                    </Reveal>

                    {/* For Recruiters */}
                    <Reveal direction="up" delay={0.3}>
                        <div className="flex h-full flex-col bg-[#1a1f1e] p-12 text-[#FDFCF8] md:p-16">
                            <div className="mb-10">
                                <h3 className="mb-4 text-sm font-medium tracking-widest text-[#C06041] uppercase">
                                    {t('home.pricing.recruiters.badge')}
                                </h3>
                                <div className="mt-4 flex flex-col gap-1">
                                    <span
                                        className="text-5xl md:text-6xl"
                                        style={{
                                            fontFamily:
                                                'Cormorant Garamond, serif',
                                        }}
                                    >
                                        {t('home.pricing.recruiters.plan_name')}
                                    </span>
                                    <div className="mt-3 flex flex-wrap items-baseline gap-2">
                                        <span className="text-xs uppercase tracking-wider text-[#C06041]">
                                            {t('home.pricing.recruiters.price_from')}
                                        </span>
                                        <span
                                            className="text-3xl text-[#FDFCF8] md:text-4xl"
                                            style={{
                                                fontFamily:
                                                    'Cormorant Garamond, serif',
                                            }}
                                        >
                                            {t('home.pricing.recruiters.price')}
                                        </span>
                                        <span className="text-sm font-light text-[#FDFCF8]/60 italic">
                                            {t('home.pricing.recruiters.period')}
                                        </span>
                                    </div>
                                    <span className="text-xs font-light text-[#FDFCF8]/50 italic">
                                        {t('home.pricing.recruiters.tax_inclusive')}
                                    </span>
                                </div>
                                <p className="mt-6 text-sm leading-relaxed font-light text-[#FDFCF8]/60">
                                    {t('home.pricing.recruiters.description')}
                                </p>
                            </div>

                            <ul className="mb-12 flex-grow space-y-5">
                                {recruiterFeatures.map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="h-1.5 w-1.5 flex-shrink-0 bg-[#C06041]"></div>
                                        <span className="text-sm font-light text-[#FDFCF8]/70">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* mailto */}
                            <a
                                href="mailto:recrutement@sentissilegal.com"
                                className="w-full border border-[#FDFCF8] py-5 text-center text-xs font-medium tracking-widest text-[#FDFCF8] uppercase transition-colors duration-500 hover:bg-[#FDFCF8] hover:text-[#1a1f1e]"
                            >
                                {t('home.pricing.recruiters.cta')}
                            </a>

                            <div className="mt-6 text-center">
                                <a
                                    href="/cgv"
                                    className="text-xs font-light text-[#FDFCF8]/50 underline underline-offset-4 transition-colors hover:text-[#C06041]"
                                >
                                    {t('home.pricing.recruiters.cgv_link')}
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
