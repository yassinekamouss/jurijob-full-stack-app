import { Quote } from 'lucide-react';
import Reveal from '@/components/home/Reveal';

export default function Testimonials() {
    const testimonials = [
        {
            quote: "Cette plateforme m'a aidée à décrocher mon premier poste d'assistante juridique. Le processus a été fluide et le soutien de l'équipe exceptionnel. Je recommande vivement Jurijob.",
            name: 'Amina Benali',
            role: 'Juriste Junior',
            type: 'graduate',
        },
        {
            quote: 'Nous avons trouvé des candidats qualifiés plus rapidement que par les méthodes traditionnelles. Les profils vérifiés sont un gage de qualité indéniable.',
            name: 'Mohamed El Fassi',
            role: "DRH, Cabinet d'avocats",
            type: 'recruiter',
        },
    ];

    return (
        <section
            id="testimonials"
            className="overflow-hidden border-b border-[#FDFCF8]/10 bg-[#1a1f1e] py-24 text-[#FDFCF8] md:py-32"
        >
            <div className="mx-auto max-w-7xl px-8 md:px-16">
                {/* Header */}
                <div className="mb-20 flex flex-col items-center text-center md:mb-32">
                    <Reveal direction="up">
                        <h2
                            className="mb-6 text-5xl tracking-tight md:text-7xl"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            Histoires de{' '}
                            <span className="font-light text-[#C06041] italic">
                                réussite
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal direction="up" delay={0.1}>
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-[#FDFCF8]/60 md:text-xl">
                            Découvrez les retours des diplômés et des recruteurs
                            qui font grandir le secteur juridique avec Jurijob.
                        </p>
                    </Reveal>
                </div>

                {/* Testimonials Grid */}
                <div className="grid gap-10 md:grid-cols-2">
                    {testimonials.map((testimonial, index) => (
                        <Reveal
                            key={index}
                            delay={index * 0.15}
                            direction={index % 2 === 0 ? 'left' : 'right'}
                        >
                            <div className="relative flex h-full flex-col rounded-tr-3xl rounded-bl-3xl border border-[#1a1f1e]/10 bg-[#FDFCF8] p-10 text-[#1a1f1e] transition-colors duration-500 hover:bg-white md:p-14">
                                <div className="absolute top-10 right-10 opacity-10">
                                    <Quote
                                        className="h-20 w-20 text-[#C06041]"
                                        strokeWidth={1}
                                    />
                                </div>

                                <blockquote
                                    className="z-10 mb-12 flex-grow text-2xl leading-snug font-medium md:text-3xl"
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                    }}
                                >
                                    "{testimonial.quote}"
                                </blockquote>

                                <div className="z-10 mt-auto flex items-center gap-5 border-t border-[#1a1f1e]/10 pt-8">
                                    {/* Avatar avec initiales */}
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1a1f1e] text-sm font-medium text-[#1a1f1e]">
                                        {testimonial.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </div>

                                    <div>
                                        <div className="text-sm font-semibold tracking-wider uppercase">
                                            {testimonial.name}
                                        </div>
                                        <div className="mt-0.5 text-xs text-[#1a1f1e]/60">
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
