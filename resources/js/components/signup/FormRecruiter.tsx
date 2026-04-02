import React from 'react';
import { RecruteurFormData } from '@/types';
import { useTaxonomies, useLoadingTaxonomy, getTaxonomyLabel } from '@/hooks/use-taxonomies';

type RecruiterFieldsProps = {
    formData: RecruteurFormData;
    onFieldChange: (field: keyof RecruteurFormData, value: any) => void;
    errors: Partial<Record<keyof RecruteurFormData, string>>;
    className?: string;
}

const FormRecruiter: React.FC<RecruiterFieldsProps> = ({
    formData,
    onFieldChange,
    errors = {},
    className = '',
}) => {
    const { typeOrganisations, tailleEntreprises, villes } = useTaxonomies();
    const inputClasses = "w-full p-3 border border-slate-200 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all placeholder:text-slate-400";

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Informations entreprise</h3>
                <p className="text-sm text-slate-500">Renseignez les détails de votre organisation pour optimiser vos recherches</p>
            </div>

            {/* Nom entreprise */}
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Nom de l'entreprise *</label>
                    <input
                        type="text"
                        placeholder="Nom de votre organisation"
                        value={formData.nom_entreprise || ''}
                        onChange={(e) => onFieldChange('nom_entreprise', e.target.value)}
                        className={inputClasses}
                    />
                    {errors.nom_entreprise && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.nom_entreprise}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Votre poste</label>
                    <input
                        type="text"
                        placeholder="Ex: Responsable RH, Directeur Juridique"
                        value={formData.poste || ''}
                        onChange={(e) => onFieldChange('poste', e.target.value)}
                        className={inputClasses}
                    />
                    {errors.poste && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.poste}</p>}
                </div>
            </div>

            {/* Type et taille */}
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Type d'organisation *</label>
                    <select
                        value={formData.type_organisation || ''}
                        onChange={(e) => onFieldChange('type_organisation', e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">Sélectionnez le type</option>
                        {useLoadingTaxonomy(typeOrganisations) ? (
                            <option disabled>Chargement des options...</option>
                        ) : (
                            typeOrganisations.map((opt) => (
                                <option key={opt.id} value={opt.id}>{opt.nom}</option>
                            ))
                        )}
                    </select>
                    {errors.type_organisation && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.type_organisation}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Taille de l'entreprise *</label>
                    <select
                        value={formData.taille_entreprise || ''}
                        onChange={(e) => onFieldChange('taille_entreprise', e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">Nombre d'employés</option>
                        {useLoadingTaxonomy(tailleEntreprises) ? (
                            <option disabled>Chargement des options...</option>
                        ) : (
                            tailleEntreprises.map((opt) => (
                                <option key={opt.id} value={opt.id}>{opt.nom}</option>
                            ))
                        )}
                    </select>
                    {errors.taille_entreprise && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.taille_entreprise}</p>}
                </div>
            </div>

            {/* Site web */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Site web de l'entreprise</label>
                <input
                    type="url"
                    placeholder="https://www.votre-entreprise.com"
                    value={formData.site_web || ''}
                    onChange={(e) => onFieldChange('site_web', e.target.value)}
                    className={inputClasses}
                />
                <p className="text-xs text-slate-400 mt-1.5 font-medium">Optionnel - Aide à valider votre profil</p>
                {errors.site_web && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.site_web}</p>}
            </div>

            {/* Ville */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ville *</label>
                <select
                    value={formData.ville || ''}
                    onChange={(e) => onFieldChange('ville', e.target.value)}
                    className={inputClasses}
                >
                    <option value="">Sélectionnez une ville</option>
                    {useLoadingTaxonomy(villes) ? (
                        <option disabled>Chargement des options...</option>
                    ) : (
                        villes.map((v) => (
                            <option key={v.id} value={v.id}>{v.nom}</option>
                        ))
                    )}
                </select>
                {errors.ville && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.ville}</p>}
            </div>
        </div>
    );
};

export default FormRecruiter;
