@extends('layouts.legal')

@section('title', "Conditions Générales d'Utilisation (CGU) | JuriJob")
@section('meta_description', "Conditions Générales d'Utilisation de JURIJOB : règles d'accès, d'inscription, obligations des candidats et recruteurs, limites de responsabilité et droit marocain.")
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
                    Cadre Contractuel & Utilisation
                </div>

                <h1 class="mt-6 text-4xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl" style="font-family: 'Cormorant Garamond', serif;">
                    Conditions Générales <span class="italic text-[#C06041]">d'Utilisation</span>
                </h1>

                <p class="mt-4 text-base font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                    Les règles d'accès et d'utilisation de la plateforme JURIJOB, applicables aux candidats comme aux recruteurs.
                </p>

                <div class="mt-6 inline-flex items-center gap-2 text-xs font-medium text-[#1a1f1e]/50">
                    <span>Dernière mise à jour : août 2026</span>
                    <span>•</span>
                    <span>Droit Marocain</span>
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
                            Table des articles des CGU
                        </p>
                    </div>

                    <nav class="space-y-1">
                        @php
                            $articles = [
                                ['id' => 'article-1', 'num' => 'Article 1', 'title' => "Objet et champ d'application"],
                                ['id' => 'article-2', 'num' => 'Article 2', 'title' => 'Définitions'],
                                ['id' => 'article-3', 'num' => 'Article 3', 'title' => 'Accès au service'],
                                ['id' => 'article-4', 'num' => 'Article 4', 'title' => 'Inscription et compte utilisateur'],
                                ['id' => 'article-5', 'num' => 'Article 5', 'title' => 'Obligations du candidat'],
                                ['id' => 'article-6', 'num' => 'Article 6', 'title' => 'Obligations du recruteur'],
                                ['id' => 'article-7', 'num' => 'Article 7', 'title' => 'Rôle et limites de la Plateforme'],
                                ['id' => 'article-8', 'num' => 'Article 8', 'title' => 'Propriété intellectuelle'],
                                ['id' => 'article-9', 'num' => 'Article 9', 'title' => 'Données personnelles'],
                                ['id' => 'article-10', 'num' => 'Article 10', 'title' => 'Modification des CGU'],
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
                            <p class="font-semibold text-[#1a1f1e]">Une question sur les CGU ?</p>
                            <p class="mt-1 text-[#1a1f1e]/70">
                                Écrivez-nous directement à notre adresse dédiée :
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 1</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Objet et champ d'application</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>
                            Les présentes Conditions Générales d'Utilisation (ci-après les « <strong class="font-semibold text-[#1a1f1e]">CGU</strong> ») définissent les modalités d'accès et d'utilisation de la plateforme <strong class="font-semibold text-[#1a1f1e]">JURIJOB</strong>, accessible à l'adresse <a href="https://www.jurijob.ma" target="_blank" rel="noopener noreferrer" class="font-medium text-[#C06041] underline underline-offset-4 hover:opacity-80">www.jurijob.ma</a>, éditée par la société <strong class="font-semibold text-[#1a1f1e]">SENTISSI LEGAL ADVISORY SARL AU</strong> (ci-après « SLA » ou « la Plateforme »).
                        </p>
                        <p>
                            JURIJOB est un outil de sourcing spécialisé dans les métiers du droit. La Plateforme met en relation des professionnels du droit — <span class="italic">juristes d'entreprise, avocats, notaires, fiscalistes, compliance officers</span> — avec des recruteurs identifiés au Maroc et en Afrique.
                        </p>
                        <div class="border-l-4 border-[#C06041] bg-[#1a1f1e]/5 p-4 font-medium text-[#1a1f1e]">
                            Toute utilisation de la Plateforme emporte acceptation pleine et entière des présentes CGU. L'utilisateur qui n'accepte pas ces conditions doit renoncer à utiliser le service.
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 2</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Définitions clés</h2>
                        </div>
                    </div>

                    <div class="grid gap-4 sm:grid-cols-2">
                        <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Candidat</span>
                            <p class="text-sm leading-relaxed text-[#1a1f1e]/80">
                                Toute personne physique créant un profil dans la CVthèque JURIJOB en vue d'être proposée à des recruteurs.
                            </p>
                        </div>

                        <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Recruteur</span>
                            <p class="text-sm leading-relaxed text-[#1a1f1e]/80">
                                Toute personne morale ou physique agissant dans le cadre de son activité professionnelle, déposant une demande de sourcing sur la Plateforme.
                            </p>
                        </div>

                        <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Short-list</span>
                            <p class="text-sm leading-relaxed text-[#1a1f1e]/80">
                                Sélection de profils de candidats, évalués puis validés manuellement, transmise à un recruteur en réponse à sa demande.
                            </p>
                        </div>

                        <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">CVthèque</span>
                            <p class="text-sm leading-relaxed text-[#1a1f1e]/80">
                                Base de données des profils candidats constituée et exploitée exclusivement par SLA.
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 3</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Accès au service</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>La consultation des pages publiques de la Plateforme est libre et gratuite. La création d'un compte est nécessaire pour déposer un profil candidat ou une demande de sourcing.</p>
                        <p>L'utilisateur est responsable de son équipement informatique et de sa connexion Internet. Les frais d'accès au réseau demeurent à sa charge exclusive.</p>
                        <p>SLA se réserve le droit de suspendre temporairement l'accès à la Plateforme pour des raisons de maintenance, de mise à jour ou de sécurité, sans que cette interruption puisse ouvrir droit à une quelconque indemnisation.</p>
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 4</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Inscription et compte utilisateur</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>L'inscription requiert la communication d'informations exactes, complètes et à jour. L'utilisateur s'engage à maintenir l'exactitude de ces informations pendant toute la durée d'utilisation du service.</p>
                        <p>Une adresse e-mail valide est exigée ; son activation peut être soumise à vérification. Chaque utilisateur est seul responsable de la confidentialité de ses identifiants et de toute activité effectuée depuis son compte.</p>
                    </div>

                    <div class="border border-[#C06041]/30 bg-[#C06041]/5 p-5 space-y-2">
                        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Règle d'unicité de compte par rôle
                        </div>
                        <p class="text-xs sm:text-sm leading-relaxed text-[#1a1f1e]/85">
                            Une même adresse e-mail ne peut être associée qu'à un seul rôle — candidat ou recruteur. Pour disposer des deux espaces, l'utilisateur doit créer deux comptes distincts avec des adresses e-mail différentes.
                        </p>
                    </div>

                    <p class="text-xs text-[#1a1f1e]/70 italic">
                        SLA se réserve le droit de suspendre ou de supprimer tout compte en cas de manquement aux présentes CGU, notamment en cas d'informations manifestement fausses ou d'usurpation d'identité.
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 5</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Obligations du candidat</h2>
                        </div>
                    </div>

                    <div class="space-y-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <ul class="space-y-3 list-disc list-inside text-[#1a1f1e]/80">
                            <li><strong class="text-[#1a1f1e]">Sincérité des informations :</strong> Le candidat garantit l'exactitude des informations déclarées (identité, coordonnées, formations, expériences professionnelles, spécialisations et compétences linguistiques).</li>
                            <li><strong class="text-[#1a1f1e]">Légitimité des données :</strong> Il s'engage à ne renseigner que des données le concernant personnellement et dont il est en droit de disposer.</li>
                            <li><strong class="text-[#1a1f1e]">Maîtrise du profil :</strong> Le candidat peut consulter, modifier, compléter ou supprimer définitivement son profil à tout moment depuis son espace personnel.</li>
                        </ul>

                        <div class="border-t border-[#1a1f1e]/10 pt-4 text-xs text-[#C06041] font-medium">
                            * Toute déclaration inexact de nature à induire un recruteur en erreur engage la responsabilité exclusive du candidat et peut entraîner la suppression de son profil.
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 6</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Obligations du recruteur</h2>
                        </div>
                    </div>

                    <div class="space-y-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                        <p>Le recruteur agit exclusivement dans le cadre de son activité professionnelle et garantit disposer des pouvoirs nécessaires pour engager la structure qu'il représente.</p>
                        <p>Il s'engage à formuler des critères de recherche conformes au droit du travail applicable, notamment aux dispositions prohibant toute discrimination à l'embauche.</p>

                        <div class="border border-[#1a1f1e]/10 bg-[#1a1f1e]/5 p-4 text-xs sm:text-sm font-medium text-[#1a1f1e]">
                            <strong class="text-[#C06041] uppercase tracking-wider block mb-1 text-xs">Usage strictly confidentiel :</strong>
                            Les profils communiqués sont destinés au seul processus de recrutement au titre duquel ils ont été demandés. Toute extraction, conservation en base interne, revente, cession ou transmission à un tiers est strictly interdite.
                        </div>

                        <p class="text-xs text-[#1a1f1e]/70">
                            Le recruteur demeure seul responsable de la conduite des entretiens, de l'appréciation des candidats et de sa décision finale d'embauche.
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 7</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Rôle et limites de la Plateforme</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>JURIJOB agit en qualité d'outil de sourcing et d'intermédiaire technique. La Plateforme n'exerce pas l'activité d'agence de recrutement privée et n'intervient pas dans la relation contractuelle qui peut se nouer entre un candidat et un recruteur.</p>
                        <p>SLA ne garantit ni l'embauche d'un candidat, ni sa disponibilité effective, ni l'exactitude des informations qu'il a déclarées sous sa propre responsabilité.</p>
                        <p>La Plateforme ne saurait être tenue responsable du déroulement des processus de recrutement, des engagements pris entre les parties, ni des conséquences d'une embauche.</p>
                    </div>

                    <div class="border-l-4 border-[#C06041] border-y border-r border-[#1a1f1e]/15 bg-[#1a1f1e] p-6 text-[#FDFCF8] shadow-md">
                        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C06041]">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                            </svg>
                            Point Essentiel
                        </div>
                        <p class="mt-2 text-base font-medium leading-relaxed sm:text-lg">
                            JURIJOB identifie et présente des profils pertinents. Le recruteur conserve l'intégralité de la maîtrise des entretiens et de la décision d'embauche.
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 8</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Propriété intellectuelle</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>La Plateforme, sa structure, son design, ses textes, son logo, sa charte graphique, sa base de données et sa méthodologie de sélection sont protégés par les lois marocaines <strong class="font-semibold text-[#1a1f1e]">2-00</strong> (droits d'auteur et droits voisins) et <strong class="font-semibold text-[#1a1f1e]">17-97</strong> (propriété industrielle).</p>
                        <p>La marque <span class="italic font-medium">« JURIJOB — Smart Recrutement Juridique »</span> est déposée auprès de l'OMPIC. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable, est interdite.</p>
                        <p class="text-xs text-[#1a1f1e]/70 italic border-t border-[#1a1f1e]/10 pt-3">
                            Les contenus déposés par les utilisateurs demeurent leur propriété. Ceux-ci concèdent à SLA une licence d'utilisation non exclusive, limitée aux seules finalités de fonctionnement du service.
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 9</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Données personnelles</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>Le traitement des données personnelles est effectué conformément à la <strong class="font-semibold text-[#1a1f1e]">loi 09-08</strong> relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, et a fait l'objet d'une déclaration auprès de la CNDP.</p>
                        <p>Les profils candidats ne font l'objet d'aucune diffusion publique. Leur accès est strictement réservé aux recruteurs dont le paiement a été confirmé, et limité aux profils composant la short-list qui leur a été adressée.</p>

                        <div class="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Droits des utilisateurs</span>
                            <p class="text-xs sm:text-sm text-[#1a1f1e]/85">
                                Chaque utilisateur dispose d'un droit d'accès, de rectification et d'opposition, qu'il peut exercer en écrivant à <a href="mailto:recrutement@sentissilegal.com" class="font-medium text-[#C06041] underline underline-offset-2">recrutement@sentissilegal.com</a>. Les modalités détaillées figurent dans les <a href="/mentions-legales" class="font-medium text-[#C06041] underline underline-offset-2">mentions légales</a>.
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
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">Article 10</span>
                            <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">Modification des CGU</h2>
                        </div>
                    </div>

                    <div class="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                        <p>SLA se réserve le droit de modifier les présentes CGU à tout moment afin de les adapter à l'évolution du service ou de la réglementation.</p>
                        <p>Les utilisateurs sont informés de toute modification substantielle. La poursuite de l'utilisation de la Plateforme après modification vaut acceptation des nouvelles conditions.</p>
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
                            Les présentes CGU sont régies par le <strong class="font-semibold text-[#1a1f1e]">droit marocain</strong>.
                        </p>
                        <p class="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                            Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des <strong class="font-semibold text-[#1a1f1e]">tribunaux de Casablanca</strong>, à défaut de résolution amiable préalable.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</div>
@endsection
