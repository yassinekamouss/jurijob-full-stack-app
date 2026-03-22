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
    niveau: string;
    domaine: string;
    ecole: string;
    diplomaFile: File | null;
};

export type Experience = {
    id: string;
    debut: string;
    fin: string;
    type: string;
    entreprise: string;
    poste: string;
};

export type CandidatFormData = {
    niveauExperience: string;
    formationJuridique: string;
    PosteRecherche: string;
    specialisations: string[];
    domainExperiences: string[];
    typeTravailRecherche: string[];
    modeTravailRecherche: string[];
    villesTravailRecherche: string[];
    langues: { nom: string; niveau: string }[];
    formations: Formation[];
    experiences: Experience[];
};

export type FullCandidatFormData = {
    user: UserFormData;
    candidat: CandidatFormData;
};

export type RecruteurFormData = {
    nom_entreprise: string;
    type_organisation: string;
    taille_entreprise: string;
    ville: string;
    site_web: string;
    poste: string;
};

export type FullRecruteurFormData = {
    user: UserFormData;
    recruteur: RecruteurFormData;
};
