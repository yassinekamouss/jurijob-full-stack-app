import { useState } from 'react';
import { router, Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Toaster, toast } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import SEO from '@/components/SEO';
import AlreadyAuthenticatedCard from '@/components/auth/AlreadyAuthenticatedCard';
import RegisterSocialPrompt from '@/components/auth/RegisterSocialPrompt';
import FormNavigator from '@/components/signup/FormNavigator';
import type { 
    Auth,
    UserFormData, 
    RecruteurFormData, 
    FullRecruteurFormData 
} from '@/types';
import FormCommunFields from '@/components/signup/FormCommunFields';
import FormRecruiter from '@/components/signup/FormRecruiter';
import FormConfirmation from '@/components/signup/FormConfirmation';
import Icon from '@/components/signup/FormularIcons';

const recruiterStepDefinitions = [
    { id: 1, labelKey: 'auth.steps.infos', icon: 'FileText' },
    { id: 2, labelKey: 'auth.steps.profile', icon: 'Settings' },
    { id: 3, labelKey: 'auth.steps.confirmation', icon: 'ClipboardCheck' },
];

export default function RegisterRecruteur() {
    const { t } = useTranslation();
    const { auth } = usePage<{ auth: Auth }>().props;

    const recruiterSteps = recruiterStepDefinitions.map((step) => ({
        ...step,
        label: t(step.labelKey),
    }));



    const [formData, setFormData] = useState<FullRecruteurFormData>({
        user: {
            nom: '',
            prenom: '',
            telephone: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        recruteur: {
            nom_entreprise: '',
            type_organisation_id: '',
            taille_entreprise_id: '',
            site_web: '',
            ville_id: '',
            poste: '',
        },
    });

    type UserErrors = Partial<Record<keyof UserFormData, string>>;
    type RecruteurErrors = Partial<Record<keyof RecruteurFormData, string>>;

    const [errors, setErrors] = useState<{
        user?: UserErrors;
        recruteur?: RecruteurErrors;
    }>({});

    const onFieldChange = (
        section: 'user' | 'recruteur',
        field: string,
        value: any,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
        setErrors((prev) => ({
            ...prev,
            [section]: { ...(prev[section] as any), [field]: '' },
        }));
    };

    const buildFormPayload = (): FormData => {
        const payload = new FormData();
        const { user, recruteur } = formData;

        // --- User fields ---
        payload.append('email', user.email);
        payload.append('telephone', user.telephone || '');
        payload.append('password', user.password);
        payload.append('password_confirmation', user.password_confirmation);
        payload.append('role', 'recruteur');

        // --- Recruiter fields ---
        payload.append('nom_entreprise', recruteur.nom_entreprise);
        payload.append('type_organisation_id', String(recruteur.type_organisation_id));
        payload.append('taille_entreprise_id', String(recruteur.taille_entreprise_id));
        payload.append('site_web', recruteur.site_web || '');
        payload.append('ville_id', String(recruteur.ville_id));
        payload.append('poste', recruteur.poste || '');

        return payload;
    };

    const handleSubmit = async (): Promise<void> => {
        return new Promise((resolve, reject) => {
            const payload = buildFormPayload();

            router.post('/register', payload, {
                forceFormData: true,
                onSuccess: () => {
                    toast.success(t('auth.register_recruiter.toast_success'));
                    resolve();
                },
                onError: (errs) => {
                    const userErrors: UserErrors = {};
                    const recruiterErrors: RecruteurErrors = {};

                    // Map backend field names to frontend paths
                    const fieldMapping: Record<
                        string,
                        { section: 'user' | 'recruteur'; key: string }
                    > = {
                        email: { section: 'user', key: 'email' },
                        telephone: { section: 'user', key: 'telephone' },
                        password: { section: 'user', key: 'password' },
                        nom_entreprise: {
                            section: 'recruteur',
                            key: 'nom_entreprise',
                        },
                        type_organisation_id: {
                            section: 'recruteur',
                            key: 'type_organisation_id',
                        },
                        taille_entreprise_id: {
                            section: 'recruteur',
                            key: 'taille_entreprise_id',
                        },
                        site_web: { section: 'recruteur', key: 'site_web' },
                        ville_id: { section: 'recruteur', key: 'ville_id' },
                        poste: { section: 'recruteur', key: 'poste' },
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

                    setErrors({ user: userErrors, recruteur: recruiterErrors });

                    const firstError = Object.values(errs)[0];
                    if (firstError) {
                        toast.error(firstError as string);
                    }

                    reject(
                        new Error(
                            (firstError as string) ||
                                t('auth.register_recruiter.toast_error'),
                        ),
                    );
                },
            });
        });
    };

    const handleNextStepValidation = async (step: number): Promise<boolean> => {
        const newErrors: Record<string, string> = {};
        let valid = true;
        let section: 'user' | 'recruteur' = 'user';

        if (step === 1) {
            section = 'user';
            const requiredFields: (keyof UserFormData)[] = [
                'email',
                'password',
                'password_confirmation',
            ];
            requiredFields.forEach((field) => {
                const value = formData.user[field];
                if (
                    !value ||
                    (typeof value === 'string' && value.trim() === '')
                ) {
                    (newErrors as any)[field] = t('auth.validation.required_field');
                    valid = false;
                }
            });

            if (formData.user.password && formData.user.password_confirmation) {
                if (formData.user.password !== formData.user.password_confirmation) {
                    newErrors.password_confirmation =
                        t('auth.validation.password_mismatch');
                    valid = false;
                } else {
                    const p = formData.user.password;
                    if (
                        p.length < 8 ||
                        !/[A-Z]/.test(p) ||
                        !/[a-z]/.test(p) ||
                        !/[0-9]/.test(p) ||
                        !/[^A-Za-z0-9]/.test(p)
                    ) {
                        newErrors.password =
                            t('auth.validation.password_complexity');
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
                            'X-CSRF-TOKEN':
                                (
                                    document.querySelector(
                                        'meta[name="csrf-token"]',
                                    ) as HTMLMetaElement
                                )?.content || '',
                        },
                        body: JSON.stringify({ email: formData.user.email }),
                    });

                    if (!res.ok) {
                        valid = false;
                        if (res.status === 409) {
                            newErrors.email = t('auth.validation.email_taken');
                            toast.error(
                                t('auth.validation.email_taken_toast'),
                            );
                        } else if (res.status === 422) {
                            const data = await res.json();
                            newErrors.email = data.message || t('auth.validation.invalid_email');
                            toast.error(
                                data.message ||
                                    t('auth.validation.verify_email'),
                            );
                        } else {
                            toast.error(
                                t('auth.validation.email_check_error'),
                            );
                        }
                    }
                } catch (error) {
                    valid = false;
                    toast.error(t('auth.validation.connection_error'));
                }
            }
        } else if (step === 2) {
            section = 'recruteur';
            const requiredFields: (keyof RecruteurFormData)[] = [
                'nom_entreprise',
                'type_organisation_id',
                'taille_entreprise_id',
                'ville_id',
            ];
            requiredFields.forEach((field) => {
                const value = formData.recruteur[field];
                if (
                    !value ||
                    (typeof value === 'string' && value.trim() === '')
                ) {
                    (newErrors as any)[field] = t('auth.validation.required_field');
                    valid = false;
                }
            });
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors((prev) => ({
                ...prev,
                [section]: { ...((prev as any)[section] || {}), ...newErrors },
            }));
        }
        return valid;
    };

    const renderStep = (step: number) => {
        switch (step) {
            case 1:
                return (
                    <FormCommunFields
                        formData={formData.user}
                        onFieldChange={(field, value) =>
                            onFieldChange('user', field as string, value)
                        }
                        errors={errors.user || {}}
                        isRecruiter={true}
                    />
                );
            case 2:
                return (
                    <FormRecruiter
                        formData={formData.recruteur}
                        onFieldChange={(field, value) =>
                            onFieldChange('recruteur', field as string, value)
                        }
                        errors={errors.recruteur || {}}
                    />
                );
            case 3:
                return (
                    <FormConfirmation
                        formData={formData}
                        onSubmit={handleSubmit}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div
            className="relative flex min-h-screen flex-col overflow-clip bg-[#FDFCF8] text-[#1a1f1e]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
            <SEO
                title={t('auth.register_recruiter.seo_title')}
                description={t('auth.register_recruiter.seo_description')}
                canonical="https://jurijob.ma/register/recruteur"
            />
            <Toaster position="top-right" />

            <Header />

            <main className="relative flex-1 py-12">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
                    <div className="grid items-start gap-10 lg:grid-cols-3 lg:gap-16">
                        {/* Left sidebar */}
                        <aside className="hidden lg:col-span-1 lg:block">
                            <div className="sticky top-28 space-y-8">
                                <div>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-[#1a1f1e]/10 bg-white/50 px-4 py-1.5 text-xs font-bold tracking-widest text-[#1a1f1e] uppercase shadow-sm backdrop-blur-sm">
                                        <Icon
                                            name="Sparkles"
                                            size={14}
                                            className="text-[#C06041]"
                                        />
                                        {t('auth.register_recruiter.badge')}
                                    </span>

                                    <h1
                                        className="mt-8 text-4xl leading-[1.1] font-bold tracking-tight text-[#1a1f1e]"
                                        style={{
                                            fontFamily:
                                                'Cormorant Garamond, serif',
                                        }}
                                    >
                                        {t('auth.register_recruiter.title')}
                                    </h1>

                                    <p className="mt-4 text-lg font-medium text-[#1a1f1e]/70">
                                        {t('auth.register_recruiter.subtitle')}
                                    </p>
                                </div>

                                <ul className="space-y-4">
                                    {[
                                        t('auth.register_recruiter.feature1'),
                                        t('auth.register_recruiter.feature2'),
                                        t('auth.register_recruiter.feature3'),
                                    ].map((text) => (
                                        <li
                                            key={text}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1f1e] text-[#FDFCF8] shadow-sm">
                                                <Icon name="Check" size={14} />
                                            </div>
                                            <span className="text-sm font-bold text-[#1a1f1e]">
                                                {text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-2xl border border-[#1a1f1e]/10 bg-white/50 p-5 shadow-sm backdrop-blur-sm">
                                        <div className="mb-2 flex items-center gap-2 font-bold text-[#1a1f1e]">
                                            <Icon
                                                name="Shield"
                                                size={18}
                                                className="text-[#C06041]"
                                            />{' '}
                                            {t('auth.register_recruiter.pro_title')}
                                        </div>
                                        <p className="text-xs leading-relaxed font-medium text-[#1a1f1e]/60">
                                            {t('auth.register_recruiter.pro_desc')}
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-[#1a1f1e]/10 bg-white/50 p-5 shadow-sm backdrop-blur-sm">
                                        <div className="mb-2 flex items-center gap-2 font-bold text-[#1a1f1e]">
                                            <Icon
                                                name="Clock"
                                                size={18}
                                                className="text-[#C06041]"
                                            />{' '}
                                            {t('auth.register_recruiter.efficient_title')}
                                        </div>
                                        <p className="text-xs leading-relaxed font-medium text-[#1a1f1e]/60">
                                            {t('auth.register_recruiter.efficient_desc')}
                                        </p>
                                    </div>
                                </div>

                                {!auth.user && (
                                    <RegisterSocialPrompt role="recruteur" />
                                )}
                            </div>
                        </aside>

                        {/* Right: form wizard */}
                        <section className="lg:col-span-2">
                            {!auth.user && (
                                <RegisterSocialPrompt
                                    role="recruteur"
                                    className="mb-6 rounded-2xl border border-[#1a1f1e]/10 bg-white/50 p-5 shadow-sm backdrop-blur-sm lg:hidden"
                                />
                            )}

                            <div className="relative z-10 mx-auto w-full max-w-2xl border border-[#1a1f1e]/10 bg-white/50 p-6 shadow-2xl shadow-[#1a1f1e]/5 sm:p-10">
                                {auth.user ? (
                                    <AlreadyAuthenticatedCard user={auth.user} />
                                ) : (
                                    <FormNavigator
                                        onNextStep={handleNextStepValidation}
                                        steps={recruiterSteps}
                                    >
                                        {renderStep}
                                    </FormNavigator>
                                )}

                                <div className="mt-8 flex items-center justify-center gap-2 border-t border-[#1a1f1e]/5 pt-6">
                                    <p className="text-sm font-medium text-[#1a1f1e]/50">
                                        {t('auth.register_recruiter.already_account')}
                                    </p>
                                    <a
                                        href="/login"
                                        className="text-sm font-bold text-[#1a1f1e] underline-offset-4 transition-colors hover:underline"
                                    >
                                        {t('auth.register_recruiter.login_link')}
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
