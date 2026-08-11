export interface TaxonomyItem {
    id: number;
    nom: string;
}

export interface Poste extends TaxonomyItem {}
export interface TypeTravail extends TaxonomyItem {}
export interface NiveauExperience extends TaxonomyItem {}
export interface Specialisation extends TaxonomyItem { domaine?: string; }
export interface Ville extends TaxonomyItem {}
export interface ModeTravail extends TaxonomyItem {}
export interface FormationJuridique extends TaxonomyItem {}
export interface NiveauLangue extends TaxonomyItem {}
export interface Langue extends TaxonomyItem {}
export interface Salaire extends TaxonomyItem {}
export interface Urgence extends TaxonomyItem { code: string; }

export interface Taxonomies {
    postes: Poste[];
    types_travail: TypeTravail[];
    modes_travail: ModeTravail[];
    villes: Ville[];
    niveaux_experience: NiveauExperience[];
    formations_juridiques: FormationJuridique[];
    salaires: Salaire[];
    urgences: Urgence[];
    specialisations: Specialisation[];
    langues: Langue[];
    niveaux_langues: NiveauLangue[];
}

