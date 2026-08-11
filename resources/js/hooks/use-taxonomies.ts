import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

export interface Taxonomy {
    id: number;
    nom: string;
    domaine?: string;
    code?: string;
}

export interface Taxonomies {
    domaineExperiences: Taxonomy[];
    ecoles: Taxonomy[];
    formationJuridiques: Taxonomy[];
    langues: Taxonomy[];
    modeTravails: Taxonomy[];
    niveauExperiences: Taxonomy[];
    niveauLangues: Taxonomy[];
    postes: Taxonomy[];
    salaires: Taxonomy[];
    specialisations: Taxonomy[];
    tailleEntreprises: Taxonomy[];
    typeOrganisations: Taxonomy[];
    typeTravails: Taxonomy[];
    urgences: Taxonomy[];
    villes: Taxonomy[];
}

export const useTaxonomies = (): Taxonomies => {
    const { props } = usePage();
    const rawTaxonomies = props.taxonomies as Partial<Taxonomies> | undefined;

    return useMemo((): Taxonomies => {
        const taxonomies = rawTaxonomies || {};
        return {
            domaineExperiences: taxonomies.domaineExperiences || [],
            ecoles: taxonomies.ecoles || [],
            formationJuridiques: taxonomies.formationJuridiques || [],
            langues: taxonomies.langues || [],
            modeTravails: taxonomies.modeTravails || [],
            niveauExperiences: taxonomies.niveauExperiences || [],
            niveauLangues: taxonomies.niveauLangues || [],
            postes: taxonomies.postes || [],
            salaires: taxonomies.salaires || [],
            specialisations: taxonomies.specialisations || [],
            tailleEntreprises: taxonomies.tailleEntreprises || [],
            typeOrganisations: taxonomies.typeOrganisations || [],
            typeTravails: taxonomies.typeTravails || [],
            urgences: taxonomies.urgences || [],
            villes: taxonomies.villes || [],
        };
    }, [rawTaxonomies]);
};

export const useLoadingTaxonomy = (taxonomy: Taxonomy[] | undefined): boolean => {
    return !taxonomy || taxonomy.length === 0;
};

/**
 * Resolve a taxonomy label from either a taxonomy item or an ID + list.
 *
 * @example
 * getTaxonomyLabel(item) // Returns item.nom
 * getTaxonomyLabel(3, specialisations) // Returns "Droit Fiscal"
 */
export const getTaxonomyLabel = (
    value: string | number | Taxonomy | null | undefined,
    taxonomy?: Taxonomy[],
): string => {
    if (value && typeof value === 'object' && 'nom' in value) {
        return value.nom || String(value.id ?? '');
    }

    if (value === null || value === undefined || value === '') {
        return '';
    }

    if (!taxonomy || taxonomy.length === 0) {
        return String(value);
    }

    const item = taxonomy.find((entry) => String(entry.id) === String(value));

    return item?.nom || String(value);
};

/**
 * Convert an array of taxonomy IDs to their labels
 *
 * @example
 * getTaxonomyLabels([1, 3], specialisations) // Returns ["Droit Affaires", "Droit Fiscal"]
 */
export const getTaxonomyLabels = (values: (string | number)[], taxonomy: Taxonomy[]): string[] => {
    if (!values || !Array.isArray(values)) {
        return [];
    }

    return values.map((value) => getTaxonomyLabel(value, taxonomy));
};

