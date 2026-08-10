import { CandidatFormData } from '@/types';
import { useTaxonomies, useLoadingTaxonomy } from '@/hooks/use-taxonomies';
import ChipMultiSelect from '@/components/signup/ChipMultiSelect';

type FormCandidatPreferencesProps = {
    formData: CandidatFormData;
    onFieldChange: (field: keyof CandidatFormData, value: unknown) => void;
    errors: Partial<Record<keyof CandidatFormData, string>>;
    className?: string;
};

export default function FormCandidatPreferences({
    formData,
    onFieldChange,
    errors = {},
    className = '',
}: FormCandidatPreferencesProps) {
    const { villes, modeTravails, langues, niveauLangues } = useTaxonomies();

    const selectClasses =
        'w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900';
    const labelClasses = 'mb-1.5 block text-sm font-semibold text-slate-700';

    return (
        <div className={`space-y-8 ${className}`}>
            <div className="mb-8 text-center">
                <h3 className="mb-2 text-xl font-bold text-slate-900">Préférences de recherche</h3>
                <p className="text-sm text-slate-500">Indiquez où et comment vous souhaitez travailler</p>
            </div>

            <div>
                <label className={labelClasses}>Villes recherchées *</label>
                <ChipMultiSelect
                    options={villes}
                    selected={formData.ville_travails || []}
                    onChange={(value) => onFieldChange('ville_travails', value)}
                    error={errors.ville_travails}
                />
            </div>

            <div>
                <label className={labelClasses}>Mode de travail *</label>
                <ChipMultiSelect
                    options={modeTravails}
                    selected={formData.mode_travails || []}
                    onChange={(value) => onFieldChange('mode_travails', value)}
                    error={errors.mode_travails}
                />
            </div>

            <div>
                <label className={labelClasses}>Langues parlées *</label>
                <p className="mb-3 text-xs font-medium text-slate-400">Cochez puis indiquez votre niveau</p>
                <div className="flex flex-wrap gap-2.5">
                    {useLoadingTaxonomy(langues) ? (
                        <p className="w-full py-4 text-center text-sm text-slate-500">Chargement des options...</p>
                    ) : (
                        langues.map((option) => {
                            const isSelected = (formData.langues || []).some((langue) => langue.langue_id === option.id);

                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => {
                                        const current = [...(formData.langues || [])];
                                        onFieldChange(
                                            'langues',
                                            isSelected
                                                ? current.filter((langue) => langue.langue_id !== option.id)
                                                : [...current, { langue_id: option.id, niveau_langue_id: '' }],
                                        );
                                    }}
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

                {(formData.langues || []).length > 0 && (
                    <div className="mt-5 space-y-4">
                        {(formData.langues || []).map((langue, index) => {
                            const langName =
                                langues.find((item) => item.id === langue.langue_id)?.nom || String(langue.langue_id);

                            return (
                                <div key={langue.langue_id} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                    <label className="mb-2.5 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                        Niveau — {langName}
                                    </label>
                                    <select
                                        value={langue.niveau_langue_id}
                                        onChange={(event) => {
                                            const updated = [...(formData.langues || [])];
                                            updated[index] = {
                                                ...updated[index],
                                                niveau_langue_id: event.target.value,
                                            };
                                            onFieldChange('langues', updated);
                                        }}
                                        className={selectClasses}
                                    >
                                        <option value="">Sélectionnez le niveau</option>
                                        {useLoadingTaxonomy(niveauLangues) ? (
                                            <option disabled>Chargement des options...</option>
                                        ) : (
                                            niveauLangues.map((niveau) => (
                                                <option key={niveau.id} value={niveau.id}>
                                                    {niveau.nom}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                            );
                        })}
                    </div>
                )}
                {errors.langues && <p className="mt-2 text-xs font-medium text-red-500">{errors.langues}</p>}
            </div>
        </div>
    );
}
