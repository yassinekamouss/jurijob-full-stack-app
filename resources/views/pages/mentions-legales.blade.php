@extends('layouts.legal')

@section('title', 'Mentions Légales & Informations Juridiques - JURIJOB')
@section('meta_description', 'Mentions légales de JURIJOB : éditeur Sentissi Legal Advisory (SLA), hébergement, protection des données personnelles (CNDP, loi 09-08) et propriété intellectuelle.')

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
                    Cadre Réglementaire & Transparence
                </div>

                <h1 class="mt-6 text-4xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl" style="font-family: 'Cormorant Garamond', serif;">
                    Informations <span class="italic text-[#C06041]">Juridiques</span>
                </h1>

                <p class="mt-4 text-base font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                    Mentions légales, informations relatives à l'éditeur, à l'hébergement et aux engagements de protection des données personnelles de la plateforme JURIJOB.
                </p>

                <div class="mt-6 inline-flex items-center gap-2 text-xs font-medium text-[#1a1f1e]/50">
                    <span>Dernière mise à jour : août 2026</span>
                    <span>•</span>
                    <span>Conforme Droit Marocain</span>
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
                            Sommaire interactif
                        </h3>
                        <p class="text-xs font-light text-[#1a1f1e]/60">
                            Accès rapide aux articles légaux
                        </p>
                    </div>

                    <nav class="space-y-1.5">
                        @php
                            $articles = [
                                ['id' => 'article-1', 'num' => 'Article 1', 'title' => 'Éditeur du site'],
                                ['id' => 'article-2', 'num' => 'Article 2', 'title' => 'Hébergement'],
                                ['id' => 'article-3', 'num' => 'Article 3', 'title' => 'Propriété intellectuelle'],
                                ['id' => 'article-4', 'num' => 'Article 4', 'title' => 'Traitement des données personnelles'],
                                ['id' => 'article-5', 'num' => 'Article 5', 'title' => 'Responsabilité'],
                                ['id' => 'article-6', 'num' => 'Article 6', 'title' => 'Droit applicable'],
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
                            <p class="font-semibold text-[#1a1f1e]">Besoin d'assistance juridique ?</p>
                            <p class="mt-1 text-[#1a1f1e]/70">
                                Pour toute demande de clarification réglementaire :
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 1</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Éditeur du site</h2>
                        </div>
                    </div>

                    <p class="text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        Le site <a href="https://www.jurijob.ma" target="_blank" rel="noopener noreferrer" class="font-medium text-[#C06041] underline underline-offset-4 hover:opacity-80">www.jurijob.ma</a> et la plateforme <strong class="font-semibold text-[#1a1f1e]">JURIJOB</strong> sont édités par :
                    </p>

                    <!-- Structured Grid for Corporate Details -->
                    <div class="grid gap-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm sm:grid-cols-2">
                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">Dénomination sociale</span>
                            <p class="text-base font-semibold text-[#1a1f1e]">SENTISSI LEGAL ADVISORY (SLA)</p>
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">Forme juridique</span>
                            <p class="text-sm font-medium text-[#1a1f1e]">Société à responsabilité limitée à associé unique (SARL AU)</p>
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">Capital social</span>
                            <p class="text-sm font-medium text-[#1a1f1e]">10 000 MAD</p>
                        </div>

                        <div class="space-y-1 sm:col-span-2">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">Siège social</span>
                            <p class="flex items-start gap-2 text-sm font-medium text-[#1a1f1e]">
                                <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                                <span>12, rue Saria Ben Zounaim, étage 3, appartement 3 — Palmier, Casablanca, Maroc</span>
                            </p>
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">Registre du commerce</span>
                            <p class="flex items-center gap-1.5 text-sm font-medium text-[#1a1f1e]">
                                <svg class="h-3.5 w-3.5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                                </svg>
                                <span>RC n° 641427 — Tribunal de commerce de Casablanca</span>
                            </p>
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">Identifiant commun (ICE)</span>
                            <p class="text-sm font-medium text-[#1a1f1e]">ICE 003569200000033</p>
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">Identifiant fiscal (IF)</span>
                            <p class="text-sm font-medium text-[#1a1f1e]">IF 66067629</p>
                        </div>

                        <div class="space-y-1">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">Responsable de la publication</span>
                            <p class="flex items-center gap-1.5 text-sm font-medium text-[#1a1f1e]">
                                <svg class="h-4 w-4 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <span>Mohammed Sentissi, gérant</span>
                            </p>
                        </div>

                        <div class="space-y-1 sm:col-span-2 pt-2 border-t border-[#1a1f1e]/10">
                            <span class="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">Contact officiel</span>
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
                                <strong class="font-semibold text-[#1a1f1e]">Marque déposée OMPIC :</strong> JURIJOB est une marque déposée auprès de l'OMPIC sous la dénomination <span class="italic font-medium">« JURIJOB — Smart Recrutement Juridique »</span>. La plateforme est exploitée par Sentissi Legal Advisory, également éditrice du site <a href="https://www.sentissilegal.com" target="_blank" rel="noopener noreferrer" class="font-medium text-[#C06041] underline underline-offset-2 hover:opacity-80">www.sentissilegal.com</a>.
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 2</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Hébergement & Infrastructure</h2>
                        </div>
                    </div>

                    <p class="text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        L'infrastructure technique de la plateforme s'appuie sur des partenaires internationaux garantissant haute disponibilité, sécurité et conformité :
                    </p>

                    <div class="grid gap-4 sm:grid-cols-3">
                        <div class="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5">
                            <div class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Hébergement Web</div>
                            <h3 class="mt-1 text-base font-semibold text-[#1a1f1e]">Vercel Inc.</h3>
                            <p class="mt-2 text-xs leading-relaxed text-[#1a1f1e]/70">Société de droit américain.<br />340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.</p>
                        </div>

                        <div class="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5">
                            <div class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Base de Données</div>
                            <h3 class="mt-1 text-base font-semibold text-[#1a1f1e]">Supabase Inc.</h3>
                            <p class="mt-2 text-xs leading-relaxed text-[#1a1f1e]/70">Infrastructure sécurisée pour le stockage et la gestion des données de la plateforme.</p>
                        </div>

                        <div class="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5">
                            <div class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">E-mails Transactionnels</div>
                            <h3 class="mt-1 text-base font-semibold text-[#1a1f1e]">Resend</h3>
                            <p class="mt-2 text-xs leading-relaxed text-[#1a1f1e]/70">Acheminement des courriels via serveurs d'envoi situés en Irlande (Union européenne).</p>
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 3</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Propriété intellectuelle</h2>
                        </div>
                    </div>

                    <div class="space-y-4 border-l-4 border-[#C06041] bg-[#1a1f1e]/5 p-6 text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>
                            L'ensemble des éléments composant le site — structure, textes, graphismes, logo, charte visuelle, base de données et méthodologie de sélection — est protégé par la <strong class="font-semibold text-[#1a1f1e]">loi 2-00</strong> relative aux droits d'auteur et droits voisins, ainsi que par la <strong class="font-semibold text-[#1a1f1e]">loi 17-97</strong> relative à la protection de la propriété industrielle.
                        </p>
                        <p>
                            Toute reproduction, représentation, extraction ou réutilisation, totale ou partielle, sans autorisation écrite préalable de <strong class="font-semibold text-[#1a1f1e]">Sentissi Legal Advisory</strong>, est strictement interdite.
                        </p>
                        <p class="text-xs text-[#1a1f1e]/70 italic border-t border-[#1a1f1e]/10 pt-3">
                            * Les contenus déposés par les candidats demeurent leur propriété exclusive ; ceux-ci concèdent à la plateforme une licence d'utilisation limitée aux seules finalités du service.
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 4</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Traitement des données personnelles (Loi 09-08)</h2>
                        </div>
                    </div>

                    <p class="text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        Par le biais de ce formulaire, Mohammed Sentissi collecte vos données personnelles en vue de leur inscription dans la CVthèque JURIJOB, plateforme de sélection de profils juridiques destinée à mettre les candidats en relation avec des recruteurs identifiés au Maroc et en Afrique francophone.
                    </p>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5 space-y-2">
                            <div class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Déclaration CNDP
                            </div>
                            <p class="text-xs leading-relaxed text-[#1a1f1e]/80">
                                Ce traitement a fait l'objet d'une déclaration auprès de la CNDP sous le numéro en cours de traitement par la CNDP. Les données personnelles collectées peuvent être transmises à tous les recruteurs potentiels au Maroc conformément à la demande de transfert déposée auprès de la CNDP.
                            </p>
                        </div>

                        <div class="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5 space-y-2">
                            <div class="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                </svg>
                                Accès Réservé & Protection
                            </div>
                            <p class="text-xs leading-relaxed text-[#1a1f1e]/80">
                                L'accès aux profils est strictement réservé aux recruteurs dont le paiement a été confirmé. Aucune diffusion publique n'est effectuée. Les données sont conservées tant que le candidat maintient son profil actif ; celui-ci peut le supprimer définitivement à tout moment depuis son espace personnel.
                            </p>
                        </div>
                    </div>

                    <div class="border border-[#1a1f1e]/15 bg-[#1a1f1e]/5 p-6 space-y-3">
                        <h4 class="text-sm font-semibold text-[#1a1f1e] uppercase tracking-wider">Exercice de vos droits (Loi 09-08)</h4>
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/80">
                            Vous pouvez vous adresser à <a href="mailto:recrutement@sentissilegal.com" class="font-medium text-[#C06041] underline underline-offset-2">recrutement@sentissilegal.com</a> pour exercer vos droits d'accès, de rectification et d'opposition conformément aux dispositions de la loi marocaine 09-08.
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 5</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Limitation de Responsabilité</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>JURIJOB intervient en qualité d'outil de sourcing et de mise en relation. La plateforme n'est pas partie aux relations contractuelles qui se nouent entre candidats et recruteurs, et ne saurait être tenue responsable du déroulement des entretiens, des décisions d'embauche ou des engagements pris entre les parties.</p>
                        <p>Les informations figurant dans les profils sont déclarées par les candidats sous leur seule responsabilité. Sentissi Legal Advisory s'efforce d'assurer la disponibilité et l'exactitude du service, sans garantir une accessibilité ininterrompue.</p>
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 6</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Droit applicable & juridiction compétente</h2>
                        </div>
                    </div>

                    <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 space-y-4 shadow-sm">
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                            Les présentes mentions légales sont régies par le <strong class="font-semibold text-[#1a1f1e]">droit marocain</strong>.
                        </p>
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                            Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des <strong class="font-semibold text-[#1a1f1e]">tribunaux de Casablanca</strong>, à défaut de résolution amiable.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
@endsection
