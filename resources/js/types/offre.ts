import { Poste, TypeTravail, NiveauExperience, Specialisation, Ville, ModeTravail, DomaineExperience, FormationJuridique, NiveauLangue, Langue } from './taxonomies';

export interface Requirement {
    taxonomy_id: number;
    taxonomy_type: 'ville' | 'specialisation' | 'langue' | 'domaine_experience' | 'formation_juridique';
    label?: string;
    importance: 'indispensable' | 'important' | 'souhaitable' | 'facultatif';
    operator?: 'AND' | 'OR';
    requirements_data?: {
        niveau_langue_id?: number;
        niveau_nom?: string;
    };
}

export interface OffreCritere {
    id: number;
    groupe_id: number;
    critere_id: number;
    valeur_id?: number;
    importance: 'indispensable' | 'important' | 'souhaitable' | 'facultatif';
    created_at: string;
    updated_at: string;
}

export interface OffreCritereGroupe {
    id: number;
    offre_id: number;
    type_critere: 'ville' | 'specialisation' | 'langue' | 'domaine_experience' | 'formation_juridique';
    operateur: 'AND' | 'OR';
    created_at: string;
    updated_at: string;
    criteres?: OffreCritere[];
}

export interface Offre {
    id: number;
    recruteur_id: number;
    poste_id: number;
    type_travail_id: number;
    mode_travail_id: number;
    niveau_experience_id: number;
    titre: string;
    description: string;
    statut: 'ouvert' | 'fermé';
    created_at: string;
    updated_at: string;

    // Relationships
    poste?: Poste;
    type_travail?: TypeTravail;
    mode_travail?: ModeTravail;
    niveau_experience?: NiveauExperience;

    // Criteria (New Architecture)
    critereGroupes?: OffreCritereGroupe[];

    // Requirements (Frontend compatible format)
    requirements?: Requirement[];

    // Counts
    criteria_count?: number;
}
