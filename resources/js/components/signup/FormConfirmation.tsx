import React, { useState } from 'react';
import Icon from '@/components/signup/FormularIcons';

interface FullFormData {
    user: {
        nom: string;
        prenom: string;
        telephone: string;
        email: string;
        imageFile: File | null;
    };
    candidat?: any;
    recruiter?: any;
}

interface FormConfirmationProps {
    formData: FullFormData;
    onSubmit: () => Promise<void>;
}

const FormConfirmation: React.FC<FormConfirmationProps> = ({ formData, onSubmit }) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onSubmit();
        } finally {
            setLoading(false);
        }
    };

    const isRecruiter = !!formData.recruiter;

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Vérification finale</h3>
                <p className="text-sm text-slate-500">Relisez vos informations une dernière fois avant de valider</p>
            </div>

            {/* Profile image preview */}
            {!isRecruiter && formData.user.imageFile && (
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={URL.createObjectURL(formData.user.imageFile)}
                            alt="Photo de profil"
                            className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-xl"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-slate-900 text-white p-1.5 rounded-full shadow-lg">
                            <Icon name="UserRound" size={14} />
                        </div>
                    </div>
                    <span className="mt-3 text-xs font-bold text-slate-400 uppercase tracking-widest">Ma photo</span>
                </div>
            )}

            <div className="grid gap-6">
                {/* User info */}
                <div className="border border-slate-100 rounded-[24px] p-6 bg-slate-50/50">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="p-2 bg-slate-900 text-white rounded-lg"><Icon name="UserRound" size={18} /></div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Compte Utilisateur</h4>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                            <span className="text-xs font-bold text-slate-500 uppercase">Email</span>
                            <span className="text-sm font-bold text-slate-900">{formData.user.email}</span>
                        </div>
                        {!isRecruiter && (
                            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                <span className="text-xs font-bold text-slate-500 uppercase">Identité</span>
                                <span className="text-sm font-bold text-slate-900">{formData.user.prenom} {formData.user.nom}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center py-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">Téléphone</span>
                            <span className="text-sm font-bold text-slate-900">{formData.user.telephone || 'Non renseigné'}</span>
                        </div>
                    </div>
                </div>

                {/* Specific info */}
                {isRecruiter ? (
                    <div className="border border-slate-100 rounded-[24px] p-6 bg-slate-50/50">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-slate-900 text-white rounded-lg"><Icon name="Building" size={18} /></div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Détails Entreprise</h4>
                        </div>
                        <div className="grid gap-3">
                            <Item label="Organisation" value={formData.recruiter.nomEntreprise} />
                            <Item label="Type" value={formData.recruiter.typeOrganisation} />
                            <Item label="Taille" value={formData.recruiter.tailleEntreprise} />
                            <Item label="Ville" value={formData.recruiter.ville} />
                            <Item label="Poste occupé" value={formData.recruiter.poste} />
                        </div>
                    </div>
                ) : formData.candidat && (
                    <div className="border border-slate-100 rounded-[24px] p-6 bg-slate-50/50">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-slate-900 text-white rounded-lg"><Icon name="Briefcase" size={18} /></div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Profil Candidat</h4>
                        </div>
                        <div className="grid gap-3">
                            <Item label="Poste visé" value={formData.candidat.PosteRecherche} />
                            <Item label="Expérience" value={formData.candidat.niveauExperience} />
                            <Item label="Formation" value={formData.candidat.formationJuridique} />
                            <div className="pt-2 border-t border-slate-100 mt-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Spécialisations</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {(formData.candidat.specialisations || []).map((s: string) => (
                                        <span key={s} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-700">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="text-center pt-6">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="group relative inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Traitement...
                        </>
                    ) : (
                        <>
                            Créer mon compte
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 group-hover:translate-x-1 transition-transform">
                                <Icon name="Check" size={14} />
                            </div>
                        </>
                    )}
                </button>
                <p className="mt-4 text-[11px] text-slate-400 font-bold uppercase tracking-widest">En cliquant, vous acceptez nos conditions d'utilisation</p>
            </div>
        </div>
    );
};

const Item = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-start py-1.5 grayscale-[0.5]">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{label}</span>
        <span className="text-sm font-bold text-slate-900 text-right max-w-[60%]">{value || '—'}</span>
    </div>
);

export default FormConfirmation;
