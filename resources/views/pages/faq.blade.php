@extends('layouts.guest-blade')

@php
    $faqSections = [
        [
            'sectionNumber' => __t('faq_page.sections.section_label') . ' 1',
            'title' => __t('faq_page.sections.sec1.title'),
            'items' => [
                [
                    'id' => 'comprendre-1',
                    'question' => __t('faq_page.sections.sec1.items.q1.question'),
                    'answer' => __t('faq_page.sections.sec1.items.q1.answer')
                ],
                [
                    'id' => 'comprendre-2',
                    'question' => __t('faq_page.sections.sec1.items.q2.question'),
                    'answer' => __t('faq_page.sections.sec1.items.q2.answer')
                ],
                [
                    'id' => 'comprendre-3',
                    'question' => __t('faq_page.sections.sec1.items.q3.question'),
                    'answer' => __t('faq_page.sections.sec1.items.q3.answer')
                ]
            ]
        ],
        [
            'sectionNumber' => __t('faq_page.sections.section_label') . ' 2',
            'title' => __t('faq_page.sections.sec2.title'),
            'items' => [
                [
                    'id' => 'recruteurs-1',
                    'question' => __t('faq_page.sections.sec2.items.q1.question'),
                    'answer' => __t('faq_page.sections.sec2.items.q1.answer')
                ],
                [
                    'id' => 'recruteurs-2',
                    'question' => __t('faq_page.sections.sec2.items.q2.question'),
                    'answer' => __t('faq_page.sections.sec2.items.q2.answer')
                ],
                [
                    'id' => 'recruteurs-3',
                    'question' => __t('faq_page.sections.sec2.items.q3.question'),
                    'answer' => __t('faq_page.sections.sec2.items.q3.answer')
                ],
                [
                    'id' => 'recruteurs-4',
                    'question' => __t('faq_page.sections.sec2.items.q4.question'),
                    'answer' => __t('faq_page.sections.sec2.items.q4.answer')
                ],
                [
                    'id' => 'recruteurs-5',
                    'question' => __t('faq_page.sections.sec2.items.q5.question'),
                    'answer' => __t('faq_page.sections.sec2.items.q5.answer')
                ],
                [
                    'id' => 'recruteurs-6',
                    'question' => __t('faq_page.sections.sec2.items.q6.question'),
                    'answer' => __t('faq_page.sections.sec2.items.q6.answer')
                ]
            ]
        ],
        [
            'sectionNumber' => __t('faq_page.sections.section_label') . ' 3',
            'title' => __t('faq_page.sections.sec3.title'),
            'items' => [
                [
                    'id' => 'candidats-1',
                    'question' => __t('faq_page.sections.sec3.items.q1.question'),
                    'answer' => __t('faq_page.sections.sec3.items.q1.answer')
                ],
                [
                    'id' => 'candidats-2',
                    'question' => __t('faq_page.sections.sec3.items.q2.question'),
                    'answer' => __t('faq_page.sections.sec3.items.q2.answer')
                ]
            ]
        ]
    ];

    $mainEntity = [];
    foreach ($faqSections as $sec) {
        foreach ($sec['items'] as $it) {
            $mainEntity[] = [
                '@type' => 'Question',
                'name' => $it['question'],
                'acceptedAnswer' => [
                    '@type' => 'Answer',
                    'text' => $it['answer']
                ]
            ];
        }
    }
    $faqSchema = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => $mainEntity
    ];
@endphp

@section('title', __t('faq_page.seo_title'))
@section('meta_description', __t('faq_page.seo_description'))
@section('canonical', url('/faq'))

@section('json_ld')
<script type="application/ld+json">
{!! json_encode($faqSchema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
</script>
@endsection

@section('content')
<div class="w-full flex-1 pb-16 sm:pb-24 pt-6 sm:pt-12">
    <!-- Header Banner -->
    <section class="py-8 sm:py-12 lg:py-16">
        <div class="mx-auto max-w-4xl px-4 sm:px-6 text-center lg:px-8">
            <h1 class="text-3xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl" style="font-family: 'Cormorant Garamond', serif;">
                {{ __t('faq_page.hero.title_part1') }}<span class="text-[#C06041]">{{ __t('faq_page.hero.title_part2') }}</span>
            </h1>
            <p class="mt-3 sm:mt-4 text-sm font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                {{ __t('faq_page.hero.subtitle') }}
            </p>
        </div>
    </section>

    <!-- Accordion Sections -->
    <section class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div class="space-y-8 sm:space-y-12">

            @foreach($faqSections as $section)
                <div class="space-y-4">
                    <h2 class="border-b border-[#1a1f1e]/10 pb-3 text-xl font-normal text-[#1a1f1e] sm:text-2xl" style="font-family: 'Cormorant Garamond', serif;">
                        <span class="text-[#C06041]">{{ $section['sectionNumber'] }}</span> : {{ $section['title'] }}
                    </h2>

                    <div class="space-y-3">
                        @foreach($section['items'] as $item)
                            <details class="group border border-[#1a1f1e]/10 bg-[#FDFCF8] transition-colors hover:border-[#1a1f1e]/25">
                                <summary class="flex w-full cursor-pointer items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 text-left font-medium text-[#1a1f1e] select-none">
                                    <span class="text-base sm:text-lg leading-snug" style="font-family: 'Cormorant Garamond', serif;">
                                        {{ $item['question'] }}
                                    </span>
                                    <svg class="h-5 w-5 shrink-0 text-[#1a1f1e]/60 transition-transform duration-200 group-open:rotate-180 group-open:text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </summary>
                                <div class="border-t border-[#1a1f1e]/5 px-4 sm:px-5 pb-4 sm:pb-5 pt-3 text-xs font-light leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                    {{ $item['answer'] }}
                                </div>
                            </details>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>

        <!-- Une autre question ? -->
        <div class="mt-12 sm:mt-16 border-y border-[#1a1f1e]/10 bg-[#FDFCF8] p-6 text-center sm:p-10">
            <h3 class="text-xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">
                {{ __t('faq_page.contact.title') }}
            </h3>
            <p class="mt-2 text-xs font-light text-[#1a1f1e]/70 sm:text-base">
                {{ __t('faq_page.contact.subtitle') }}
            </p>
            <a href="mailto:recrutement@sentissilegal.com" class="mt-5 sm:mt-6 inline-flex items-center gap-2 bg-[#1a1f1e] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-[#FDFCF8] transition-colors hover:bg-[#343a38]">
                <svg class="h-4 w-4 text-[#C06041] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span class="break-all sm:break-normal">recrutement@sentissilegal.com</span>
            </a>
        </div>
    </section>
</div>
@endsection
