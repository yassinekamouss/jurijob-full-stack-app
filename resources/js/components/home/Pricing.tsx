import { Link } from '@inertiajs/react';
import Reveal from '@/components/home/Reveal';

export default function Pricing() {
    return (
        <section
            id="pricing"
            className="border-b border-[#1a1f1e]/10 bg-[#FDFCF8] py-24 md:py-32"
        >
            <div className="mx-auto max-w-7xl px-8 md:px-16">
                {/* Section Header */}
                <div className="mb-16 text-center md:mb-24">
                    <Reveal direction="up">
                        <h2
                            className="mb-6 text-5xl tracking-tight text-[#1a1f1e] md:text-7xl"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            Tarifs transparents pour votre{' '}
                            <span className="font-light text-[#C06041] italic">
                                recrutement juridique d'entreprise
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal direction="up" delay={0.1}>
                        <p className="mx-auto max-w-2xl text-lg font-light text-[#1a1f1e]/70 md:text-xl">
                            Choisissez l'offre qui correspond à votre profil
                            d'expertise et vos ambitions.
                        </p>
                    </Reveal>
                </div>

                {/* Pricing Cards */}
                <div className="mx-auto grid max-w-5xl gap-0 border border-[#1a1f1e] md:grid-cols-2">
                    {/* For Graduates */}
                    <Reveal direction="up" delay={0.2}>
                        <div className="flex h-full flex-col border-b border-[#1a1f1e] bg-[#FDFCF8] p-12 md:border-r md:border-b-0 md:p-16">
                            <div className="mb-10">
                                <h3 className="mb-4 text-sm font-medium tracking-widest text-[#C06041] uppercase">
                                    Diplômés & Talents
                                </h3>
                                <div className="mt-4 flex items-baseline gap-2">
                                    <span
                                        className="text-5xl text-[#1a1f1e] md:text-6xl"
                                        style={{
                                            fontFamily:
                                                'Cormorant Garamond, serif',
                                        }}
                                    >
                                        Gratuit
                                    </span>
                                    <span className="font-light text-[#1a1f1e]/50 italic">
                                        / à vie
                                    </span>
                                </div>
                                <p className="mt-6 text-sm leading-relaxed font-light text-[#1a1f1e]/70">
                                    L'accès à l'excellence professionnelle ne
                                    devrait jamais être tarifé pour les talents
                                    de demain.
                                </p>
                            </div>

                            <ul className="mb-12 flex-grow space-y-5">
                                {[
                                    'Création de profil détaillé',
                                    'Validation de CV prioritaire',
                                    'Visibilité auprès des grands cabinets',
                                    'Ressources de développement de carrière',
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="h-1.5 w-1.5 flex-shrink-0 bg-[#C06041]"></div>
                                        <span className="text-sm font-light text-[#1a1f1e]/80">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/register/candidat"
                                className="w-full bg-[#1a1f1e] py-5 text-center text-xs font-medium tracking-widest text-[#FDFCF8] uppercase transition-colors duration-500 hover:bg-[#C06041]"
                            >
                                Rejoindre la plateforme
                            </Link>
                        </div>
                    </Reveal>

                    {/* For Recruiters */}
                    <Reveal direction="up" delay={0.3}>
                        <div className="flex h-full flex-col bg-[#1a1f1e] p-12 text-[#FDFCF8] md:p-16">
                            <div className="mb-10">
                                <h3 className="mb-4 text-sm font-medium tracking-widest text-[#C06041] uppercase">
                                    Cabinets & Recruteurs
                                </h3>
                                <div className="mt-4 flex flex-col gap-1">
                                    <span
                                        className="text-5xl md:text-6xl"
                                        style={{
                                            fontFamily:
                                                'Cormorant Garamond, serif',
                                        }}
                                    >
                                        Élite
                                    </span>
                                    <div className="mt-3 flex flex-wrap items-baseline gap-2">
                                        <span className="text-xs uppercase tracking-wider text-[#C06041]">
                                            À partir de
                                        </span>
                                        <span
                                            className="text-3xl text-[#FDFCF8] md:text-4xl"
                                            style={{
                                                fontFamily:
                                                    'Cormorant Garamond, serif',
                                            }}
                                        >
                                            1 490 MAD HT
                                        </span>
                                        <span className="text-sm font-light text-[#FDFCF8]/60 italic">
                                            / profil
                                        </span>
                                    </div>
                                    <span className="text-xs font-light text-[#FDFCF8]/50 italic">
                                        (soit 1 788 MAD TTC)
                                    </span>
                                </div>
                                <p className="mt-6 text-sm leading-relaxed font-light text-[#FDFCF8]/60">
                                    Une tarification transparente et ajustée
                                    selon vos volumes de recrutement, garantie
                                    par l'œil de nos experts.
                                </p>
                            </div>

                            <ul className="mb-12 flex-grow space-y-5">
                                {[
                                    "Sélection rigoureuse par nos experts juridiques (+20 ans d'expérience)",
                                    "Garantie d'une short-list 100% sur-mesure",
                                    'Accès exclusif à notre vivier certifié',
                                    'Accompagnement marque employeur & suivi dédié',
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="h-1.5 w-1.5 flex-shrink-0 bg-[#C06041]"></div>
                                        <span className="text-sm font-light text-[#FDFCF8]/70">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* mailto : [EMAIL_ADDRESS] */}
                            <a
                                href="mailto:[recrutement@sentissilegal.com]"
                                className="w-full border border-[#FDFCF8] py-5 text-center text-xs font-medium tracking-widest text-[#FDFCF8] uppercase transition-colors duration-500 hover:bg-[#FDFCF8] hover:text-[#1a1f1e]"
                            >
                                Contacter l'équipe
                            </a>

                            <div className="mt-6 text-center">
                                <a
                                    href="/cgv"
                                    className="text-xs font-light text-[#FDFCF8]/50 underline underline-offset-4 transition-colors hover:text-[#C06041]"
                                >
                                    Consulter nos Conditions Générales de Vente (CGV)
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
