import React from 'react';
import {
    specialisations,
    domainesExperience,
    typesTravailRecherche,
    modesTravailRecherche,
    villes,
    langues,
    niveauxExperience,
    formationsJuridiques,
    postes,
    niveauxLangue
} from '@/constants/options';

import { CandidatFormData, Formation, Experience } from '@/types';

type CandidateFieldsProps = {
    formData: CandidatFormData;
    onFieldChange: (field: keyof CandidatFormData, value: any) => void;
    errors: Partial<Record<keyof CandidatFormData, string>>;
    className?: string;
}

const CheckboxGroup = ({ options, selected, onChange, error }: { options: string[]; selected: string[]; onChange: (v: string[]) => void; error?: string }) => (
    <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {options.map((opt) => {
                const isChecked = selected.includes(opt);
                return (
                    <label key={opt} className={`flex items-center gap-2 border rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200 ${isChecked ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => onChange(isChecked ? selected.filter((s) => s !== opt) : [...selected, opt])}
                            className="w-4 h-4 rounded cursor-pointer accent-slate-900"
                        />
                        <span className="text-sm font-semibold">{opt}</span>
                    </label>
                );
            })}
        </div>
        {error && <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>}
        {selected.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
                {selected.map((item) => (
                    <div key={item} className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs font-bold text-slate-700 uppercase tracking-tight">
                        <span>{item}</span>
                        <button type="button" onClick={() => onChange(selected.filter((s) => s !== item))} className="ml-2 hover:text-slate-900 transition-colors font-black">×</button>
                    </div>
                ))}
            </div>
        )}
    </div>
);

const FormCandidat: React.FC<CandidateFieldsProps> = ({ formData, onFieldChange, errors = {}, className = '' }) => {
    const selectClasses = "w-full p-3 border border-slate-200 rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-slate-900 focus:outline-none transition-all";
    const labelClasses = "block text-sm font-semibold text-slate-700 mb-1.5";

    return (
        <div className={`space-y-8 ${className}`}>
            <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Profil professionnel</h3>
                <p className="text-sm text-slate-500">Complétez votre profil pour améliorer vos chances de matching</p>
            </div>

            {/* Niveau d'expérience + Formation juridique */}
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className={labelClasses}>Niveau d'expérience *</label>
                    <select value={formData.niveauExperience || ''} onChange={(e) => onFieldChange('niveauExperience', e.target.value)} className={selectClasses}>
                        <option value="">Sélectionnez votre niveau</option>
                        {niveauxExperience.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {errors.niveauExperience && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.niveauExperience}</p>}
                </div>
                <div>
                    <label className={labelClasses}>Formation juridique *</label>
                    <select value={formData.formationJuridique || ''} onChange={(e) => onFieldChange('formationJuridique', e.target.value)} className={selectClasses}>
                        <option value="">Votre niveau d'études</option>
                        {formationsJuridiques.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {errors.formationJuridique && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.formationJuridique}</p>}
                </div>
            </div>

            {/* Poste recherché */}
            <div>
                <label className={labelClasses}>Poste recherché *</label>
                <select value={formData.PosteRecherche || ''} onChange={(e) => onFieldChange('PosteRecherche', e.target.value)} className={selectClasses}>
                    <option value="">Sélectionnez un poste</option>
                    {postes.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.PosteRecherche && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.PosteRecherche}</p>}
            </div>

            {/* Spécialisations */}
            <div>
                <label className={labelClasses}>Spécialisations juridiques *</label>
                <p className="text-xs text-slate-400 mb-3 font-medium">Plusieurs choix possibles</p>
                <CheckboxGroup options={specialisations} selected={formData.specialisations || []} onChange={(v) => onFieldChange('specialisations', v)} error={errors.specialisations} />
            </div>

            {/* Domaine d'expérience */}
            <div>
                <label className={labelClasses}>Domaine d'expérience *</label>
                <CheckboxGroup options={domainesExperience} selected={formData.domainExperiences || []} onChange={(v) => onFieldChange('domainExperiences', v)} error={errors.domainExperiences} />
            </div>

            {/* Type de travail */}
            <div>
                <label className={labelClasses}>Type de travail recherché *</label>
                <CheckboxGroup options={typesTravailRecherche} selected={formData.typeTravailRecherche || []} onChange={(v) => onFieldChange('typeTravailRecherche', v)} error={errors.typeTravailRecherche} />
            </div>

            {/* Mode de travail */}
            <div>
                <label className={labelClasses}>Mode de travail recherché *</label>
                <CheckboxGroup options={modesTravailRecherche} selected={formData.modeTravailRecherche || []} onChange={(v) => onFieldChange('modeTravailRecherche', v)} error={errors.modeTravailRecherche} />
            </div>

            {/* Villes */}
            <div>
                <label className={labelClasses}>Villes souhaitées *</label>
                <CheckboxGroup options={villes} selected={formData.villesTravailRecherche || []} onChange={(v) => onFieldChange('villesTravailRecherche', v)} error={errors.villesTravailRecherche} />
            </div>

            {/* Langues */}
            <div>
                <label className={labelClasses}>Langues parlées *</label>
                <p className="text-xs text-slate-400 mb-3 font-medium">Cochez puis indiquez votre niveau</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {langues.map((opt) => {
                        const isSelected = (formData.langues || []).some((l) => l.nom === opt);
                        return (
                            <label key={opt} className={`flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer transition-all ${isSelected ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}`}>
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => {
                                        const current = [...(formData.langues || [])];
                                        onFieldChange('langues', isSelected ? current.filter((l) => l.nom !== opt) : [...current, { nom: opt, niveau: '' }]);
                                    }}
                                    className="w-4 h-4 rounded cursor-pointer accent-slate-900"
                                />
                                <span className="text-sm font-bold">{opt}</span>
                            </label>
                        );
                    })}
                </div>
                {(formData.langues || []).length > 0 && (
                    <div className="mt-5 space-y-4">
                        {(formData.langues || []).map((lang, index) => (
                            <div key={lang.nom} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Niveau — {lang.nom}</label>
                                <select
                                    value={lang.niveau}
                                    onChange={(e) => {
                                        const updated = [...(formData.langues || [])];
                                        updated[index] = { ...updated[index], niveau: e.target.value };
                                        onFieldChange('langues', updated);
                                    }}
                                    className={selectClasses}
                                >
                                    <option value="">Sélectionnez le niveau</option>
                                    {niveauxLangue.map((n) => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                        ))}
                    </div>
                )}
                {errors.langues && <p className="text-xs text-red-500 mt-2 font-medium">{errors.langues}</p>}
            </div>
        </div>
    );
};

export default FormCandidat;
