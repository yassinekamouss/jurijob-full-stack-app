// import { Link } from '@inertiajs/react';
// import { useTranslation } from 'react-i18next';
// import Reveal from '@/components/home/Reveal';

// export default function CallToAction() {
//     const { t } = useTranslation();

//     return (
//         <section className="relative overflow-hidden bg-[#1a1f1e] px-4 py-32 text-[#FDFCF8] sm:px-6 md:py-40">
//             {/* Architectural Grid Lines */}
//             <div className="pointer-events-none absolute top-0 left-1/4 h-full w-[1px] bg-white/5"></div>
//             <div className="pointer-events-none absolute top-0 left-2/4 h-full w-[1px] bg-white/5"></div>
//             <div className="pointer-events-none absolute top-0 left-3/4 h-full w-[1px] bg-white/5"></div>

//             <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
//                 <Reveal direction="up" duration={0.8}>
//                     <h2
//                         className="mb-8 text-5xl leading-[1.05] font-medium tracking-tight sm:text-7xl"
//                         style={{ fontFamily: 'Cormorant Garamond, serif' }}
//                     >
//                         {t('home.cta.title_part1')} <br />
//                         <span className="font-light text-[#C06041] italic">
//                             {t('home.cta.title_part2')}
//                         </span>
//                     </h2>
//                 </Reveal>

//                 <Reveal direction="up" duration={0.8} delay={0.2}>
//                     <p className="mx-auto mb-12 max-w-2xl text-lg font-light text-[#FDFCF8]/70 md:text-xl">
//                         {t('home.cta.description')}
//                     </p>
//                 </Reveal>

//                 <Reveal direction="up" duration={0.8} delay={0.4}>
//                     <div className="flex flex-col justify-center gap-6 sm:flex-row">
//                         <Link
//                             href="/register/recruteur"
//                             className="group flex items-center justify-center gap-3 border border-[#FDFCF8] bg-[#FDFCF8] px-10 py-5 text-sm tracking-widest text-[#1a1f1e] uppercase transition-colors duration-500 hover:border-[#C06041] hover:bg-[#C06041] hover:text-[#FDFCF8]"
//                         >
//                             <span>{t('home.cta.button')}</span>
//                             <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
//                         </Link>
//                     </div>
//                 </Reveal>
//             </div>

//             {/* Seamless transition bleed element to footer */}
//             <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/10"></div>
//         </section>
//     );
// }

import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/home/Reveal';

export default function CallToAction() {
    const { t } = useTranslation();

    return (
        <section className="relative overflow-hidden border-b border-[#FDFCF8]/10 bg-[#1a1f1e] py-16 lg:py-32 text-[#FDFCF8]">
            {/* Background Lines */}
            <div className="pointer-events-none absolute inset-0 flex justify-between opacity-10">
                <div className="h-full w-[1px] bg-[#FDFCF8]"></div>
                <div className="h-full w-[1px] bg-[#FDFCF8]"></div>
                <div className="h-full w-[1px] bg-[#FDFCF8]"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-8 lg:px-16 text-center">
                <Reveal direction="up">
                    <h2
                        className="mb-6 lg:mb-8 text-4xl sm:text-5xl lg:text-7xl leading-[1.1] tracking-tight"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                        {t('home.cta.title_part1')}{' '}
                        <span className="font-light text-[#C06041] italic">
                            {t('home.cta.title_part2')}
                        </span>
                    </h2>
                </Reveal>

                <Reveal direction="up" delay={0.1}>
                    <p className="mx-auto mb-8 lg:mb-12 max-w-2xl text-base sm:text-lg lg:text-xl font-light leading-relaxed text-[#FDFCF8]/70">
                        {t('home.cta.description')}
                    </p>
                </Reveal>

                <Reveal direction="up" delay={0.2}>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                            <Link
                                href="/register/recruteur"
                                className="group flex items-center justify-center gap-3 border border-[#FDFCF8] bg-[#FDFCF8] px-10 py-5 text-sm tracking-widest text-[#1a1f1e] uppercase transition-colors duration-500 hover:border-[#C06041] hover:bg-[#C06041] hover:text-[#FDFCF8]"
                            >
                                <span>{t('home.cta.button')}</span>
                                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
