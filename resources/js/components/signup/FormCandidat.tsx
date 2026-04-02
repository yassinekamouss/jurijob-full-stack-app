import React from 'react';
import { CandidatFormData, Formation, Experience } from '@/types';
import { useTaxonomies, useLoadingTaxonomy } from '@/hooks/use-taxonomies';

type CandidateFieldsProps = {
    formData: CandidatFormData;
    onFieldChange: (field: keyof CandidatFormData, value: any) => void;
    errors: Partial<Record<keyof CandidatFormData, string>>;
    className?: string;
}

const CheckboxGroup = ({ options, selected, onChange, error, loading = false }: { options: { id: number; nom: string }[]; selected: (string | number)[]; onChange: (v: (string | number)[]) => void; error?: string; loading?: boolean }) => (
    <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {loading ? (
                <div className="col-span-full text-center py-4 text-slate-500 text-sm">
                    Chargement des options...
                </div>
            ) : options.length === 0 ? (
                <div className="col-span-full text-center py-4 text-slate-500 text-sm">
                    Aucune option disponible
                </div>
            ) : (
                options.map((opt) => {
                    const isChecked = selected.includes(opt.id);
                    return (
                        <label key={opt.id} className={`flex items-center gap-2 border rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-200 ${isChecked ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => onChange(isChecked ? selected.filter((s) => s !== opt.id) : [...selected, opt.id])}
                                className="w-4 h-4 rounded cursor-pointer accent-slate-900"
                            />
                            <span className="text-sm font-semibold">{opt.nom}</span>
                        </label>
                    );
                })
            )}
        </div>
        {error && <p className="text-xs text-red-500 mt-1.5 font-medium">{error}</p>}
        {selected.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
                {selected.map((itemId) => {
                    const itemName = options.find((o) => o.id === itemId)?.nom || String(itemId);
                    return (
                        <div key={itemId} className="flex items-center bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs font-bold text-slate-700 uppercase tracking-tight">
                            <span>{itemName}</span>
                            <button type="button" onClick={() => onChange(selected.filter((s) => s !== itemId))} className="ml-2 hover:text-slate-900 transition-colors font-black">×</button>
                        </div>
                    );
                })}
            </div>
        )}
    </div>
);

const FormCandidat: React.FC<CandidateFieldsProps> = ({ formData, onFieldChange, errors = {}, className = '' }) => {
    const { specialisations, domaineExperiences, typeTravails, modeTravails, villes, langues, niveauExperiences, formationJuridiques, postes, niveauLangues } = useTaxonomies();
    
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
                        {useLoadingTaxonomy(niveauExperiences) ? (
                            <option disabled>Chargement des options...</option>
                        ) : (
                            niveauExperiences.map((opt) => <option key={opt.id} value={opt.id}>{opt.nom}</option>)
                        )}
                    </select>
                    {errors.niveauExperience && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.niveauExperience}</p>}
                </div>
                <div>
                    <label className={labelClasses}>Formation juridique *</label>
                    <select value={formData.formationJuridique || ''} onChange={(e) => onFieldChange('formationJuridique', e.target.value)} className={selectClasses}>
                        <option value="">Votre niveau d'études</option>
                        {useLoadingTaxonomy(formationJuridiques) ? (
                            <option disabled>Chargement des options...</option>
                        ) : (
                            formationJuridiques.map((opt) => <option key={opt.id} value={opt.id}>{opt.nom}</option>)
                        )}
                    </select>
                    {errors.formationJuridique && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.formationJuridique}</p>}
                </div>
            </div>

            {/* Poste recherché */}
            <div>
                <label className={labelClasses}>Poste recherché *</label>
                <select value={formData.PosteRecherche || ''} onChange={(e) => onFieldChange('PosteRecherche', e.target.value)} className={selectClasses}>
                    <option value="">Sélectionnez un poste</option>
                    {useLoadingTaxonomy(postes) ? (
                        <option disabled>Chargement des options...</option>
                    ) : (
                        postes.map((opt) => <option key={opt.id} value={opt.id}>{opt.nom}</option>)
                    )}
                </select>
                {errors.PosteRecherche && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.PosteRecherche}</p>}
            </div>

            {/* Spécialisations */}
            <div>
                <label className={labelClasses}>Spécialisations juridiques *</label>
                <p className="text-xs text-slate-400 mb-3 font-medium">Plusieurs choix possibles</p>
                <CheckboxGroup options={specialisations} selected={formData.specialisations || []} onChange={(v) => onFieldChange('specialisations', v)} error={errors.specialisations} loading={useLoadingTaxonomy(specialisations)} />
            </div>

            {/* Domaine d'expérience */}
            <div>
                <label className={labelClasses}>Domaine d'expérience *</label>
                <CheckboxGroup options={domaineExperiences} selected={formData.domainExperiences || []} onChange={(v) => onFieldChange('domainExperiences', v)} error={errors.domainExperiences} loading={useLoadingTaxonomy(domaineExperiences)} />
            </div>

            {/* Type de travail */}
            <div>
                <label className={labelClasses}>Type de travail recherché *</label>
                <CheckboxGroup options={typeTravails} selected={formData.typeTravailRecherche || []} onChange={(v) => onFieldChange('typeTravailRecherche', v)} error={errors.typeTravailRecherche} loading={useLoadingTaxonomy(typeTravails)} />
            </div>

            {/* Mode de travail */}
            <div>
                <label className={labelClasses}>Mode de travail recherché *</label>
                <CheckboxGroup options={modeTravails} selected={formData.modeTravailRecherche || []} onChange={(v) => onFieldChange('modeTravailRecherche', v)} error={errors.modeTravailRecherche} loading={useLoadingTaxonomy(modeTravails)} />
            </div>

            {/* Villes */}
            <div>
                <label className={labelClasses}>Villes souhaitées *</label>
                <CheckboxGroup options={villes} selected={formData.villesTravailRecherche || []} onChange={(v) => onFieldChange('villesTravailRecherche', v)} error={errors.villesTravailRecherche} loading={useLoadingTaxonomy(villes)} />
            </div>

            {/* Langues */}
            <div>
                <label className={labelClasses}>Langues parlées *</label>
                <p className="text-xs text-slate-400 mb-3 font-medium">Cochez puis indiquez votre niveau</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {useLoadingTaxonomy(langues) ? (
                        <div className="col-span-full text-center py-4 text-slate-500 text-sm">
                            Chargement des options...
                        </div>
                    ) : langues.length === 0 ? (
                        <div className="col-span-full text-center py-4 text-slate-500 text-sm">
                            Aucune langue disponible
                        </div>
                    ) : (
                        langues.map((opt) => {
                            const isSelected = (formData.langues || []).some((l) => l.nom === opt.id);
                            return (
                                <label key={opt.id} className={`flex items-center gap-2 border rounded-full px-4 py-2 cursor-pointer transition-all ${isSelected ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'}`}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => {
                                            const current = [...(formData.langues || [])];
                                            onFieldChange('langues', isSelected ? current.filter((l) => l.nom !== opt.id) : [...current, { nom: opt.id, niveau: '' }]);
                                        }}
                                        className="w-4 h-4 rounded cursor-pointer accent-slate-900"
                                    />
                                    <span className="text-sm font-bold">{opt.nom}</span>
                                </label>
                            );
                        })
                    )}
                </div>
                {(formData.langues || []).length > 0 && (
                    <div className="mt-5 space-y-4">
                        {(formData.langues || []).map((lang, index) => {
                            const langName = langues.find((l) => l.id === lang.nom)?.nom || String(lang.nom);
                            return (
                                <div key={lang.nom} className="p-4 border border-slate-100 rounded-xl bg-slate-50/50">
                                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Niveau — {langName}</label>
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
                                        {useLoadingTaxonomy(niveauLangues) ? (
                                            <option disabled>Chargement des options...</option>
                                        ) : (
                                            niveauLangues.map((n) => <option key={n.id} value={n.id}>{n.nom}</option>)
                                        )}
                                    </select>
                                </div>
                            );
                        })}
                    </div>
                )}
                {errors.langues && <p className="text-xs text-red-500 mt-2 font-medium">{errors.langues}</p>}
            </div>
        </div>
    );
};

export default FormCandidat;
