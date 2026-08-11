import Reveal from '@/components/home/Reveal';
import { Quote } from 'lucide-react';

export default function FounderMessage() {
    return (
        <section
            id="founder"
            className="relative overflow-hidden border-t border-b border-[#1a1f1e]/10 bg-[#FDFCF8] py-24 text-[#1a1f1e] md:py-32"
        >
            <div className="mx-auto max-w-7xl px-8 md:px-16">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
                    {/* Image Column */}
                    <Reveal direction="left" duration={1} className="lg:col-span-5">
                        <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#1a1f1e] shadow-[12px_12px_0_0_rgba(26,31,30,1)]">
                            <img
                                src="/images/1777241420351.jpeg"
                                alt="Mohammed Sentissi - Fondateur Jurijob"
                                className="h-full w-full object-cover object-center grayscale transition-all duration-700 hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-[#C06041]/10 mix-blend-overlay"></div>
                        </div>
                    </Reveal>

                    {/* Content Column */}
                    <Reveal direction="right" duration={1} delay={0.2} className="space-y-8 lg:col-span-7">
                        <div>
                            <div className="mb-4 inline-flex items-center space-x-3 border-b border-[#1a1f1e]/20 pb-2">
                                <span className="h-1.5 w-1.5 bg-[#C06041]"></span>
                                <span className="text-xs font-medium uppercase tracking-widest text-[#1a1f1e]/70">
                                    Le mot du Fondateur
                                </span>
                            </div>

                            <h3
                                className="text-3xl font-medium text-[#1a1f1e] md:text-5xl"
                                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            >
                                Mohammed Sentissi
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed font-light text-[#C06041] md:text-base">
                                Expert juridique, ex-Directeur juridique de holdings au Maroc et en Afrique. Président élu de l'Association marocaine des juristes d'entreprise — AMJE (en cours de constitution). Fondateur de Sentissi Legal Advisory — Un réseau d'experts au service des directions juridiques au Maroc et en Afrique.
                            </p>
                        </div>

                        <div className="relative border-l-2 border-[#C06041] pl-6 md:pl-8">
                            <Quote className="mb-3 h-8 w-8 text-[#C06041]/40" />
                            <blockquote
                                className="text-xl font-light italic leading-snug text-[#1a1f1e] md:text-2xl"
                                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            >
                                « Recruter un juriste, ce n'est pas remplir un poste. C'est trouver la personne qui parlera la langue du droit et celle de votre entreprise. »
                            </blockquote>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
