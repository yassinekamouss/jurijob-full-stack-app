@extends('layouts.guest-blade')

@section('title', 'Nos Prestations & Services - JURIJOB')
@section('meta_description', 'Découvrez les prestations et services JURIJOB & Sentissi Legal Advisory : short-list de profils juridiques, contrats sur mesure, recrutement d\'étrangers, évaluation d\'entretiens et fiches de poste.')

@section('content')
<div class="w-full flex-1 pb-24 pt-12">
    <!-- Hero Section -->
    <section class="relative py-12 lg:py-16">
        <div class="mx-auto max-w-5xl px-6 text-center lg:px-8">
            <div class="inline-flex items-center gap-2 border border-[#C06041]/20 bg-[#C06041]/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#C06041] uppercase mb-4">
                Nos prestations
            </div>
            <h1 className="text-4xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl" style="font-family: 'Cormorant Garamond', serif;">
                Nos <span class="text-[#C06041]">services</span>
            </h1>
            <p class="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                Au-delà de la mise en relation, JURIJOB et Sentissi Legal Advisory vous accompagnent à chaque étape de votre recrutement juridique.
            </p>
        </div>
    </section>

    <div class="mx-auto max-w-6xl px-6 lg:px-8 space-y-24">
        <!-- Offre principale: Split-Layout (7 cols / 5 cols) -->
        <section class="relative">
            <div class="mb-8 border-b border-[#1a1f1e]/10 pb-4">
                <div class="text-xs font-semibold uppercase tracking-wider text-[#C06041] mb-1">
                    Solution sur mesure
                </div>
                <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl lg:text-4xl" style="font-family: 'Cormorant Garamond', serif;">
                    Notre <span class="text-[#C06041]">offre principale</span>
                </h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <!-- Left Column: Description & Value Props (7 cols) -->
                <div class="lg:col-span-7 space-y-6">
                    <div class="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-8 space-y-6">
                        <div class="flex flex-wrap items-center justify-between gap-3">
                            <h3 class="text-2xl font-normal text-[#1a1f1e]" style="font-family: 'Cormorant Garamond', serif;">
                                La short-list de profils juridiques
                            </h3>
                            <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C06041] bg-[#C06041]/10 px-3 py-1">
                                <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Livraison sous 48h ouvrées
                            </span>
                        </div>

                        <p class="text-base font-light leading-relaxed text-[#1a1f1e]/80">
                            Le cœur de JURIJOB : vous sélectionnez les critères du profil recherché — spécialisation, expérience, diplôme, langues — et le nombre de profils souhaité, et nous vous livrons une short-list de juristes présélectionnés et scorés, sous 48 heures ouvrées.
                        </p>

                        <div class="flex items-start gap-3 border-y border-[#1a1f1e]/10 py-4 text-sm text-[#1a1f1e]/85 font-light bg-[#1a1f1e]/[0.02] px-4">
                            <svg class="h-5 w-5 text-[#C06041] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>
                                Chaque short-list est validée manuellement par un ex-Directeur juridique. Vous gardez la main sur l'entretien et la décision finale.
                            </span>
                        </div>

                        <!-- Key Highlights Pills -->
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            <div class="border border-[#1a1f1e]/10 p-3.5 bg-[#FDFCF8]">
                                <div class="font-semibold text-xs text-[#1a1f1e] flex items-center gap-1.5">
                                    <svg class="h-3.5 w-3.5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Sans abonnement
                                </div>
                                <div class="mt-1 text-[11px] text-[#1a1f1e]/70 font-light">
                                    Vous ne payez que les profils reçus.
                                </div>
                            </div>

                            <div class="border border-[#1a1f1e]/10 p-3.5 bg-[#FDFCF8]">
                                <div class="font-semibold text-xs text-[#1a1f1e] flex items-center gap-1.5">
                                    <svg class="h-3.5 w-3.5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Sans commission
                                </div>
                                <div class="mt-1 text-[11px] text-[#1a1f1e]/70 font-light">
                                    Aucun pourcentage prélevé sur le salaire.
                                </div>
                            </div>

                            <div class="border border-[#1a1f1e]/10 p-3.5 bg-[#FDFCF8]">
                                <div class="font-semibold text-xs text-[#1a1f1e] flex items-center gap-1.5">
                                    <svg class="h-3.5 w-3.5 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Sans engagement
                                </div>
                                <div class="mt-1 text-[11px] text-[#1a1f1e]/70 font-light">
                                    Demande ponctuelle ou récurrente.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Floating Pricing Card (5 cols) -->
                <div class="lg:col-span-5 relative lg:-mt-2">
                    <div class="border-2 border-[#1a1f1e] bg-[#FDFCF8] p-8 shadow-xl relative z-10 space-y-6">
                        <div class="flex items-center justify-between border-b border-[#1a1f1e]/10 pb-4">
                            <span class="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                Tarification Transparente
                            </span>
                            <span class="text-[11px] font-medium text-[#1a1f1e]/60 bg-[#1a1f1e]/5 px-2.5 py-0.5">
                                Paiement après livraison
                            </span>
                        </div>

                        <div>
                            <div class="text-4xl font-bold text-[#1a1f1e] tracking-tight">
                                1 490 MAD <span class="text-sm font-normal text-[#1a1f1e]/60">HT</span>
                            </div>
                            <div class="text-xs text-[#1a1f1e]/70 mt-1 font-light">
                                par profil livré · soit <strong class="font-medium text-[#1a1f1e]">1 788 MAD TTC</strong>
                            </div>
                        </div>

                        <div class="space-y-2.5 text-xs text-[#1a1f1e]/80 font-light bg-[#1a1f1e]/[0.03] p-4 border-l-2 border-[#C06041]">
                            <p>
                                • Le montant total vous est communiqué avant tout paiement. Si aucun profil de la CVthèque ne correspond à vos critères, aucune short-list n'est livrée et rien ne vous est facturé.
                            </p>
                            <p>
                                • Une tarification préférentielle s'applique à partir de <strong>cinq profils</strong>. Écrivez-nous pour un devis adapté à vos volumes.
                            </p>
                        </div>

                        <div class="pt-2">
                            <a href="mailto:recrutement@sentissilegal.com" class="w-full inline-flex items-center justify-center gap-2 bg-[#1a1f1e] px-6 py-3.5 text-sm font-medium text-[#FDFCF8] transition-colors hover:bg-[#343a38]">
                                <svg class="h-4 w-4 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>Demander un devis sur mesure</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services complémentaires: Bento Box Layout -->
        <section class="relative pt-4">
            <div class="mb-8 border-b border-[#1a1f1e]/10 pb-4">
                <div class="text-xs font-semibold uppercase tracking-wider text-[#C06041] mb-1">
                    Pour aller plus loin
                </div>
                <h2 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl lg:text-4xl" style="font-family: 'Cormorant Garamond', serif;">
                    Services <span class="text-[#C06041]">complémentaires</span>
                </h2>
            </div>

            <!-- Bento Grid (7 / 5 asymmetric structure) -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <!-- Bento Tile 1 (Span 7) - International Focus -->
                <div class="lg:col-span-7 border border-[#C06041]/30 bg-[#FDFCF8] p-8 space-y-4 relative overflow-hidden group hover:border-[#C06041]/60 transition-colors">
                    <div class="flex items-center justify-between">
                        <div class="flex h-11 w-11 items-center justify-center bg-[#C06041]/10 text-[#C06041]">
                            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                        </div>
                        <span class="text-xs font-medium uppercase tracking-wider text-[#C06041] bg-[#C06041]/10 px-2.5 py-1">
                            Service International
                        </span>
                    </div>
                    <h3 class="text-2xl font-normal text-[#1a1f1e]" style="font-family: 'Cormorant Garamond', serif;">
                        Prise en charge du recrutement de profils étrangers
                    </h3>
                    <p class="text-sm font-light leading-relaxed text-[#1a1f1e]/80">
                        Vous souhaitez recruter un talent non-marocain ? Nous prenons en charge l'intégralité des démarches liées à l'embauche de profils étrangers au Maroc : vous nous confiez le dossier, nous nous en occupons de bout en bout, jusqu'à sa finalisation.
                    </p>
                </div>

                <!-- Bento Tile 2 (Span 5) - Contrats sur mesure -->
                <div class="lg:col-span-5 border border-[#1a1f1e]/10 bg-[#FDFCF8] p-8 space-y-4 hover:border-[#1a1f1e]/30 transition-colors">
                    <div class="flex h-11 w-11 items-center justify-center bg-[#C06041]/10 text-[#C06041]">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-normal text-[#1a1f1e]" style="font-family: 'Cormorant Garamond', serif;">
                        Rédaction de contrats de travail sur mesure
                    </h3>
                    <p class="text-sm font-light leading-relaxed text-[#1a1f1e]/80">
                        Nous rédigeons des contrats de travail personnalisés, adaptés à chaque poste et à votre contexte, dans le respect de la législation sociale en vigueur au Maroc.
                    </p>
                </div>

                <!-- Bento Tile 3 (Span 5) - Évaluation entretiens -->
                <div class="lg:col-span-5 border border-[#1a1f1e]/10 bg-[#FDFCF8] p-8 space-y-4 hover:border-[#1a1f1e]/30 transition-colors">
                    <div class="flex h-11 w-11 items-center justify-center bg-[#C06041]/10 text-[#C06041]">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7zM16 11l2 2 4-4" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-normal text-[#1a1f1e]" style="font-family: 'Cormorant Garamond', serif;">
                        Participation et évaluation des entretiens
                    </h3>
                    <p class="text-sm font-light leading-relaxed text-[#1a1f1e]/80">
                        Nos experts peuvent assister à vos entretiens d'embauche et évaluer chaque candidat selon une grille d'appréciation rigoureuse, pour sécuriser et objectiver votre décision finale.
                    </p>
                </div>

                <!-- Bento Tile 4 (Span 7) - Préparation fiche de poste -->
                <div class="lg:col-span-7 border border-[#1a1f1e]/10 bg-[#FDFCF8] p-8 space-y-4 hover:border-[#1a1f1e]/30 transition-colors">
                    <div class="flex h-11 w-11 items-center justify-center bg-[#C06041]/10 text-[#C06041]">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-normal text-[#1a1f1e]" style="font-family: 'Cormorant Garamond', serif;">
                        Préparation de la fiche de poste
                    </h3>
                    <p class="text-sm font-light leading-relaxed text-[#1a1f1e]/80">
                        En amont du recrutement, nous vous aidons à définir précisément votre besoin et à construire une fiche de poste claire et structurée — la base d'une recherche efficace.
                    </p>
                </div>
            </div>
        </section>

        <!-- Banner CTA contact -->
        <div class="mt-16 border-y border-[#1a1f1e]/10 bg-[#FDFCF8] p-10 text-center sm:p-12">
            <div class="max-w-2xl mx-auto space-y-4">
                <h3 class="text-3xl font-normal text-[#1a1f1e] sm:text-4xl" style="font-family: 'Cormorant Garamond', serif;">
                    Un besoin <span class="text-[#C06041]">spécifique ?</span>
                </h3>
                <p class="text-sm font-light text-[#1a1f1e]/75 sm:text-base leading-relaxed">
                    Chaque prestation est adaptée à votre contexte et fait l'objet d'un devis personnalisé. Écrivez-nous pour en discuter.
                </p>
                <div class="pt-2">
                    <a href="mailto:recrutement@sentissilegal.com" class="inline-flex items-center gap-2.5 bg-[#1a1f1e] px-7 py-3.5 text-sm font-medium text-[#FDFCF8] transition-colors hover:bg-[#343a38]">
                        <svg class="h-4 w-4 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>recrutement@sentissilegal.com</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
