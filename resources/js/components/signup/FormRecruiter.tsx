import React from 'react';
import { typeOrganisation, tailleEntreprise, villes } from '@/constants/options';

export interface RecruiterFormData {
    nomEntreprise: string;
    typeOrganisation: string;
    tailleEntreprise: string;
    siteWeb: string;
    ville: string;
    poste?: string;
}

interface RecruiterFieldsProps {
    formData: RecruiterFormData;
    onFieldChange: (field: keyof RecruiterFormData, value: any) => void;
    errors: Partial<Record<keyof RecruiterFormData, string>>;
    className?: string;
}

const FormRecruiter: React.FC<RecruiterFieldsProps> = ({
    formData,
    onFieldChange,
    errors = {},
    className = '',
}) => {
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
                        value={formData.nomEntreprise || ''}
                        onChange={(e) => onFieldChange('nomEntreprise', e.target.value)}
                        className={inputClasses}
                    />
                    {errors.nomEntreprise && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.nomEntreprise}</p>}
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
                        value={formData.typeOrganisation || ''}
                        onChange={(e) => onFieldChange('typeOrganisation', e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">Sélectionnez le type</option>
                        {typeOrganisation.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    {errors.typeOrganisation && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.typeOrganisation}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Taille de l'entreprise *</label>
                    <select
                        value={formData.tailleEntreprise || ''}
                        onChange={(e) => onFieldChange('tailleEntreprise', e.target.value)}
                        className={inputClasses}
                    >
                        <option value="">Nombre d'employés</option>
                        {tailleEntreprise.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    {errors.tailleEntreprise && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.tailleEntreprise}</p>}
                </div>
            </div>

            {/* Site web */}
            <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Site web de l'entreprise</label>
                <input
                    type="url"
                    placeholder="https://www.votre-entreprise.com"
                    value={formData.siteWeb || ''}
                    onChange={(e) => onFieldChange('siteWeb', e.target.value)}
                    className={inputClasses}
                />
                <p className="text-xs text-slate-400 mt-1.5 font-medium">Optionnel - Aide à valider votre profil</p>
                {errors.siteWeb && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.siteWeb}</p>}
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
                    {villes.map((v) => (
                        <option key={v} value={v}>{v}</option>
                    ))}
                </select>
                {errors.ville && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.ville}</p>}
            </div>
        </div>
    );
};

export default FormRecruiter;
