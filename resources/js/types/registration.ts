/**
 * Registration Form Types for Jurijob
 * Shared between registration pages and form components.
 */

export type UserFormData = {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    imageFile: File | null;
    password: string;
    confirmPassword: string;
};

export type Formation = {
    id: string;
    anneeDebut: string;
    anneeFin: string;
    niveau: string | number;
    domaine: string | number;
    ecole: string | number;
    diplomaFile: File | null;
};

export type Experience = {
    id: string;
    debut: string;
    fin: string;
    type: string | number;
    entreprise: string;
    poste: string | number;
};

export type CandidatFormData = {
    niveauExperience: string | number;
    formationJuridique: string | number;
    PosteRecherche: string | number;
    specialisations: (string | number)[];
    domainExperiences: (string | number)[];
    typeTravailRecherche: (string | number)[];
    modeTravailRecherche: (string | number)[];
    villesTravailRecherche: (string | number)[];
    langues: { nom: string | number; niveau: string | number }[];
    formations: Formation[];
    experiences: Experience[];
};

export type FullCandidatFormData = {
    user: UserFormData;
    candidat: CandidatFormData;
};

export type RecruteurFormData = {
    nom_entreprise: string;
    type_organisation: string | number;
    taille_entreprise: string | number;
    ville: string | number;
    site_web: string;
    poste: string;
};

export type FullRecruteurFormData = {
    user: UserFormData;
    recruteur: RecruteurFormData;
};
