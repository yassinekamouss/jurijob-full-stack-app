import { Poste, TypeTravail, NiveauExperience, Specialisation, Ville, ModeTravail, FormationJuridique, NiveauLangue, Langue } from './taxonomies';

export interface Requirement {
    taxonomy_id: number;
    taxonomy_type: 'SPECIALISATION' | 'LANGUE';
    label?: string;
    metadata?: any;
}

export interface Offre {
    id: number;
    recruteur_id: number;
    poste_id: number;
    type_travail_id: number;
    mode_travail_id: number;
    ville_id: number;
    niveau_experience_id: number;
    formation_juridique_id: number | null;
    salaire_id: number | null;
    urgence_id: number | null;
    titre: string;
    description: string;
    notes_complementaires: string | null;
    nombre_cv: number;
    statut: 'ouvert' | 'fermé';
    created_at: string;
    updated_at: string;

    // Relationships
    poste?: Poste;
    type_travail?: TypeTravail;
    mode_travail?: ModeTravail;
    ville?: Ville;
    niveau_experience?: NiveauExperience;

    // Requirements (Frontend compatible format)
    requirements?: Requirement[];

    // Counts
    criteria_count?: number;
}
