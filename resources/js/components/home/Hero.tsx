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
          <Reveal direction="left" duration={1} delay={0.2} className="lg:col-span-8 space-y-10">
            <div className="space-y-8">
              <Reveal direction="up" duration={0.8} delay={0.4}>
                <div className="inline-flex items-center space-x-3 border-b border-[#1a1f1e]/20 pb-2">
                  <span className="w-1.5 h-1.5 bg-[#C06041] block"></span>
                  <span className="text-xs uppercase tracking-widest font-medium text-[#1a1f1e]/70">
                    Recrutement juridique · Maroc & Afrique francophone
                  </span>
                </div>
              </Reveal>

              <Reveal direction="up" duration={1} delay={0.6}>
                <h1 className="text-5xl lg:text-7xl text-[#1a1f1e] leading-[1.1] tracking-tight" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                  <span className="block font-medium">Le recrutement juridique,</span>
                  <span className="block italic text-[#C06041] font-light mt-2">à la hauteur de vos exigences.</span>
                </h1>
              </Reveal>

              <Reveal direction="up" duration={0.8} delay={0.8}>
                <p className="text-lg text-[#1a1f1e]/80 leading-relaxed max-w-lg font-light">
                  JURIJOB identifie les meilleurs profils juridiques pour les directions juridiques et RH des grandes structures, au Maroc et en Afrique francophone. Discrétion, expertise, sélection sur mesure.
                </p>
              </Reveal>
            </div>

            <div className="flex flex-row gap-4 pt-4 w-full">
  <Link
    href="/register/candidat"
    className="flex-[0.9] bg-[#1a1f1e] text-[#FDFCF8]
               hover:bg-[#343a38] px-5 py-4
               text-xs md:text-sm uppercase tracking-wide
               transition-all text-center flex items-center
               justify-center gap-2 group whitespace-nowrap"
  >
    <span>Je suis juriste</span>
    <span className="group-hover:translate-x-1 transition-transform">→</span>
    <span>Créer mon profil</span>
  </Link>

  <Link
    href="/register/recruteur"
    className="flex-[1.1] border border-[#1a1f1e]
               text-[#1a1f1e] hover:bg-[#1a1f1e]/5
               px-5 py-4
               text-xs md:text-sm uppercase tracking-wide
               transition-all text-center flex items-center
               justify-center gap-2 group whitespace-nowrap"
  >
    <span>Je recrute un juriste</span>
    <span className="group-hover:translate-x-1 transition-transform">→</span>
    <span>Déposer une demande</span>
  </Link>
</div>
          </Reveal>

          {/* Image - Colonne Droite */}
          <Reveal direction="right" duration={1} delay={0.4} className="lg:col-span-4 relative h-full">
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