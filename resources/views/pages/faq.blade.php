@extends('layouts.guest-blade')

@section('title', 'Foire aux questions - JURIJOB')
@section('meta_description', 'Tout ce que vous devez savoir sur JURIJOB : notre approche, nos tarifs, nos délais et notre méthode.')

@section('content')
<div class="w-full flex-1 pb-24 pt-12">
    <!-- Header Banner -->
    <section class="py-12 lg:py-16">
        <div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
            <h1 class="text-4xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl" style="font-family: 'Cormorant Garamond', serif;">
                Foire aux <span class="text-[#C06041]">questions</span>
            </h1>
            <p class="mt-4 text-base font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                Questions Fréquentes — Tout ce que vous devez savoir sur JURIJOB : notre approche, nos tarifs, nos délais et notre méthode.
            </p>
        </div>
    </section>

    <!-- Accordion Sections -->
    <section class="mx-auto max-w-4xl px-6 lg:px-8">
        <div class="space-y-12">
            @php
                $faqSections = [
                    [
                        'sectionNumber' => 'Section 1',
                        'title' => 'Comprendre JURIJOB',
                        'items' => [
                            [
                                'id' => 'comprendre-1',
                                'question' => "Qu'est-ce que JURIJOB, exactement ?",
                                'answer' => "JURIJOB est une plateforme de sélection de profils juridiques au Maroc et en Afrique francophone. Notre rôle est de vous livrer une short-list qualifiée qui correspond à vos critères — spécialisation, langues, expérience, diplôme. L'entretien, l'appréciation et la décision finale restent entre vos mains : nous vous faisons gagner un temps considérable en identifiant les profils pertinents."
                            ],
                            [
                                'id' => 'comprendre-2',
                                'question' => "En quoi JURIJOB diffère d'un cabinet de recrutement classique ?",
                                'answer' => "Un cabinet de recrutement facture au succès de l'embauche, souvent 15 à 25 % du salaire annuel du candidat recruté — soit plusieurs dizaines de milliers de dirhams pour un juriste confirmé. JURIJOB facture 1 490 MAD HT par profil livré, sans abonnement et sans commission sur l'embauche. Nous ne sommes pas rémunérés au succès de votre recrutement, mais à la qualité de la sélection — cela nous permet de rester objectifs et de proposer un service à coût maîtrisé, même pour des besoins récurrents."
                            ],
                            [
                                'id' => 'comprendre-3',
                                'question' => "Qui est derrière JURIJOB ?",
                                'answer' => "JURIJOB est portée par Sentissi Legal Advisory (SLA), cabinet fondé par Mohammed Sentissi — expert juridique, ex-Directeur juridique de holdings au Maroc et en Afrique, et Président élu de l'Association marocaine des juristes d'entreprise — AMJE (en cours de constitution). Le service s'appuie sur 24 ans d'expérience en direction juridique et sur un réseau de plusieurs dizaines de milliers de contacts professionnels."
                            ]
                        ]
                    ],
                    [
                        'sectionNumber' => 'Section 2',
                        'title' => 'Pour les recruteurs',
                        'items' => [
                            [
                                'id' => 'recruteurs-1',
                                'question' => "Combien coûte une short-list ?",
                                'answer' => "1 490 MAD HT par profil livré, soit 1 788 MAD TTC. Vous choisissez le nombre de profils souhaité lors de votre demande, et le montant total vous est communiqué avant tout paiement — vous savez donc exactement ce que vous engagez. Aucun abonnement, aucune commission sur le salaire du candidat recruté. Si aucun profil de notre CVthèque ne correspond à vos critères, aucune short-list n'est livrée et rien ne vous est facturé. Une tarification préférentielle s'applique à partir de cinq profils : écrivez-nous à recrutement@sentissilegal.com pour un devis adapté."
                            ],
                            [
                                'id' => 'recruteurs-2',
                                'question' => "Quand et comment s'effectue le paiement ?",
                                'answer' => "Vous ne payez qu'après avoir reçu votre short-list. Le règlement s'effectue par virement bancaire : les coordonnées et une référence unique vous sont communiquées dans votre espace recruteur. Une fois le virement signalé et sa réception confirmée par nos soins — généralement sous 24 heures ouvrées — les profils complets se débloquent : identité, coordonnées, parcours et expériences. Tant que le paiement n'est pas confirmé, les profils restent verrouillés."
                            ],
                            [
                                'id' => 'recruteurs-3',
                                'question' => "Comment JURIJOB sélectionne-t-il ses candidats ?",
                                'answer' => "Nous appliquons une méthodologie rigoureuse fondée sur une expertise juridique de terrain. Notre algorithme de scoring évalue chaque profil sur quatre dimensions clés : spécialisations juridiques, langues, expérience et diplôme. Chaque short-list est ensuite validée manuellement par un ex-Directeur juridique, avant envoi au recruteur."
                            ],
                            [
                                'id' => 'recruteurs-4',
                                'question' => "Quel est le délai pour recevoir ma short-list ?",
                                'answer' => "Sous 48 heures ouvrées après validation de votre demande. Ce délai couvre l'ensemble du travail : analyse de vos critères, recherche dans la CVthèque et le réseau professionnel, évaluation manuelle des profils, puis composition d'une short-list courte et qualifiée."
                            ],
                            [
                                'id' => 'recruteurs-5',
                                'question' => "Que se passe-t-il si aucun profil de la short-list ne me convient ?",
                                'answer' => "Écrivez-nous à recrutement@sentissilegal.com. Selon la nature du besoin, nous pouvons vous orienter vers un service complémentaire de chasse de tête, avec une tarification adaptée. Nous restons à votre écoute pour affiner la recherche."
                            ],
                            [
                                'id' => 'recruteurs-6',
                                'question' => "Proposez-vous des tarifs pour des besoins récurrents ?",
                                'answer' => "Oui. Pour les entreprises et cabinets ayant plusieurs recrutements juridiques par an, nous appliquons une tarification dégressive. Contactez-nous à recrutement@sentissilegal.com pour un devis personnalisé."
                            ]
                        ]
                    ],
                    [
                        'sectionNumber' => 'Section 3',
                        'title' => 'Candidats & services complémentaires',
                        'items' => [
                            [
                                'id' => 'candidats-1',
                                'question' => "Comment garantissez-vous la confidentialité ?",
                                'answer' => "La discrétion est au cœur de notre déontologie. Chaque profil candidat est hébergé de manière sécurisée et n'est accessible qu'aux recruteurs dont le paiement est confirmé — aucune diffusion publique. Notre plateforme est conforme à la loi marocaine 09-08 relative à la protection des données personnelles."
                            ],
                            [
                                'id' => 'candidats-2',
                                'question' => "JURIJOB propose-t-il d'autres services que la short-list ?",
                                'answer' => "Oui. En complément, SLA peut prendre en charge des entretiens de pré-qualification (service payant) permettant d'évaluer les candidats avant vos propres entretiens. D'autres prestations sont disponibles à la demande : chasse de tête, rédaction de contrats de travail, audit RH juridique. Écrivez à recrutement@sentissilegal.com pour toute demande spécifique."
                            ]
                        ]
                    ]
                ];
            @endphp

            @foreach($faqSections as $section)
                <div class="space-y-4">
                    <h2 class="border-b border-[#1a1f1e]/10 pb-3 text-2xl font-normal text-[#1a1f1e]" style="font-family: 'Cormorant Garamond', serif;">
                        <span class="text-[#C06041]">{{ $section['sectionNumber'] }}</span> : {{ $section['title'] }}
                    </h2>

                    <div class="space-y-3">
                        @foreach($section['items'] as $item)
                            <details class="group border border-[#1a1f1e]/10 bg-[#FDFCF8] transition-colors hover:border-[#1a1f1e]/25">
                                <summary class="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-medium text-[#1a1f1e] select-none">
                                    <span class="text-lg leading-snug" style="font-family: 'Cormorant Garamond', serif;">
                                        {{ $item['question'] }}
                                    </span>
                                    <svg class="h-5 w-5 shrink-0 text-[#1a1f1e]/60 transition-transform duration-200 group-open:rotate-180 group-open:text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </summary>
                                <div class="border-t border-[#1a1f1e]/5 px-5 pb-5 pt-3 text-sm font-light leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                    {{ $item['answer'] }}
                                </div>
                            </details>
                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>

        <!-- Une autre question ? -->
        <div class="mt-16 border-y border-[#1a1f1e]/10 bg-[#FDFCF8] p-8 text-center sm:p-10">
            <h3 class="text-2xl font-normal text-[#1a1f1e] sm:text-3xl" style="font-family: 'Cormorant Garamond', serif;">
                Une autre question ?
            </h3>
            <p class="mt-2 text-sm font-light text-[#1a1f1e]/70 sm:text-base">
                Notre équipe reste à votre disposition pour toute demande spécifique.
            </p>
            <a href="mailto:recrutement@sentissilegal.com" class="mt-6 inline-flex items-center gap-2 bg-[#1a1f1e] px-6 py-3 text-sm font-medium text-[#FDFCF8] transition-colors hover:bg-[#343a38]">
                <svg class="h-4 w-4 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>recrutement@sentissilegal.com</span>
            </a>
        </div>
    </section>
</div>
@endsection
