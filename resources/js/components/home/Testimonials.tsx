import { Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/home/Reveal';

export default function Testimonials() {
    const { t } = useTranslation();

    const testimonials = [
        {
            quote: t('home.testimonials.item1.quote'),
            name: t('home.testimonials.item1.name'),
            role: t('home.testimonials.item1.role'),
            type: 'graduate',
        },
        {
            quote: t('home.testimonials.item2.quote'),
            name: t('home.testimonials.item2.name'),
            role: t('home.testimonials.item2.role'),
            type: 'recruiter',
        },
    ];

    return (
        <section
            id="testimonials"
            className="overflow-hidden border-b border-[#FDFCF8]/10 bg-[#1a1f1e] py-16 lg:py-32 text-[#FDFCF8]"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
                {/* Header */}
                <div className="mb-12 lg:mb-32 flex flex-col items-center text-center">
                    <Reveal direction="up">
                        <h2
                            className="mb-4 lg:mb-6 text-4xl sm:text-5xl lg:text-7xl tracking-tight"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            {t('home.testimonials.title_part1')}{' '}
                            <span className="font-light text-[#C06041] italic">
                                {t('home.testimonials.title_part2')}
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal direction="up" delay={0.1}>
                        <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed font-light text-[#FDFCF8]/60">
                            {t('home.testimonials.subtitle')}
                        </p>
                    </Reveal>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                    {testimonials.map((testimonial, index) => (
                        <Reveal
                            key={index}
                            delay={index * 0.15}
                            direction={index % 2 === 0 ? 'left' : 'right'}
                        >
                            <div className="relative flex h-full flex-col rounded-tr-3xl rounded-bl-3xl border border-[#1a1f1e]/10 bg-[#FDFCF8] p-6 sm:p-10 lg:p-14 text-[#1a1f1e] transition-colors duration-500 hover:bg-white">
                                <div className="absolute top-6 right-6 lg:top-10 lg:right-10 opacity-10">
                                    <Quote
                                        className="h-12 w-12 lg:h-20 lg:w-20 text-[#C06041]"
                                        strokeWidth={1}
                                    />
                                </div>

                                <blockquote
                                    className="z-10 mb-8 lg:mb-12 flex-grow text-xl sm:text-2xl lg:text-3xl leading-snug font-medium"
                                    style={{
                                        fontFamily: 'Cormorant Garamond, serif',
                                    }}
                                >
                                    "{testimonial.quote}"
                                </blockquote>

                                <div className="z-10 mt-auto flex items-center gap-4 sm:gap-5 border-t border-[#1a1f1e]/10 pt-6 lg:pt-8">
                                    {/* Avatar avec initiales */}
                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#1a1f1e] text-xs sm:text-sm font-medium text-[#1a1f1e]">
                                        {testimonial.name
                                            .split(' ')
                                            .map((n) => n[0])
                                            .join('')}
                                    </div>

                                    <div>
                                        <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase">
                                            {testimonial.name}
                                        </div>
                                        <div className="mt-0.5 text-[11px] sm:text-xs text-[#1a1f1e]/60">
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

