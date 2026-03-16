import { Scale, CheckCircle, Shield, Clock } from "lucide-react";
import Reveal from "@/components/home/Reveal";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Scale,
      title: "Adapté au secteur juridique",
      description:
        "Une plateforme conçue spécifiquement pour les besoins uniques des professionnels du droit et des cabinets.",
    },
    {
      icon: CheckCircle,
      title: "Profils vérifiés",
      description:
        "Chaque profil fait l’objet d’une validation rigoureuse pour garantir la qualité et l’authenticité des candidats.",
    },
    {
      icon: Shield,
      title: "Gratuit pour les diplômés",
      description:
        "Aucun coût pour les diplômés en droit souhaitant rejoindre la plateforme et se connecter à des employeurs.",
    },
    {
      icon: Clock,
      title: "Accès efficace aux CV",
      description:
        "Gagnez du temps grâce à un processus rationalisé qui vous présente rapidement des candidats préqualifiés.",
    },
  ];

  return (
    <section id="why-choose-us" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header - Aligné avec le style "Comment ça marche" */}
        <div className="text-center mb-16 md:mb-24">
          <Reveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
              Pourquoi choisir Jurijob ?
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Construire la confiance grâce à la qualité, la sécurité et l’efficacité au service du droit.
            </p>
          </Reveal>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Reveal key={index} delay={index * 0.1} direction="up">
              <div className="group bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:border-black/5 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                
                {/* Icône avec effet au hover */}
                <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-black group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-black group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-xl font-bold text-black mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed flex-grow">
                  {feature.description}
                </p>

                {/* Petite ligne décorative discrète au hover */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}