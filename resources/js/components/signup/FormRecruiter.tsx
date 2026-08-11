import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const { typeOrganisations, tailleEntreprises, pays, villes } = useTaxonomies();
    const [selectedPaysId, setSelectedPaysId] = useState<string>('');
    const inputClasses = "w-full p-3 border border-slate-200 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all placeholder:text-slate-400";

    useEffect(() => {
        if (selectedPaysId || !formData.ville_id || villes.length === 0) {
            return;
        }

        const selectedCity = villes.find((ville) => String(ville.id) === String(formData.ville_id));
        if (selectedCity?.pays_id) {
            setSelectedPaysId(String(selectedCity.pays_id));
        }
    }, [formData.ville_id, selectedPaysId, villes]);

    const citiesForCountry = useMemo(() => {
        if (!selectedPaysId) {
            return [];
        }

        return villes.filter((ville) => String(ville.pays_id) === String(selectedPaysId));
    }, [selectedPaysId, villes]);

    const handleCountryChange = (paysId: string) => {
        setSelectedPaysId(paysId);
        onFieldChange('ville_id', '');
    };

    return (
        <div className={`space-y-6 ${className}`}>
            <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('auth.forms.recruiter.title')}</h3>
                <p className="text-sm text-slate-500">{t('auth.forms.recruiter.subtitle')}</p>
            </div>

            {/* Nom entreprise */}
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('auth.forms.recruiter.company_name_label')}</label>
                    <input
                        type="text"
                        placeholder={t('auth.forms.recruiter.company_name_placeholder')}
                        value={formData.nom_entreprise || ''}
                        onChange={(e) => onFieldChange('nom_entreprise', e.target.value)}
                        className={inputClasses}
                    />
                    {errors.nom_entreprise && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.nom_entreprise}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('auth.forms.recruiter.job_title_label')}</label>
                    <input
                        type="text"
                        placeholder={t('auth.forms.recruiter.job_title_placeholder')}
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
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('auth.forms.recruiter.org_type_label')}</label>
                    <select
                        value={formData.type_organisation_id || ''}
                        onChange={(e) => onFieldChange('type_organisation_id', e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">{t('auth.forms.recruiter.org_type_placeholder')}</option>
                        {useLoadingTaxonomy(typeOrganisations) ? (
                            <option disabled>{t('auth.forms.loading_options')}</option>
                        ) : (
                            typeOrganisations.map((opt) => (
                                <option key={opt.id} value={opt.id}>{getTaxonomyLabel(opt)}</option>
                            ))
                        )}
                    </select>
                    {errors.type_organisation_id && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.type_organisation_id}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('auth.forms.recruiter.company_size_label')}</label>
                    <select
                        value={formData.taille_entreprise_id || ''}
                        onChange={(e) => onFieldChange('taille_entreprise_id', e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">{t('auth.forms.recruiter.company_size_placeholder')}</option>
                        {useLoadingTaxonomy(tailleEntreprises) ? (
                            <option disabled>{t('auth.forms.loading_options')}</option>
                        ) : (
                            tailleEntreprises.map((opt) => (
                                <option key={opt.id} value={opt.id}>{getTaxonomyLabel(opt)}</option>
                            ))
                        )}
                    </select>
                    {errors.taille_entreprise_id && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.taille_entreprise_id}</p>}
                </div>
            </div>

            {/* Site web */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('auth.forms.recruiter.website_label')}</label>
                <input
                    type="url"
                    placeholder={t('auth.forms.recruiter.website_placeholder')}
                    value={formData.site_web || ''}
                    onChange={(e) => onFieldChange('site_web', e.target.value)}
                    className={inputClasses}
                />
                <p className="text-xs text-slate-400 mt-1.5 font-medium">{t('auth.forms.recruiter.website_help')}</p>
                {errors.site_web && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.site_web}</p>}
            </div>

            {/* Pays + Ville */}
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('auth.forms.recruiter.country_label')}</label>
                    <select
                        value={selectedPaysId}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">{t('auth.forms.recruiter.country_placeholder')}</option>
                        {useLoadingTaxonomy(pays) ? (
                            <option disabled>{t('auth.forms.loading_options')}</option>
                        ) : (
                            pays.map((country) => (
                                <option key={country.id} value={country.id}>{getTaxonomyLabel(country)}</option>
                            ))
                        )}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t('auth.forms.recruiter.city_label')}</label>
                    <select
                        value={formData.ville_id || ''}
                        onChange={(e) => onFieldChange('ville_id', e.target.value)}
                        className={inputClasses}
                        disabled={!selectedPaysId}
                    >
                        <option value="">
                            {selectedPaysId
                                ? t('auth.forms.recruiter.city_placeholder')
                                : t('auth.forms.recruiter.city_country_required')}
                        </option>
                        {useLoadingTaxonomy(villes) ? (
                            <option disabled>{t('auth.forms.loading_options')}</option>
                        ) : (
                            citiesForCountry.map((v) => (
                                <option key={v.id} value={v.id}>{getTaxonomyLabel(v)}</option>
                            ))
                        )}
                    </select>
                    {errors.ville_id && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.ville_id}</p>}
                </div>
            </div>
        </div>
    );
};

export default FormRecruiter;
