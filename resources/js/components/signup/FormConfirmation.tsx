import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '@/components/signup/FormularIcons';
import { useTaxonomies, getTaxonomyLabel, getTaxonomyLabels } from '@/hooks/use-taxonomies';
import LegalHonorDeclaration from '@/components/signup/LegalHonorDeclaration';

import { UserFormData, CandidatFormData, RecruteurFormData } from '@/types';

type FullFormData = {
    user: UserFormData;
    candidat?: CandidatFormData;
    recruteur?: RecruteurFormData;
}

type FormConfirmationProps = {
    formData: FullFormData;
    onSubmit: () => Promise<void>;
}

const FormConfirmation: React.FC<FormConfirmationProps> = ({ formData, onSubmit }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [honorAccepted, setHonorAccepted] = useState(false);
    const [honorError, setHonorError] = useState('');
    const { typeOrganisations, tailleEntreprises, villes, postes, niveauExperiences, formationJuridiques, specialisations, salaires, urgences } = useTaxonomies();

    const isRecruiter = !!formData.recruteur;

    const handleSubmit = async () => {
        if (!isRecruiter && !honorAccepted) {
            setHonorError(t('auth.forms.confirmation.honor_declaration_required'));
            return;
        }

        setLoading(true);
        try {
            await onSubmit();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('auth.forms.confirmation.title')}</h3>
                <p className="text-sm text-slate-500">{t('auth.forms.confirmation.subtitle')}</p>
            </div>

            <div className="grid gap-6">
                {/* User info */}
                <div className="border border-slate-100 rounded-[24px] p-6 bg-slate-50/50">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="p-2 bg-slate-900 text-white rounded-lg"><Icon name="UserRound" size={18} /></div>
                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{t('auth.forms.confirmation.user_account')}</h4>
                    </div>
                    <div className="grid gap-4">
                        <div className="flex justify-between items-center py-2 border-b border-slate-100">
                            <span className="text-xs font-bold text-slate-500 uppercase">{t('auth.forms.confirmation.email')}</span>
                            <span className="text-sm font-bold text-slate-900">{formData.user.email}</span>
                        </div>
                        {!isRecruiter && (
                            <div className="flex justify-between items-center py-2 border-b border-slate-100">
                                <span className="text-xs font-bold text-slate-500 uppercase">{t('auth.forms.confirmation.identity')}</span>
                                <span className="text-sm font-bold text-slate-900">{formData.user.prenom} {formData.user.nom}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center py-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">{t('auth.forms.confirmation.phone')}</span>
                            <span className="text-sm font-bold text-slate-900">{formData.user.telephone || t('auth.forms.confirmation.not_provided')}</span>
                        </div>
                    </div>
                </div>

                {/* Specific info */}
                {isRecruiter && formData.recruteur ? (
                    <div className="border border-slate-100 rounded-[24px] p-6 bg-slate-50/50">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-slate-900 text-white rounded-lg"><Icon name="Building" size={18} /></div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{t('auth.forms.confirmation.company_details')}</h4>
                        </div>
                        <div className="grid gap-3">
                            <Item label={t('auth.forms.confirmation.organization')} value={formData.recruteur.nom_entreprise} />
                            <Item label={t('auth.forms.confirmation.type')} value={getTaxonomyLabel(formData.recruteur.type_organisation_id, typeOrganisations)} />
                            <Item label={t('auth.forms.confirmation.size')} value={getTaxonomyLabel(formData.recruteur.taille_entreprise_id, tailleEntreprises)} />
                            <Item label={t('auth.forms.confirmation.city')} value={getTaxonomyLabel(formData.recruteur.ville_id, villes)} />
                            <Item label={t('auth.forms.confirmation.job_title')} value={formData.recruteur.poste || ''} />
                        </div>
                    </div>
                ) : formData.candidat && (
                    <div className="border border-slate-100 rounded-[24px] p-6 bg-slate-50/50">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-slate-900 text-white rounded-lg"><Icon name="Briefcase" size={18} /></div>
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">{t('auth.forms.confirmation.candidate_profile')}</h4>
                        </div>
                        <div className="grid gap-3">
                            <Item label={t('auth.forms.confirmation.target_job')} value={getTaxonomyLabel(formData.candidat.poste_id, postes)} />
                            <Item label={t('auth.forms.confirmation.experience')} value={getTaxonomyLabel(formData.candidat.niveau_experience_id, niveauExperiences)} />
                            <Item label={t('auth.forms.confirmation.education')} value={getTaxonomyLabel(formData.candidat.formation_juridique_id, formationJuridiques)} />
                            <Item label={t('auth.forms.confirmation.desired_salary')} value={getTaxonomyLabel(formData.candidat.salaire_id, salaires)} />
                            <Item label={t('auth.forms.confirmation.availability')} value={getTaxonomyLabel(formData.candidat.urgence_id, urgences)} />
                            <div className="pt-2 border-t border-slate-100 mt-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">{t('auth.forms.confirmation.specializations')}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {getTaxonomyLabels(formData.candidat.specialisations || [], specialisations).map((s: string) => (
                                        <span key={s} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-700">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {!isRecruiter && (
                <div className="pt-2">
                    <LegalHonorDeclaration
                        variant="checkbox"
                        checked={honorAccepted}
                        onCheckedChange={(val) => {
                            setHonorAccepted(val);
                            if (val) setHonorError('');
                        }}
                        error={honorError}
                    />
                </div>
            )}

            <div className="text-center pt-4">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading || (!isRecruiter && !honorAccepted)}
                    className="group relative inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            {t('auth.forms.confirmation.submitting')}
                        </>
                    ) : (
                        <>
                            {t('auth.forms.confirmation.submit_button')}
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 group-hover:translate-x-1 transition-transform">
                                <Icon name="Check" size={14} />
                            </div>
                        </>
                    )}
                </button>
                <p className="mt-4 text-[11px] text-slate-400 font-bold uppercase tracking-widest">{t('auth.forms.confirmation.terms_acceptance')}</p>
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
