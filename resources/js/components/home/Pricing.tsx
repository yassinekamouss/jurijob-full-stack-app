import { Link } from "@inertiajs/react";
import { Check } from "lucide-react";
import Reveal from "@/components/home/Reveal";

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <Reveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
              Tarification simple et transparente
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
              Choisissez l’offre qui correspond à votre profil et vos objectifs.
            </p>
          </Reveal>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          
          {/* For Graduates - Design Doux & Vert */}
          <Reveal direction="up" delay={0.2}>
            <div className="group border border-emerald-100 bg-emerald-50/30 rounded-[2.5rem] p-10 flex flex-col h-full hover:bg-emerald-50 transition-colors duration-500">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-emerald-900 mb-2">
                  Pour les diplômés
                </h3>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-5xl font-bold text-black tracking-tighter">Gratuit</span>
                  <span className="text-emerald-700/60 font-medium">/ à vie</span>
                </div>
                <p className="text-emerald-800/70 mt-4 leading-relaxed">
                  Toujours gratuit pour les jeunes talents du droit au Maroc.
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Créez un profil professionnel",
                  "Téléchargez et validez votre CV",
                  "Soyez découvert par des recruteurs",
                  "Accès aux ressources de carrière",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-emerald-900/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register?type=candidate"
                className="w-full bg-black text-white text-center py-4 rounded-2xl font-bold hover:bg-emerald-950 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-900/10"
              >
                Rejoindre en tant que diplômé(e)
              </Link>
            </div>
          </Reveal>

          {/* For Recruiters - Design Black & Bold */}
          <Reveal direction="up" delay={0.3}>
            <div className="group border border-gray-100 bg-white rounded-[2.5rem] p-10 flex flex-col h-full shadow-sm hover:shadow-2xl transition-all duration-500 border-2 hover:border-black">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-black mb-2">
                  Pour les recruteurs
                </h3>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold text-black tracking-tighter">Sur mesure</span>
                </div>
                <p className="text-gray-500 mt-4 leading-relaxed">
                  Tarification personnalisée selon vos volumes de recrutement.
                </p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {[
                  "Accès à une CVthèque sélectionnée",
                  "Profils validés par nos experts",
                  "Critères de recherche avancés",
                  "Accompagnement dédié",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-black rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="w-full border-2 border-black text-black text-center py-4 rounded-2xl font-bold hover:bg-black hover:text-white transition-all duration-300"
              >
                Contacter les ventes
              </Link>
            </div>
          </Reveal>
          
        </div>
      </div>
    </section>
  );
}