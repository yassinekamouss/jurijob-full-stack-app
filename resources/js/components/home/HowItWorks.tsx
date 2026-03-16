import Reveal from '@/components/home/Reveal';

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="overflow-hidden border-b border-[#1a1f1e]/10 bg-[#FDFCF8] py-24 text-[#1a1f1e] antialiased md:py-32"
        >
            <div className="mx-auto max-w-7xl px-8 md:px-16">
                {/* Header Section */}
                <div className="mb-20 flex flex-col items-end justify-between border-b border-[#1a1f1e]/20 pb-8 md:mb-32 md:flex-row">
                    <Reveal direction="up" className="mb-6 md:mb-0">
                        <h2
                            className="text-5xl leading-[1] tracking-tight md:text-7xl"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            Comment <br />
                            <span className="font-light text-[#C06041] italic">
                                ça marche
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal direction="up" delay={0.1}>
                        <p className="max-w-sm text-lg leading-relaxed font-light text-[#1a1f1e]/70">
                            L'excellence de recrutement simplifiée en trois
                            étapes, pour connecter les meilleurs talents aux
                            cabinets prestigieux.
                        </p>
                    </Reveal>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    <div className="relative z-10 grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-12">
                        {/* Step 1: Create Profile */}
                        <div className="flex flex-col border border-[#1a1f1e] bg-white p-8 shadow-[8px_8px_0_0_rgba(26,31,30,1)] md:p-10">
                            <Reveal direction="up" delay={0.2}>
                                <div className="mb-6 text-sm font-medium tracking-widest text-[#C06041]">
                                    01 //
                                </div>
                                <h3
                                    className="mb-4 text-2xl"
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                    }}
                                >
                                    Créez votre profil
                                </h3>
                                <p className="text-sm leading-relaxed font-light text-[#1a1f1e]/70">
                                    Préparez votre dossier. Remplissez vos
                                    informations clés et mettez en avant vos
                                    compétences techniques et académiques.
                                </p>
                            </Reveal>
                        </div>

                        {/* Step 2: Algorithm Match */}
                        <div className="flex translate-y-0 transform flex-col border border-[#1a1f1e] bg-[#1a1f1e] p-8 text-[#FDFCF8] shadow-[8px_8px_0_0_rgba(192,96,65,1)] md:translate-y-8 md:p-10">
                            <Reveal direction="up" delay={0.3}>
                                <div className="mb-6 text-sm font-medium tracking-widest text-[#C06041]">
                                    02 //
                                </div>
                                <h3
                                    className="mb-4 text-2xl"
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                    }}
                                >
                                    Analyse & Matching
                                </h3>
                                <p className="text-sm leading-relaxed font-light text-[#FDFCF8]/70">
                                    Notre technologie effectue un filtrage
                                    chirurgical pour vous proposer les
                                    opportunités les plus adaptées.
                                </p>
                            </Reveal>
                        </div>

                        {/* Step 3: Career Boost */}
                        <div className="flex flex-col border border-[#1a1f1e] bg-white p-8 shadow-[8px_8px_0_0_rgba(26,31,30,1)] md:p-10">
                            <Reveal direction="up" delay={0.4}>
                                <div className="mb-6 text-sm font-medium tracking-widest text-[#C06041]">
                                    03 //
                                </div>
                                <h3
                                    className="mb-4 text-2xl"
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                    }}
                                >
                                    Boostez votre carrière
                                </h3>
                                <p className="text-sm leading-relaxed font-light text-[#1a1f1e]/70">
                                    Accédez à des offres exclusives et débutez
                                    votre parcours professionnel dans les
                                    meilleures conditions possibles.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
