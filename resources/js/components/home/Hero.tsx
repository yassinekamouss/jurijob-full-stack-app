import { Link } from "@inertiajs/react";
import Reveal from "@/components/home/Reveal"; // Import du composant global

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-[#FDFCF8] overflow-hidden pt-12 pb-24">
      <div className="absolute top-0 left-8 md:left-16 w-[1px] h-full bg-[#1a1f1e]/5" />
      <div className="absolute top-0 right-8 md:right-16 w-[1px] h-full bg-[#1a1f1e]/5" />
      
      <div className="max-w-7xl mx-auto px-8 md:px-16 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Texte - Colonne Gauche */}
          <Reveal direction="left" duration={1} delay={0.2} className="lg:col-span-7 space-y-10">
            <div className="space-y-8">
              <Reveal direction="up" duration={0.8} delay={0.4}>
                <div className="inline-flex items-center space-x-3 border-b border-[#1a1f1e]/20 pb-2">
                  <span className="w-1.5 h-1.5 bg-[#C06041] block"></span>
                  <span className="text-xs uppercase tracking-widest font-medium text-[#1a1f1e]/70">
                    Plateforme juridique n°1 au Maroc
                  </span>
                </div>
              </Reveal>

              <Reveal direction="up" duration={1} delay={0.6}>
                <h1 className="text-6xl lg:text-8xl text-[#1a1f1e] leading-[1.05] tracking-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  <span className="block italic text-[#C06041] font-light">Relier</span>
                  <span className="block font-medium">les talents</span>
                  <span className="block font-medium">juridiques</span>
                  <span className="block relative inline-block mt-2">
                    aux opportunités
                    <Reveal direction="left" delay={1.5} duration={1}>
                      <div className="absolute bottom-2 left-0 h-[3px] bg-[#1a1f1e] w-full" />
                    </Reveal>
                  </span>
                </h1>
              </Reveal>

              <Reveal direction="up" duration={0.8} delay={0.8}>
                <p className="text-lg text-[#1a1f1e]/80 leading-relaxed max-w-md font-light">
                  Jurijob est l'écosystème de référence qui comble le fossé entre 
                  l'ambition des jeunes diplômés et la vision des recruteurs au Maroc.
                </p>
              </Reveal>
            </div>

            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link 
                href="/register/candidat"
                className="bg-[#1a1f1e] text-[#FDFCF8] hover:bg-[#343a38] px-8 py-4 text-sm uppercase tracking-wide transition-all text-center flex items-center justify-center gap-3 group"
              >
                Je suis diplômé(e)
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link 
                href="/register/recruteur"
                className="border border-[#1a1f1e] text-[#1a1f1e] hover:bg-[#1a1f1e]/5 px-8 py-4 text-sm uppercase tracking-wide transition-all text-center flex items-center justify-center gap-3"
              >
                Je suis recruteur
              </Link>
            </div>
          </Reveal>

          {/* Image - Colonne Droite */}
          <Reveal direction="right" duration={1} delay={0.4} className="lg:col-span-5 relative h-full">
            <div className="relative aspect-[4/5] w-full md:w-5/6 ml-auto">
              <div className="absolute top-8 -left-8 w-full h-full bg-[#1a1f1e] z-0" />
              <div className="relative h-full z-10 overflow-hidden bg-zinc-200">
                <img
                  src="/images/fallback.png" 
                  alt="Espace de travail juridique"
                  className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90 contrast-125"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-[#C06041]/10 mix-blend-overlay"></div>
              </div>

              {/* Stat 1 - bottom left */}
              <Reveal direction="up" duration={0.8} delay={1.2}>
                <div className="absolute -left-12 bottom-12 bg-[#FDFCF8] p-5 shadow-2xl z-20 border border-[#1a1f1e]/10 backdrop-blur-sm">
                  <div className="flex flex-col">
                    <div className="text-3xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>1,250+</div>
                    <div className="text-xs uppercase tracking-wider text-[#1a1f1e]/60 mt-1">Utilisateurs actifs</div>
                  </div>
                </div>
              </Reveal>

              {/* ✅ Stat 2 - moved INSIDE the relative div, not after </section> */}
              <Reveal direction="down" duration={0.8} delay={1.4}>
                <div className="absolute -right-8 -top-8 bg-[#FDFCF8] p-5 shadow-2xl z-20 border border-[#1a1f1e]/10 backdrop-blur-sm">
                  <div className="flex flex-col text-right">
                    <div className="text-3xl" style={{ fontFamily: 'Cormorant Garamond, serif' }}>98%</div>
                    <div className="text-xs uppercase tracking-wider text-[#1a1f1e]/60 mt-1">Taux d'adéquation</div>
                  </div>
                </div>
              </Reveal>

            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}