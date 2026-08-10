@extends('layouts.legal')

@section('title', 'Conditions Générales de Vente (CGV) - JURIJOB')
@section('meta_description', 'Conditions Générales de Vente de JURIJOB : tarifs, commande, livraison de la short-list, paiement par virement, annulation et cadre légal.')

@section('content')
<div class="w-full flex-1 pb-24 pt-10 sm:pt-14">
    <!-- Hero Section -->
    <section class="relative border-b border-[#1a1f1e]/10 pb-12 pt-6 sm:pb-16 lg:pb-20">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-3xl text-center">
                <div class="inline-flex items-center gap-2 border border-[#C06041]/30 bg-[#C06041]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#C06041]">
                    <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    Prestations Payantes & Recruteurs
                </div>

                <h1 class="mt-6 text-4xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl" style="font-family: 'Cormorant Garamond', serif;">
                    Conditions Générales <span class="italic text-[#C06041]">de Vente</span>
                </h1>

                <p class="mt-4 text-base font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                    Les conditions applicables aux prestations payantes de JURIJOB, destinées aux recruteurs professionnels.
                </p>

                <div class="mt-6 inline-flex items-center gap-2 text-xs font-medium text-[#1a1f1e]/50">
                    <span>Dernière mise à jour : août 2026</span>
                    <span>•</span>
                    <span>Droit Commercial Marocain</span>
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
                            Table des articles des CGV
                        </p>
                    </div>

                    <nav class="space-y-1">
                        @php
                            $articles = [
                                ['id' => 'article-1', 'num' => 'Article 1', 'title' => 'Objet'],
                                ['id' => 'article-2', 'num' => 'Article 2', 'title' => 'Prestation : la short-list'],
                                ['id' => 'article-3', 'num' => 'Article 3', 'title' => 'Prix et Tarification'],
                                ['id' => 'article-4', 'num' => 'Article 4', 'title' => 'Commande et livraison'],
                                ['id' => 'article-5', 'num' => 'Article 5', 'title' => 'Modalités de paiement'],
                                ['id' => 'article-6', 'num' => 'Article 6', 'title' => 'Annulation et rétractation'],
                                ['id' => 'article-7', 'num' => 'Article 7', 'title' => 'Absence de garantie de résultat'],
                                ['id' => 'article-8', 'num' => 'Article 8', 'title' => 'Utilisation des profils livrés'],
                                ['id' => 'article-9', 'num' => 'Article 9', 'title' => 'Responsabilité'],
                                ['id' => 'article-10', 'num' => 'Article 10', 'title' => 'Facturation et données personnelles'],
                                ['id' => 'article-11', 'num' => 'Article 11', 'title' => 'Droit applicable et litiges'],
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
                            <p class="font-semibold text-[#1a1f1e]">Une question sur votre commande ?</p>
                            <p class="mt-1 text-[#1a1f1e]/70">
                                Contactez notre équipe dédiée aux recruteurs :
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
            <div class="space-y-16 lg:col-span-8">
                <!-- Article 1: Objet -->
                <section id="article-1" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 1</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Objet</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>
                            Les présentes Conditions Générales de Vente (ci-après les « <strong class="font-semibold text-[#1a1f1e]">CGV</strong> ») régissent les prestations payantes proposées par <strong class="font-semibold text-[#1a1f1e]">SENTISSI LEGAL ADVISORY SARL AU</strong> (ci-après « SLA ») aux recruteurs professionnels via la plateforme JURIJOB.
                        </p>
                        <p>
                            Elles complètent les <a href="/cgu" class="font-medium text-[#C06041] underline underline-offset-4">Conditions Générales d'Utilisation</a>, auxquelles elles ne dérogent pas. En cas de contradiction, les présentes CGV prévalent pour tout ce qui concerne les prestations payantes.
                        </p>
                        <div class="border-l-4 border-[#C06041] bg-[#1a1f1e]/5 p-4 font-medium text-[#1a1f1e]">
                            Toute commande emporte acceptation pleine et entière des présentes CGV.
                        </div>
                    </div>
                </section>

                <!-- Article 2: Prestation : la short-list de profils juridiques -->
                <section id="article-2" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 2</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Prestation : la short-list de profils juridiques</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>
                            La prestation principale consiste en la livraison d'une short-list de profils juridiques présélectionnés, établie en réponse aux critères définis par le recruteur : <span class="italic">spécialisations, niveau d'expérience, diplôme, langues et modalité de travail</span>.
                        </p>
                        <p>
                            Chaque profil est évalué au moyen d'un algorithme de scoring propriétaire portant sur quatre dimensions, puis la sélection est validée manuellement avant transmission.
                        </p>

                        <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-3">
                            <h3 class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Contenu du livrable pour chaque profil</h3>
                            <ul class="grid gap-2 sm:grid-cols-2 text-xs sm:text-sm text-[#1a1f1e]/80">
                                <li class="flex items-center gap-2"><div class="h-1.5 w-1.5 bg-[#C06041]"></div>Identité et coordonnées du candidat</li>
                                <li class="flex items-center gap-2"><div class="h-1.5 w-1.5 bg-[#C06041]"></div>Parcours complet de formation</li>
                                <li class="flex items-center gap-2"><div class="h-1.5 w-1.5 bg-[#C06041]"></div>Expériences professionnelles détaillées</li>
                                <li class="flex items-center gap-2"><div class="h-1.5 w-1.5 bg-[#C06041]"></div>Spécialisations & compétences linguistiques</li>
                            </ul>
                        </div>

                        <p class="text-xs text-[#1a1f1e]/70 italic">
                            La prestation ne comprend ni la conduite des entretiens, ni l'évaluation approfondie des candidats, ni aucune garantie d'embauche. Ces prestations peuvent faire l'objet de services complémentaires distincts, sur devis.
                        </p>
                    </div>
                </section>

                <!-- Article 3: Prix et Tarification -->
                <section id="article-3" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 3</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Prix et Tarification</h2>
                        </div>
                    </div>

                    <div class="border border-[#1a1f1e] bg-[#FDFCF8] p-6 shadow-md space-y-4">
                        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1a1f1e]/10 pb-4">
                            <div>
                                <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Tarif unitaire réglementé</span>
                                <div class="text-3xl font-bold text-[#1a1f1e] mt-1">
                                    1 490 MAD <span class="text-sm font-normal text-[#1a1f1e]/60">HT / profil</span>
                                </div>
                            </div>
                            <div class="text-sm font-medium text-[#1a1f1e]/70">
                                Soit <strong class="text-[#1a1f1e] font-semibold">1 788 MAD TTC</strong> (TVA 20%)
                            </div>
                        </div>
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/85">
                            Le montant total dû correspond au prix unitaire multiplié par le nombre de profils effectivement composant la short-list livrée. Ce montant est affiché au recruteur avant tout engagement de paiement.
                        </p>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>Des conditions tarifaires spécifiques peuvent être consenties pour les besoins récurrents ou les volumes importants.</p>
                        <p>Les prix sont susceptibles d'évoluer ; le tarif applicable est celui en vigueur au jour de la livraison de la short-list.</p>
                    </div>
                </section>

                <!-- Article 4: Commande et livraison -->
                <section id="article-4" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 4</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Commande et livraison</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>Le recruteur dépose sa demande depuis son espace personnel en précisant ses critères et le nombre de profils souhaité.</p>
                        <p>SLA s'engage à livrer la short-list dans un délai indicatif de <strong class="font-semibold text-[#1a1f1e]">48 heures ouvrées</strong> à compter de la validation de la demande.</p>

                        <div class="border border-[#C06041]/30 bg-[#C06041]/5 p-5 space-y-2">
                            <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                                Garantie 0 MAD en cas d'absence de correspondance
                            </div>
                            <p class="text-xs sm:text-sm leading-relaxed text-[#1a1f1e]/85">
                                Lorsque aucun profil ne correspond aux critères, aucune short-list n'est livrée et aucune somme n'est due. SLA en informe le recruteur et peut lui proposer une prestation complémentaire de recherche directe.
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Article 5: Modalités de paiement -->
                <section id="article-5" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 5</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Modalités de paiement</h2>
                        </div>
                    </div>

                    <div class="space-y-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>Le paiement s'effectue par <strong class="font-semibold text-[#1a1f1e]">virement bancaire</strong> sur le compte de SENTISSI LEGAL ADVISORY.</p>
                        <p>Le recruteur signale son virement depuis son espace personnel. L'accès aux profils est débloqué après vérification de la réception des fonds par SLA.</p>
                    </div>
                </section>

                <!-- Article 6: Annulation et rétractation -->
                <section id="article-6" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 6</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Annulation et rétractation</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>Le recruteur peut retirer sa demande à tout moment, tant qu'aucun paiement n'a été effectué, sans frais ni justification.</p>
                        <p>Une fois le paiement confirmé et l'accès aux profils débloqué, la prestation est réputée exécutée et aucun remboursement ne peut être demandé au motif qu'aucun candidat n'aurait été retenu.</p>
                    </div>
                </section>

                <!-- Article 7: Absence de garantie de résultat -->
                <section id="article-7" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 7</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Absence de garantie de résultat</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>SLA est tenue à une <strong class="font-semibold text-[#1a1f1e]">obligation de moyens</strong> et non de résultat.</p>
                        <p>Les informations composant les profils sont déclarées par les candidats sous leur seule responsabilité. Il appartient au recruteur de procéder aux vérifications qu'il juge nécessaires.</p>
                    </div>
                </section>

                <!-- Article 8: Utilisation des profils livrés -->
                <section id="article-8" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 8</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Utilisation des profils livrés</h2>
                        </div>
                    </div>

                    <div class="space-y-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>Les profils livrés sont destinés au seul processus de recrutement au titre duquel la short-list a été commandée. Toute extraction massive, revente ou communication à des tiers est strictement interdite.</p>
                    </div>
                </section>

                <!-- Article 9: Responsabilité -->
                <section id="article-9" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 9</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Limitation de responsabilité</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>La responsabilité de SLA ne saurait excéder le <strong class="font-semibold text-[#1a1f1e]">montant effectivement réglé</strong> par le recruteur au titre de la prestation concernée.</p>
                    </div>
                </section>

                <!-- Article 10: Facturation et données personnelles -->
                <section id="article-10" class="scroll-mt-28 space-y-6">
                    <div class="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                        <div class="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                            <svg class="h-5 w-5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 10</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Facturation et données personnelles</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>Une facture est établie pour chaque prestation. Le traitement des données personnelles est effectué conformément à la <strong class="font-semibold text-[#1a1f1e]">loi 09-08</strong> et aux <a href="/mentions-legales" class="font-medium text-[#C06041] underline underline-offset-2">mentions légales</a>.</p>
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 11</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Droit applicable et litiges</h2>
                        </div>
                    </div>

                    <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 space-y-4 shadow-sm">
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                            Les présentes CGV sont régies par le <strong class="font-semibold text-[#1a1f1e]">droit marocain</strong>. Tout litige relève de la compétence exclusive des <strong class="font-semibold text-[#1a1f1e]">tribunaux de Casablanca</strong>.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
@endsection
