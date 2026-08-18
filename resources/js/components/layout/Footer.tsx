import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/home/Reveal';

const Brand = () => {
    const { t } = useTranslation();
    return (
        <Link
            href="/"
            className="inline-flex items-center tracking-tight hover:opacity-90 transition-opacity"
            aria-label={t('navigation.home')}
        >
            <img
                src="/images/logo_jurijob.webp"
                alt={t('navigation.brand_alt')}
                width={100}
                height={100}
                className="w-auto h-24 sm:h-32"
            />
        </Link>
    );
};

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="border-t border-[#1a1f1e]/10 bg-[#FDFCF8] py-12 lg:py-16 text-[#1a1f1e]">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
                <Reveal>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Colonne 1 & 2 : Marque et Présentation */}
                        <div className="sm:col-span-2">
                            <Brand />
                            <p className="my-4 lg:my-6 max-w-sm text-sm leading-relaxed font-light text-[#1a1f1e]/70">
                                {t('footer.description')}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-[#C06041] uppercase">
                                <span>
                                    {t('footer.specialized_badge')}
                                </span>
                            </div>
                        </div>

                        {/* Colonne 3 : Navigation Principale */}
                        <div className="mt-2 sm:mt-12">
                            <h4 className="mb-4 lg:mb-6 text-xs sm:text-sm font-medium tracking-widest text-[#1a1f1e] uppercase">
                                {t('footer.navigation_heading')}
                            </h4>
                            <ul className="space-y-3 text-sm font-light text-[#1a1f1e]/70">
                                <li>
                                    <Link
                                        href="/#about"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        {t('footer.vision')}
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="/services"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        {t('footer.services')}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/faq"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        {t('footer.faq')}
                                    </a>
                                </li>
                                <li className="pt-2">
                                    <a
                                        href="mailto:recrutement@sentissilegal.com"
                                        className="inline-block transition-colors text-[#C06041] font-medium"
                                    >
                                        recrutement@sentissilegal.com
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Colonne 4 : Informations Légales */}
                        <div className="mt-2 sm:mt-12">
                            <h4 className="mb-4 lg:mb-6 text-xs sm:text-sm font-medium tracking-widest text-[#1a1f1e] uppercase">
                                {t('footer.legal_heading')}
                            </h4>
                            <ul className="space-y-3 text-sm font-light text-[#1a1f1e]/70">
                                <li>
                                    <a
                                        href="/mentions-legales"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        {t('footer.mentions_legales')}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/cgu"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        {t('footer.cgu')}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/cgv"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        {t('footer.cgv')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Reveal>

                {/* Section Copyright */}
                <Reveal delay={0.05}>
                    <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-between border-t border-[#1a1f1e]/10 pt-6 lg:pt-8 text-xs font-light tracking-widest text-[#1a1f1e]/50 uppercase gap-4 sm:gap-0">
                        <p>{t('footer.copyright')}</p>
                        <p>{t('footer.address')}</p>
                    </div>
                </Reveal>
            </div>
        </footer>
    );
}