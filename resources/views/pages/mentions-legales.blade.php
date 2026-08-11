@extends('layouts.legal')

@section('title', __t('mentions_legales_page.seo_title'))
@section('meta_description', __t('mentions_legales_page.seo_description'))
@section('canonical', url('/mentions-legales'))

@section('content')
<div class="w-full flex-1 pb-24 pt-10 sm:pt-14">
    <!-- Hero Section -->
    <section class="relative border-b border-[#1a1f1e]/10 pb-12 pt-6 sm:pb-16 lg:pb-20">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-3xl text-center">
                <div class="inline-flex items-center gap-2 border border-[#C06041]/30 bg-[#C06041]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#C06041]">
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    {{ __t('mentions_legales_page.hero.badge') }}
                </div>

                <h1 class="mt-6 text-4xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl" style="font-family: 'Cormorant Garamond', serif;">
                    {{ __t('mentions_legales_page.hero.title_part1') }} <span class="italic text-[#C06041]">{{ __t('mentions_legales_page.hero.title_part2') }}</span>
                </h1>

                <p class="mt-4 text-base font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                    {{ __t('mentions_legales_page.hero.subtitle') }}
                </p>

                <div class="mt-6 inline-flex items-center gap-2 text-xs font-medium text-[#1a1f1e]/50">
                    <span>{{ __t('mentions_legales_page.hero.updated') }}</span>
                    <span>•</span>
                    <span>{{ __t('mentions_legales_page.hero.law') }}</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Main Content Layout with Sticky Sidebar Navigation -->
    <div class="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-12">
            <!-- Sticky Table of Contents Sidebar -->
            <aside class="hidden lg:block lg:col-span-4">
                <div class="sticky top-28 space-y-6 border border-[#1a1f1e]/10 bg-[#FDFCF8] p-6 shadow-sm">
                    <div>
                        <h3 class="text-lg font-normal text-[#1a1f1e]" style="font-family: 'Cormorant Garamond', serif;">
                            {{ __t('mentions_legales_page.sidebar.title') }}
                        </h3>
                        <p class="text-xs font-light text-[#1a1f1e]/60">
                            {{ __t('mentions_legales_page.sidebar.subtitle') }}
                        </p>
                    </div>

                    <nav class="space-y-1.5">
                        @php
                            $articles = [
                                ['id' => 'article-1', 'num' => __t('mentions_legales_page.articles.art1.num'), 'title' => __t('mentions_legales_page.articles.art1.title')],
                                ['id' => 'article-2', 'num' => __t('mentions_legales_page.articles.art2.num'), 'title' => __t('mentions_legales_page.articles.art2.title')],
                                ['id' => 'article-3', 'num' => __t('mentions_legales_page.articles.art3.num'), 'title' => __t('mentions_legales_page.articles.art3.title')],
                                ['id' => 'article-4', 'num' => __t('mentions_legales_page.articles.art4.num'), 'title' => __t('mentions_legales_page.articles.art4.title')],
                                ['id' => 'article-5', 'num' => __t('mentions_legales_page.articles.art5.num'), 'title' => __t('mentions_legales_page.articles.art5.title')],
                                ['id' => 'article-6', 'num' => __t('mentions_legales_page.articles.art6.num'), 'title' => __t('mentions_legales_page.articles.art6.title')],
                            ];
                        @endphp

                        @foreach($articles as $art)
                            <a href="#{{ $art['id'] }}" class="group flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm text-[#1a1f1e]/70 hover:bg-[#1a1f1e]/5 hover:text-[#1a1f1e] transition-all">
                                <span class="truncate">
                                    <span class="mr-2 font-serif text-[#C06041]">{{ $art['num'] }}</span>
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
                            <p class="font-semibold text-[#1a1f1e]">{{ __t('mentions_legales_page.sidebar.question_title') }}</p>
                            <p class="mt-1 text-[#1a1f1e]/70">
                                {{ __t('mentions_legales_page.sidebar.question_sub') }}
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

            <!-- Legal Articles Content -->
            <div class="space-y-16 lg:col-span-8">
                <!-- Article 1: Éditeur du site -->
                <section id="article-1" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('mentions_legales_page.articles.art1.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('mentions_legales_page.articles.art1.title') }}</h2>
                        </div>
                    </div>

                    <p class="text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        {{ __t('mentions_legales_page.articles.art1.p1_prefix') }}<a href="https://www.jurijob.ma" target="_blank" rel="noopener noreferrer" class="font-medium text-[#C06041] underline underline-offset-4 hover:opacity-80">www.jurijob.ma</a>{{ __t('mentions_legales_page.articles.art1.p1_mid1') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('mentions_legales_page.articles.art1.p1_jurijob') }}</strong>{{ __t('mentions_legales_page.articles.art1.p1_suffix') }}
                    </p>

                    <!-- Structured Grid for Corporate Details -->
                    <div class="grid gap-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm sm:grid-cols-2">
                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">{{ __t('mentions_legales_page.articles.art1.corporate.deno_title') }}</span>
                            <p class="text-base font-semibold text-[#1a1f1e]">{{ __t('mentions_legales_page.articles.art1.corporate.deno_val') }}</p>
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">{{ __t('mentions_legales_page.articles.art1.corporate.forme_title') }}</span>
                            <p class="text-sm font-medium text-[#1a1f1e]">{{ __t('mentions_legales_page.articles.art1.corporate.forme_val') }}</p>
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">{{ __t('mentions_legales_page.articles.art1.corporate.capital_title') }}</span>
                            <p class="text-sm font-medium text-[#1a1f1e]">{{ __t('mentions_legales_page.articles.art1.corporate.capital_val') }}</p>
                        </div>

                        <div class="space-y-1 sm:col-span-2">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">{{ __t('mentions_legales_page.articles.art1.corporate.siege_title') }}</span>
                            <p class="flex items-start gap-2 text-sm font-medium text-[#1a1f1e]">
                                <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span>{{ __t('mentions_legales_page.articles.art1.corporate.siege_val') }}</span>
                            </p>
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">{{ __t('mentions_legales_page.articles.art1.corporate.rc_title') }}</span>
                            <p class="flex items-center gap-1.5 text-sm font-medium text-[#1a1f1e]">
                                <svg class="h-3.5 w-3.5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                                </svg>
                                <span>{{ __t('mentions_legales_page.articles.art1.corporate.rc_val') }}</span>
                            </p>
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">{{ __t('mentions_legales_page.articles.art1.corporate.ice_title') }}</span>
                            <p class="text-sm font-medium text-[#1a1f1e]">{{ __t('mentions_legales_page.articles.art1.corporate.ice_val') }}</p>
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">{{ __t('mentions_legales_page.articles.art1.corporate.if_title') }}</span>
                            <p class="text-sm font-medium text-[#1a1f1e]">{{ __t('mentions_legales_page.articles.art1.corporate.if_val') }}</p>
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">{{ __t('mentions_legales_page.articles.art1.corporate.pub_title') }}</span>
                            <p class="flex items-center gap-1.5 text-sm font-medium text-[#1a1f1e]">
                                <svg class="h-4 w-4 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <span>{{ __t('mentions_legales_page.articles.art1.corporate.pub_val') }}</span>
                            </p>
                        </div>

                        <div class="space-y-1 sm:col-span-2 pt-2 border-t border-[#1a1f1e]/10">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">{{ __t('mentions_legales_page.articles.art1.corporate.contact_title') }}</span>
                            <div class="flex flex-wrap items-center gap-3">
                                <a href="mailto:recrutement@sentissilegal.com" class="inline-flex items-center gap-2 text-sm font-medium text-[#C06041] hover:underline">
                                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                    <span>recrutement@sentissilegal.com</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Trademark Callout Card -->
                    <div class="border border-[#C06041]/20 bg-[#C06041]/5 p-5">
                        <div class="flex items-start gap-3">
                            <svg class="mt-0.5 h-5 w-5 shrink-0 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                            </svg>
                            <div class="text-sm leading-relaxed text-[#1a1f1e]/85">
                                <strong class="font-semibold text-[#1a1f1e]">{{ __t('mentions_legales_page.articles.art1.trademark_bold') }}</strong>{{ __t('mentions_legales_page.articles.art1.trademark_desc') }}<span class="italic font-medium">{{ __t('mentions_legales_page.articles.art1.trademark_brand') }}</span>{{ __t('mentions_legales_page.articles.art1.trademark_suffix') }}<a href="https://www.sentissilegal.com" target="_blank" rel="noopener noreferrer" class="font-medium text-[#C06041] underline underline-offset-2 hover:opacity-80">www.sentissilegal.com</a>.
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Article 2: Hébergement -->
                <section id="article-2" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('mentions_legales_page.articles.art2.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('mentions_legales_page.articles.art2.title') }}</h2>
                        </div>
                    </div>

                    <p class="text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        {{ __t('mentions_legales_page.articles.art2.intro') }}
                    </p>

                    <div class="grid gap-4 sm:grid-cols-3">
                        <div class="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5">
                            <div class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('mentions_legales_page.articles.art2.vercel_badge') }}</div>
                            <h3 class="mt-1 text-base font-semibold text-[#1a1f1e]">Vercel Inc.</h3>
                            <p class="mt-2 text-xs leading-relaxed text-[#1a1f1e]/70">{!! __t('mentions_legales_page.articles.art2.vercel_desc') !!}</p>
                        </div>

                        <div class="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5">
                            <div class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('mentions_legales_page.articles.art2.supabase_badge') }}</div>
                            <h3 class="mt-1 text-base font-semibold text-[#1a1f1e]">Supabase Inc.</h3>
                            <p class="mt-2 text-xs leading-relaxed text-[#1a1f1e]/70">{{ __t('mentions_legales_page.articles.art2.supabase_desc') }}</p>
                        </div>

                        <div class="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5">
                            <div class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('mentions_legales_page.articles.art2.resend_badge') }}</div>
                            <h3 class="mt-1 text-base font-semibold text-[#1a1f1e]">Resend</h3>
                            <p class="mt-2 text-xs leading-relaxed text-[#1a1f1e]/70">{{ __t('mentions_legales_page.articles.art2.resend_desc') }}</p>
                        </div>
                    </div>
                </section>

                <!-- Article 3: Propriété intellectuelle -->
                <section id="article-3" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('mentions_legales_page.articles.art3.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('mentions_legales_page.articles.art3.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 border-l-4 border-[#C06041] bg-[#1a1f1e]/5 p-6 text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>
                            {{ __t('mentions_legales_page.articles.art3.p1_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('mentions_legales_page.articles.art3.p1_law1') }}</strong>{{ __t('mentions_legales_page.articles.art3.p1_mid') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('mentions_legales_page.articles.art3.p1_law2') }}</strong>{{ __t('mentions_legales_page.articles.art3.p1_suffix') }}
                        </p>
                        <p>
                            {{ __t('mentions_legales_page.articles.art3.p2_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('mentions_legales_page.articles.art3.p2_sla') }}</strong>{{ __t('mentions_legales_page.articles.art3.p2_suffix') }}
                        </p>
                        <p class="text-xs text-[#1a1f1e]/70 italic border-t border-[#1a1f1e]/10 pt-3">
                            {{ __t('mentions_legales_page.articles.art3.disclaimer') }}
                        </p>
                    </div>
                </section>

                <!-- Article 4: Traitement des données personnelles -->
                <section id="article-4" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('mentions_legales_page.articles.art4.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('mentions_legales_page.articles.art4.title') }}</h2>
                        </div>
                    </div>

                    <p class="text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        {{ __t('mentions_legales_page.articles.art4.intro') }}
                    </p>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5 space-y-2">
                            <div class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                {{ __t('mentions_legales_page.articles.art4.cndp_title') }}
                            </div>
                            <p class="text-xs leading-relaxed text-[#1a1f1e]/80">
                                {{ __t('mentions_legales_page.articles.art4.cndp_desc') }}
                            </p>
                        </div>

                        <div class="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5 space-y-2">
                            <div class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                                {{ __t('mentions_legales_page.articles.art4.access_title') }}
                            </div>
                            <p class="text-xs leading-relaxed text-[#1a1f1e]/80">
                                {{ __t('mentions_legales_page.articles.art4.access_desc') }}
                            </p>
                        </div>
                    </div>

                    <div class="border border-[#1a1f1e]/15 bg-[#1a1f1e]/5 p-6 space-y-3">
                        <h4 class="text-sm font-semibold text-[#1a1f1e] uppercase tracking-wider">{{ __t('mentions_legales_page.articles.art4.rights_title') }}</h4>
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/80">
                            {{ __t('mentions_legales_page.articles.art4.rights_prefix') }}<a href="mailto:recrutement@sentissilegal.com" class="font-medium text-[#C06041] underline underline-offset-2">recrutement@sentissilegal.com</a>{{ __t('mentions_legales_page.articles.art4.rights_suffix') }}
                        </p>
                    </div>
                </section>

                <!-- Article 5: Responsabilité -->
                <section id="article-5" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('mentions_legales_page.articles.art5.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('mentions_legales_page.articles.art5.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('mentions_legales_page.articles.art5.p1') }}</p>
                        <p>{{ __t('mentions_legales_page.articles.art5.p2') }}</p>
                    </div>
                </section>

                <!-- Article 6: Droit applicable -->
                <section id="article-6" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('mentions_legales_page.articles.art6.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('mentions_legales_page.articles.art6.title') }}</h2>
                        </div>
                    </div>

                    <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 space-y-4 shadow-sm">
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                            {{ __t('mentions_legales_page.articles.art6.p1_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('mentions_legales_page.articles.art6.p1_bold') }}</strong>{{ __t('mentions_legales_page.articles.art6.p1_suffix') }}
                        </p>
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                            {{ __t('mentions_legales_page.articles.art6.p2_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('mentions_legales_page.articles.art6.p2_bold') }}</strong>{{ __t('mentions_legales_page.articles.art6.p2_suffix') }}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
@endsection
