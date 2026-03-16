import Reveal from "@/components/home/Reveal";

export default function About() {
  return (
    <section id="about" className="bg-gray-50 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header - Sobre et solennel */}
        <div className="text-center mb-16 md:mb-24">
          <Reveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
              À propos de Jurijob
            </h2>
          </Reveal>
          <div className="w-20 h-1.5 bg-black mx-auto"></div>
        </div>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          
          {/* Illustration Professionnelle */}
          <Reveal direction="left" className="relative group">
            <div className="relative z-10">
              {/* Effet d'ombre décalée noire (style brutaliste chic) */}
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-black rounded-lg -z-10 group-hover:-bottom-4 group-hover:-right-4 transition-all duration-500"></div>
              
              <img
                src="/images/_.jpeg" // Assure-toi que l'image est dans public/images/
                alt="Justice et professionnalisme"
                className="w-full h-[550px] object-cover rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            {/* Badge flottant sur l'image */}
            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-xl z-20 hidden md:block">
              <p className="text-black font-bold text-xl italic leading-tight">
                "L'excellence au service <br/> de la justice."
              </p>
            </div>
          </Reveal>

          {/* Texte et Valeurs */}
          <div className="space-y-12">
            <Reveal direction="up">
              <div>
                <h3 className="text-2xl font-bold text-black mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-black"></span>
                  Notre mission
                </h3>
                <p className="text-gray-600 leading-relaxed text-xl">
                  Nous nous engageons à rapprocher les talents du droit et les
                  employeurs visionnaires au Maroc. Notre plateforme simplifie
                  le processus de recrutement tout en maintenant les plus hauts
                  standards de professionnalisme.
                </p>
              </div>
            </Reveal>

            <div className="space-y-8">
              <Reveal direction="up" delay={0.1}>
                <h3 className="text-2xl font-bold text-black mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 bg-black"></span>
                  Nos valeurs
                </h3>
              </Reveal>

              <div className="grid gap-8">
                {[
                  { id: "01", title: "Sérieux", desc: "Standards professionnels garantis dans chaque interaction." },
                  { id: "02", title: "Neutralité", desc: "Plateforme impartiale assurant l'égalité des chances." },
                  { id: "03", title: "Éthique", desc: "Respect strict des exigences de la profession juridique." }
                ].map((val, i) => (
                  <Reveal key={val.id} delay={0.1 * (i + 1)} direction="up">
                    <div className="flex gap-6 group">
                      <div className="flex-shrink-0 text-3xl font-black text-gray-200 group-hover:text-black transition-colors duration-300">
                        {val.id}
                      </div>
                      <div>
                        <h4 className="font-bold text-black text-xl mb-1">{val.title}</h4>
                        <p className="text-gray-500 leading-relaxed">{val.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques optionnelles */}
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-gray-200">
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">500+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                Diplômés en droit
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">150+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                Cabinets d’avocats
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">95%</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                Taux de réussite
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">24/7</div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                Support
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}