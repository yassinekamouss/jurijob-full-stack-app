import Reveal from '@/components/home/Reveal';

export default function About() {
    return (
        <section
            id="about"
            className="relative border-b border-[#FDFCF8]/10 bg-[#1a1f1e] py-24 text-[#FDFCF8] md:py-32"
        >
            <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16">
                {/* Header */}
                <div className="mb-20 flex flex-col items-start border-b border-[#FDFCF8]/20 pb-10 md:mb-28">
                    <Reveal direction="up">
                        <h2
                            className="mb-4 text-5xl tracking-tight md:text-7xl"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            À propos de{' '}
                            <span className="font-light text-[#C06041] italic">
                                JURIJOB
                            </span>
                        </h2>
                        <p className="text-xs font-medium uppercase tracking-widest text-[#C06041]">
                            Le 1er réseau de recrutement exclusivement dédié aux professionnels du droit.
                        </p>
                    </Reveal>
                </div>

                {/* Contenu principal */}
                <div className="mb-24 grid items-start gap-16 lg:grid-cols-2">
                    {/* Illustration Professionnelle */}
                    <Reveal direction="left" className="group relative">
                        <div className="relative z-10 pr-6 pb-6">
                            {/* Offset Fine Border */}
                            <div className="absolute top-6 left-6 z-0 h-full w-full border border-[#C06041]/60"></div>

                            <img
                                src="/images/_.jpeg"
                                alt="Recrutement juridique d'excellence"
                                className="relative z-10 h-[600px] w-full object-cover mix-blend-luminosity brightness-110 grayscale transition-all duration-700 group-hover:mix-blend-normal group-hover:grayscale-0"
                            />
                        </div>

                        {/* Badge flottant sur l'image */}
                        <div className="absolute top-12 -right-8 z-20 hidden max-w-[240px] border border-[#1a1f1e] bg-[#FDFCF8] p-6 text-[#1a1f1e] shadow-2xl md:block">
                            <p
                                className="text-lg font-medium italic leading-tight"
                                style={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                }}
                            >
                                "Le recrutement juridique requiert une expertise métier, pas un simple traitement de CV."
                            </p>
                        </div>
                    </Reveal>

                    {/* Texte et Engagements */}
                    <div className="space-y-16 pt-4">
                        <Reveal direction="up">
                            <div>
                                <h3 className="mb-6 flex items-center gap-4 text-sm font-medium tracking-widest text-[#C06041] uppercase">
                                    <span className="h-px w-12 bg-[#C06041]"></span>
                                    Notre mission
                                </h3>
                                <p className="text-xl font-light leading-relaxed text-[#FDFCF8]/90">
                                    JURIJOB est né d'un constat : les directions juridiques et RH des grandes structures perdent un temps précieux à traiter des candidatures hors cible. Nous sélectionnons avec précision les meilleurs juristes d'entreprise, avocats, notaires et fiscalistes au Maroc et en Afrique francophone.
                                </p>
                            </div>
                        </Reveal>

                        <div className="space-y-10">
                            <Reveal direction="up" delay={0.1}>
                                <h3 className="mb-2 flex items-center gap-4 text-sm font-medium tracking-widest text-[#C06041] uppercase">
                                    <span className="h-px w-12 bg-[#C06041]"></span>
                                    Nos piliers d'engagement
                                </h3>
                            </Reveal>

                            <div className="grid gap-6">
                                {[
                                    {
                                        id: '01',
                                        title: 'Évaluation Juridique Métier',
                                        desc: 'Chaque juriste est qualifié selon sa spécialisation (Droit des affaires, Compliance, Fiscalité, M&A) et son niveau d’expertise réel.',
                                    },
                                    {
                                        id: '02',
                                        title: 'Confidentialité Maximale',
                                        desc: 'Protection absolue des recherches de cabinets/entreprises et des données des juristes (Conformité Loi 09-08).',
                                    },
                                    {
                                        id: '03',
                                        title: 'Short-List Sous 48 Hours',
                                        desc: 'Accélérez vos recrutements avec une sélection ciblée et directement opérationnelle, sans pollution de candidatures inappropriées.',
                                    },
                                ].map((val, i) => (
                                    <Reveal
                                        key={val.id}
                                        delay={0.1 * (i + 1)}
                                        direction="up"
                                    >
                                        <div className="group flex gap-6 border-t border-[#FDFCF8]/10 pt-6 transition-colors duration-500 hover:border-[#C06041]">
                                            <div className="flex-shrink-0 text-sm font-medium tracking-widest text-[#FDFCF8]/30 transition-colors duration-300 group-hover:text-[#C06041]">
                                                {val.id}
                                            </div>
                                            <div>
                                                <h4
                                                    className="mb-2 text-2xl"
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
    <div className="grid grid-cols-1 gap-8 border-t border-[#FDFCF8]/10 pt-16 md:grid-cols-3 md:gap-0">

        {/* Stat 1 */}
        <div className="border-l border-[#FDFCF8]/10 pl-6 text-left">
            <div
                className="mb-2 text-5xl leading-none"
                style={{
                    fontFamily: 'Cormorant Garamond, serif',
                }}
            >
                48h
            </div>

            <div className="text-xs font-medium uppercase tracking-widest text-[#FDFCF8]/50">
                Transmission de la short-list
            </div>
        </div>

        {/* Stat 2 */}
        <div className="border-l border-[#FDFCF8]/10 pl-6 text-left">
            <div
                className="mb-2 text-5xl leading-none"
                style={{
                    fontFamily: 'Cormorant Garamond, serif',
                }}
            >
                24 ans
            </div>

            <div className="text-xs font-medium uppercase tracking-widest text-[#FDFCF8]/50">
                D'expertise en Direction Juridique
            </div>
        </div>

        {/* Stat 3 */}
        <div className="border-l border-[#FDFCF8]/10 pl-6 text-left">
            <div
                className="mb-2 text-4xl leading-[0.95]"
                style={{
                    fontFamily: 'Cormorant Garamond, serif',
                }}
            >
                Maroc & Afrique francophone
            </div>

            <div className="text-xs font-medium uppercase tracking-widest text-[#FDFCF8]/50">
                Couverture géographique
            </div>
        </div>

    </div>
</Reveal>
            </div>
        </section>
    );
}
