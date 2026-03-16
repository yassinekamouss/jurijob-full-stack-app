import React from 'react';
import {
    specialisations,
    niveauxExperience,
    formationsJuridiques,
    langues,
    typesTravailRecherche,
    villes,
    modesTravailRecherche,
    domainesExperience,
    postes,
    niveauxLangue,
} from '@/constants/options';

export interface Langue {
    nom: string;
    niveau: string;
}

export interface CandidatFormData {
    niveauExperience: string;
    formationJuridique: string;
    specialisations: string[];
    langues: Langue[];
    domainExperiences: string[];
    typeTravailRecherche: string[];
    villesTravailRecherche: string[];
    modeTravailRecherche: string[];
    PosteRecherche: string;
    formations: Formation[];
    experiences: Experience[];
}

export interface Formation {
    id: string;
    anneeDebut: string;
    anneeFin: string;
    niveau: string;
    domaine: string;
    ecole: string;
    diplomaFile: File | null;
}

export interface Experience {
    id: string;
    debut: string;
    fin: string;
    type: string;
    entreprise: string;
    poste: string;
}

interface CandidateFieldsProps {
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
                    <label key={opt} className={`flex items-center gap-2 border rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 ${isChecked ? 'bg-gray-900 text-white border-gray-800 shadow-md' : 'bg-card text-foreground border-border hover:bg-muted'}`}>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => onChange(isChecked ? selected.filter((s) => s !== opt) : [...selected, opt])}
                            className="w-4 h-4 rounded cursor-pointer"
                        />
                        <span className="text-sm font-medium">{opt}</span>
                    </label>
                );
            })}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        {selected.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
                {selected.map((item) => (
                    <div key={item} className="flex items-center bg-muted border border-border rounded-full px-3 py-1 text-sm font-medium">
                        <span>{item}</span>
                        <button type="button" onClick={() => onChange(selected.filter((s) => s !== item))} className="ml-2 hover:text-destructive transition-colors font-bold">×</button>
                    </div>
                ))}
            </div>
        )}
    </div>
);

const FormCandidat: React.FC<CandidateFieldsProps> = ({ formData, onFieldChange, errors = {}, className = '' }) => {
    return (
        <div className={`space-y-6 ${className}`}>
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Profil professionnel</h3>
                <p className="text-sm text-muted-foreground">Complétez votre profil pour améliorer vos chances de matching</p>
            </div>

            {/* Niveau d'expérience + Formation juridique */}
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium mb-1">Niveau d'expérience *</label>
                    <select value={formData.niveauExperience || ''} onChange={(e) => onFieldChange('niveauExperience', e.target.value)} className="w-full p-3 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary focus:outline-none">
                        <option value="">Sélectionnez votre niveau</option>
                        {niveauxExperience.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {errors.niveauExperience && <p className="text-xs text-red-500 mt-1">{errors.niveauExperience}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Formation juridique *</label>
                    <select value={formData.formationJuridique || ''} onChange={(e) => onFieldChange('formationJuridique', e.target.value)} className="w-full p-3 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary focus:outline-none">
                        <option value="">Votre niveau d'études</option>
                        {formationsJuridiques.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {errors.formationJuridique && <p className="text-xs text-red-500 mt-1">{errors.formationJuridique}</p>}
                </div>
            </div>

            {/* Poste recherché */}
            <div>
                <label className="block text-sm font-medium mb-1">Poste recherché *</label>
                <select value={formData.PosteRecherche || ''} onChange={(e) => onFieldChange('PosteRecherche', e.target.value)} className="w-full p-3 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary focus:outline-none">
                    <option value="">Sélectionnez un poste</option>
                    {postes.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                {errors.PosteRecherche && <p className="text-xs text-red-500 mt-1">{errors.PosteRecherche}</p>}
            </div>

            {/* Spécialisations */}
            <div>
                <label className="block text-sm font-medium mb-1">Spécialisations juridiques *</label>
                <p className="text-xs text-muted-foreground mb-2">Plusieurs choix possibles</p>
                <CheckboxGroup options={specialisations} selected={formData.specialisations || []} onChange={(v) => onFieldChange('specialisations', v)} error={errors.specialisations} />
            </div>

            {/* Domaine d'expérience */}
            <div>
                <label className="block text-sm font-medium mb-1">Domaine d'expérience *</label>
                <CheckboxGroup options={domainesExperience} selected={formData.domainExperiences || []} onChange={(v) => onFieldChange('domainExperiences', v)} error={errors.domainExperiences} />
            </div>

            {/* Type de travail */}
            <div>
                <label className="block text-sm font-medium mb-2">Type de travail recherché *</label>
                <CheckboxGroup options={typesTravailRecherche} selected={formData.typeTravailRecherche || []} onChange={(v) => onFieldChange('typeTravailRecherche', v)} error={errors.typeTravailRecherche} />
            </div>

            {/* Mode de travail */}
            <div>
                <label className="block text-sm font-medium mb-2">Mode de travail recherché *</label>
                <CheckboxGroup options={modesTravailRecherche} selected={formData.modeTravailRecherche || []} onChange={(v) => onFieldChange('modeTravailRecherche', v)} error={errors.modeTravailRecherche} />
            </div>

            {/* Villes */}
            <div>
                <label className="block text-sm font-medium mb-2">Villes souhaitées *</label>
                <CheckboxGroup options={villes} selected={formData.villesTravailRecherche || []} onChange={(v) => onFieldChange('villesTravailRecherche', v)} error={errors.villesTravailRecherche} />
            </div>

            {/* Langues */}
            <div>
                <label className="block text-sm font-medium mb-1">Langues parlées *</label>
                <p className="text-xs text-muted-foreground mb-2">Cochez puis indiquez votre niveau</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {langues.map((opt) => {
                        const isSelected = (formData.langues || []).some((l) => l.nom === opt);
                        return (
                            <label key={opt} className={`flex items-center gap-2 border rounded-full px-3 py-1.5 cursor-pointer transition-all ${isSelected ? 'bg-gray-900 text-white border-gray-800' : 'bg-card text-foreground border-border'}`}>
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => {
                                        const current = [...(formData.langues || [])];
                                        onFieldChange('langues', isSelected ? current.filter((l) => l.nom !== opt) : [...current, { nom: opt, niveau: '' }]);
                                    }}
                                    className="w-4 h-4 rounded cursor-pointer"
                                />
                                <span className="text-sm font-medium">{opt}</span>
                            </label>
                        );
                    })}
                </div>
                {(formData.langues || []).length > 0 && (
                    <div className="mt-3 space-y-3">
                        {(formData.langues || []).map((lang, index) => (
                            <div key={lang.nom} className="p-3 border border-border rounded-lg bg-muted">
                                <label className="block text-sm font-medium mb-1">Niveau — {lang.nom}</label>
                                <select
                                    value={lang.niveau}
                                    onChange={(e) => {
                                        const updated = [...(formData.langues || [])];
                                        updated[index] = { ...updated[index], niveau: e.target.value };
                                        onFieldChange('langues', updated);
                                    }}
                                    className="w-full p-2 border border-border rounded-lg bg-card focus:ring-2 focus:ring-primary focus:outline-none"
                                >
                                    <option value="">Sélectionnez le niveau</option>
                                    {niveauxLangue.map((n) => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                        ))}
                    </div>
                )}
                {errors.langues && <p className="text-xs text-red-500 mt-1">{errors.langues}</p>}
            </div>
        </div>
    );
};

export default FormCandidat;
