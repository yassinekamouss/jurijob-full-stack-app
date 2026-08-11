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
         * @var list<array{nom_fr: string, nom_en: string}> $ecolesMaroc
         */
        $ecolesMaroc = [
            ['nom_fr' => 'Université Mohammed V - Rabat', 'nom_en' => 'Mohammed V University - Rabat'],
            ['nom_fr' => 'Université Hassan II - Casablanca', 'nom_en' => 'Hassan II University - Casablanca'],
            ['nom_fr' => 'Université Cadi Ayyad - Marrakech', 'nom_en' => 'Cadi Ayyad University - Marrakech'],
            ['nom_fr' => 'Université Sidi Mohamed Ben Abdellah - Fès', 'nom_en' => 'Sidi Mohamed Ben Abdellah University - Fez'],
            ['nom_fr' => 'Université Mohammed Premier - Oujda', 'nom_en' => 'Mohammed First University - Oujda'],
            ['nom_fr' => 'Université Moulay Ismaïl - Meknès', 'nom_en' => 'Moulay Ismail University - Meknes'],
            ['nom_fr' => 'Université Abdelmalek Essaâdi - Tétouan/Tanger', 'nom_en' => 'Abdelmalek Essaadi University - Tetouan/Tangier'],
            ['nom_fr' => 'Université Chouaib Doukkali - El Jadida', 'nom_en' => 'Chouaib Doukkali University - El Jadida'],
            ['nom_fr' => 'Université Ibn Tofail - Kénitra', 'nom_en' => 'Ibn Tofail University - Kenitra'],
            ['nom_fr' => 'Université Ibn Zohr - Agadir', 'nom_en' => 'Ibn Zohr University - Agadir'],
            ['nom_fr' => 'Université Akhawayn - Ifrane', 'nom_en' => 'Al Akhawayn University - Ifrane'],
            ['nom_fr' => 'Université Sultan Moulay Slimane - Béni Mellal', 'nom_en' => 'Sultan Moulay Slimane University - Beni Mellal'],
            ['nom_fr' => 'EM Lyon Business School - Casablanca', 'nom_en' => 'EM Lyon Business School - Casablanca'],
            ['nom_fr' => 'ESSEC Business School - Rabat', 'nom_en' => 'ESSEC Business School - Rabat'],
            ['nom_fr' => 'Université Mundiapolis - Casablanca', 'nom_en' => 'Mundiapolis University - Casablanca'],
            ['nom_fr' => 'Université Internationale de Rabat (UIR)', 'nom_en' => 'International University of Rabat (UIR)'],
            ['nom_fr' => 'Université Privée de Marrakech (UPM)', 'nom_en' => 'Private University of Marrakech (UPM)'],
            ['nom_fr' => 'UIC - Université Internationale de Casablanca', 'nom_en' => 'UIC - International University of Casablanca'],
        ];

        /**
         * @var list<array{nom_fr: string, nom_en: string}> $langues
         */
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
         * @var list<array{nom_fr: string, nom_en: string}> $villes
         */
        $villes = [
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
        DB::table('ecoles')->insert($ecolesMaroc);
        DB::table('langues')->insert($langues);
        DB::table('type_travails')->insert($typesTravailRecherche);
        DB::table('villes')->insert($villes);
        DB::table('mode_travails')->insert($modesTravailRecherche);
        DB::table('postes')->insert($postes);
        DB::table('type_organisations')->insert($typeOrganisation);
        DB::table('taille_entreprises')->insert($tailleEntreprise);
        DB::table('salaires')->insert($salaires);
        DB::table('urgences')->insert($urgences);
    }
}
