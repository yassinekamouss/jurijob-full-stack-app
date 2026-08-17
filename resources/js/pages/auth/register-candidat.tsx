/* eslint-disable react-hooks/purity */
import { router, Head, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster, toast } from 'react-hot-toast';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import SEO from '@/components/SEO';
import AlreadyAuthenticatedCard from '@/components/auth/AlreadyAuthenticatedCard';
import RegisterSocialPrompt from '@/components/auth/RegisterSocialPrompt';
import CandidatDetails from '@/components/signup/CandidatDetails';
import type {
    Auth,
    UserFormData,
    CandidatFormData,
    Formation,
    Experience,
    FullCandidatFormData
} from '@/types';
import FormCandidat from '@/components/signup/FormCandidat';
import FormCandidatPreferences from '@/components/signup/FormCandidatPreferences';
import FormCandidatSpecialisations from '@/components/signup/FormCandidatSpecialisations';
import FormCommunFields from '@/components/signup/FormCommunFields';
import FormConfirmation from '@/components/signup/FormConfirmation';
import FormNavigator from '@/components/signup/FormNavigator';
import Icon from '@/components/signup/FormularIcons';

const candidatStepDefinitions = [
    { id: 1, labelKey: 'auth.steps.infos', icon: 'FileText' },
    { id: 2, labelKey: 'auth.steps.profile', icon: 'Settings' },
    { id: 3, labelKey: 'auth.steps.expertise', icon: 'Layers' },
    { id: 4, labelKey: 'auth.steps.career', icon: 'GraduationCap' },
    { id: 5, labelKey: 'auth.steps.preferences', icon: 'MapPin' },
    { id: 6, labelKey: 'auth.steps.confirmation', icon: 'ClipboardCheck' },
];

const createEmptyFormation = (): Formation => ({
    id: crypto.randomUUID(),
    annee_debut: '',
    annee_fin: '',
    formation_juridique_id: '',
    specialisation_id: '',
    ecole_id: '',
    autre_ecole: '',
});

export default function RegisterCandidat() {
    const { t } = useTranslation();
    const { auth } = usePage<{ auth: Auth }>().props;
    const signupCardRef = useRef<HTMLDivElement>(null);

    const candidatSteps = candidatStepDefinitions.map((step) => ({
        ...step,
        label: t(step.labelKey),
    }));



    const [formData, setFormData] = useState<FullCandidatFormData>({
        user: {
            nom: '',
            prenom: '',
            telephone: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        candidat: {
            niveau_experience_id: '',
            formation_juridique_id: '',
            specialisations: [],
            langues: [],
            type_travails: [],
            ville_travails: [],
            mode_travails: [],
            poste_id: '',
            salaire_id: '',
            urgence_id: '',
            formations: [createEmptyFormation()],
            experiences: [],
        },
    });

    type UserErrors = Partial<Record<keyof UserFormData, string>>;
    type CandidatErrors = Partial<Record<keyof CandidatFormData, string>>;

    const [errors, setErrors] = useState<{
        user?: Record<string, string>;
        candidat?: Record<string, string>;
    }>({});

    const onFieldChange = (
        section: 'user' | 'candidat',
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
        const { user, candidat } = formData;

        // --- User fields ---
        payload.append('prenom', user.prenom);
        payload.append('nom', user.nom);
        payload.append('email', user.email);
        payload.append('telephone', user.telephone || '');
        payload.append('password', user.password);
        payload.append('password_confirmation', user.password_confirmation);
        payload.append('role', 'candidat');

        // --- Candidat fields ---
        payload.append('poste_id', String(candidat.poste_id));
        payload.append('niveau_experience_id', String(candidat.niveau_experience_id));
        payload.append('formation_juridique_id', String(candidat.formation_juridique_id));
        payload.append('salaire_id', String(candidat.salaire_id));
        payload.append('urgence_id', String(candidat.urgence_id));

        candidat.specialisations.forEach((s: string | number, i: number) =>
            payload.append(`specialisations[${i}][specialisation_id]`, String(s)),
        );
       
        candidat.type_travails.forEach((t: string | number, i: number) =>
            payload.append(`type_travails[${i}][type_travail_id]`, String(t)),
        );
        candidat.ville_travails.forEach((v: string | number, i: number) =>
            payload.append(`ville_travails[${i}][ville_id]`, String(v)),
        );
        candidat.mode_travails.forEach((m: string | number, i: number) =>
            payload.append(`mode_travails[${i}][mode_travail_id]`, String(m)),
        );

        candidat.langues.forEach(
            (lang: { langue_id: string | number; niveau_langue_id: string | number }, i: number) => {
                payload.append(`langues[${i}][langue_id]`, String(lang.langue_id));
                payload.append(`langues[${i}][niveau_langue_id]`, String(lang.niveau_langue_id));
            },
        );

        candidat.formations.forEach((f: Formation, i: number) => {
            payload.append(`formations[${i}][annee_debut]`, f.annee_debut);
            payload.append(`formations[${i}][annee_fin]`, f.annee_fin);
            payload.append(`formations[${i}][formation_juridique_id]`, String(f.formation_juridique_id));
            payload.append(`formations[${i}][specialisation_id]`, String(f.specialisation_id));
            if (f.ecole_id === 'other') {
                payload.append(`formations[${i}][ecole_id]`, 'other');
                payload.append(`formations[${i}][autre_ecole]`, f.autre_ecole || '');
            } else {
                payload.append(`formations[${i}][ecole_id]`, String(f.ecole_id));
            }
        });

        candidat.experiences.forEach((e: Experience, i: number) => {
            payload.append(`experiences[${i}][debut]`, e.debut);
            payload.append(`experiences[${i}][fin]`, e.fin);
            payload.append(`experiences[${i}][type_travail_id]`, String(e.type_travail_id));
            payload.append(`experiences[${i}][entreprise]`, e.entreprise);
            payload.append(`experiences[${i}][poste_id]`, String(e.poste_id));
        });

        return payload;
    };

    const handleSubmit = async (): Promise<void> => {
        return new Promise((resolve, reject) => {
            const payload = buildFormPayload();

            router.post('/register', payload, {
                forceFormData: true,
                onSuccess: () => {
                    toast.success(t('auth.register_candidate.toast_success'));
                    resolve();
                },
                onError: (errs) => {
                    const userKeys: (keyof UserFormData)[] = [
                        'nom',
                        'prenom',
                        'email',
                        'telephone',
                        'password',
                    ];
                    const userErrors: UserErrors = {};
                    const candidatErrors: CandidatErrors = {};

                    Object.entries(errs).forEach(([key, msg]) => {
                        if (userKeys.includes(key as any)) {
                            (userErrors as any)[key] = msg;
                        } else {
                            (candidatErrors as any)[key] = msg;
                        }
                    });

                    setErrors({ user: userErrors, candidat: candidatErrors });

                    const firstError = Object.values(errs)[0];

                    if (firstError) {
                        toast.error(firstError as string);
                    }

                    reject(
                        new Error(
                            (firstError as string) ||
                            t('auth.register_candidate.toast_error'),
                        ),
                    );
                },
            });
        });
    };

    const handleNextStepValidation = async (step: number): Promise<boolean> => {
        const newErrors: Record<string, string> = {};
        let valid = true;
        let section: 'user' | 'candidat' = 'user';

        if (step === 1) {
            section = 'user';
            const requiredFields: (keyof UserFormData)[] = [
                'nom',
                'prenom',
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
                    newErrors[field] = t('auth.validation.required_field');
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
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    valid = false;
                    toast.error(t('auth.validation.connection_error'));
                }
            }
        } else if (step === 2) {
            section = 'candidat';
            const requiredFields: (keyof CandidatFormData)[] = [
                'niveau_experience_id',
                'formation_juridique_id',
                'poste_id',
                'type_travails',
                'salaire_id',
                'urgence_id',
            ];
            requiredFields.forEach((field) => {
                const value = formData.candidat[field];

                if (
                    value === undefined ||
                    value === null ||
                    (typeof value === 'string' && value.trim() === '') ||
                    (Array.isArray(value) && value.length === 0)
                ) {
                    (newErrors as any)[field] = t('auth.validation.required_field');
                    valid = false;
                }
            });
        } else if (step === 3) {
            section = 'candidat';

            if ((formData.candidat.specialisations || []).length === 0) {
                newErrors.specialisations = t('auth.validation.select_specialisation');
                valid = false;
            }
        } else if (step === 4) {
            section = 'candidat';
            const { formations = [], experiences = [] } = formData.candidat;

            if (formations.length === 0) {
                newErrors.formations =
                    t('auth.validation.add_formation');
                valid = false;
            } else if (
                formations.some(
                    (f: Formation) =>
                        !f.annee_debut ||
                        !f.annee_fin ||
                        !f.formation_juridique_id ||
                        !f.specialisation_id ||
                        !f.ecole_id ||
                        (f.ecole_id === 'other' && (!f.autre_ecole || f.autre_ecole.trim() === '')),
                )
            ) {
                newErrors.formations =
                    t('auth.validation.fill_all_formations');
                valid = false;
            } else {
                formations.forEach((f: Formation, i: number) => {
                    if (f.annee_debut && f.annee_fin && f.annee_fin < f.annee_debut) {
                        (newErrors as any)[`formations.${i}.annee_fin`] = t('auth.validation.end_year_invalid');
                        valid = false;
                    }
                });
            }

            if (
                experiences.length > 0 &&
                experiences.some(
                    (e: Experience) =>
                        !e.debut ||
                        !e.fin ||
                        !e.type_travail_id ||
                        !e.entreprise ||
                        !e.poste_id,
                )
            ) {
                newErrors.experiences =
                    t('auth.validation.fill_all_experiences');
                valid = false;
            } else {
                experiences.forEach((e: Experience, i: number) => {
                    if (e.debut && e.fin && e.fin < e.debut) {
                        (newErrors as any)[`experiences.${i}.fin`] = t('auth.validation.end_date_invalid');
                        valid = false;
                    }
                });
            }
        } else if (step === 5) {
            section = 'candidat';
            const requiredFields: (keyof CandidatFormData)[] = [
                'ville_travails',
                'mode_travails',
                'langues',
            ];

            requiredFields.forEach((field) => {
                const value = formData.candidat[field];

                if (
                    value === undefined ||
                    value === null ||
                    (Array.isArray(value) && value.length === 0)
                ) {
                    (newErrors as any)[field] = t('auth.validation.required_field');
                    valid = false;
                }
            });

            if (
                (formData.candidat.langues || []).some(
                    (langue) => !langue.langue_id || !langue.niveau_langue_id,
                )
            ) {
                newErrors.langues = t('auth.validation.language_level_required');
                valid = false;
            }
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
                    />
                );
            case 2:
                return (
                    <FormCandidat
                        formData={formData.candidat}
                        onFieldChange={(field, value) =>
                            onFieldChange('candidat', field as string, value)
                        }
                        errors={errors.candidat || {}}
                    />
                );
            case 3:
                return (
                    <FormCandidatSpecialisations
                        formData={formData.candidat}
                        onFieldChange={(field, value) =>
                            onFieldChange('candidat', field as string, value)
                        }
                        errors={errors.candidat || {}}
                    />
                );
            case 4:
                return (
                    <CandidatDetails
                        formData={formData.candidat}
                        onFieldChange={(field, value) =>
                            onFieldChange('candidat', field as string, value)
                        }
                        errors={errors.candidat || {}}
                    />
                );
            case 5:
                return (
                    <FormCandidatPreferences
                        formData={formData.candidat}
                        onFieldChange={(field, value) =>
                            onFieldChange('candidat', field as string, value)
                        }
                        errors={errors.candidat || {}}
                    />
                );
            case 6:
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
                title={t('auth.register_candidate.seo_title')}
                description={t('auth.register_candidate.seo_description')}
                canonical="https://jurijob.ma/register/candidat"
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
                                        {t('auth.register_candidate.badge')}
                                    </span>

                                    <h1
                                        className="mt-8 text-4xl leading-[1.1] font-bold tracking-tight text-[#1a1f1e]"
                                        style={{
                                            fontFamily:
                                                'Cormorant Garamond, serif',
                                        }}
                                    >
                                        {t('auth.register_candidate.title')}
                                    </h1>

                                    <p className="mt-4 text-lg font-medium text-[#1a1f1e]/70">
                                        {t('auth.register_candidate.subtitle')}
                                    </p>
                                </div>

                                <ul className="space-y-4">
                                    {[
                                        t('auth.register_candidate.feature1'),
                                        t('auth.register_candidate.feature2'),
                                        t('auth.register_candidate.feature3'),
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
                                            {t('auth.register_candidate.secure_title')}
                                        </div>
                                        <p className="text-xs leading-relaxed font-medium text-[#1a1f1e]/60">
                                            {t('auth.register_candidate.secure_desc')}
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-[#1a1f1e]/10 bg-white/50 p-5 shadow-sm backdrop-blur-sm">
                                        <div className="mb-2 flex items-center gap-2 font-bold text-[#1a1f1e]">
                                            <Icon
                                                name="Clock"
                                                size={18}
                                                className="text-[#C06041]"
                                            />{' '}
                                            {t('auth.register_candidate.fast_title')}
                                        </div>
                                        <p className="text-xs leading-relaxed font-medium text-[#1a1f1e]/60">
                                            {t('auth.register_candidate.fast_desc')}
                                        </p>
                                    </div>
                                </div>

                                {!auth.user && (
                                    <RegisterSocialPrompt role="candidat" />
                                )}
                            </div>
                        </aside>

                        {/* Right: form wizard */}
                        <section className="lg:col-span-2">
                            {/* Mobile title banner */}
                            <div className="mb-6 text-center lg:hidden">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#1a1f1e]/10 bg-white/50 px-3.5 py-1 text-[11px] font-bold tracking-widest text-[#1a1f1e] uppercase shadow-sm backdrop-blur-sm">
                                    <Icon name="Sparkles" size={12} className="text-[#C06041]" />
                                    {t('auth.register_candidate.badge')}
                                </span>
                                <h1
                                    className="mt-3 text-2xl font-bold tracking-tight text-[#1a1f1e] sm:text-3xl"
                                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                >
                                    {t('auth.register_candidate.title')}
                                </h1>
                                <p className="mt-1 text-sm font-medium text-[#1a1f1e]/70">
                                    {t('auth.register_candidate.subtitle')}
                                </p>
                            </div>

                            {!auth.user && (
                                <RegisterSocialPrompt
                                    role="candidat"
                                    className="mb-6 rounded-2xl border border-[#1a1f1e]/10 bg-white/50 p-5 shadow-sm backdrop-blur-sm lg:hidden"
                                />
                            )}

                            <div ref={signupCardRef} className="relative z-10 mx-auto w-full max-w-2xl border border-[#1a1f1e]/5 bg-[#1a1f1e]/[0.02] p-4 shadow-2xl shadow-[#1a1f1e]/5 sm:p-10">
                                {auth.user ? (
                                    <AlreadyAuthenticatedCard user={auth.user} />
                                ) : (
                                    <FormNavigator
                                        onNextStep={handleNextStepValidation}
                                        steps={candidatSteps}
                                        scrollTargetRef={signupCardRef}
                                    >
                                        {renderStep}
                                    </FormNavigator>
                                )}

                                <div className="mt-8 flex items-center justify-center gap-2 border-t border-[#1a1f1e]/5 pt-6">
                                    <p className="text-sm font-medium text-[#1a1f1e]/50">
                                        {t('auth.register_candidate.already_account')}
                                    </p>
                                    <a
                                        href="/login"
                                        className="text-sm font-bold text-[#1a1f1e] underline-offset-4 transition-colors hover:underline"
                                    >
                                        {t('auth.register_candidate.login_link')}
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
