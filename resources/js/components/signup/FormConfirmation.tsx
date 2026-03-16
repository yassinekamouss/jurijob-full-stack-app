import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';

interface FullFormData {
    user: {
        nom: string;
        prenom: string;
        telephone: string;
        email: string;
        imageFile: File | null;
        password: string;
        confirmPassword: string;
    };
    candidat: any;
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

    const userFields = [
        { label: 'Prénom', value: formData.user.prenom },
        { label: 'Nom', value: formData.user.nom },
        { label: 'Email', value: formData.user.email },
        { label: 'Téléphone', value: formData.user.telephone },
        { label: 'Mot de passe', value: '••••••••' },
    ];

    return (
        <div className="space-y-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Vérification des informations</h2>

            {/* Profile image preview */}
            {formData.user.imageFile && (
                <div className="flex flex-col items-center mb-4">
                    <img
                        src={URL.createObjectURL(formData.user.imageFile)}
                        alt="Photo de profil"
                        className="w-24 h-24 object-cover rounded-full border-2 border-border shadow-sm"
                    />
                    <span className="mt-2 text-sm text-muted-foreground">Photo de profil</span>
                </div>
            )}

            {/* User info */}
            <div className="border border-border rounded-lg p-4 bg-card shadow-sm">
                <h3 className="font-semibold text-lg mb-3 border-b border-border pb-2">Votre compte</h3>
                <ul className="space-y-2">
                    {userFields.map(({ label, value }) => (
                        <li key={label} className="flex justify-between text-sm">
                            <span className="font-medium text-muted-foreground">{label}</span>
                            <span className="text-right">{value || '—'}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Candidat summary */}
            <div className="border border-border rounded-lg p-4 bg-card shadow-sm">
                <h3 className="font-semibold text-lg mb-3 border-b border-border pb-2">Profil candidat</h3>
                <ul className="space-y-2 text-sm">
                    <li className="flex justify-between"><span className="font-medium text-muted-foreground">Poste recherché</span><span>{formData.candidat.PosteRecherche || '—'}</span></li>
                    <li className="flex justify-between"><span className="font-medium text-muted-foreground">Niveau expérience</span><span>{formData.candidat.niveauExperience || '—'}</span></li>
                    <li className="flex justify-between"><span className="font-medium text-muted-foreground">Formation juridique</span><span>{formData.candidat.formationJuridique || '—'}</span></li>
                    <li className="flex justify-between"><span className="font-medium text-muted-foreground">Spécialisations</span><span className="text-right max-w-[55%]">{(formData.candidat.specialisations || []).join(', ') || '—'}</span></li>
                    <li className="flex justify-between"><span className="font-medium text-muted-foreground">Formations</span><span>{(formData.candidat.formations || []).length} ajoutée(s)</span></li>
                    <li className="flex justify-between"><span className="font-medium text-muted-foreground">Expériences</span><span>{(formData.candidat.experiences || []).length} ajoutée(s)</span></li>
                </ul>
            </div>

            <div className="text-center pt-2">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Création en cours...
                        </>
                    ) : (
                        'Confirmer et créer mon compte'
                    )}
                </button>
            </div>
        </div>
    );
};

export default FormConfirmation;
