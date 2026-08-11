import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { CandidatFormData } from '@/types';
import { useTaxonomies, useLoadingTaxonomy, getTaxonomyLabel } from '@/hooks/use-taxonomies';
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
    const { t } = useTranslation();
    const { pays, villes, modeTravails, langues, niveauLangues } = useTaxonomies();
    const [selectedPaysId, setSelectedPaysId] = useState<string>('');

    const selectClasses =
        'w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-slate-900';
    const labelClasses = 'mb-1.5 block text-sm font-semibold text-slate-700';

    useEffect(() => {
        if (selectedPaysId || !formData.ville_travails?.length || villes.length === 0) {
            return;
        }

        const firstSelectedCity = villes.find((ville) =>
            formData.ville_travails.some((id) => String(id) === String(ville.id)),
        );

        if (firstSelectedCity?.pays_id) {
            setSelectedPaysId(String(firstSelectedCity.pays_id));
        }
    }, [formData.ville_travails, selectedPaysId, villes]);

    const citiesForCountry = useMemo(() => {
        if (!selectedPaysId) {
            return [];
        }

        return villes.filter((ville) => String(ville.pays_id) === String(selectedPaysId));
    }, [selectedPaysId, villes]);

    const handleCountryChange = (paysId: string) => {
        setSelectedPaysId(paysId);
        onFieldChange('ville_travails', []);
    };

    return (
        <div className={`space-y-8 ${className}`}>
            <div className="mb-8 text-center">
                <h3 className="mb-2 text-xl font-bold text-slate-900">{t('auth.forms.candidate.preferences_title')}</h3>
                <p className="text-sm text-slate-500">{t('auth.forms.candidate.preferences_subtitle')}</p>
            </div>

            <div>
                <label className={labelClasses}>{t('auth.forms.candidate.countries_label')}</label>
                <select
                    value={selectedPaysId}
                    onChange={(event) => handleCountryChange(event.target.value)}
                    className={selectClasses}
                >
                    <option value="">{t('auth.forms.candidate.country_placeholder')}</option>
                    {useLoadingTaxonomy(pays) ? (
                        <option disabled>{t('auth.forms.loading_options')}</option>
                    ) : (
                        pays.map((country) => (
                            <option key={country.id} value={country.id}>
                                {getTaxonomyLabel(country)}
                            </option>
                        ))
                    )}
                </select>
            </div>

            <div>
                <label className={labelClasses}>{t('auth.forms.candidate.cities_label')}</label>
                {!selectedPaysId ? (
                    <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">
                        {t('auth.forms.candidate.cities_country_required')}
                    </p>
                ) : (
                    <ChipMultiSelect
                        options={citiesForCountry}
                        selected={formData.ville_travails || []}
                        onChange={(value) => onFieldChange('ville_travails', value)}
                        error={errors.ville_travails}
                        loading={useLoadingTaxonomy(villes)}
                    />
                )}
            </div>

            <div>
                <label className={labelClasses}>{t('auth.forms.candidate.work_mode_label')}</label>
                <ChipMultiSelect
                    options={modeTravails}
                    selected={formData.mode_travails || []}
                    onChange={(value) => onFieldChange('mode_travails', value)}
                    error={errors.mode_travails}
                    loading={useLoadingTaxonomy(modeTravails)}
                />
            </div>

            <div>
                <label className={labelClasses}>{t('auth.forms.candidate.languages_label')}</label>
                <p className="mb-3 text-xs font-medium text-slate-400">{t('auth.forms.candidate.languages_help')}</p>
                <div className="flex flex-wrap gap-2.5">
                    {useLoadingTaxonomy(langues) ? (
                        <p className="w-full py-4 text-center text-sm text-slate-500">{t('auth.forms.loading_options')}</p>
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
                                    {getTaxonomyLabel(option)}
                                </button>
                            );
                        })
                    )}
                </div>

                {(formData.langues || []).length > 0 && (
                    <div className="mt-5 space-y-4">
                        {(formData.langues || []).map((langue, index) => {
                            const foundLang = langues.find((item) => item.id === langue.langue_id);
                            const langName = foundLang ? getTaxonomyLabel(foundLang) : String(langue.langue_id);

                            return (
                                <div key={langue.langue_id} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                                    <label className="mb-2.5 block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                                        {t('auth.forms.candidate.language_level_header', { name: langName })}
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
                                        <option value="">{t('auth.forms.candidate.select_level_option')}</option>
                                        {useLoadingTaxonomy(niveauLangues) ? (
                                            <option disabled>{t('auth.forms.loading_options')}</option>
                                        ) : (
                                            niveauLangues.map((niveau) => (
                                                <option key={niveau.id} value={niveau.id}>
                                                    {getTaxonomyLabel(niveau)}
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
