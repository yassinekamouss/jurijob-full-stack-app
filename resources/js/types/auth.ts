export type Role = 'candidat' | 'recruteur';

export type Candidat = {
    id: number;
    user_id: number;
    nom: string;
    prenom: string;
    poste_recherche: string;
    niveau_experience: string;
    formation_juridique: string;
    image_url?: string;
    created_at: string;
    updated_at: string;
};

export type Recruteur = {
    id: number;
    user_id: number;
    nom_entreprise: string;
    poste?: string;
    type_organisation: string;
    taille_entreprise: string;
    site_web?: string;
    ville: string;
    created_at: string;
    updated_at: string;
};

export type User = {
    id: number;
    email: string;
    telephone?: string;
    role: Role;
    image_url?: string;
    is_active: boolean;
    is_archived: boolean;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    candidat?: Candidat;
    recruteur?: Recruteur;
    // Backwards compatibility or virtual attributes
    name?: string;
    avatar?: string;
};

export type Auth = {
    user: User;
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
