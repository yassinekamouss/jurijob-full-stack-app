import { Link } from '@inertiajs/react';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import Reveal from '@/components/home/Reveal'; // Import du composant global

// --- Sous-composant Brand ---
const Brand = () => (
    <Link
        href="/"
        className="flex items-center tracking-tight hover:opacity-90 transition-opacity"
        aria-label="Accueil JuriJob"
    >
        {/* <div
            className="bg-[#1a1f1e] px-3 py-1 text-lg font-medium text-[#FDFCF8]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >é
            JURI
        </div>
        <div
            className="flex items-center gap-1.5 border border-[#1a1f1e] px-3 py-1 text-lg font-medium text-[#1a1f1e]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
            JOB
        </div> */}
        <img
            src="/images/logo_jurijob.png"
            alt="JuriJob - Logo"
            width={100}
            height={100}
            className="w-auto h-32"
        />
    </Link>
);

export default function Footer() {
    return (
        <footer className="border-t border-[#1a1f1e]/10 bg-[#FDFCF8] py-16 text-[#1a1f1e]">
            <div className="mx-auto max-w-7xl px-8 md:px-16">
                <Reveal>
                    <div className="grid gap-12 md:grid-cols-4">
                        {/* Colonne 1 & 2 : Marque et Présentation */}
                        <div className="md:col-span-2">
                            <Brand />
                            <p className="my-6 max-w-sm text-sm leading-relaxed font-light text-[#1a1f1e]/70">
                                L'écosystème de référence au Maroc qui connecte
                                l'élite des Juristes aux Cabinets d'avocats et entreprises.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-[#C06041] uppercase">
                                <span>
                                    Spécialisé dans les carrières juridiques
                                </span>
                            </div>
                        </div>

                        {/* Colonne 3 : Navigation Principale */}
                        <div className="mt-10">
                            <h4 className="mb-6 text-sm font-medium tracking-widest text-[#1a1f1e] uppercase">
                                Navigation
                            </h4>
                            <ul className="space-y-4 text-sm font-light text-[#1a1f1e]/70">
                                <li>
                                    <Link
                                        href="/#about"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        Notre Vision
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/services"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        Nos Prestations
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="/faq"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        Foire Aux Questions (FAQ)
                                    </a>
                                </li>
                                <li className="pt-2">
                                    <a 
                                        href="mailto:recrutement@sentissilegal.com"
                                        className="inline-block transition-colors text-[#C06041]"
                                    >
                                        recrutement@sentissilegal.com
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Colonne 4 : Informations Légales */}
                        <div className="mt-10">
                            <h4 className="mb-6 text-sm font-medium tracking-widest text-[#1a1f1e] uppercase">
                                Légal
                            </h4>
                            <ul className="space-y-4 text-sm font-light text-[#1a1f1e]/70">
                                <li>
                                    <a
                                        href="/mentions-legales"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        Mentions Légales
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/cgu"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        Conditions d'Utilisation (CGU)
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/cgv"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        Conditions de Vente (CGV)
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Reveal>

                {/* Section Copyright */}
                <Reveal delay={0.05}>
                    <div className="mt-16 flex flex-col items-center justify-between border-t border-[#1a1f1e]/10 pt-8 text-xs font-light tracking-widest text-[#1a1f1e]/50 uppercase md:flex-row">
                        <p>&copy; 2026 — Smart Recrutement Juridique. Tous droits réservés.</p>
                        <p className="mt-4 md:mt-0">Casablanca, Maroc</p>
                    </div>
                </Reveal>
            </div>
        </footer>
    );
}