import re

with open('database/seeders/TaxonomySeeder.php', 'r') as f:
    content = f.read()

# 1. Remove the old $ecolesMaroc array
content = re.sub(r'/\*\*\n\s+\* @var list<array\{nom_fr: string, nom_en: string\}> \$ecolesMaroc\n\s+\*/\n\s+\$ecolesMaroc = \[\n(.*?)\n\s+\];\n', '', content, flags=re.DOTALL)

# 2. Add the new ecolesParPays
new_ecoles = """        /**
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
                ['nom_fr' => "Université de Pau et des Pays de l'Adour", 'nom_en' => "University of Pau and the Adour Region"],
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
        ];\n\n"""

content = content.replace("        $langues = [", new_ecoles + "        $langues = [")

# 3. Add the missing countries
new_pays = """            [
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
            ],"""

content = content.replace("                'code' => 'MA',", new_pays + "\n            [\n                'code' => 'MA',")

# 4. Remove old DB::table('ecoles')->insert($ecolesMaroc);
content = re.sub(r"        DB::table\('ecoles'\)->insert\(\$ecolesMaroc\);\n", "", content)

# 5. Insert ecoles loop right after the pays loop
ecoles_insert_loop = """
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
"""
content = content.replace("        DB::table('mode_travails')->insert($modesTravailRecherche);", ecoles_insert_loop + "\n        DB::table('mode_travails')->insert($modesTravailRecherche);")

with open('database/seeders/TaxonomySeeder.php', 'w') as f:
    f.write(content)

