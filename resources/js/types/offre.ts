import { Poste, TypeTravail, NiveauExperience, Specialisation, Ville, ModeTravail, DomaineExperience, FormationJuridique, NiveauLangue, Langue } from './taxonomies';

export interface Requirement {
    id: number;
    offre_id: number;
    importance: 'indispensable' | 'important' | 'souhaitable' | 'facultatif';
    created_at: string;
    updated_at: string;
}

export interface OffreLangue extends Requirement {
    langue_id: number;
    niveau_langue_id: number;
    langue?: Langue;
    niveau_langue?: NiveauLangue;
}

export interface OffreSpecialisation extends Requirement {
    specialisation_id: number;
    specialisation?: Specialisation;
}

export interface OffreVille extends Requirement {
    ville_id: number;
    ville?: Ville;
}

export interface OffreModeTravail extends Requirement {
    mode_travail_id: number;
    mode_travail?: ModeTravail;
}

export interface OffreDomainExperience extends Requirement {
    domaine_experience_id: number;
    domaine_experience?: DomaineExperience;
}

export interface OffreFormationsJuridique extends Requirement {
    formation_juridique_id: number;
    formation_juridique?: FormationJuridique;
}

export interface Offre {
    id: number;
    recruteur_id: number;
    poste_id: number;
    type_travail_id: number;
    niveau_experience_id: number;
    titre: string;
    description: string;
    statut: 'ouvert' | 'fermé';
    created_at: string;
    updated_at: string;

    // Relationships
    poste?: Poste;
    type_travail?: TypeTravail;
    niveau_experience?: NiveauExperience;

    // Requirements (Symmetric)
    langue_requirements?: OffreLangue[];
    specialisation_requirements?: OffreSpecialisation[];
    ville_requirements?: OffreVille[];
    mode_travail_requirements?: OffreModeTravail[];
    domain_experience_requirements?: OffreDomainExperience[];
    formation_juridique_requirements?: OffreFormationsJuridique[];

    // Counts
    langue_requirements_count?: number;
    ville_requirements_count?: number;
    specialisation_requirements_count?: number;
    mode_travail_requirements_count?: number;
    domain_experience_requirements_count?: number;
    formation_juridique_requirements_count?: number;
}
