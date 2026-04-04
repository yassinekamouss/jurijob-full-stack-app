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
        $specialisations = [
            "Droit des Affaires",
            "Droit Social",
            "Droit Fiscal",
            "Droit Immobilier",
            "Droit Pénal",
            "Droit de la Famille",
            "Droit Public",
            "Droit International",
            "Propriété Intellectuelle",
            "Droit de l'Environnement",
        ];

        $niveauxExperience = [
            "Étudiant en Droit",
            "Junior (0-2 ans)",
            "Confirmé (3-7 ans)",
            "Senior (8-15 ans)",
            "Expert (15+ ans)",
        ];

        $niveauxLangue = [
            "A1 (Débutant)",
            "A2 (Élémentaire)",
            "B1 (Intermédiaire)",
            "B2 (Avancé)",
            "C1 (Maîtrise)",
            "C2 (Natif)",
        ];

        $formationsJuridiques = [
            "Licence en Droit",
            "Master 1 Droit",
            "Master 2 Droit",
            "CAPA (Certificat d'Aptitude)",
            "Doctorat en Droit",
            "Autre formation juridique",
        ];

        $ecolesMaroc = [
            "Université Mohammed V - Rabat",
            "Université Hassan II - Casablanca",
            "Université Cadi Ayyad - Marrakech",
            "Université Sidi Mohamed Ben Abdellah - Fès",
            "Université Mohammed Premier - Oujda",
            "Université Moulay Ismaïl - Meknès",
            "Université Abdelmalek Essaâdi - Tétouan/Tanger",
            "Université Chouaib Doukkali - El Jadida",
            "Université Ibn Tofail - Kénitra",
            "Université Ibn Zohr - Agadir",
            "Université Akhawayn - Ifrane",
            "Université Sultan Moulay Slimane - Béni Mellal",
            "EM Lyon Business School - Casablanca",
            "ESSEC Business School - Rabat",
            "Université Mundiapolis - Casablanca",
            "Université Internationale de Rabat (UIR)",
            "Université Privée de Marrakech (UPM)",
            "UIC - Université Internationale de Casablanca",
            "Autre",
        ];

        $langues = [
            "Français",
            "Anglais",
            "Espagnol",
            "Allemand",
            "Italien",
            "Arabe",
        ];

        $typesTravailRecherche = [
            "Stage",
            "Stage pré embauche",
            "CDD",
            "CDI",
        ];

        $villes = [
            "Casablanca",
            "Rabat",
            "Marrakech",
            "Fès",
            "Tanger",
            "Agadir",
            "Meknès",
            "Oujda",
            "Tétouan",
            "El Jadida",
            "Nador",
            "Kénitra",
            "Safi",
            "Berkane",
            "Béni Mellal",
            "Essaouira",
            "Larache",
            "Khouribga",
            "Taza",
            "Errachidia",
        ];

        $modesTravailRecherche = ["Sur site", "Télétravail", "Hybride"];

        $domainesExperience = [
            "Banque & Finance",
            "Technologie & Numérique",
            "Santé & Pharmaceutique",
            "Énergie & Environnement",
            "Immobilier & Construction",
            "Commerce & Distribution",
            "Industrie & Manufacturing",
            "Transport & Logistique",
            "Médias & Communication",
            "Éducation & Formation",
            "Conseil & Services",
            "Secteur Public",
        ];

        $postes = [
            "Avocat",
            "Juriste",
            "Assistant Juridique",
            "Conseil Juridique",
        ];

    

        $typeOrganisation = [
            "Cabinet d'avocats",
            "Entreprise (Direction Juridique)",
            "Études Notariale",
            "Études d'Huissier",
            "Administration publique",
            "Autre",
        ];

        $tailleEntreprise = [
            "1-5 employés",
            "6-20 employés",
            "21-100 employés",
            "101-500 employés",
            "500+ employés",
        ];

        $insertRecords = function($tableName, $dataArray) {
            foreach ($dataArray as $item) {
                DB::table($tableName)->insert([
                    'nom' => $item,
                ]);
            }
        };

        $insertRecords('specialisations', $specialisations);
        $insertRecords('niveau_experiences', $niveauxExperience);
        $insertRecords('niveau_langues', $niveauxLangue);
        $insertRecords('formation_juridiques', $formationsJuridiques);
        $insertRecords('ecoles', $ecolesMaroc);
        $insertRecords('langues', $langues);
        $insertRecords('type_travails', $typesTravailRecherche);
        $insertRecords('villes', $villes);
        $insertRecords('mode_travails', $modesTravailRecherche);
        $insertRecords('domaine_experiences', $domainesExperience);
        $insertRecords('postes', $postes);
        $insertRecords('type_organisations', $typeOrganisation);
        $insertRecords('taille_entreprises', $tailleEntreprise);
    }
}
