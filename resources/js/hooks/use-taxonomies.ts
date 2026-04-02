import { usePage } from '@inertiajs/react';

interface Taxonomy {
    id: number;
    nom: string;
}

interface Taxonomies {
    domaineExperiences: Taxonomy[];
    ecoles: Taxonomy[];
    formationJuridiques: Taxonomy[];
    langues: Taxonomy[];
    modeTravails: Taxonomy[];
    niveauExperiences: Taxonomy[];
    niveauLangues: Taxonomy[];
    postes: Taxonomy[];
    specialisations: Taxonomy[];
    tailleEntreprises: Taxonomy[];
    typeExperiences: Taxonomy[];
    typeOrganisations: Taxonomy[];
    typeTravails: Taxonomy[];
    villes: Taxonomy[];
}

export const useTaxonomies = (): Taxonomies => {
    const { props } = usePage();
    const taxonomies = (props.taxonomies || {}) as Taxonomies;

    return {
        domaineExperiences: taxonomies.domaineExperiences || [],
        ecoles: taxonomies.ecoles || [],
        formationJuridiques: taxonomies.formationJuridiques || [],
        langues: taxonomies.langues || [],
        modeTravails: taxonomies.modeTravails || [],
        niveauExperiences: taxonomies.niveauExperiences || [],
        niveauLangues: taxonomies.niveauLangues || [],
        postes: taxonomies.postes || [],
        specialisations: taxonomies.specialisations || [],
        tailleEntreprises: taxonomies.tailleEntreprises || [],
        typeExperiences: taxonomies.typeExperiences || [],
        typeOrganisations: taxonomies.typeOrganisations || [],
        typeTravails: taxonomies.typeTravails || [],
        villes: taxonomies.villes || [],
    };
};

export const useLoadingTaxonomy = (taxonomy: Taxonomy[] | undefined): boolean => {
    return !taxonomy || taxonomy.length === 0;
};

/**
 * Convert a taxonomy ID to its label (name)
 * @param value - The ID to look up
 * @param taxonomy - The taxonomy array to search in
 * @returns The nom (name) of the taxonomy item, or the value as string if not found
 * 
 * @example
 * getTaxonomyLabel(3, specialisations) // Returns "Droit Fiscal"
 */
export const getTaxonomyLabel = (value: string | number, taxonomy: Taxonomy[]): string => {
    if (!value || !taxonomy || taxonomy.length === 0) {
        return String(value || '');
    }
    const item = taxonomy.find((t) => t.id === Number(value));
    return item?.nom || String(value);
};

/**
 * Convert an array of taxonomy IDs to their labels
 * @param values - Array of IDs to look up
 * @param taxonomy - The taxonomy array to search in
 * @returns Array of nom (names) of the taxonomy items
 * 
 * @example
 * getTaxonomyLabels([1, 3], specialisations) // Returns ["Droit Affaires", "Droit Fiscal"]
 */
export const getTaxonomyLabels = (values: (string | number)[], taxonomy: Taxonomy[]): string[] => {
    return values.map((value) => getTaxonomyLabel(value, taxonomy));
};
