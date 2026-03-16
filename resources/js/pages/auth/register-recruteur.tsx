import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import FormNavigator from '@/components/signup/FormNavigator';
import FormCommunFields, { UserFormData } from '@/components/signup/FormCommunFields';
import FormRecruiter, { RecruiterFormData } from '@/components/signup/FormRecruiter';
import FormConfirmation from '@/components/signup/FormConfirmation';
import Icon from '@/components/signup/FormularIcons';

interface FullFormData {
    user: UserFormData;
    recruiter: RecruiterFormData;
}

const recruiterSteps = [
    { id: 1, label: 'Informations', icon: 'FileText' },
    { id: 2, label: 'Profil', icon: 'Settings' },
    { id: 3, label: 'Confirmation', icon: 'ClipboardCheck' },
];

export default function RegisterRecruteur() {
    const [formData, setFormData] = useState<FullFormData>({
        user: {
            nom: '',
            prenom: '',
            telephone: '',
            email: '',
            imageFile: null,
            password: '',
            confirmPassword: '',
        },
        recruiter: {
            nomEntreprise: '',
            typeOrganisation: '',
            tailleEntreprise: '',
            siteWeb: '',
            ville: '',
            poste: '',
        },
    });

    type UserErrors = Partial<Record<keyof UserFormData, string>>;
    type RecruiterErrors = Partial<Record<keyof RecruiterFormData, string>>;

    const [errors, setErrors] = useState<{ user?: UserErrors; recruiter?: RecruiterErrors }>({});

    const onFieldChange = (section: 'user' | 'recruiter', field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
        setErrors((prev) => ({ ...prev, [section]: { ...(prev[section] as any), [field]: '' } }));
    };

    const buildFormPayload = (): FormData => {
        const payload = new FormData();
        const { user, recruiter } = formData;

        // --- User fields ---
        payload.append('email', user.email);
        payload.append('telephone', user.telephone || '');
        payload.append('password', user.password);
        payload.append('password_confirmation', user.confirmPassword);
        payload.append('role', 'recruteur');

        // --- Recruiter fields ---
        payload.append('nom_entreprise', recruiter.nomEntreprise);
        payload.append('type_organisation', recruiter.typeOrganisation);
        payload.append('taille_entreprise', recruiter.tailleEntreprise);
        payload.append('site_web', recruiter.siteWeb || '');
        payload.append('ville', recruiter.ville);
        payload.append('poste', recruiter.poste || '');

        return payload;
    };

    const handleSubmit = async (): Promise<void> => {
        return new Promise((resolve, reject) => {
            const payload = buildFormPayload();

            router.post('/register', payload, {
                forceFormData: true,
                onSuccess: () => {
                    toast.success('Compte recruteur créé avec succès !');
                    resolve();
                },
                onError: (errs) => {
                    const userErrors: UserErrors = {};
                    const recruiterErrors: RecruiterErrors = {};

                    // Map backend field names to frontend paths
                    const fieldMapping: Record<string, {section: 'user' | 'recruiter', key: string}> = {
                        'email': {section: 'user', key: 'email'},
                        'telephone': {section: 'user', key: 'telephone'},
                        'password': {section: 'user', key: 'password'},
                        'nom_entreprise': {section: 'recruiter', key: 'nomEntreprise'},
                        'type_organisation': {section: 'recruiter', key: 'typeOrganisation'},
                        'taille_entreprise': {section: 'recruiter', key: 'tailleEntreprise'},
                        'site_web': {section: 'recruiter', key: 'siteWeb'},
                        'ville': {section: 'recruiter', key: 'ville'},
                        'poste': {section: 'recruiter', key: 'poste'},
                    };

                    Object.entries(errs).forEach(([key, msg]) => {
                        const mapping = fieldMapping[key];
                        if (mapping) {
                            if (mapping.section === 'user') {
                                (userErrors as any)[mapping.key] = msg;
                            } else {
                                (recruiterErrors as any)[mapping.key] = msg;
                            }
                        } else {
                            (recruiterErrors as any)[key] = msg;
                        }
                    });

                    setErrors({ user: userErrors, recruiter: recruiterErrors });

                    const firstError = Object.values(errs)[0];
                    if (firstError) toast.error(firstError as string);

                    reject(new Error(firstError as string || 'Erreur lors de l\'inscription'));
                },
            });
        });
    };

    const handleNextStepValidation = async (step: number): Promise<boolean> => {
        const newErrors: Record<string, string> = {};
        let valid = true;
        let section: 'user' | 'recruiter' = 'user';

        if (step === 1) {
            section = 'user';
            const requiredFields: (keyof UserFormData)[] = ['email', 'password', 'confirmPassword'];
            requiredFields.forEach((field) => {
                const value = formData.user[field];
                if (!value || (typeof value === 'string' && value.trim() === '')) {
                    newErrors[field] = 'Ce champ est obligatoire';
                    valid = false;
                }
            });

            if (formData.user.password && formData.user.confirmPassword) {
                if (formData.user.password !== formData.user.confirmPassword) {
                    newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
                    valid = false;
                } else {
                    const p = formData.user.password;
                    if (p.length < 8 || !/[A-Z]/.test(p) || !/[a-z]/.test(p) || !/[0-9]/.test(p) || !/[^A-Za-z0-9]/.test(p)) {
                        newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères, majuscules, minuscules, chiffres et symboles';
                        valid = false;
                    }
                }
            }

            if (valid && formData.user.email) {
                try {
                    const res = await fetch('/check-email', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json', 
                            'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '' 
                        },
                        body: JSON.stringify({ email: formData.user.email }),
                    });
                    if (res.status === 409) {
                        newErrors.email = 'Cet email est déjà utilisé';
                        toast.error('Cet email est déjà associé à un compte.');
                        valid = false;
                    }
                } catch {
                }
            }
        } else if (step === 2) {
            section = 'recruiter';
            const requiredFields: (keyof RecruiterFormData)[] = ['nomEntreprise', 'typeOrganisation', 'tailleEntreprise', 'ville'];
            requiredFields.forEach((field) => {
                const value = formData.recruiter[field];
                if (!value || (typeof value === 'string' && value.trim() === '')) {
                    newErrors[field] = 'Ce champ est obligatoire';
                    valid = false;
                }
            });
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors((prev) => ({ ...prev, [section]: { ...((prev as any)[section] || {}), ...newErrors } }));
        }
        return valid;
    };

    const renderStep = (step: number) => {
        switch (step) {
            case 1:
                return (
                    <FormCommunFields
                        formData={formData.user}
                        onFieldChange={(field, value) => onFieldChange('user', field as string, value)}
                        errors={errors.user || {}}
                        isRecruiter={true}
                    />
                );
            case 2:
                return (
                    <FormRecruiter
                        formData={formData.recruiter}
                        onFieldChange={(field, value) => onFieldChange('recruiter', field as string, value)}
                        errors={errors.recruiter || {}}
                    />
                );
            case 3:
                return <FormConfirmation formData={formData} onSubmit={handleSubmit} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Toaster position="top-right" />

            <main className="relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                    <div className="grid lg:grid-cols-3 gap-10 lg:gap-16 items-start">

                        {/* Left sidebar */}
                        <aside className="hidden lg:block lg:col-span-1">
                            <div className="sticky top-10 space-y-8">
                                <div>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-1.5 text-xs font-bold text-slate-900 uppercase tracking-widest shadow-sm">
                                        <Icon name="Sparkles" size={14} className="text-slate-900" />
                                        Inscription recruteur
                                    </span>

                                    <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                                        Recrutez les meilleurs talents juridiques
                                    </h1>

                                    <p className="mt-4 text-lg text-slate-600 font-medium">
                                        Accédez à un vivier qualifié de juristes et avocats prêts à rejoindre votre organisation.
                                    </p>
                                </div>

                                <ul className="space-y-4">
                                    {['Diffusion d\'offres ciblées', 'Matching intelligent', 'Gestion simplifiée des candidatures'].map((text) => (
                                        <li key={text} className="flex items-center gap-3">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm">
                                                <Icon name="Check" size={14} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">{text}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                        <div className="flex items-center gap-2 font-bold text-slate-900 mb-2"><Icon name="Shield" size={18} /> Professionnel</div>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Votre profil entreprise est valorisé.</p>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                        <div className="flex items-center gap-2 font-bold text-slate-900 mb-2"><Icon name="Clock" size={18} /> Efficace</div>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Trouvez le bon profil rapidement.</p>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Right: form wizard */}
                        <section className="lg:col-span-2">
                            <div className="mx-auto w-full max-w-2xl rounded-[32px] border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/50">
                                <FormNavigator onNextStep={handleNextStepValidation} steps={recruiterSteps}>
                                    {renderStep}
                                </FormNavigator>

                                <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-center gap-2">
                                    <p className="text-sm text-slate-500 font-medium">Déjà un compte ?</p>
                                    <a href="/login" className="text-sm font-bold text-slate-900 hover:underline underline-offset-4">Se connecter</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
