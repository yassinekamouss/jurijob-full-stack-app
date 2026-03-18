import { useState, useEffect } from 'react';
import { router, Head } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import FormNavigator from '@/components/signup/FormNavigator';
import FormCommunFields, {
    UserFormData,
} from '@/components/signup/FormCommunFields';
import FormRecruiter, {
    RecruiterFormData,
} from '@/components/signup/FormRecruiter';
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
    useEffect(() => {
        // Preload Outfit Font if not already
        const link = document.createElement('link');
        link.href =
            'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

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

    const [errors, setErrors] = useState<{
        user?: UserErrors;
        recruiter?: RecruiterErrors;
    }>({});

    const onFieldChange = (
        section: 'user' | 'recruiter',
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
                    const fieldMapping: Record<
                        string,
                        { section: 'user' | 'recruiter'; key: string }
                    > = {
                        email: { section: 'user', key: 'email' },
                        telephone: { section: 'user', key: 'telephone' },
                        password: { section: 'user', key: 'password' },
                        nom_entreprise: {
                            section: 'recruiter',
                            key: 'nomEntreprise',
                        },
                        type_organisation: {
                            section: 'recruiter',
                            key: 'typeOrganisation',
                        },
                        taille_entreprise: {
                            section: 'recruiter',
                            key: 'tailleEntreprise',
                        },
                        site_web: { section: 'recruiter', key: 'siteWeb' },
                        ville: { section: 'recruiter', key: 'ville' },
                        poste: { section: 'recruiter', key: 'poste' },
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

                    reject(
                        new Error(
                            (firstError as string) ||
                                "Erreur lors de l'inscription",
                        ),
                    );
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
            const requiredFields: (keyof UserFormData)[] = [
                'email',
                'password',
                'confirmPassword',
            ];
            requiredFields.forEach((field) => {
                const value = formData.user[field];
                if (
                    !value ||
                    (typeof value === 'string' && value.trim() === '')
                ) {
                    newErrors[field] = 'Ce champ est obligatoire';
                    valid = false;
                }
            });

            if (formData.user.password && formData.user.confirmPassword) {
                if (formData.user.password !== formData.user.confirmPassword) {
                    newErrors.confirmPassword =
                        'Les mots de passe ne correspondent pas';
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
                            'Le mot de passe doit contenir au moins 8 caractères, majuscules, minuscules, chiffres et symboles';
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
                            newErrors.email = 'Cet email est déjà utilisé';
                            toast.error(
                                'Cet email est déjà associé à un compte.',
                            );
                        } else if (res.status === 422) {
                            const data = await res.json();
                            newErrors.email = data.message || 'Email invalide';
                            toast.error(
                                data.message ||
                                    'Veuillez vérifier votre email.',
                            );
                        } else {
                            toast.error(
                                "Une erreur est survenue lors de la vérification de l'email.",
                            );
                        }
                    }
                } catch (error) {
                    valid = false;
                    toast.error('Erreur de connexion. Veuillez réessayer.');
                }
            }
        } else if (step === 2) {
            section = 'recruiter';
            const requiredFields: (keyof RecruiterFormData)[] = [
                'nomEntreprise',
                'typeOrganisation',
                'tailleEntreprise',
                'ville',
            ];
            requiredFields.forEach((field) => {
                const value = formData.recruiter[field];
                if (
                    !value ||
                    (typeof value === 'string' && value.trim() === '')
                ) {
                    newErrors[field] = 'Ce champ est obligatoire';
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
                        formData={formData.recruiter}
                        onFieldChange={(field, value) =>
                            onFieldChange('recruiter', field as string, value)
                        }
                        errors={errors.recruiter || {}}
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
            <Head title="Inscription Recruteur" />
            <Toaster position="top-right" />

            {/* Soft Organic Grain Texture */}
            <div
                className="pointer-events-none fixed inset-0 z-[100] opacity-[0.4] mix-blend-multiply"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
            ></div>

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
                                        Inscription recruteur
                                    </span>

                                    <h1
                                        className="mt-8 text-4xl leading-[1.1] font-bold tracking-tight text-[#1a1f1e]"
                                        style={{
                                            fontFamily:
                                                'Cormorant Garamond, serif',
                                        }}
                                    >
                                        Recrutez les meilleurs talents
                                        juridiques
                                    </h1>

                                    <p className="mt-4 text-lg font-medium text-[#1a1f1e]/70">
                                        Accédez à un vivier qualifié de juristes
                                        et avocats prêts à rejoindre votre
                                        organisation.
                                    </p>
                                </div>

                                <ul className="space-y-4">
                                    {[
                                        "Diffusion d'offres ciblées",
                                        'Matching intelligent',
                                        'Gestion simplifiée des candidatures',
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
                                            Professionnel
                                        </div>
                                        <p className="text-xs leading-relaxed font-medium text-[#1a1f1e]/60">
                                            Votre profil entreprise est
                                            valorisé.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-[#1a1f1e]/10 bg-white/50 p-5 shadow-sm backdrop-blur-sm">
                                        <div className="mb-2 flex items-center gap-2 font-bold text-[#1a1f1e]">
                                            <Icon
                                                name="Clock"
                                                size={18}
                                                className="text-[#C06041]"
                                            />{' '}
                                            Efficace
                                        </div>
                                        <p className="text-xs leading-relaxed font-medium text-[#1a1f1e]/60">
                                            Trouvez le bon profil rapidement.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Right: form wizard */}
                        <section className="lg:col-span-2">
                            <div className="relative z-10 mx-auto w-full max-w-2xl rounded-[40px] border border-[#1a1f1e]/10 bg-white p-6 shadow-2xl shadow-[#1a1f1e]/5 sm:p-10">
                                <FormNavigator
                                    onNextStep={handleNextStepValidation}
                                    steps={recruiterSteps}
                                >
                                    {renderStep}
                                </FormNavigator>

                                <div className="mt-10 flex items-center justify-center gap-2 border-t border-[#1a1f1e]/5 pt-8">
                                    <p className="text-sm font-medium text-[#1a1f1e]/50">
                                        Déjà un compte ?
                                    </p>
                                    <a
                                        href="/login"
                                        className="text-sm font-bold text-[#1a1f1e] underline-offset-4 transition-colors hover:underline"
                                    >
                                        Se connecter
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
