import { useTranslation } from 'react-i18next';
import Reveal from '@/components/home/Reveal';

export default function FounderMessage() {
    const { t } = useTranslation();

    const founderName = t('home.founder.name');
    const roleText = t('home.founder.role');

    // Première phrase du rôle = accroche courte (sous la photo).
    // Le texte complet n'est affiché qu'une seule fois, dans l'encadré crédentials.
    const shortTitle = roleText.includes('.')
        ? roleText.split('.')[0] + '.'
        : roleText;

    return (
        <section
            id="founder"
            className="relative overflow-hidden border-t border-b border-[#1a1f1e]/10 bg-[#FDFCF8] py-20 text-[#1a1f1e] md:py-32"
        >

            <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
                <div className="grid grid-cols-1 items-start gap-y-12 lg:grid-cols-12 lg:gap-x-16">

                    {/* Colonne image */}
                    <Reveal direction="left" duration={1} className="lg:col-span-5">
                        <div className="relative border border-[#1a1f1e]/10 bg-[#FDFCF8] p-2 shadow-[0_25px_60px_-30px_rgba(26,31,30,0.35)]">
                            <div className="relative aspect-[4/5] w-full overflow-hidden">
                                <img
                                    src="/images/1777241420351.jpeg"
                                    alt={t('home.founder.image_alt')}
                                    className="h-full w-full object-cover object-center grayscale transition-all duration-700 hover:grayscale-0"
                                />
                            </div>
                        </div>

                        
                    </Reveal>

                    {/* Colonne contenu */}
                    <Reveal
                        direction="right"
                        duration={1}
                        delay={0.2}
                        className="lg:col-span-7 lg:pl-4 lg:pt-4"
                    >
                        <div className="inline-flex items-center space-x-3 border-b border-[#1a1f1e]/20 pb-2">
                            <span className="h-1.5 w-1.5 bg-[#C06041]" />
                            <span className="text-xs font-medium uppercase tracking-widest text-[#1a1f1e]/70">
                                {t('home.founder.badge')}
                            </span>
                        </div>

                        {/* Citation, avec de vrais guillemets typographiques sobres */}
                        <blockquote
                            className="mt-8 text-2xl font-light italic leading-[1.4] text-[#1a1f1e] md:text-3xl lg:text-[2.5rem]"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            <span aria-hidden className="text-[#C06041]/60">
                                «&nbsp;
                            </span>
                            {t('home.founder.quote')}
                            <span aria-hidden className="text-[#C06041]/60">
                                &nbsp;»
                            </span>
                        </blockquote>

                        {/* Signature sobre — pas de bio répétée ici */}
                        <p
                            className="mt-6 text-lg italic text-[#1a1f1e]/70"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            — {founderName}
                        </p>

                        {/* Encadré crédentials : bio complète, une seule fois, bien formatée */}
                        <div className="mt-10 max-w-xl border-l-2 border-[#C06041]/40 pl-5">
                            <p className="text-sm leading-relaxed text-[#1a1f1e]/65">
                                {roleText}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}