@extends('layouts.legal')

@section('title', __t('cgu_page.seo_title'))
@section('meta_description', __t('cgu_page.seo_description'))
@section('canonical', url('/cgu'))

@section('content')
<div class="w-full flex-1 pb-24 pt-10 sm:pt-14">
    <!-- Hero Section -->
    <section class="relative border-b border-[#1a1f1e]/10 pb-12 pt-6 sm:pb-16 lg:pb-20">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-3xl text-center">
                <div class="inline-flex items-center gap-2 border border-[#C06041]/30 bg-[#C06041]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#C06041]">
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ __t('cgu_page.hero.badge') }}
                </div>

                <h1 class="mt-6 text-4xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl" style="font-family: 'Cormorant Garamond', serif;">
                    {{ __t('cgu_page.hero.title_part1') }} <span class="italic text-[#C06041]">{{ __t('cgu_page.hero.title_part2') }}</span>
                </h1>

                <p class="mt-4 text-base font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                    {{ __t('cgu_page.hero.subtitle') }}
                </p>

                <div class="mt-6 inline-flex items-center gap-2 text-xs font-medium text-[#1a1f1e]/50">
                    <span>{{ __t('cgu_page.hero.updated') }}</span>
                    <span>•</span>
                    <span>{{ __t('cgu_page.hero.law') }}</span>
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
                            {{ __t('cgu_page.sidebar.title') }}
                        </h3>
                        <p class="text-xs font-light text-[#1a1f1e]/60">
                            {{ __t('cgu_page.sidebar.subtitle') }}
                        </p>
                    </div>

                    <nav class="space-y-1">
                        @php
                            $articles = [
                                ['id' => 'article-1', 'num' => __t('cgu_page.articles.art1.num'), 'title' => __t('cgu_page.articles.art1.title')],
                                ['id' => 'article-2', 'num' => __t('cgu_page.articles.art2.num'), 'title' => __t('cgu_page.articles.art2.title')],
                                ['id' => 'article-3', 'num' => __t('cgu_page.articles.art3.num'), 'title' => __t('cgu_page.articles.art3.title')],
                                ['id' => 'article-4', 'num' => __t('cgu_page.articles.art4.num'), 'title' => __t('cgu_page.articles.art4.title')],
                                ['id' => 'article-5', 'num' => __t('cgu_page.articles.art5.num'), 'title' => __t('cgu_page.articles.art5.title')],
                                ['id' => 'article-6', 'num' => __t('cgu_page.articles.art6.num'), 'title' => __t('cgu_page.articles.art6.title')],
                                ['id' => 'article-7', 'num' => __t('cgu_page.articles.art7.num'), 'title' => __t('cgu_page.articles.art7.title')],
                                ['id' => 'article-8', 'num' => __t('cgu_page.articles.art8.num'), 'title' => __t('cgu_page.articles.art8.title')],
                                ['id' => 'article-9', 'num' => __t('cgu_page.articles.art9.num'), 'title' => __t('cgu_page.articles.art9.title')],
                                ['id' => 'article-10', 'num' => __t('cgu_page.articles.art10.num'), 'title' => __t('cgu_page.articles.art10.title')],
                                ['id' => 'article-11', 'num' => __t('cgu_page.articles.art11.num'), 'title' => __t('cgu_page.articles.art11.title')],
                            ];
                        @endphp

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
                            <p class="font-semibold text-[#1a1f1e]">{{ __t('cgu_page.sidebar.question_title') }}</p>
                            <p class="mt-1 text-[#1a1f1e]/70">
                                {{ __t('cgu_page.sidebar.question_sub') }}
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

            <!-- CGU Articles Content -->
            <div class="space-y-16 lg:col-span-8">
                <!-- Article 1: Objet et champ d'application -->
                <section id="article-1" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art1.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgu_page.articles.art1.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>
                            {{ __t('cgu_page.articles.art1.p1_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgu_page.articles.art1.p1_cgu') }}</strong>{{ __t('cgu_page.articles.art1.p1_mid1') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgu_page.articles.art1.p1_jurijob') }}</strong>{{ __t('cgu_page.articles.art1.p1_mid2') }}<a href="https://www.jurijob.ma" target="_blank" rel="noopener noreferrer" class="font-medium text-[#C06041] underline underline-offset-4 hover:opacity-80">www.jurijob.ma</a>{{ __t('cgu_page.articles.art1.p1_mid3') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgu_page.articles.art1.p1_sla') }}</strong>{{ __t('cgu_page.articles.art1.p1_suffix') }}
                        </p>
                        <p>
                            {{ __t('cgu_page.articles.art1.p2') }}
                        </p>
                        <div class="border-l-4 border-[#C06041] bg-[#1a1f1e]/5 p-4 font-medium text-[#1a1f1e]">
                            {{ __t('cgu_page.articles.art1.box') }}
                        </div>
                    </div>
                </section>

                <!-- Article 2: Définitions -->
                <section id="article-2" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art2.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgu_page.articles.art2.title') }}</h2>
                        </div>
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art2.candidat_title') }}</span>
                            <p class="text-sm leading-relaxed text-[#1a1f1e]/80">
                                {{ __t('cgu_page.articles.art2.candidat_desc') }}
                            </p>
                        </div>

                        <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art2.recruteur_title') }}</span>
                            <p class="text-sm leading-relaxed text-[#1a1f1e]/80">
                                {{ __t('cgu_page.articles.art2.recruteur_desc') }}
                            </p>
                        </div>

                        <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art2.shortlist_title') }}</span>
                            <p class="text-sm leading-relaxed text-[#1a1f1e]/80">
                                {{ __t('cgu_page.articles.art2.shortlist_desc') }}
                            </p>
                        </div>

                        <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art2.cvtheque_title') }}</span>
                            <p class="text-sm leading-relaxed text-[#1a1f1e]/80">
                                {{ __t('cgu_page.articles.art2.cvtheque_desc') }}
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Article 3: Accès au service -->
                <section id="article-3" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art3.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgu_page.articles.art3.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('cgu_page.articles.art3.p1') }}</p>
                        <p>{{ __t('cgu_page.articles.art3.p2') }}</p>
                        <p>{{ __t('cgu_page.articles.art3.p3') }}</p>
                    </div>
                </section>

                <!-- Article 4: Inscription et compte utilisateur -->
                <section id="article-4" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art4.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgu_page.articles.art4.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('cgu_page.articles.art4.p1') }}</p>
                        <p>{{ __t('cgu_page.articles.art4.p2') }}</p>
                    </div>

                    <div class="border border-[#C06041]/30 bg-[#C06041]/5 p-5 space-y-2">
                        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {{ __t('cgu_page.articles.art4.box_title') }}
                        </div>
                        <p class="text-xs sm:text-sm leading-relaxed text-[#1a1f1e]/85">
                            {{ __t('cgu_page.articles.art4.box_desc') }}
                        </p>
                    </div>

                    <p class="text-xs text-[#1a1f1e]/70 italic">
                        {{ __t('cgu_page.articles.art4.disclaimer') }}
                    </p>
                </section>

                <!-- Article 5: Obligations du candidat -->
                <section id="article-5" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art5.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgu_page.articles.art5.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <ul class="space-y-3 list-disc list-inside text-[#1a1f1e]/80">
                            <li><strong class="text-[#1a1f1e]">{{ __t('cgu_page.articles.art5.item1_bold') }}</strong>{{ __t('cgu_page.articles.art5.item1_text') }}</li>
                            <li><strong class="text-[#1a1f1e]">{{ __t('cgu_page.articles.art5.item2_bold') }}</strong>{{ __t('cgu_page.articles.art5.item2_text') }}</li>
                            <li><strong class="text-[#1a1f1e]">{{ __t('cgu_page.articles.art5.item3_bold') }}</strong>{{ __t('cgu_page.articles.art5.item3_text') }}</li>
                        </ul>

                        <div class="border-t border-[#1a1f1e]/10 pt-4 text-xs text-[#C06041] font-medium">
                            {{ __t('cgu_page.articles.art5.disclaimer') }}
                        </div>
                    </div>
                </section>

                <!-- Article 6: Obligations du recruteur -->
                <section id="article-6" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art6.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgu_page.articles.art6.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>{{ __t('cgu_page.articles.art6.p1') }}</p>
                        <p>{{ __t('cgu_page.articles.art6.p2') }}</p>

                        <div class="border border-[#1a1f1e]/10 bg-[#1a1f1e]/5 p-4 text-xs sm:text-sm font-medium text-[#1a1f1e]">
                            <strong class="text-[#C06041] uppercase tracking-wider block mb-1 text-xs">{{ __t('cgu_page.articles.art6.box_title') }}</strong>
                            {{ __t('cgu_page.articles.art6.box_desc') }}
                        </div>

                        <p class="text-xs text-[#1a1f1e]/70">
                            {{ __t('cgu_page.articles.art6.p3') }}
                        </p>
                    </div>
                </section>

                <!-- Article 7: Rôle et limites de la Plateforme -->
                <section id="article-7" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art7.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgu_page.articles.art7.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('cgu_page.articles.art7.p1') }}</p>
                        <p>{{ __t('cgu_page.articles.art7.p2') }}</p>
                        <p>{{ __t('cgu_page.articles.art7.p3') }}</p>
                    </div>

                    <div class="border-l-4 border-[#C06041] border-y border-r border-[#1a1f1e]/15 bg-[#1a1f1e] p-6 text-[#FDFCF8] shadow-md">
                        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C06041]">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                            </svg>
                            {{ __t('cgu_page.articles.art7.box_title') }}
                        </div>
                        <p class="mt-2 text-base font-medium leading-relaxed sm:text-lg">
                            {{ __t('cgu_page.articles.art7.box_desc') }}
                        </p>
                    </div>
                </section>

                <!-- Article 8: Propriété intellectuelle -->
                <section id="article-8" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art8.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgu_page.articles.art8.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('cgu_page.articles.art8.p1_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgu_page.articles.art8.p1_law1') }}</strong>{{ __t('cgu_page.articles.art8.p1_mid') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgu_page.articles.art8.p1_law2') }}</strong>{{ __t('cgu_page.articles.art8.p1_suffix') }}</p>
                        <p>{{ __t('cgu_page.articles.art8.p2_prefix') }}<span class="italic font-medium">{{ __t('cgu_page.articles.art8.p2_brand') }}</span>{{ __t('cgu_page.articles.art8.p2_suffix') }}</p>
                        <p class="text-xs text-[#1a1f1e]/70 italic border-t border-[#1a1f1e]/10 pt-3">
                            {{ __t('cgu_page.articles.art8.disclaimer') }}
                        </p>
                    </div>
                </section>

                <!-- Article 9: Données personnelles -->
                <section id="article-9" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art9.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgu_page.articles.art9.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('cgu_page.articles.art9.p1_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgu_page.articles.art9.p1_law') }}</strong>{{ __t('cgu_page.articles.art9.p1_suffix') }}</p>
                        <p>{{ __t('cgu_page.articles.art9.p2') }}</p>

                        <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art9.box_title') }}</span>
                            <p class="text-xs sm:text-sm text-[#1a1f1e]/85">
                                {{ __t('cgu_page.articles.art9.box_prefix') }}<a href="mailto:recrutement@sentissilegal.com" class="font-medium text-[#C06041] underline underline-offset-2">recrutement@sentissilegal.com</a>{{ __t('cgu_page.articles.art9.box_mid') }}<a href="/mentions-legales" class="font-medium text-[#C06041] underline underline-offset-2">{{ __t('cgu_page.articles.art9.box_link') }}</a>{{ __t('cgu_page.articles.art9.box_suffix') }}
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Article 10: Modification des CGU -->
                <section id="article-10" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art10.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgu_page.articles.art10.title') }}</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>{{ __t('cgu_page.articles.art10.p1') }}</p>
                        <p>{{ __t('cgu_page.articles.art10.p2') }}</p>
                    </div>
                </section>

                <!-- Article 11: Droit applicable et litiges -->
                <section id="article-11" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">{{ __t('cgu_page.articles.art11.num') }}</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">{{ __t('cgu_page.articles.art11.title') }}</h2>
                        </div>
                    </div>

                    <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 space-y-4 shadow-sm">
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                            {{ __t('cgu_page.articles.art11.p1_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgu_page.articles.art11.p1_bold') }}</strong>{{ __t('cgu_page.articles.art11.p1_suffix') }}
                        </p>
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                            {{ __t('cgu_page.articles.art11.p2_prefix') }}<strong class="font-semibold text-[#1a1f1e]">{{ __t('cgu_page.articles.art11.p2_bold') }}</strong>{{ __t('cgu_page.articles.art11.p2_suffix') }}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
@endsection
