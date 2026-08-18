<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaxonomySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (DB::table('pays')->exists()) {
            return;
        }
        /**
         * @var list<array{nom_fr: string, nom_en: string, domaine_fr: string, domaine_en: string}> $specialisations
         */
        $specialisations = [
            // Business law
            ['nom_fr' => 'Droit des sociétés', 'nom_en' => 'Corporate Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit commercial', 'nom_en' => 'Commercial Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit des contrats', 'nom_en' => 'Contract Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit fiscal', 'nom_en' => 'Tax Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit social / RH', 'nom_en' => 'Employment / HR Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit bancaire & financier', 'nom_en' => 'Banking & Finance Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit de la propriété intellectuelle', 'nom_en' => 'Intellectual Property Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit de la concurrence', 'nom_en' => 'Competition Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Compliance & conformité', 'nom_en' => 'Compliance', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit numérique & IT', 'nom_en' => 'Digital & IT Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit des données personnelles', 'nom_en' => 'Personal Data Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit des assurances', 'nom_en' => 'Insurance Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit des procédures collectives', 'nom_en' => 'Insolvency Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit des sûretés', 'nom_en' => 'Security Interests Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit boursier & marchés financiers', 'nom_en' => 'Securities & Capital Markets Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Finance islamique / Banque participative', 'nom_en' => 'Islamic Finance / Participatory Banking', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit des télécommunications', 'nom_en' => 'Telecommunications Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],
            ['nom_fr' => 'Droit de la sécurité sociale', 'nom_en' => 'Social Security Law', 'domaine_fr' => 'Droit des entreprises', 'domaine_en' => 'Business Law'],

            // Litigation
            ['nom_fr' => 'Droit pénal des affaires', 'nom_en' => 'Business Criminal Law', 'domaine_fr' => 'Droit du contentieux', 'domaine_en' => 'Litigation Law'],
            ['nom_fr' => 'Droit pénal général', 'nom_en' => 'General Criminal Law', 'domaine_fr' => 'Droit du contentieux', 'domaine_en' => 'Litigation Law'],
            ['nom_fr' => 'Arbitrage & MARD', 'nom_en' => 'Arbitration & ADR', 'domaine_fr' => 'Droit du contentieux', 'domaine_en' => 'Litigation Law'],
            ['nom_fr' => "Droit de l'exécution forcée", 'nom_en' => 'Enforcement Law', 'domaine_fr' => 'Droit du contentieux', 'domaine_en' => 'Litigation Law'],
            ['nom_fr' => 'Recouvrement de créances', 'nom_en' => 'Debt Collection', 'domaine_fr' => 'Droit du contentieux', 'domaine_en' => 'Litigation Law'],
            ['nom_fr' => 'Droit administratif', 'nom_en' => 'Administrative Law', 'domaine_fr' => 'Droit du contentieux', 'domaine_en' => 'Litigation Law'],
            ['nom_fr' => 'Droit public', 'nom_en' => 'Public Law', 'domaine_fr' => 'Droit du contentieux', 'domaine_en' => 'Litigation Law'],

            // Notarial & real estate
            ['nom_fr' => 'Droit notarial', 'nom_en' => 'Notarial Law', 'domaine_fr' => 'Droit notarial & immobilier', 'domaine_en' => 'Notarial & Real Estate Law'],
            ['nom_fr' => 'Droit immobilier', 'nom_en' => 'Real Estate Law', 'domaine_fr' => 'Droit notarial & immobilier', 'domaine_en' => 'Notarial & Real Estate Law'],
            ['nom_fr' => "Droit de l'urbanisme", 'nom_en' => 'Urban Planning Law', 'domaine_fr' => 'Droit notarial & immobilier', 'domaine_en' => 'Notarial & Real Estate Law'],
            ['nom_fr' => 'Droit de la famille', 'nom_en' => 'Family Law', 'domaine_fr' => 'Droit notarial & immobilier', 'domaine_en' => 'Notarial & Real Estate Law'],
            ['nom_fr' => 'Droit des successions', 'nom_en' => 'Inheritance Law', 'domaine_fr' => 'Droit notarial & immobilier', 'domaine_en' => 'Notarial & Real Estate Law'],

            // Sectoral
            ['nom_fr' => "Droit de l'énergie", 'nom_en' => 'Energy Law', 'domaine_fr' => 'Droit sectoriel', 'domaine_en' => 'Sectoral Law'],
            ['nom_fr' => 'Droit minier', 'nom_en' => 'Mining Law', 'domaine_fr' => 'Droit sectoriel', 'domaine_en' => 'Sectoral Law'],
            ['nom_fr' => 'Droit des transports & logistique', 'nom_en' => 'Transport & Logistics Law', 'domaine_fr' => 'Droit sectoriel', 'domaine_en' => 'Sectoral Law'],
            ['nom_fr' => 'Droit de la santé & bioéthique', 'nom_en' => 'Health & Bioethics Law', 'domaine_fr' => 'Droit sectoriel', 'domaine_en' => 'Sectoral Law'],
            ['nom_fr' => 'Droit rural & agricole', 'nom_en' => 'Rural & Agricultural Law', 'domaine_fr' => 'Droit sectoriel', 'domaine_en' => 'Sectoral Law'],
            ['nom_fr' => 'Droit du tourisme & de l\'hôtellerie', 'nom_en' => 'Tourism & Hospitality Law', 'domaine_fr' => 'Droit sectoriel', 'domaine_en' => 'Sectoral Law'],

            // International & specialized
            ['nom_fr' => 'Droit international des affaires', 'nom_en' => 'International Business Law', 'domaine_fr' => 'Droit international & spécialisé', 'domaine_en' => 'International & Specialized Law'],
            ['nom_fr' => 'Droit OHADA', 'nom_en' => 'OHADA Law', 'domaine_fr' => 'Droit international & spécialisé', 'domaine_en' => 'International & Specialized Law'],
            ['nom_fr' => 'Droit du sport', 'nom_en' => 'Sports Law', 'domaine_fr' => 'Droit international & spécialisé', 'domaine_en' => 'International & Specialized Law'],
            ['nom_fr' => 'Droit maritime', 'nom_en' => 'Maritime Law', 'domaine_fr' => 'Droit international & spécialisé', 'domaine_en' => 'International & Specialized Law'],
            ['nom_fr' => "Droit de l'environnement", 'nom_en' => 'Environmental Law', 'domaine_fr' => 'Droit international & spécialisé', 'domaine_en' => 'International & Specialized Law'],
            ['nom_fr' => 'Droit de la consommation', 'nom_en' => 'Consumer Law', 'domaine_fr' => 'Droit international & spécialisé', 'domaine_en' => 'International & Specialized Law'],
            ['nom_fr' => 'Droit humanitaire', 'nom_en' => 'Humanitarian Law', 'domaine_fr' => 'Droit international & spécialisé', 'domaine_en' => 'International & Specialized Law'],
            ['nom_fr' => 'Droit du travail international & mobilité', 'nom_en' => 'International Labor & Mobility Law', 'domaine_fr' => 'Droit international & spécialisé', 'domaine_en' => 'International & Specialized Law'],
        ];

        /**
         * @var list<array{nom_fr: string, nom_en: string}> $niveauxExperience
         */
        $niveauxExperience = [
            ['nom_fr' => 'Étudiant en Droit', 'nom_en' => 'Law Student'],
            ['nom_fr' => 'Junior (0-2 ans)', 'nom_en' => 'Junior (0-2 years)'],
            ['nom_fr' => 'Confirmé (3-7 ans)', 'nom_en' => 'Mid-level (3-7 years)'],
            ['nom_fr' => 'Senior (8-15 ans)', 'nom_en' => 'Senior (8-15 years)'],
            ['nom_fr' => 'Expert (15+ ans)', 'nom_en' => 'Expert (15+ years)'],
        ];

        /**
         * @var list<array{nom_fr: string, nom_en: string}> $niveauxLangue
         */
        $niveauxLangue = [
            ['nom_fr' => 'A1 (Débutant)', 'nom_en' => 'A1 (Beginner)'],
            ['nom_fr' => 'A2 (Élémentaire)', 'nom_en' => 'A2 (Elementary)'],
            ['nom_fr' => 'B1 (Intermédiaire)', 'nom_en' => 'B1 (Intermediate)'],
            ['nom_fr' => 'B2 (Avancé)', 'nom_en' => 'B2 (Upper Intermediate)'],
            ['nom_fr' => 'C1 (Maîtrise)', 'nom_en' => 'C1 (Advanced)'],
            ['nom_fr' => 'C2 (Natif)', 'nom_en' => 'C2 (Native)'],
        ];

        /**
         * @var list<array{nom_fr: string, nom_en: string}> $formationsJuridiques
         */
        $formationsJuridiques = [
            ['nom_fr' => 'Licence en Droit', 'nom_en' => "Bachelor's in Law"],
            ['nom_fr' => 'Master 1 Droit', 'nom_en' => "Master's Year 1 in Law"],
            ['nom_fr' => 'Master 2 Droit', 'nom_en' => "Master's Year 2 in Law"],
            ['nom_fr' => "CAPA (Certificat d'Aptitude)", 'nom_en' => 'CAPA (Bar Admission Certificate)'],
            ['nom_fr' => 'Doctorat en Droit', 'nom_en' => 'PhD in Law'],
        ];

        /**
         * @var list<array{nom_fr: string, nom_en: string}> $langues
         */
        /**
         * @var array<string, list<array{nom_fr: string, nom_en: string}>> $ecolesParPays
         */
        $ecolesParPays = [
            'MA' => [
                ['nom_fr' => 'Université Mohammed V de Rabat — FSJES Agdal', 'nom_en' => 'Mohammed V University of Rabat — FSJES Agdal'],
                ['nom_fr' => 'Université Mohammed V de Rabat — FSJES Souissi', 'nom_en' => 'Mohammed V University of Rabat — FSJES Souissi'],
                ['nom_fr' => 'Université Hassan II de Casablanca — FSJES Aïn Chock', 'nom_en' => 'Hassan II University of Casablanca — FSJES Ain Chock'],
                ['nom_fr' => 'Université Hassan II de Casablanca — FSJES Mohammedia', 'nom_en' => 'Hassan II University of Casablanca — FSJES Mohammedia'],
                ['nom_fr' => 'Université Cadi Ayyad — FSJES Marrakech', 'nom_en' => 'Cadi Ayyad University — FSJES Marrakech'],
                ['nom_fr' => 'Université Ibn Tofaïl — FSJES Kénitra', 'nom_en' => 'Ibn Tofail University — FSJES Kenitra'],
                ['nom_fr' => 'Université Abdelmalek Essaâdi — FSJES Tanger / Tétouan', 'nom_en' => 'Abdelmalek Essaadi University — FSJES Tangier / Tetouan'],
                ['nom_fr' => 'Université Sidi Mohamed Ben Abdellah — FSJES Fès', 'nom_en' => 'Sidi Mohamed Ben Abdellah University — FSJES Fez'],
                ['nom_fr' => 'Université Mohammed Premier — FSJES Oujda', 'nom_en' => 'Mohammed First University — FSJES Oujda'],
                ['nom_fr' => 'Université Ibn Zohr — FSJES Agadir', 'nom_en' => 'Ibn Zohr University — FSJES Agadir'],
                ['nom_fr' => 'Université Hassan 1er — FSJES Settat', 'nom_en' => 'Hassan 1st University — FSJES Settat'],
                ['nom_fr' => 'Université Moulay Ismaïl — FSJES Meknès', 'nom_en' => 'Moulay Ismail University — FSJES Meknes'],
                ['nom_fr' => 'Université Chouaïb Doukkali — FSJES El Jadida', 'nom_en' => 'Chouaib Doukkali University — FSJES El Jadida'],
                ['nom_fr' => 'Université Sultan Moulay Slimane — FSJES Béni Mellal', 'nom_en' => 'Sultan Moulay Slimane University — FSJES Beni Mellal'],
                ['nom_fr' => 'Université Internationale de Rabat (UIR)', 'nom_en' => 'International University of Rabat (UIR)'],
                ['nom_fr' => 'Université Internationale de Casablanca (UIC)', 'nom_en' => 'International University of Casablanca (UIC)'],
                ['nom_fr' => 'Université Mundiapolis — Casablanca', 'nom_en' => 'Mundiapolis University — Casablanca'],
                ['nom_fr' => 'ISCAE — Casablanca / Rabat', 'nom_en' => 'ISCAE — Casablanca / Rabat'],
            ],
            'FR' => [
                ['nom_fr' => 'Université Paris 1 Panthéon-Sorbonne', 'nom_en' => 'Paris 1 Panthéon-Sorbonne University'],
                ['nom_fr' => 'Université Paris 2 Panthéon-Assas', 'nom_en' => 'Paris 2 Panthéon-Assas University'],
                ['nom_fr' => 'Université Paris Nanterre', 'nom_en' => 'Paris Nanterre University'],
                ['nom_fr' => 'Université Paris Cité', 'nom_en' => 'Paris Cité University'],
                ['nom_fr' => 'Université Paris-Saclay', 'nom_en' => 'Paris-Saclay University'],
                ['nom_fr' => 'Université Paris-Est Créteil (UPEC)', 'nom_en' => 'Paris-Est Créteil University (UPEC)'],
                ['nom_fr' => 'Université Sorbonne Paris Nord', 'nom_en' => 'Sorbonne Paris Nord University'],
                ['nom_fr' => 'Université de Versailles Saint-Quentin (UVSQ)', 'nom_en' => 'Versailles Saint-Quentin University (UVSQ)'],
                ['nom_fr' => 'CY Cergy Paris Université', 'nom_en' => 'CY Cergy Paris University'],
                ['nom_fr' => 'Université Gustave Eiffel', 'nom_en' => 'Gustave Eiffel University'],
                ['nom_fr' => 'Sciences Po Paris', 'nom_en' => 'Sciences Po Paris'],
                ['nom_fr' => 'Université Aix-Marseille', 'nom_en' => 'Aix-Marseille University'],
                ['nom_fr' => 'Université Jean Moulin Lyon 3', 'nom_en' => 'Jean Moulin Lyon 3 University'],
                ['nom_fr' => 'Université Lumière Lyon 2', 'nom_en' => 'Lumière Lyon 2 University'],
                ['nom_fr' => 'Université de Bordeaux', 'nom_en' => 'University of Bordeaux'],
                ['nom_fr' => 'Université de Montpellier', 'nom_en' => 'University of Montpellier'],
                ['nom_fr' => 'Université Toulouse 1 Capitole', 'nom_en' => 'Toulouse 1 Capitole University'],
                ['nom_fr' => 'Université de Strasbourg', 'nom_en' => 'University of Strasbourg'],
                ['nom_fr' => 'Université de Lille', 'nom_en' => 'University of Lille'],
                ['nom_fr' => 'Université de Rennes 1', 'nom_en' => 'University of Rennes 1'],
                ['nom_fr' => 'Université de Nantes', 'nom_en' => 'University of Nantes'],
                ['nom_fr' => 'Université Grenoble Alpes', 'nom_en' => 'Grenoble Alpes University'],
                ['nom_fr' => "Université Côte d'Azur (Nice)", 'nom_en' => "Côte d'Azur University (Nice)"],
                ['nom_fr' => 'Université de Lorraine', 'nom_en' => 'University of Lorraine'],
                ['nom_fr' => 'Université de Bourgogne (Dijon)', 'nom_en' => 'University of Burgundy (Dijon)'],
                ['nom_fr' => 'Université Clermont Auvergne', 'nom_en' => 'Clermont Auvergne University'],
                ['nom_fr' => 'Université de Caen Normandie', 'nom_en' => 'University of Caen Normandy'],
                ['nom_fr' => 'Université de Rouen Normandie', 'nom_en' => 'University of Rouen Normandy'],
                ['nom_fr' => 'Université de Poitiers', 'nom_en' => 'University of Poitiers'],
                ['nom_fr' => 'Université de Limoges', 'nom_en' => 'University of Limoges'],
                ['nom_fr' => 'Université de Tours', 'nom_en' => 'University of Tours'],
                ['nom_fr' => "Université d'Orléans", 'nom_en' => 'University of Orléans'],
                ['nom_fr' => 'Université de Reims Champagne-Ardenne', 'nom_en' => 'University of Reims Champagne-Ardenne'],
                ['nom_fr' => 'Université de Franche-Comté (Besançon)', 'nom_en' => 'University of Franche-Comté (Besançon)'],
                ['nom_fr' => "Université de Pau et des Pays de l'Adour", 'nom_en' => 'University of Pau and the Adour Region'],
                ['nom_fr' => 'Université de Bretagne Occidentale (Brest)', 'nom_en' => 'University of Western Brittany (Brest)'],
                ['nom_fr' => 'Université de Perpignan Via Domitia', 'nom_en' => 'University of Perpignan Via Domitia'],
                ['nom_fr' => 'Université de Picardie Jules Verne (Amiens)', 'nom_en' => 'University of Picardy Jules Verne (Amiens)'],
                ['nom_fr' => 'Université Savoie Mont Blanc', 'nom_en' => 'Savoie Mont Blanc University'],
                ['nom_fr' => 'Université de La Rochelle', 'nom_en' => 'La Rochelle University'],
                ['nom_fr' => "Université d'Avignon", 'nom_en' => 'Avignon University'],
            ],
            'BE' => [
                ['nom_fr' => 'Université catholique de Louvain (UCLouvain)', 'nom_en' => 'Catholic University of Louvain (UCLouvain)'],
                ['nom_fr' => 'Université libre de Bruxelles (ULB)', 'nom_en' => 'Free University of Brussels (ULB)'],
                ['nom_fr' => 'Université de Liège (ULiège)', 'nom_en' => 'University of Liège (ULiège)'],
                ['nom_fr' => 'Université de Namur (UNamur)', 'nom_en' => 'University of Namur (UNamur)'],
                ['nom_fr' => 'UCLouvain Saint-Louis Bruxelles', 'nom_en' => 'UCLouvain Saint-Louis Brussels'],
            ],
            'SN' => [
                ['nom_fr' => 'Université Cheikh Anta Diop (UCAD), Dakar', 'nom_en' => 'Cheikh Anta Diop University (UCAD), Dakar'],
            ],
            'CI' => [
                ['nom_fr' => 'Université Félix Houphouët-Boigny, Abidjan', 'nom_en' => 'Félix Houphouët-Boigny University, Abidjan'],
            ],
            'CM' => [
                ['nom_fr' => 'Université de Yaoundé II (Soa)', 'nom_en' => 'University of Yaounde II (Soa)'],
                ['nom_fr' => 'Université de Douala', 'nom_en' => 'University of Douala'],
            ],
            'ML' => [
                ['nom_fr' => 'Université des Sciences Juridiques et Politiques de Bamako (USJPB)', 'nom_en' => 'University of Legal and Political Sciences of Bamako (USJPB)'],
            ],
            'BF' => [
                ['nom_fr' => 'Université Thomas Sankara (Ouagadougou)', 'nom_en' => 'Thomas Sankara University (Ouagadougou)'],
                ['nom_fr' => 'Université Joseph Ki-Zerbo (Ouagadougou)', 'nom_en' => 'Joseph Ki-Zerbo University (Ouagadougou)'],
            ],
            'BJ' => [
                ['nom_fr' => "Université d'Abomey-Calavi", 'nom_en' => 'University of Abomey-Calavi'],
            ],
            'TG' => [
                ['nom_fr' => 'Université de Lomé', 'nom_en' => 'University of Lome'],
            ],
            'NE' => [
                ['nom_fr' => 'Université Abdou Moumouni (Niamey)', 'nom_en' => 'Abdou Moumouni University (Niamey)'],
            ],
            'GA' => [
                ['nom_fr' => 'Université Omar Bongo (Libreville)', 'nom_en' => 'Omar Bongo University (Libreville)'],
            ],
            'CG' => [
                ['nom_fr' => 'Université Marien Ngouabi (Brazzaville)', 'nom_en' => 'Marien Ngouabi University (Brazzaville)'],
            ],
            'CD' => [
                ['nom_fr' => 'Université de Kinshasa (UNIKIN)', 'nom_en' => 'University of Kinshasa (UNIKIN)'],
                ['nom_fr' => 'Université de Lubumbashi', 'nom_en' => 'University of Lubumbashi'],
            ],
            'GN' => [
                ['nom_fr' => 'Université Général Lansana Conté de Sonfonia (Conakry)', 'nom_en' => 'General Lansana Conté University of Sonfonia (Conakry)'],
            ],
            'MR' => [
                ['nom_fr' => 'Université de Nouakchott', 'nom_en' => 'University of Nouakchott'],
            ],
            'MG' => [
                ['nom_fr' => "Université d'Antananarivo", 'nom_en' => 'University of Antananarivo'],
            ],
            'TN' => [
                ['nom_fr' => 'Université de Tunis El Manar — Faculté de droit de Tunis', 'nom_en' => 'University of Tunis El Manar — Faculty of Law of Tunis'],
                ['nom_fr' => 'Faculté de droit de Sfax', 'nom_en' => 'Faculty of Law of Sfax'],
            ],
            'DZ' => [
                ['nom_fr' => "Université d'Alger 1 — Faculté de droit (Ben Aknoun)", 'nom_en' => 'University of Algiers 1 — Faculty of Law (Ben Aknoun)'],
                ['nom_fr' => "Université d'Oran", 'nom_en' => 'University of Oran'],
            ],
        ];

        $langues = [
            ['nom_fr' => 'Français', 'nom_en' => 'French'],
            ['nom_fr' => 'Anglais', 'nom_en' => 'English'],
            ['nom_fr' => 'Espagnol', 'nom_en' => 'Spanish'],
            ['nom_fr' => 'Allemand', 'nom_en' => 'German'],
            ['nom_fr' => 'Italien', 'nom_en' => 'Italian'],
            ['nom_fr' => 'Arabe', 'nom_en' => 'Arabic'],
        ];

        /**
         * @var list<array{nom_fr: string, nom_en: string}> $typesTravailRecherche
         */
        $typesTravailRecherche = [
            ['nom_fr' => 'Stage', 'nom_en' => 'Internship'],
            ['nom_fr' => 'Stage pré embauche', 'nom_en' => 'Pre-employment Internship'],
            ['nom_fr' => 'CDD', 'nom_en' => 'Fixed-term Contract (CDD)'],
            ['nom_fr' => 'CDI', 'nom_en' => 'Permanent Contract (CDI)'],
        ];

        /**
         * @var list<array{code: string, nom_fr: string, nom_en: string, villes: list<array{nom_fr: string, nom_en: string}>}> $paysAvecVilles
         */
        $paysAvecVilles = [
            [
                'code' => 'BE',
                'nom_fr' => 'Belgique',
                'nom_en' => 'Belgium',
                'villes' => [
                    ['nom_fr' => 'Bruxelles', 'nom_en' => 'Brussels'],
                ],
            ],
            [
                'code' => 'NE',
                'nom_fr' => 'Niger',
                'nom_en' => 'Niger',
                'villes' => [
                    ['nom_fr' => 'Niamey', 'nom_en' => 'Niamey'],
                ],
            ],
            [
                'code' => 'MR',
                'nom_fr' => 'Mauritanie',
                'nom_en' => 'Mauritania',
                'villes' => [
                    ['nom_fr' => 'Nouakchott', 'nom_en' => 'Nouakchott'],
                ],
            ],
            [
                'code' => 'MA',
                'nom_fr' => 'Maroc',
                'nom_en' => 'Morocco',
                'villes' => [
                    ['nom_fr' => 'Casablanca', 'nom_en' => 'Casablanca'],
                    ['nom_fr' => 'Rabat', 'nom_en' => 'Rabat'],
                    ['nom_fr' => 'Marrakech', 'nom_en' => 'Marrakech'],
                    ['nom_fr' => 'Fès', 'nom_en' => 'Fez'],
                    ['nom_fr' => 'Tanger', 'nom_en' => 'Tangier'],
                    ['nom_fr' => 'Agadir', 'nom_en' => 'Agadir'],
                    ['nom_fr' => 'Meknès', 'nom_en' => 'Meknes'],
                    ['nom_fr' => 'Oujda', 'nom_en' => 'Oujda'],
                    ['nom_fr' => 'Tétouan', 'nom_en' => 'Tetouan'],
                    ['nom_fr' => 'El Jadida', 'nom_en' => 'El Jadida'],
                    ['nom_fr' => 'Nador', 'nom_en' => 'Nador'],
                    ['nom_fr' => 'Kénitra', 'nom_en' => 'Kenitra'],
                    ['nom_fr' => 'Safi', 'nom_en' => 'Safi'],
                    ['nom_fr' => 'Berkane', 'nom_en' => 'Berkane'],
                    ['nom_fr' => 'Béni Mellal', 'nom_en' => 'Beni Mellal'],
                    ['nom_fr' => 'Essaouira', 'nom_en' => 'Essaouira'],
                    ['nom_fr' => 'Larache', 'nom_en' => 'Larache'],
                    ['nom_fr' => 'Khouribga', 'nom_en' => 'Khouribga'],
                    ['nom_fr' => 'Taza', 'nom_en' => 'Taza'],
                    ['nom_fr' => 'Errachidia', 'nom_en' => 'Errachidia'],
                ],
            ],
            [
                'code' => 'FR',
                'nom_fr' => 'France',
                'nom_en' => 'France',
                'villes' => [
                    ['nom_fr' => 'Paris', 'nom_en' => 'Paris'],
                    ['nom_fr' => 'Lyon', 'nom_en' => 'Lyon'],
                    ['nom_fr' => 'Marseille', 'nom_en' => 'Marseille'],
                    ['nom_fr' => 'Lille', 'nom_en' => 'Lille'],
                    ['nom_fr' => 'Toulouse', 'nom_en' => 'Toulouse'],
                    ['nom_fr' => 'Bordeaux', 'nom_en' => 'Bordeaux'],
                    ['nom_fr' => 'Nantes', 'nom_en' => 'Nantes'],
                    ['nom_fr' => 'Strasbourg', 'nom_en' => 'Strasbourg'],
                    ['nom_fr' => 'Nice', 'nom_en' => 'Nice'],
                    ['nom_fr' => 'Montpellier', 'nom_en' => 'Montpellier'],
                ],
            ],
            [
                'code' => 'SN',
                'nom_fr' => 'Sénégal',
                'nom_en' => 'Senegal',
                'villes' => [
                    ['nom_fr' => 'Dakar', 'nom_en' => 'Dakar'],
                    ['nom_fr' => 'Thiès', 'nom_en' => 'Thies'],
                    ['nom_fr' => 'Saint-Louis', 'nom_en' => 'Saint-Louis'],
                    ['nom_fr' => 'Kaolack', 'nom_en' => 'Kaolack'],
                ],
            ],
            [
                'code' => 'CI',
                'nom_fr' => "Côte d'Ivoire",
                'nom_en' => 'Ivory Coast',
                'villes' => [
                    ['nom_fr' => 'Abidjan', 'nom_en' => 'Abidjan'],
                    ['nom_fr' => 'Bouaké', 'nom_en' => 'Bouake'],
                    ['nom_fr' => 'Yamoussoukro', 'nom_en' => 'Yamoussoukro'],
                    ['nom_fr' => 'San-Pédro', 'nom_en' => 'San-Pedro'],
                ],
            ],
            [
                'code' => 'TN',
                'nom_fr' => 'Tunisie',
                'nom_en' => 'Tunisia',
                'villes' => [
                    ['nom_fr' => 'Tunis', 'nom_en' => 'Tunis'],
                    ['nom_fr' => 'Sfax', 'nom_en' => 'Sfax'],
                    ['nom_fr' => 'Sousse', 'nom_en' => 'Sousse'],
                    ['nom_fr' => 'Bizerte', 'nom_en' => 'Bizerte'],
                ],
            ],
            [
                'code' => 'DZ',
                'nom_fr' => 'Algérie',
                'nom_en' => 'Algeria',
                'villes' => [
                    ['nom_fr' => 'Alger', 'nom_en' => 'Algiers'],
                    ['nom_fr' => 'Oran', 'nom_en' => 'Oran'],
                    ['nom_fr' => 'Constantine', 'nom_en' => 'Constantine'],
                    ['nom_fr' => 'Annaba', 'nom_en' => 'Annaba'],
                ],
            ],
            [
                'code' => 'CM',
                'nom_fr' => 'Cameroun',
                'nom_en' => 'Cameroon',
                'villes' => [
                    ['nom_fr' => 'Douala', 'nom_en' => 'Douala'],
                    ['nom_fr' => 'Yaoundé', 'nom_en' => 'Yaounde'],
                    ['nom_fr' => 'Garoua', 'nom_en' => 'Garoua'],
                ],
            ],
            [
                'code' => 'ML',
                'nom_fr' => 'Mali',
                'nom_en' => 'Mali',
                'villes' => [
                    ['nom_fr' => 'Bamako', 'nom_en' => 'Bamako'],
                    ['nom_fr' => 'Sikasso', 'nom_en' => 'Sikasso'],
                ],
            ],
            [
                'code' => 'BF',
                'nom_fr' => 'Burkina Faso',
                'nom_en' => 'Burkina Faso',
                'villes' => [
                    ['nom_fr' => 'Ouagadougou', 'nom_en' => 'Ouagadougou'],
                    ['nom_fr' => 'Bobo-Dioulasso', 'nom_en' => 'Bobo-Dioulasso'],
                ],
            ],
            [
                'code' => 'BJ',
                'nom_fr' => 'Bénin',
                'nom_en' => 'Benin',
                'villes' => [
                    ['nom_fr' => 'Cotonou', 'nom_en' => 'Cotonou'],
                    ['nom_fr' => 'Porto-Novo', 'nom_en' => 'Porto-Novo'],
                ],
            ],
            [
                'code' => 'TG',
                'nom_fr' => 'Togo',
                'nom_en' => 'Togo',
                'villes' => [
                    ['nom_fr' => 'Lomé', 'nom_en' => 'Lome'],
                ],
            ],
            [
                'code' => 'GN',
                'nom_fr' => 'Guinée',
                'nom_en' => 'Guinea',
                'villes' => [
                    ['nom_fr' => 'Conakry', 'nom_en' => 'Conakry'],
                ],
            ],
            [
                'code' => 'GA',
                'nom_fr' => 'Gabon',
                'nom_en' => 'Gabon',
                'villes' => [
                    ['nom_fr' => 'Libreville', 'nom_en' => 'Libreville'],
                    ['nom_fr' => 'Port-Gentil', 'nom_en' => 'Port-Gentil'],
                ],
            ],
            [
                'code' => 'CG',
                'nom_fr' => 'Congo',
                'nom_en' => 'Congo',
                'villes' => [
                    ['nom_fr' => 'Brazzaville', 'nom_en' => 'Brazzaville'],
                    ['nom_fr' => 'Pointe-Noire', 'nom_en' => 'Pointe-Noire'],
                ],
            ],
            [
                'code' => 'CD',
                'nom_fr' => 'République démocratique du Congo',
                'nom_en' => 'Democratic Republic of the Congo',
                'villes' => [
                    ['nom_fr' => 'Kinshasa', 'nom_en' => 'Kinshasa'],
                    ['nom_fr' => 'Lubumbashi', 'nom_en' => 'Lubumbashi'],
                ],
            ],
            [
                'code' => 'MG',
                'nom_fr' => 'Madagascar',
                'nom_en' => 'Madagascar',
                'villes' => [
                    ['nom_fr' => 'Antananarivo', 'nom_en' => 'Antananarivo'],
                    ['nom_fr' => 'Toamasina', 'nom_en' => 'Toamasina'],
                ],
            ],
            [
                'code' => 'RW',
                'nom_fr' => 'Rwanda',
                'nom_en' => 'Rwanda',
                'villes' => [
                    ['nom_fr' => 'Kigali', 'nom_en' => 'Kigali'],
                ],
            ],
            [
                'code' => 'KE',
                'nom_fr' => 'Kenya',
                'nom_en' => 'Kenya',
                'villes' => [
                    ['nom_fr' => 'Nairobi', 'nom_en' => 'Nairobi'],
                    ['nom_fr' => 'Mombasa', 'nom_en' => 'Mombasa'],
                ],
            ],
            [
                'code' => 'ZA',
                'nom_fr' => 'Afrique du Sud',
                'nom_en' => 'South Africa',
                'villes' => [
                    ['nom_fr' => 'Johannesburg', 'nom_en' => 'Johannesburg'],
                    ['nom_fr' => 'Le Cap', 'nom_en' => 'Cape Town'],
                    ['nom_fr' => 'Durban', 'nom_en' => 'Durban'],
                ],
            ],
        ];

        /**
         * @var list<array{nom_fr: string, nom_en: string}> $modesTravailRecherche
         */
        $modesTravailRecherche = [
            ['nom_fr' => 'Sur site', 'nom_en' => 'On-site'],
            ['nom_fr' => 'Télétravail', 'nom_en' => 'Remote'],
            ['nom_fr' => 'Hybride', 'nom_en' => 'Hybrid'],
        ];

        /**
         * @var list<array{nom_fr: string, nom_en: string}> $postes
         */
        $postes = [
            ['nom_fr' => 'Avocat', 'nom_en' => 'Lawyer'],
            ['nom_fr' => 'Juriste', 'nom_en' => 'Legal Counsel'],
            ['nom_fr' => 'Assistant Juridique', 'nom_en' => 'Legal Assistant'],
            ['nom_fr' => 'Conseil Juridique', 'nom_en' => 'Legal Advisor'],
        ];

        /**
         * @var list<array{nom_fr: string, nom_en: string}> $typeOrganisation
         */
        $typeOrganisation = [
            ['nom_fr' => "Cabinet d'avocats", 'nom_en' => 'Law Firm'],
            ['nom_fr' => 'Entreprise (Direction Juridique)', 'nom_en' => 'Company (Legal Department)'],
            ['nom_fr' => 'Études Notariale', 'nom_en' => 'Notary Office'],
            ['nom_fr' => "Études d'Huissier", 'nom_en' => 'Bailiff Office'],
            ['nom_fr' => 'Administration publique', 'nom_en' => 'Public Administration'],
        ];

        /**
         * @var list<array{nom_fr: string, nom_en: string}> $tailleEntreprise
         */
        $tailleEntreprise = [
            ['nom_fr' => '1-5 employés', 'nom_en' => '1-5 employees'],
            ['nom_fr' => '6-20 employés', 'nom_en' => '6-20 employees'],
            ['nom_fr' => '21-100 employés', 'nom_en' => '21-100 employees'],
            ['nom_fr' => '101-500 employés', 'nom_en' => '101-500 employees'],
            ['nom_fr' => '500+ employés', 'nom_en' => '500+ employees'],
        ];

        /**
         * @var list<array{nom_fr: string, nom_en: string}> $salaires
         */
        $salaires = [
            ['nom_fr' => 'Moins de 5 000 MAD/mois', 'nom_en' => 'Less than 5,000 MAD/month'],
            ['nom_fr' => '5 000 – 8 000 MAD/mois', 'nom_en' => '5,000 – 8,000 MAD/month'],
            ['nom_fr' => '8 000 – 12 000 MAD/mois', 'nom_en' => '8,000 – 12,000 MAD/month'],
            ['nom_fr' => '12 000 – 18 000 MAD/mois', 'nom_en' => '12,000 – 18,000 MAD/month'],
            ['nom_fr' => '18 000 – 25 000 MAD/mois', 'nom_en' => '18,000 – 25,000 MAD/month'],
            ['nom_fr' => '25 000 – 35 000 MAD/mois', 'nom_en' => '25,000 – 35,000 MAD/month'],
            ['nom_fr' => 'Plus de 35 000 MAD/mois', 'nom_en' => 'More than 35,000 MAD/month'],
        ];

        /**
         * @var list<array{nom_fr: string, nom_en: string, code: string}> $urgences
         */
        $urgences = [
            ['nom_fr' => 'Normal (2–4 sem.)', 'nom_en' => 'Normal (2–4 weeks)', 'code' => 'normal'],
            ['nom_fr' => 'Urgent (< 1 sem.)', 'nom_en' => 'Urgent (< 1 week)', 'code' => 'urgent'],
            ['nom_fr' => 'Immédiat', 'nom_en' => 'Immediate', 'code' => 'immediat'],
        ];

        foreach ($specialisations as $specialisation) {
            DB::table('specialisations')->insert($specialisation);
        }

        DB::table('niveau_experiences')->insert($niveauxExperience);
        DB::table('niveau_langues')->insert($niveauxLangue);
        DB::table('formation_juridiques')->insert($formationsJuridiques);
        DB::table('langues')->insert($langues);
        DB::table('type_travails')->insert($typesTravailRecherche);

        foreach ($paysAvecVilles as $pays) {
            $paysId = DB::table('pays')->insertGetId([
                'code' => $pays['code'],
                'nom_fr' => $pays['nom_fr'],
                'nom_en' => $pays['nom_en'],
            ]);

            foreach ($pays['villes'] as $ville) {
                DB::table('villes')->insert([
                    'pays_id' => $paysId,
                    'nom_fr' => $ville['nom_fr'],
                    'nom_en' => $ville['nom_en'],
                ]);
            }
        }

        foreach ($ecolesParPays as $codePays => $ecolesList) {
            $paysId = DB::table('pays')->where('code', $codePays)->value('id');
            if ($paysId) {
                foreach ($ecolesList as $ecole) {
                    DB::table('ecoles')->insert([
                        'nom_fr' => $ecole['nom_fr'],
                        'nom_en' => $ecole['nom_en'],
                        'pays_id' => $paysId,
                    ]);
                }
            }
        }

        DB::table('mode_travails')->insert($modesTravailRecherche);
        DB::table('postes')->insert($postes);
        DB::table('type_organisations')->insert($typeOrganisation);
        DB::table('taille_entreprises')->insert($tailleEntreprise);
        DB::table('salaires')->insert($salaires);
        DB::table('urgences')->insert($urgences);
    }
}
