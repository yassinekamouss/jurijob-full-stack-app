import { Scale, CheckCircle, Shield, Clock } from 'lucide-react';
import Reveal from '@/components/home/Reveal';

export default function WhyChooseUs() {
    const features = [
        {
            icon: Scale,
            title: 'Adapté au secteur juridique',
            description:
                'Une plateforme conçue spécifiquement pour les besoins uniques des professionnels du droit et des cabinets.',
        },
        {
            icon: CheckCircle,
            title: 'Profils vérifiés',
            description:
                'Chaque profil fait l’objet d’une validation rigoureuse pour garantir la qualité et l’authenticité des candidats.',
        },
        {
            icon: Shield,
            title: 'Gratuit pour les diplômés',
            description:
                'Aucun coût pour les diplômés en droit souhaitant rejoindre la plateforme et se connecter à des employeurs.',
        },
        {
            icon: Clock,
            title: 'Accès efficace aux CV',
            description:
                'Gagnez du temps grâce à un processus rationalisé qui vous présente rapidement des candidats préqualifiés.',
        },
    ];

    return (
        <section
            id="why-choose-us"
            className="relative border-t border-b border-[#FDFCF8]/10 bg-[#1a1f1e] py-24 text-[#FDFCF8] md:py-32"
        >
            <div className="pointer-events-none absolute top-0 right-1/4 hidden h-full w-[1px] bg-white/5 md:block"></div>

            <div className="mx-auto max-w-7xl px-8 md:px-16">
                {/* Header - Aligné avec le style "Comment ça marche" */}
                <div className="mb-20 grid items-end gap-12 md:mb-32 md:grid-cols-2">
                    <Reveal direction="up">
                        <h2
                            className="mb-4 text-5xl leading-[1.1] tracking-tight md:text-7xl"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            Pourquoi <br />
                            <span className="text-[#C06041] italic">
                                choisir Jurijob?
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal direction="up" delay={0.1}>
                        <p className="border-b border-[#FDFCF8]/20 pb-4 text-lg leading-relaxed font-light text-[#FDFCF8]/60 md:text-xl">
                            Construire la confiance grâce à la qualité, la
                            sécurité et l'efficacité au service du droit.
                        </p>
                    </Reveal>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <Reveal key={index} delay={index * 0.1} direction="up">
                            <div className="group relative flex h-full flex-col">
                                {/* Numéro & Ligne */}
                                <div className="mb-8 flex items-center space-x-4">
                                    <span className="text-sm font-medium tracking-widest text-[#C06041]">
                                        0{index + 1}
                                    </span>
                                    <div className="h-[1px] flex-grow bg-[#FDFCF8]/20 transition-colors duration-500 group-hover:bg-[#C06041]"></div>
                                </div>

                                {/* Icône avec effet minimal */}
                                <div className="mb-6">
                                    <feature.icon
                                        className="h-8 w-8 text-[#FDFCF8] transition-transform duration-500 group-hover:-translate-y-1"
                                        strokeWidth={1}
                                    />
                                </div>

                                <h3
                                    className="mb-4 text-2xl"
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                    }}
                                >
                                    {feature.title}
                                </h3>

                                <p className="text-sm leading-relaxed font-light text-[#FDFCF8]/60">
                                    {feature.description}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
