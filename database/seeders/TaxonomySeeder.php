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
         * @var array<string, string> $specialisations
         *                            Each entry is 'nom' => 'domaine'
         */
        $specialisations = [
            // Droit des entreprises
            'Droit des sociétés' => 'Droit des entreprises',
            'Droit commercial' => 'Droit des entreprises',
            'Droit des contrats' => 'Droit des entreprises',
            'Droit fiscal' => 'Droit des entreprises',
            'Droit social / RH' => 'Droit des entreprises',
            'Droit bancaire & financier' => 'Droit des entreprises',
            'Droit de la propriété intellectuelle' => 'Droit des entreprises',
            'Droit de la concurrence' => 'Droit des entreprises',
            'Compliance & conformité' => 'Droit des entreprises',
            'Droit numérique & IT' => 'Droit des entreprises',
            'Droit des données personnelles' => 'Droit des entreprises',
            'Droit des assurances' => 'Droit des entreprises',
            'Droit des procédures collectives' => 'Droit des entreprises',
            'Droit des sûretés' => 'Droit des entreprises',
            'Droit boursier & marchés financiers' => 'Droit des entreprises',
            'Finance islamique / Banque participative' => 'Droit des entreprises',
            'Droit des télécommunications' => 'Droit des entreprises',
            'Droit de la sécurité sociale' => 'Droit des entreprises',

            // Droit du contentieux
            'Droit pénal des affaires' => 'Droit du contentieux',
            'Droit pénal général' => 'Droit du contentieux',
            'Arbitrage & MARD' => 'Droit du contentieux',
            "Droit de l'exécution forcée" => 'Droit du contentieux',
            'Recouvrement de créances' => 'Droit du contentieux',
            'Droit administratif' => 'Droit du contentieux',
            'Droit public' => 'Droit du contentieux',

            // Droit notarial & immobilier
            'Droit notarial' => 'Droit notarial & immobilier',
            'Droit immobilier' => 'Droit notarial & immobilier',
            "Droit de l'urbanisme" => 'Droit notarial & immobilier',
            'Droit de la famille' => 'Droit notarial & immobilier',
            'Droit des successions' => 'Droit notarial & immobilier',

            // Droit sectoriel
            "Droit de l'énergie" => 'Droit sectoriel',
            'Droit minier' => 'Droit sectoriel',
            'Droit des transports & logistique' => 'Droit sectoriel',
            'Droit de la santé & bioéthique' => 'Droit sectoriel',
            'Droit rural & agricole' => 'Droit sectoriel',
            'Droit du tourisme & de l\'hôtellerie' => 'Droit sectoriel',

            // Droit international & spécialisé
            'Droit international des affaires' => 'Droit international & spécialisé',
            'Droit OHADA' => 'Droit international & spécialisé',
            'Droit du sport' => 'Droit international & spécialisé',
            'Droit maritime' => 'Droit international & spécialisé',
            "Droit de l'environnement" => 'Droit international & spécialisé',
            'Droit de la consommation' => 'Droit international & spécialisé',
            'Droit humanitaire' => 'Droit international & spécialisé',
            'Droit du travail international & mobilité' => 'Droit international & spécialisé',
        ];

        $niveauxExperience = [
            'Étudiant en Droit',
            'Junior (0-2 ans)',
            'Confirmé (3-7 ans)',
            'Senior (8-15 ans)',
            'Expert (15+ ans)',
        ];

        $niveauxLangue = [
            'A1 (Débutant)',
            'A2 (Élémentaire)',
            'B1 (Intermédiaire)',
            'B2 (Avancé)',
            'C1 (Maîtrise)',
            'C2 (Natif)',
        ];

        $formationsJuridiques = [
            'Licence en Droit',
            'Master 1 Droit',
            'Master 2 Droit',
            "CAPA (Certificat d'Aptitude)",
            'Doctorat en Droit',
        ];

        $ecolesMaroc = [
            'Université Mohammed V - Rabat',
            'Université Hassan II - Casablanca',
            'Université Cadi Ayyad - Marrakech',
            'Université Sidi Mohamed Ben Abdellah - Fès',
            'Université Mohammed Premier - Oujda',
            'Université Moulay Ismaïl - Meknès',
            'Université Abdelmalek Essaâdi - Tétouan/Tanger',
            'Université Chouaib Doukkali - El Jadida',
            'Université Ibn Tofail - Kénitra',
            'Université Ibn Zohr - Agadir',
            'Université Akhawayn - Ifrane',
            'Université Sultan Moulay Slimane - Béni Mellal',
            'EM Lyon Business School - Casablanca',
            'ESSEC Business School - Rabat',
            'Université Mundiapolis - Casablanca',
            'Université Internationale de Rabat (UIR)',
            'Université Privée de Marrakech (UPM)',
            'UIC - Université Internationale de Casablanca',
        ];

        $langues = [
            'Français',
            'Anglais',
            'Espagnol',
            'Allemand',
            'Italien',
            'Arabe',
        ];

        $typesTravailRecherche = [
            'Stage',
            'Stage pré embauche',
            'CDD',
            'CDI',
        ];

        $villes = [
            'Casablanca',
            'Rabat',
            'Marrakech',
            'Fès',
            'Tanger',
            'Agadir',
            'Meknès',
            'Oujda',
            'Tétouan',
            'El Jadida',
            'Nador',
            'Kénitra',
            'Safi',
            'Berkane',
            'Béni Mellal',
            'Essaouira',
            'Larache',
            'Khouribga',
            'Taza',
            'Errachidia',
        ];

        $modesTravailRecherche = ['Sur site', 'Télétravail', 'Hybride'];

        $postes = [
            'Avocat',
            'Juriste',
            'Assistant Juridique',
            'Conseil Juridique',
        ];

        $typeOrganisation = [
            "Cabinet d'avocats",
            'Entreprise (Direction Juridique)',
            'Études Notariale',
            "Études d'Huissier",
            'Administration publique',
        ];

        $tailleEntreprise = [
            '1-5 employés',
            '6-20 employés',
            '21-100 employés',
            '101-500 employés',
            '500+ employés',
        ];

        /**
         * @var array<array{nom: string}> $salaires
         */
        $salaires = [
            ['nom' => 'Moins de 5 000 MAD/mois'],
            ['nom' => '5 000 – 8 000 MAD/mois'],
            ['nom' => '8 000 – 12 000 MAD/mois'],
            ['nom' => '12 000 – 18 000 MAD/mois'],
            ['nom' => '18 000 – 25 000 MAD/mois'],
            ['nom' => '25 000 – 35 000 MAD/mois'],
            ['nom' => 'Plus de 35 000 MAD/mois'],
        ];

        /**
         * @var array<array{nom: string, code: string}> $urgences
         */
        $urgences = [
            ['nom' => 'Normal (2–4 sem.)', 'code' => 'normal'],
            ['nom' => 'Urgent (< 1 sem.)', 'code' => 'urgent'],
            ['nom' => 'Immédiat', 'code' => 'immediat'],
        ];

        $insertRecords = function ($tableName, $dataArray) {
            foreach ($dataArray as $item) {
                DB::table($tableName)->insert([
                    'nom' => $item,
                ]);
            }
        };

        // Specialisations (with domaine)
        foreach ($specialisations as $nom => $domaine) {
            DB::table('specialisations')->insert([
                'nom' => $nom,
                'domaine' => $domaine,
            ]);
        }

        $insertRecords('niveau_experiences', $niveauxExperience);
        $insertRecords('niveau_langues', $niveauxLangue);
        $insertRecords('formation_juridiques', $formationsJuridiques);
        $insertRecords('ecoles', $ecolesMaroc);
        $insertRecords('langues', $langues);
        $insertRecords('type_travails', $typesTravailRecherche);
        $insertRecords('villes', $villes);
        $insertRecords('mode_travails', $modesTravailRecherche);
        $insertRecords('postes', $postes);
        $insertRecords('type_organisations', $typeOrganisation);
        $insertRecords('taille_entreprises', $tailleEntreprise);

        DB::table('salaires')->insert($salaires);
        DB::table('urgences')->insert($urgences);
    }
}
