/* eslint-disable react-hooks/purity */
import { router, Head, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import AlreadyAuthenticatedCard from '@/components/auth/AlreadyAuthenticatedCard';
import CandidatDetails from '@/components/signup/CandidatDetails';
import {
    UserFormData,
    CandidatFormData,
    Formation,
    Experience,
    FullCandidatFormData
} from '@/types';
import FormCandidat from '@/components/signup/FormCandidat';
import FormCommunFields from '@/components/signup/FormCommunFields';
import FormConfirmation from '@/components/signup/FormConfirmation';
import FormNavigator from '@/components/signup/FormNavigator';
import Icon from '@/components/signup/FormularIcons';



const candidatSteps = [
    { id: 1, label: 'Informations', icon: 'FileText' },
    { id: 2, label: 'Profil', icon: 'Settings' },
    { id: 3, label: 'Détails', icon: 'GraduationCap' },
    { id: 4, label: 'Confirmation', icon: 'ClipboardCheck' },
];

export default function RegisterCandidat() {
    const { auth } = usePage().props as any;

    useEffect(() => {
        // Preload Outfit Font if not already
        const link = document.createElement('link');
        link.href =
            'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    const [formData, setFormData] = useState<FullCandidatFormData>({
        user: {
            nom: '',
            prenom: '',
            telephone: '',
            email: '',
            image_file: null,
            password: '',
            password_confirmation: '',
        },
        candidat: {
            niveau_experience_id: '',
            formation_juridique_id: '',
            specialisations: [],
            langues: [],
            domain_experiences: [],
            type_travails: [],
            ville_travails: [],
            mode_travails: [],
            poste_id: '',
            formations: [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    annee_debut: '',
                    annee_fin: '',
                    formation_juridique_id: '',
                    specialisation_id: '',
                    ecole_id: '',
                    diploma_file: null,
                },
            ],
            experiences: [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    debut: '',
                    fin: '',
                    type_travail_id: '',
                    entreprise: '',
                    poste_id: '',
                },
            ],
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

        if (user.image_file) {
            payload.append('image_file', user.image_file);
        }

        // --- Candidat fields ---
        payload.append('poste_id', String(candidat.poste_id));
        payload.append('niveau_experience_id', String(candidat.niveau_experience_id));
        payload.append('formation_juridique_id', String(candidat.formation_juridique_id));

        candidat.specialisations.forEach((s: string | number, i: number) =>
            payload.append(`specialisations[${i}][specialisation_id]`, String(s)),
        );
        candidat.domain_experiences.forEach((d: string | number, i: number) =>
            payload.append(`domain_experiences[${i}][domain_experience_id]`, String(d)),
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
            payload.append(`formations[${i}][ecole_id]`, String(f.ecole_id));

            if (f.diploma_file) {
                payload.append(`formations[${i}][diploma_file]`, f.diploma_file);
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
                    toast.success('Compte créé avec succès !');
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
                    newErrors[field] = 'Ce champ est obligatoire';
                    valid = false;
                }
            });

            if (formData.user.password && formData.user.password_confirmation) {
                if (formData.user.password !== formData.user.password_confirmation) {
                    newErrors.password_confirmation =
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
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    valid = false;
                    toast.error('Erreur de connexion. Veuillez réessayer.');
                }
            }
        } else if (step === 2) {
            section = 'candidat';
            const requiredFields: (keyof CandidatFormData)[] = [
                'niveau_experience_id',
                'formation_juridique_id',
                'specialisations',
                'langues',
                'domain_experiences',
                'poste_id',
                'type_travails',
                'ville_travails',
                'mode_travails',
            ];
            requiredFields.forEach((field) => {
                const value = formData.candidat[field];

                if (
                    value === undefined ||
                    value === null ||
                    (typeof value === 'string' && value.trim() === '') ||
                    (Array.isArray(value) && value.length === 0)
                ) {
                    (newErrors as any)[field] = 'Ce champ est obligatoire';
                    valid = false;
                }
            });
        } else if (step === 3) {
            section = 'candidat';
            const { formations = [], experiences = [] } = formData.candidat;

            if (formations.length === 0) {
                newErrors.formations =
                    'Veuillez ajouter au moins une formation.';
                valid = false;
            } else if (
                formations.some(
                    (f: Formation) =>
                        !f.annee_debut ||
                        !f.annee_fin ||
                        !f.formation_juridique_id ||
                        !f.specialisation_id ||
                        !f.ecole_id ||
                        !f.diploma_file,
                )
            ) {
                newErrors.formations =
                    'Veuillez remplir tous les champs de chaque formation, y compris le diplôme PDF.';
                valid = false;
            }

            if (experiences.length === 0) {
                newErrors.experiences =
                    'Veuillez ajouter au moins une expérience.';
                valid = false;
            } else if (
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
                    'Veuillez remplir tous les champs de chaque expérience.';
                valid = false;
            } else {
                // Specific date/year logic (after or equal)
                formations.forEach((f: Formation, i: number) => {
                    if (f.annee_debut && f.annee_fin && f.annee_fin < f.annee_debut) {
                        (newErrors as any)[`formations.${i}.annee_fin`] = "L'année de fin doit être postérieure ou égale à l'année de début.";
                        valid = false;
                    }
                });

                experiences.forEach((e: Experience, i: number) => {
                    if (e.debut && e.fin && e.fin < e.debut) {
                        (newErrors as any)[`experiences.${i}.fin`] = "La date de fin doit être postérieure ou égale à la date de début.";
                        valid = false;
                    }
                });
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
                    <CandidatDetails
                        formData={formData.candidat}
                        onFieldChange={(field, value) =>
                            onFieldChange('candidat', field as string, value)
                        }
                        errors={errors.candidat || {}}
                    />
                );
            case 4:
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
            <Head title="Inscription Candidat" />
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
                                        Inscription candidat
                                    </span>

                                    <h1
                                        className="mt-8 text-4xl leading-[1.1] font-bold tracking-tight text-[#1a1f1e]"
                                        style={{
                                            fontFamily:
                                                'Cormorant Garamond, serif',
                                        }}
                                    >
                                        Créez votre compte et trouvez le poste
                                        idéal
                                    </h1>

                                    <p className="mt-4 text-lg font-medium text-[#1a1f1e]/70">
                                        Un processus simple, une présentation
                                        professionnelle et des correspondances
                                        intelligentes.
                                    </p>
                                </div>

                                <ul className="space-y-4">
                                    {[
                                        'Profil clair et structuré',
                                        'Mise en avant de vos spécialités',
                                        'Matching avec les meilleures opportunités',
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
                                            Sécurisé
                                        </div>
                                        <p className="text-xs leading-relaxed font-medium text-[#1a1f1e]/60">
                                            Vos données restent privées et
                                            protégées.
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-[#1a1f1e]/10 bg-white/50 p-5 shadow-sm backdrop-blur-sm">
                                        <div className="mb-2 flex items-center gap-2 font-bold text-[#1a1f1e]">
                                            <Icon
                                                name="Clock"
                                                size={18}
                                                className="text-[#C06041]"
                                            />{' '}
                                            Rapide
                                        </div>
                                        <p className="text-xs leading-relaxed font-medium text-[#1a1f1e]/60">
                                            Inscription en moins de 3 minutes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Right: form wizard */}
                        <section className="lg:col-span-2">
                            <div className="relative z-10 mx-auto w-full max-w-2xl rounded-[40px] border border-[#1a1f1e]/10 bg-white p-6 shadow-2xl shadow-[#1a1f1e]/5 sm:p-10">
                                {auth.user ? (
                                    <AlreadyAuthenticatedCard user={auth.user} />
                                ) : (
                                    <FormNavigator
                                        onNextStep={handleNextStepValidation}
                                        steps={candidatSteps}
                                    >
                                        {renderStep}
                                    </FormNavigator>
                                )}

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
            <Footer />
        </div>
    );
}
