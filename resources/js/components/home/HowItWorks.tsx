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
                            Notre méthode de{' '}
                            <span className="font-light text-[#C06041] italic">
                                sélection et présélection de talents juridiques
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal direction="up" delay={0.1}>
                        <p className="max-w-sm text-lg leading-relaxed font-light text-[#1a1f1e]/70 md:text-xl">
                            Un processus simple et supervisé.
                        </p>
                    </Reveal>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    <div className="relative z-10 grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-12">
                        {/* Step 1 */}
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
                                    Vous déposez votre demande
                                </h3>
                                <p className="text-sm leading-relaxed font-light text-[#1a1f1e]/70">
                                    Critères précis : spécialisation, niveau, langues, diplôme. Quelques minutes suffisent.
                                </p>
                            </Reveal>
                        </div>

                        {/* Step 2 */}
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
                                    Notre équipe sélectionne
                                </h3>
                                <p className="text-sm leading-relaxed font-light text-[#FDFCF8]/70">
                                    Recherche dans la CVthèque et le réseau professionnel. Évaluation manuelle de chaque profil.
                                </p>
                            </Reveal>
                        </div>

                        {/* Step 3 */}
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
                                    Vous recevez votre short-list
                                </h3>
                                <p className="text-sm leading-relaxed font-light text-[#1a1f1e]/70">
                                    Sous 48 heures ouvrées. Profils qualifiés et coordonnées complètes après confirmation du paiement.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
