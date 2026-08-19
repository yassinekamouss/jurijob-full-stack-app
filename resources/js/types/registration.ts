/**
 * Registration Form Types for Jurijob
 * Shared between registration pages and form components.
 */

export type UserFormData = {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export type Formation = {
    id: string;
    annee_debut: string;
    annee_fin: string;
    formation_juridique_id: string | number;
    specialisation_id: string | number;
    ecole_id: string | number;
    autre_ecole?: string;
};

export type Experience = {
    id: string;
    debut: string;
    fin: string;
    type_travail_id: string | number;
    entreprise: string;
    poste_id: string | number;
};

export type CandidatFormData = {
    niveau_experience_id: string | number;
    formation_juridique_id: string | number;
    poste_id: (string | number)[];
    salaire_id: string | number;
    urgence_id: string | number;
    specialisations: (string | number)[];
    type_travails: (string | number)[];
    mode_travails: (string | number)[];
    ville_travails: (string | number)[];
    langues: { langue_id: string | number; niveau_langue_id: string | number }[];
    formations: Formation[];
    experiences: Experience[];
};

export type FullCandidatFormData = {
    user: UserFormData;
    candidat: CandidatFormData;
};

export type RecruteurFormData = {
    nom_entreprise: string;
    type_organisation_id: string | number;
    taille_entreprise_id: string | number;
    ville_id: string | number;
    site_web: string;
    poste: string;
};

export type FullRecruteurFormData = {
    user: UserFormData;
    recruteur: RecruteurFormData;
};
