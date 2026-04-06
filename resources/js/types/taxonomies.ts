export interface TaxonomyItem {
    id: number;
    nom: string;
}

export interface Poste extends TaxonomyItem {}
export interface TypeTravail extends TaxonomyItem {}
export interface NiveauExperience extends TaxonomyItem {}
export interface Specialisation extends TaxonomyItem {}
export interface Ville extends TaxonomyItem {}
export interface ModeTravail extends TaxonomyItem {}
export interface DomaineExperience extends TaxonomyItem {}
export interface FormationJuridique extends TaxonomyItem {}
export interface NiveauLangue extends TaxonomyItem {}
export interface Langue extends TaxonomyItem {}
