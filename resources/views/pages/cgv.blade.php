@extends('layouts.legal')

@section('title', __t('cgv_page.seo_title'))
@section('meta_description', __t('cgv_page.seo_description'))
@section('canonical', url('/cgv'))

@section('content')
<div class="w-full flex-1 pb-16 sm:pb-24 pt-6 sm:pt-14">
    <!-- Hero Section -->
    <section class="relative border-b border-[#1a1f1e]/10 pb-8 pt-4 sm:pb-16 lg:pb-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-3xl text-center">
                <div class="inline-flex items-center gap-2 border border-[#C06041]/30 bg-[#C06041]/5 px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#C06041]">
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    {{ __t('cgv_page.hero.badge') }}
                </div>

                <h1 class="mt-4 sm:mt-6 text-3xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl" style="font-family: 'Cormorant Garamond', serif;">
                    {{ __t('cgv_page.hero.title_part1') }} <span class="italic text-[#C06041]">{{ __t('cgv_page.hero.title_part2') }}</span>
                </h1>

                <p class="mt-3 sm:mt-4 text-sm font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                    {{ __t('cgv_page.hero.subtitle') }}
                </p>

                <div class="mt-4 sm:mt-6 inline-flex flex-wrap justify-center items-center gap-2 text-[11px] sm:text-xs font-medium text-[#1a1f1e]/50">
                    <span>{{ __t('cgv_page.hero.updated') }}</span>
                    <span>•</span>
                    <span>{{ __t('cgv_page.hero.law') }}</span>
                </div>
            </div>
        </div>
    </section>

    @php
        $articles = [
            ['id' => 'article-1', 'num' => __t('cgv_page.articles.art1.num'), 'title' => __t('cgv_page.articles.art1.title')],
            ['id' => 'article-2', 'num' => __t('cgv_page.articles.art2.num'), 'title' => __t('cgv_page.articles.art2.title')],
            ['id' => 'article-3', 'num' => __t('cgv_page.articles.art3.num'), 'title' => __t('cgv_page.articles.art3.title')],
            ['id' => 'article-4', 'num' => __t('cgv_page.articles.art4.num'), 'title' => __t('cgv_page.articles.art4.title')],
            ['id' => 'article-5', 'num' => __t('cgv_page.articles.art5.num'), 'title' => __t('cgv_page.articles.art5.title')],
            ['id' => 'article-6', 'num' => __t('cgv_page.articles.art6.num'), 'title' => __t('cgv_page.articles.art6.title')],
            ['id' => 'article-7', 'num' => __t('cgv_page.articles.art7.num'), 'title' => __t('cgv_page.articles.art7.title')],
            ['id' => 'article-8', 'num' => __t('cgv_page.articles.art8.num'), 'title' => __t('cgv_page.articles.art8.title')],
            ['id' => 'article-9', 'num' => __t('cgv_page.articles.art9.num'), 'title' => __t('cgv_page.articles.art9.title')],
            ['id' => 'article-10', 'num' => __t('cgv_page.articles.art10.num'), 'title' => __t('cgv_page.articles.art10.title')],
            ['id' => 'article-11', 'num' => __t('cgv_page.articles.art11.num'), 'title' => __t('cgv_page.articles.art11.title')],
        ];
    @endphp

    <!-- Main Content Layout with Sticky Sidebar Navigation -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 pt-6 sm:pt-12 lg:px-8">
        <!-- Mobile Table of Contents Accordion -->
        <details class="lg:hidden mb-8 border border-[#1a1f1e]/10 bg-[#FDFCF8] p-4 shadow-sm group">
            <summary class="flex cursor-pointer items-center justify-between font-medium text-[#1a1f1e] select-none text-sm">
                <span class="flex items-center gap-2" style="font-family: 'Cormorant Garamond', serif;">
                    <svg class="h-4 w-4 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <span class="text-base font-semibold">{{ __t('cgv_page.sidebar.title') }}</span>
                </span>
                <svg class="h-4 w-4 text-[#1a1f1e]/60 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </summary>
            <nav class="mt-3 space-y-1 border-t border-[#1a1f1e]/10 pt-3">
                @foreach($articles as $art)
                    <a href="#{{ $art['id'] }}" class="block px-2 py-1.5 text-xs text-[#1a1f1e]/80 hover:text-[#C06041]">
                        <span class="font-serif text-[#C06041] mr-1">{{ $art['num'] }}</span>
                        {{ $art['title'] }}
                    </a>
                @endforeach
            </nav>
        </details>

        <div class="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <!-- Sticky Table of Contents Sidebar -->
            <aside class="hidden lg:block lg:col-span-4">
                <div class="sticky top-28 space-y-6 border border-[#1a1f1e]/10 bg-[#FDFCF8] p-6 shadow-sm">
                    <div>
                        <h3 class="text-lg font-normal text-[#1a1f1e]" style="font-family: 'Cormorant Garamond', serif;">
                            {{ __t('cgv_page.sidebar.title') }}
                        </h3>
                        <p class="text-xs font-light text-[#1a1f1e]/60">
                            {{ __t('cgv_page.sidebar.subtitle') }}
                        </p>
                    </div>

                    <nav class="space-y-1">
                        @foreach($articles as $art)
                            <a href="#{{ $art['id'] }}" class="group flex w-full items-center justify-between px-3 py-2 text-left text-xs text-[#1a1f1e]/70 hover:bg-[#1a1f1e]/5 hover:text-[#1a1f1e] transition-all">
                                <span class="truncate">
                                    <span class="mr-1.5 font-serif text-[#C06041]">{{ $art['num'] }}</span>
                                    {{ $art['title'] }}
                                </span>
                                <svg class="h-3.5 w-3.5 shrink-0 opacity-0 group-hover:opacity-70 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7M17 7H8M17 7V16"></path>
                                </svg>
                            </a>
                        @endforeach
                    </nav>

                    <div class="border-t border-[#1a1f1e]/10 pt-4">
                        <div class="bg-[#1a1f1e]/5 p-4 text-xs">
                            <p class="font-semibold text-[#1a1f1e]">{{ __t('cgv_page.sidebar.question_title') }}</p>
                            <p class="mt-1 text-[#1a1f1e]/70">
                                {{ __t('cgv_page.sidebar.question_sub') }}
                            </p>
                            <a href="mailto:recrutement@sentissilegal.com" class="mt-3 flex w-full items-center justify-center gap-2 border border-[#1a1f1e]/20 bg-[#FDFCF8] px-3 py-1.5 text-xs font-medium text-[#1a1f1e] hover:border-[#1a1f1e]">
                                <svg class="h-3.5 w-3.5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                </svg>
                                <span>recrutement@sentissilegal.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </aside>

            <!-- CGV Articles Content -->
            <div class="space-y-12 sm:space-y-16 lg:col-span-8">
                <!-- Article 1: Objet -->
                <section id="article-1" class="scroll-mt-28 space-y-6">
                    <div class="flex items-start sm:items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art1.num') }}</span>
                            <h2 class="text-xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgv_page.articles.art1.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>
                            {{ __t('cgv_page.articles.art1.p1') }}
                        </p>
                        <p>
                            {{ __t('cgv_page.articles.art1.p2_prefix') }}<a href="/cgu" class="font-medium text-[#C06041] underline underline-offset-4">{{ __t('cgv_page.articles.art1.p2_link') }}</a>{{ __t('cgv_page.articles.art1.p2_suffix') }}
                        </p>
                        <div class="border-l-4 border-[#C06041] bg-[#1a1f1e]/5 p-4 font-medium text-[#1a1f1e]">
                            {{ __t('cgv_page.articles.art1.box') }}
                        </div>
                    </div>
                </section>

                <!-- Article 2: Prestation : la short-list de profils juridiques -->
                <section id="article-2" class="scroll-mt-28 space-y-6">
                    <div class="flex items-start sm:items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art2.num') }}</span>
                            <h2 class="text-xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgv_page.articles.art2.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>
                            {{ __t('cgv_page.articles.art2.p1') }}
                        </p>
                        <p>
                            {{ __t('cgv_page.articles.art2.p2') }}
                        </p>

                        <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-4 sm:p-5 space-y-3">
                            <h3 class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art2.box_title') }}</h3>
                            <ul class="grid gap-2 sm:grid-cols-2 text-xs sm:text-sm text-[#1a1f1e]/80">
                                <li class="flex items-center gap-2"><div class="h-1.5 w-1.5 bg-[#C06041]"></div>{{ __t('cgv_page.articles.art2.item1') }}</li>
                                <li class="flex items-center gap-2"><div class="h-1.5 w-1.5 bg-[#C06041]"></div>{{ __t('cgv_page.articles.art2.item2') }}</li>
                                <li class="flex items-center gap-2"><div class="h-1.5 w-1.5 bg-[#C06041]"></div>{{ __t('cgv_page.articles.art2.item3') }}</li>
                                <li class="flex items-center gap-2"><div class="h-1.5 w-1.5 bg-[#C06041]"></div>{{ __t('cgv_page.articles.art2.item4') }}</li>
                            </ul>
                        </div>

                        <p class="text-xs text-[#1a1f1e]/70 italic">
                            {{ __t('cgv_page.articles.art2.disclaimer') }}
                        </p>
                    </div>
                </section>

                <!-- Article 3: Prix et Tarification -->
                <section id="article-3" class="scroll-mt-28 space-y-6">
                    <div class="flex items-start sm:items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art3.num') }}</span>
                            <h2 class="text-xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgv_page.articles.art3.title') }}</h2>
                        </div>
                    </div>

                    <div class="border border-[#1a1f1e] bg-[#FDFCF8] p-4 sm:p-6 shadow-md space-y-4">
                        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1a1f1e]/10 pb-4">
                            <div>
                                <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art3.badge') }}</span>
                                <div class="text-2xl sm:text-3xl font-bold text-[#1a1f1e] mt-1">
                                    {{ __t('cgv_page.articles.art3.price') }} <span class="text-xs sm:text-sm font-normal text-[#1a1f1e]/60">{{ __t('cgv_page.articles.art3.unit') }}</span>
                                </div>
                            </div>
                            <div class="text-xs sm:text-sm font-medium text-[#1a1f1e]/70">
                                {{ __t('cgv_page.articles.art3.tax') }}
                            </div>
                        </div>
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/85">
                            {{ __t('cgv_page.articles.art3.p1') }}
                        </p>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('cgv_page.articles.art3.p2') }}</p>
                        <p>{{ __t('cgv_page.articles.art3.p3') }}</p>
                    </div>
                </section>

                <!-- Article 4: Commande et livraison -->
                <section id="article-4" class="scroll-mt-28 space-y-6">
                    <div class="flex items-start sm:items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art4.num') }}</span>
                            <h2 class="text-xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgv_page.articles.art4.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('cgv_page.articles.art4.p1') }}</p>
                        <p>{{ __t('cgv_page.articles.art4.p2_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgv_page.articles.art4.p2_bold') }}</strong>{{ __t('cgv_page.articles.art4.p2_suffix') }}</p>

                        <div class="border border-[#C06041]/30 bg-[#C06041]/5 p-4 sm:p-5 space-y-2">
                            <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                                {{ __t('cgv_page.articles.art4.box_title') }}
                            </div>
                            <p class="text-xs sm:text-sm leading-relaxed text-[#1a1f1e]/85">
                                {{ __t('cgv_page.articles.art4.box_desc') }}
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Article 5: Modalités de paiement -->
                <section id="article-5" class="scroll-mt-28 space-y-6">
                    <div class="flex items-start sm:items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art5.num') }}</span>
                            <h2 class="text-xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgv_page.articles.art5.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-4 sm:p-6 shadow-sm text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>{{ __t('cgv_page.articles.art5.p1_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgv_page.articles.art5.p1_bold') }}</strong>{{ __t('cgv_page.articles.art5.p1_suffix') }}</p>
                        <p>{{ __t('cgv_page.articles.art5.p2') }}</p>
                    </div>
                </section>

                <!-- Article 6: Annulation et rétractation -->
                <section id="article-6" class="scroll-mt-28 space-y-6">
                    <div class="flex items-start sm:items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art6.num') }}</span>
                            <h2 class="text-xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgv_page.articles.art6.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('cgv_page.articles.art6.p1') }}</p>
                        <p>{{ __t('cgv_page.articles.art6.p2') }}</p>
                    </div>
                </section>

                <!-- Article 7: Absence de garantie de résultat -->
                <section id="article-7" class="scroll-mt-28 space-y-6">
                    <div class="flex items-start sm:items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art7.num') }}</span>
                            <h2 class="text-xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgv_page.articles.art7.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('cgv_page.articles.art7.p1_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgv_page.articles.art7.p1_bold') }}</strong>{{ __t('cgv_page.articles.art7.p1_suffix') }}</p>
                        <p>{{ __t('cgv_page.articles.art7.p2') }}</p>
                    </div>
                </section>

                <!-- Article 8: Utilisation des profils livrés -->
                <section id="article-8" class="scroll-mt-28 space-y-6">
                    <div class="flex items-start sm:items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art8.num') }}</span>
                            <h2 class="text-xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgv_page.articles.art8.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-4 sm:p-6 shadow-sm text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>{{ __t('cgv_page.articles.art8.p1') }}</p>
                    </div>
                </section>

                <!-- Article 9: Responsabilité -->
                <section id="article-9" class="scroll-mt-28 space-y-6">
                    <div class="flex items-start sm:items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art9.num') }}</span>
                            <h2 class="text-xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgv_page.articles.art9.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('cgv_page.articles.art9.p1_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgv_page.articles.art9.p1_bold') }}</strong>{{ __t('cgv_page.articles.art9.p1_suffix') }}</p>
                    </div>
                </section>

                <!-- Article 10: Facturation et données personnelles -->
                <section id="article-10" class="scroll-mt-28 space-y-6">
                    <div class="flex items-start sm:items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art10.num') }}</span>
                            <h2 class="text-xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgv_page.articles.art10.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('cgv_page.articles.art10.p1_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgv_page.articles.art10.p1_bold') }}</strong>{{ __t('cgv_page.articles.art10.p1_and') }}<a href="/mentions-legales" class="font-medium text-[#C06041] underline underline-offset-2">{{ __t('cgv_page.articles.art10.p1_link') }}</a>{{ __t('cgv_page.articles.art10.p1_suffix') }}</p>
                    </div>
                </section>

                <!-- Article 11: Droit applicable et litiges -->
                <section id="article-11" class="scroll-mt-28 space-y-6">
                    <div class="flex items-start sm:items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-4 w-4 sm:h-5 sm:w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgv_page.articles.art11.num') }}</span>
                            <h2 class="text-xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgv_page.articles.art11.title') }}</h2>
                        </div>
                    </div>

                    <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-4 sm:p-6 space-y-4 shadow-sm">
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                            {{ __t('cgv_page.articles.art11.p1_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgv_page.articles.art11.p1_bold') }}</strong>{{ __t('cgv_page.articles.art11.p1_middle') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgv_page.articles.art11.p1_courts') }}</strong>{{ __t('cgv_page.articles.art11.p1_suffix') }}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
@endsection
