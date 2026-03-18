import { Link } from '@inertiajs/react';
import { ChevronDown, Building2, GraduationCap } from 'lucide-react';
import { useState } from 'react';
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

// --- Composant Principal Header ---
export default function Header() {
    const [showMenu, setShowMenu] = useState(false);

    const nav = [
        { href: '/#home', label: 'Accueil' },
        { href: '/#how-it-works', label: 'Comment ça marche' },
        { href: '/#about', label: 'À propos' },
        { href: '/#contact', label: 'Contact' },
        { href: '/#pricing', label: 'Tarifs' },
    ];

    const handleNavClick = (e: React.MouseEvent<Element>, href: string) => {
        if (!href.includes('#')) {
            return;
        }

        const id = href.split('#')[1];
        const target = document.getElementById(id);

        if (target) {
            e.preventDefault();
            const headerEl = document.getElementById('site-header');
            const offset = (headerEl?.offsetHeight ?? 0) + 8;
            const targetTop =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            const prefersReduced = window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            ).matches;

            window.scrollTo({
                top: targetTop,
                behavior: prefersReduced ? 'auto' : 'smooth',
            });

            const newUrl = `${window.location.pathname}#${id}`;
            window.history.pushState(null, '', newUrl);
        }
    };

    return (
        <Reveal direction="down" duration={0.8} className="sticky top-0 z-50">
            <header
                id="site-header"
                className="relative z-50 border-b border-[#1a1f1e]/10 bg-[#FDFCF8]/90 mix-blend-normal backdrop-blur-xl"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">
                        {/* Logo / Brand */}
                        <Reveal direction="right" duration={0.6}>
                            <Brand />
                        </Reveal>

                        {/* Navigation Desktop */}
                        <nav
                            className="hidden space-x-12 md:flex"
                            aria-label="Navigation principale"
                        >
                            {nav.map((item, index) => (
                                <Reveal
                                    key={item.href}
                                    delay={0.1 * index}
                                    duration={0.6}
                                    direction="down"
                                >
                                    <div className="group relative">
                                        <Link
                                            href={item.href}
                                            onClick={(e) =>
                                                handleNavClick(e, item.href)
                                            }
                                            className="text-gray-700 transition-colors hover:text-black"
                                        >
                                            {item.label}
                                        </Link>
                                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full" />
                                    </div>
                                </Reveal>
                            ))}
                        </nav>

                        {/* Actions */}
                        <Reveal direction="left" duration={0.8}>
                            <div className="flex items-center space-x-6">
                                <Link
                                    href="/login"
                                    className="px-2 py-2 text-sm font-medium text-[#1a1f1e] transition-opacity hover:opacity-70"
                                >
                                    Connexion
                                </Link>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowMenu(!showMenu)}
                                        className="flex items-center gap-2 bg-[#1a1f1e] px-6 py-2.5 text-sm font-medium text-[#FDFCF8] transition-all hover:bg-[#343a38]"
                                    >
                                        Inscription
                                        <ChevronDown
                                            className={`h-3.5 w-3.5 transition-transform ${showMenu ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {showMenu && (
                                        <div className="absolute right-0 z-50 mt-3 w-56 border border-[#1a1f1e]/10 bg-[#FDFCF8] py-1 shadow-2xl">
                                            <Link
                                                href="/register/recruteur"
                                                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#1a1f1e] transition-colors hover:bg-[#1a1f1e]/5"
                                            >
                                                <Building2 className="h-4 w-4 text-[#C06041]" />
                                                En tant que Recruteur
                                            </Link>
                                            <Link
                                                href="/register/candidat"
                                                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#1a1f1e] transition-colors hover:bg-[#1a1f1e]/5"
                                            >
                                                <GraduationCap className="h-4 w-4 text-[#C06041]" />
                                                En tant que Diplômé
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </header>
        </Reveal>
    );
}
