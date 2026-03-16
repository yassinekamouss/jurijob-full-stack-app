import { Link } from '@inertiajs/react';
import Reveal from '@/components/home/Reveal';

export default function CallToAction() {
    return (
        <section className="relative overflow-hidden bg-[#1a1f1e] px-4 py-40 text-[#FDFCF8] sm:px-6">
            {/* Architectural Grid Lines */}
            <div className="pointer-events-none absolute top-0 left-1/4 h-full w-[1px] bg-white/5"></div>
            <div className="pointer-events-none absolute top-0 left-2/4 h-full w-[1px] bg-white/5"></div>
            <div className="pointer-events-none absolute top-0 left-3/4 h-full w-[1px] bg-white/5"></div>

            <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
                <Reveal direction="up" duration={0.8}>
                    <h2
                        className="mb-10 text-6xl leading-[1] font-medium tracking-tight sm:text-[7rem]"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                        Prêt pour le <br />
                        <span className="font-light text-[#C06041] italic">
                            changement ?
                        </span>
                    </h2>
                </Reveal>

                <Reveal direction="up" duration={0.8} delay={0.2}>
                    <p className="mx-auto mb-14 max-w-xl text-xl font-light text-[#FDFCF8]/70">
                        Rejoignez l'écosystème juridique d'élite du Maroc.
                        Prenez en main votre évolution.
                    </p>
                </Reveal>

                <Reveal direction="up" duration={0.8} delay={0.4}>
                    <div className="flex flex-col justify-center gap-6 sm:flex-row">
                        <Link
                            href="/register"
                            className="border border-[#FDFCF8] bg-[#FDFCF8] px-12 py-5 text-sm tracking-widest text-[#1a1f1e] uppercase transition-colors duration-500 hover:bg-[#C06041] hover:text-[#FDFCF8]"
                        >
                            Commencer maintenant
                        </Link>
                    </div>
                </Reveal>
            </div>

            {/* Seamless transition bleed element to footer */}
            <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/10"></div>
        </section>
    );
}
