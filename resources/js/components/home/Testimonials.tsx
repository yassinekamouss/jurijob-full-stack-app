import { Quote } from "lucide-react";
import Reveal from "@/components/home/Reveal";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Cette plateforme m'a aidée à décrocher mon premier poste d'assistante juridique. Le processus a été fluide et le soutien de l'équipe exceptionnel. Je recommande vivement Jurijob.",
      name: "Amina Benali",
      role: "Juriste Junior",
      type: "graduate",
    },
    {
      quote:
        "Nous avons trouvé des candidats qualifiés plus rapidement que par les méthodes traditionnelles. Les profils vérifiés sont un gage de qualité indéniable.",
      name: "Mohamed El Fassi",
      role: "DRH, Cabinet d'avocats",
      type: "recruiter",
    },
  ];

  return (
    <section id="testimonials" className="bg-gray-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <Reveal direction="up">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
              Histoires de réussite
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.1}>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Découvrez les retours des diplômés et des recruteurs qui font grandir le secteur juridique avec Jurijob.
            </p>
          </Reveal>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={index * 0.15} direction={index % 2 === 0 ? "left" : "right"}>
              <div className="bg-white rounded-3xl p-10 md:p-12 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-500 group">
                
                <div className="mb-8">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>

                <blockquote className="text-xl md:text-2xl text-gray-800 font-medium mb-10 leading-relaxed italic flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-5 pt-8 border-t border-gray-50">
                  {/* Avatar avec initiales */}
                  <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner ring-4 ring-gray-50">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  
                  <div>
                    <div className="font-bold text-black text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}