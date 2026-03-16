import { Link } from '@inertiajs/react';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import Reveal from '@/components/home/Reveal'; // Import du composant global

// --- Sous-composant Brand ---
const Brand = () => (
    <Link
        href="/"
        className="flex items-center tracking-tight"
        aria-label="Accueil JuriJob"
    >
        <div
            className="bg-[#1a1f1e] px-3 py-1 text-lg font-medium text-[#FDFCF8]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
            JURI
        </div>
        <div
            className="border border-[#1a1f1e] px-3 py-1 text-lg font-medium text-[#1a1f1e]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
            JOB
        </div>
    </Link>
);

export default function Footer() {
    return (
        <footer className="border-t border-[#1a1f1e]/10 bg-[#FDFCF8] py-16 text-[#1a1f1e]">
            <div className="mx-auto max-w-7xl px-8 md:px-16">
                <Reveal>
                    <div className="grid gap-12 md:grid-cols-4">
                        <div className="md:col-span-2">
                            <Brand />
                            <p className="my-6 max-w-sm text-sm leading-relaxed font-light text-[#1a1f1e]/70">
                                L'écosystème de référence au Maroc qui connecte
                                l'élite des diplômés en droit aux meilleurs
                                professionnels du secteur juridique.
                            </p>
                            <div className="flex items-center gap-2 text-xs font-medium tracking-widest text-[#C06041] uppercase">
                                <span>
                                    Spécialisé dans les carrières juridiques
                                </span>
                            </div>
                        </div>

                        <div>
                            <h4 className="mb-6 text-sm font-medium tracking-widest text-[#1a1f1e] uppercase">
                                Navigation
                            </h4>
                            <ul className="space-y-4 text-sm font-light text-[#1a1f1e]/70">
                                <li>
                                    <a
                                        href="#about"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        Notre Vision
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#contact"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        Nous Contacter
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#privacy"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        Charte de confidentialité
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#terms"
                                        className="transition-colors hover:text-[#C06041]"
                                    >
                                        Conditions générales
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-6 text-sm font-medium tracking-widest text-[#1a1f1e] uppercase">
                                Réseaux
                            </h4>
                            <div className="space-y-4 text-sm font-light text-[#1a1f1e]/70">
                                <p className="cursor-pointer transition-colors hover:text-[#C06041]">
                                    contact@jurijob.ma
                                </p>
                                <div className="mt-6 flex items-center gap-5">
                                    <a
                                        href="#"
                                        aria-label="LinkedIn"
                                        className="text-[#1a1f1e] transition-colors hover:text-[#C06041]"
                                    >
                                        <Linkedin
                                            className="h-5 w-5"
                                            strokeWidth={1.5}
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        aria-label="X (Twitter)"
                                        className="text-[#1a1f1e] transition-colors hover:text-[#C06041]"
                                    >
                                        <Twitter
                                            className="h-5 w-5"
                                            strokeWidth={1.5}
                                        />
                                    </a>
                                    <a
                                        href="#"
                                        aria-label="Instagram"
                                        className="text-[#1a1f1e] transition-colors hover:text-[#C06041]"
                                    >
                                        <Instagram
                                            className="h-5 w-5"
                                            strokeWidth={1.5}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>

                <Reveal delay={0.05}>
                    <div className="mt-16 flex flex-col items-center justify-between border-t border-[#1a1f1e]/10 pt-8 text-xs font-light tracking-widest text-[#1a1f1e]/50 uppercase md:flex-row">
                        <p>&copy; 2025 Jurijob. Tous droits réservés.</p>
                        <p className="mt-4 tracking-normal normal-case italic md:mt-0">
                            Conçu pour l'excellence.
                        </p>
                    </div>
                </Reveal>
            </div>
        </footer>
    );
}
