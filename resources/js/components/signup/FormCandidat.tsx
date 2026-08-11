import { CandidatFormData } from '@/types';
import { useTaxonomies, useLoadingTaxonomy } from '@/hooks/use-taxonomies';
import ChipMultiSelect from '@/components/signup/ChipMultiSelect';

type CandidateFieldsProps = {
    formData: CandidatFormData;
    onFieldChange: (field: keyof CandidatFormData, value: unknown) => void;
    errors: Partial<Record<keyof CandidatFormData, string>>;
    className?: string;
};

const FormCandidat = ({ formData, onFieldChange, errors = {}, className = '' }: CandidateFieldsProps) => {
    const { typeTravails, niveauExperiences, formationJuridiques, postes, salaires, urgences } = useTaxonomies();

    const selectClasses =
        'w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900';
    const labelClasses = 'mb-1.5 block text-sm font-semibold text-slate-700';

    return (
        <div className={`space-y-8 ${className}`}>
            <div className="mb-8 text-center">
                <h3 className="mb-2 text-xl font-bold text-slate-900">Profil & attentes</h3>
                <p className="text-sm text-slate-500">Vos informations essentielles et vos attentes salariales</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className={labelClasses}>Niveau d'expérience *</label>
                    <select
                        value={formData.niveau_experience_id || ''}
                        onChange={(event) => onFieldChange('niveau_experience_id', event.target.value)}
                        className={selectClasses}
                    >
                        <option value="">Sélectionnez votre niveau</option>
                        {useLoadingTaxonomy(niveauExperiences) ? (
                            <option disabled>Chargement des options...</option>
                        ) : (
                            niveauExperiences.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.nom}
                                </option>
                            ))
                        )}
                    </select>
                    {errors.niveau_experience_id && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">{errors.niveau_experience_id}</p>
                    )}
                </div>

                <div>
                    <label className={labelClasses}>Formation juridique *</label>
                    <select
                        value={formData.formation_juridique_id || ''}
                        onChange={(event) => onFieldChange('formation_juridique_id', event.target.value)}
                        className={selectClasses}
                    >
                        <option value="">Votre niveau d'études</option>
                        {useLoadingTaxonomy(formationJuridiques) ? (
                            <option disabled>Chargement des options...</option>
                        ) : (
                            formationJuridiques.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.nom}
                                </option>
                            ))
                        )}
                    </select>
                    {errors.formation_juridique_id && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">{errors.formation_juridique_id}</p>
                    )}
                </div>
            </div>

            <div>
                <label className={labelClasses}>Poste recherché *</label>
                <select
                    value={formData.poste_id || ''}
                    onChange={(event) => onFieldChange('poste_id', event.target.value)}
                    className={selectClasses}
                >
                    <option value="">Sélectionnez un poste</option>
                    {useLoadingTaxonomy(postes) ? (
                        <option disabled>Chargement des options...</option>
                    ) : (
                        postes.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.nom}
                            </option>
                        ))
                    )}
                </select>
                {errors.poste_id && <p className="mt-1.5 text-xs font-medium text-red-500">{errors.poste_id}</p>}
            </div>

            <div>
                <label className={labelClasses}>Type de travail recherché *</label>
                <ChipMultiSelect
                    options={typeTravails}
                    selected={formData.type_travails || []}
                    onChange={(value) => onFieldChange('type_travails', value)}
                    error={errors.type_travails}
                />
            </div>

            <div className="space-y-6 border-t border-slate-100 pt-8">
                <div>
                    <label className={labelClasses}>Salaire souhaité *</label>
                    <select
                        value={formData.salaire_id || ''}
                        onChange={(event) => onFieldChange('salaire_id', event.target.value)}
                        className={selectClasses}
                    >
                        <option value="">Sélectionnez une fourchette salariale</option>
                        {useLoadingTaxonomy(salaires) ? (
                            <option disabled>Chargement des options...</option>
                        ) : (
                            salaires.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.nom}
                                </option>
                            ))
                        )}
                    </select>
                    {errors.salaire_id && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">{errors.salaire_id}</p>
                    )}
                </div>

                <div>
                    <label className={labelClasses}>Disponibilité *</label>
                    <p className="mb-3 text-xs font-medium text-slate-400">Quand souhaitez-vous commencer ?</p>
                    <div className="flex flex-wrap gap-2.5">
                        {useLoadingTaxonomy(urgences) ? (
                            <p className="w-full py-4 text-center text-sm text-slate-500">Chargement des options...</p>
                        ) : (
                            urgences.map((option) => {
                                const isSelected = String(formData.urgence_id) === String(option.id);

                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={() => onFieldChange('urgence_id', option.id)}
                                        className={`inline-flex items-center rounded-2xl border px-3.5 py-2.5 text-sm font-semibold transition-all ${
                                            isSelected
                                                ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                                        }`}
                                    >
                                        {option.nom}
                                    </button>
                                );
                            })
                        )}
                    </div>
                    {errors.urgence_id && (
                        <p className="mt-2 text-xs font-medium text-red-500">{errors.urgence_id}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FormCandidat;
