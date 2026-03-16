import Reveal from '@/components/home/Reveal';

export default function About() {
    return (
        <section
            id="about"
            className="relative border-b border-[#FDFCF8]/10 bg-[#1a1f1e] py-24 text-[#FDFCF8] md:py-32"
        >
            <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16">
                {/* Header - Sobre et solennel */}
                <div className="mb-20 flex flex-col items-start border-b border-[#FDFCF8]/20 pb-10 md:mb-28">
                    <Reveal direction="up">
                        <h2
                            className="mb-4 text-5xl tracking-tight md:text-7xl"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            À propos de{' '}
                            <span className="font-light text-[#C06041] italic">
                                Jurijob
                            </span>
                        </h2>
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
                                src="/images/_.jpeg" // Assure-toi que l'image est dans public/images/
                                alt="Justice et professionnalisme"
                                className="relative z-10 h-[600px] w-full object-cover mix-blend-luminosity brightness-110 grayscale transition-all duration-700 group-hover:mix-blend-normal group-hover:grayscale-0"
                            />
                        </div>

                        {/* Badge flottant sur l'image */}
                        <div className="absolute top-12 -right-8 z-20 hidden max-w-[200px] border border-[#1a1f1e] bg-[#FDFCF8] p-6 text-[#1a1f1e] shadow-2xl md:block">
                            <p
                                className="text-lg leading-tight font-medium italic"
                                style={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                }}
                            >
                                "L'excellence au service de la justice."
                            </p>
                        </div>
                    </Reveal>

                    {/* Texte et Valeurs */}
                    <div className="space-y-16 pt-4">
                        <Reveal direction="up">
                            <div>
                                <h3 className="mb-6 flex items-center gap-4 text-sm font-medium tracking-widest text-[#C06041] uppercase">
                                    <span className="h-px w-12 bg-[#C06041]"></span>
                                    Notre mission
                                </h3>
                                <p className="text-xl leading-relaxed font-light text-[#FDFCF8]/80">
                                    Nous nous engageons à rapprocher les talents
                                    du droit et les employeurs visionnaires au
                                    Maroc. Notre plateforme simplifie le
                                    processus de recrutement tout en maintenant
                                    les plus hauts standards de
                                    professionnalisme.
                                </p>
                            </div>
                        </Reveal>

                        <div className="space-y-10">
                            <Reveal direction="up" delay={0.1}>
                                <h3 className="mb-2 flex items-center gap-4 text-sm font-medium tracking-widest text-[#C06041] uppercase">
                                    <span className="h-px w-12 bg-[#C06041]"></span>
                                    Nos valeurs
                                </h3>
                            </Reveal>

                            <div className="grid gap-6">
                                {[
                                    {
                                        id: '01',
                                        title: 'Sérieux',
                                        desc: 'Standards professionnels garantis dans chaque interaction.',
                                    },
                                    {
                                        id: '02',
                                        title: 'Neutralité',
                                        desc: "Plateforme impartiale assurant l'égalité des chances.",
                                    },
                                    {
                                        id: '03',
                                        title: 'Éthique',
                                        desc: 'Respect strict des exigences de la profession juridique.',
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
                                                <p className="text-sm leading-relaxed font-light text-[#FDFCF8]/60">
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

                {/* Statistiques optionnelles */}
                <Reveal>
                    <div className="grid grid-cols-2 gap-8 border-t border-[#FDFCF8]/10 pt-16 md:grid-cols-4">
                        <div className="border-l border-[#FDFCF8]/10 pl-6 text-left">
                            <div
                                className="mb-2 text-5xl"
                                style={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                }}
                            >
                                500+
                            </div>
                            <div className="text-xs font-medium tracking-widest text-[#FDFCF8]/50 uppercase">
                                Diplômés
                            </div>
                        </div>
                        <div className="border-l border-[#FDFCF8]/10 pl-6 text-left">
                            <div
                                className="mb-2 text-5xl"
                                style={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                }}
                            >
                                150+
                            </div>
                            <div className="text-xs font-medium tracking-widest text-[#FDFCF8]/50 uppercase">
                                Cabinets
                            </div>
                        </div>
                        <div className="border-l border-[#FDFCF8]/10 pl-6 text-left">
                            <div
                                className="mb-2 text-5xl"
                                style={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                }}
                            >
                                95%
                            </div>
                            <div className="text-xs font-medium tracking-widest text-[#FDFCF8]/50 uppercase">
                                Placement
                            </div>
                        </div>
                        <div className="border-l border-[#FDFCF8]/10 pl-6 text-left">
                            <div
                                className="mb-2 text-5xl"
                                style={{
                                    fontFamily: 'Cormorant Garamond, serif',
                                }}
                            >
                                24/7
                            </div>
                            <div className="text-xs font-medium tracking-widest text-[#FDFCF8]/50 uppercase">
                                Support
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
