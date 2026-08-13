import { useTranslation } from 'react-i18next';
import Reveal from '@/components/home/Reveal';

export default function About() {
    const { t } = useTranslation();

    const pillars = [
        {
            id: '01',
            title: t('home.about.pillar1_title'),
            desc: t('home.about.pillar1_desc'),
        },
        {
            id: '02',
            title: t('home.about.pillar2_title'),
            desc: t('home.about.pillar2_desc'),
        },
        {
            id: '03',
            title: t('home.about.pillar3_title'),
            desc: t('home.about.pillar3_desc'),
        },
    ];

    return (
        <section
            id="about"
            className="relative border-b border-[#FDFCF8]/10 bg-[#1a1f1e] py-16 lg:py-32 text-[#FDFCF8]"
        >
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
                {/* Header */}
                <div className="mb-12 lg:mb-28 flex flex-col items-start border-b border-[#FDFCF8]/20 pb-6 lg:pb-10">
                    <Reveal direction="up">
                        <h2
                            className="mb-3 lg:mb-4 text-4xl sm:text-5xl lg:text-7xl tracking-tight"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            {t('home.about.title_part1')}{' '}
                            <span className="font-light text-[#C06041] italic">
                                {t('home.about.title_part2')}
                            </span>
                        </h2>
                        <p className="text-xs font-medium uppercase tracking-widest text-[#C06041]">
                            {t('home.about.badge')}
                        </p>
                    </Reveal>
                </div>

                {/* Contenu principal */}
                <div className="mb-16 lg:mb-24 grid items-start gap-10 lg:gap-16 grid-cols-1 lg:grid-cols-2">
                    {/* Illustration Professionnelle */}
                    <Reveal direction="left" className="group relative">
                        <div className="relative z-10 pr-4 pb-4 lg:pr-6 lg:pb-6">
                            {/* Offset Fine Border */}
                            <div className="absolute top-4 left-4 lg:top-6 lg:left-6 z-0 h-full w-full border border-[#C06041]/60"></div>

                            <img
                                src="/images/_.jpeg"
                                alt={t('home.about.image_alt')}
                                className="relative z-10 h-[350px] sm:h-[450px] lg:h-[600px] w-full object-cover mix-blend-luminosity brightness-110 grayscale transition-all duration-700 group-hover:mix-blend-normal group-hover:grayscale-0"
                            />
                        </div>

                        {/* Badge flottant sur l'image */}
                        <div className="absolute top-12 -right-4 lg:-right-8 z-20 hidden max-w-[240px] border border-[#1a1f1e] bg-[#FDFCF8] p-6 text-[#1a1f1e] shadow-2xl md:block">
                            <p
                                className="text-lg font-medium italic leading-tight"
                                style={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                }}
                            >
                                {t('home.about.quote')}
                            </p>
                        </div>
                    </Reveal>

                    {/* Texte et Engagements */}
                    <div className="space-y-10 lg:space-y-16 pt-2 lg:pt-4">
                        <Reveal direction="up">
                            <div>
                                <h3 className="mb-4 lg:mb-6 flex items-center gap-4 text-xs sm:text-sm font-medium tracking-widest text-[#C06041] uppercase">
                                    <span className="h-px w-8 sm:w-12 bg-[#C06041]"></span>
                                    {t('home.about.mission_title')}
                                </h3>
                                <p className="text-lg sm:text-xl font-light leading-relaxed text-[#FDFCF8]/90">
                                    {t('home.about.mission_description')}
                                </p>
                            </div>
                        </Reveal>

                        <div className="space-y-6 lg:space-y-10">
                            <Reveal direction="up" delay={0.1}>
                                <h3 className="mb-2 flex items-center gap-4 text-xs sm:text-sm font-medium tracking-widest text-[#C06041] uppercase">
                                    <span className="h-px w-8 sm:w-12 bg-[#C06041]"></span>
                                    {t('home.about.pillars_title')}
                                </h3>
                            </Reveal>

                            <div className="grid gap-6">
                                {pillars.map((val, i) => (
                                    <Reveal
                                        key={val.id}
                                        delay={0.1 * (i + 1)}
                                        direction="up"
                                    >
                                        <div className="group flex gap-4 sm:gap-6 border-t border-[#FDFCF8]/10 pt-4 sm:pt-6 transition-colors duration-500 hover:border-[#C06041]">
                                            <div className="flex-shrink-0 text-xs sm:text-sm font-medium tracking-widest text-[#FDFCF8]/30 transition-colors duration-300 group-hover:text-[#C06041]">
                                                {val.id}
                                            </div>
                                            <div>
                                                <h4
                                                    className="mb-2 text-xl sm:text-2xl"
                                                    style={{
                                                        fontFamily:
                                                            'Cormorant Garamond, serif',
                                                    }}
                                                >
                                                    {val.title}
                                                </h4>
                                                <p className="text-sm font-light leading-relaxed text-[#FDFCF8]/70">
                                                    {val.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistiques d'impact */}
                <Reveal>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 border-t border-[#FDFCF8]/10 pt-12 lg:pt-16">
                        {/* Stat 1 */}
                        <div className="border-l border-[#FDFCF8]/10 pl-4 sm:pl-6 text-left">
                            <div
                                className="mb-2 text-4xl sm:text-5xl leading-none"
                                style={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                }}
                            >
                                {t('home.about.stat1_value')}
                            </div>

                            <div className="text-xs font-medium uppercase tracking-widest text-[#FDFCF8]/50">
                                {t('home.about.stat1_label')}
                            </div>
                        </div>

                        {/* Stat 2 */}
                        <div className="border-l border-[#FDFCF8]/10 pl-4 sm:pl-6 text-left">
                            <div
                                className="mb-2 text-4xl sm:text-5xl leading-none"
                                style={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                }}
                            >
                                {t('home.about.stat2_value')}
                            </div>

                            <div className="text-xs font-medium uppercase tracking-widest text-[#FDFCF8]/50">
                                {t('home.about.stat2_label')}
                            </div>
                        </div>

                        {/* Stat 3 */}
                        <div className="border-l border-[#FDFCF8]/10 pl-4 sm:pl-6 text-left">
                            <div
                                className="mb-2 text-3xl sm:text-4xl leading-[0.95]"
                                style={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                }}
                            >
                                {t('home.about.stat3_value')}
                            </div>

                            <div className="text-xs font-medium uppercase tracking-widest text-[#FDFCF8]/50">
                                {t('home.about.stat3_label')}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

