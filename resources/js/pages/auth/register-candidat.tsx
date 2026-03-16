import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import FormNavigator from '@/components/signup/FormNavigator';
import FormCommunFields, { UserFormData } from '@/components/signup/FormCommunFields';
import FormCandidat, { CandidatFormData, Formation, Experience } from '@/components/signup/FormCandidat';
import CandidatDetails from '@/components/signup/CandidatDetails';
import FormConfirmation from '@/components/signup/FormConfirmation';
import Icon from '@/components/signup/FormularIcons';

interface FullFormData {
    user: UserFormData;
    candidat: CandidatFormData;
}

export default function RegisterCandidat() {
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
        candidat: {
            niveauExperience: '',
            formationJuridique: '',
            specialisations: [],
            langues: [],
            domainExperiences: [],
            typeTravailRecherche: [],
            villesTravailRecherche: [],
            modeTravailRecherche: [],
            PosteRecherche: '',
            formations: [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    anneeDebut: '',
                    anneeFin: '',
                    niveau: '',
                    domaine: '',
                    ecole: '',
                    diplomaFile: null,
                },
            ],
            experiences: [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    debut: '',
                    fin: '',
                    type: '',
                    entreprise: '',
                    poste: '',
                },
            ],
        },
    });

    type UserErrors = Partial<Record<keyof UserFormData, string>>;
    type CandidatErrors = Partial<Record<keyof CandidatFormData, string>>;

    const [errors, setErrors] = useState<{ user?: UserErrors; candidat?: CandidatErrors }>({});

    const onFieldChange = (section: 'user' | 'candidat', field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
        setErrors((prev) => ({ ...prev, [section]: { ...(prev[section] as any), [field]: '' } }));
    };

    /** Build a flat FormData object that matches the Laravel backend field names */
    const buildFormPayload = (): FormData => {
        const payload = new FormData();
        const { user, candidat } = formData;

        // --- User fields ---
        payload.append('prenom', user.prenom);
        payload.append('nom', user.nom);
        payload.append('email', user.email);
        payload.append('telephone', user.telephone || '');
        payload.append('password', user.password);
        payload.append('password_confirmation', user.confirmPassword);
        payload.append('role', 'candidat');
        if (user.imageFile) {
            payload.append('image_file', user.imageFile);
        }

        // --- Candidat fields ---
        payload.append('poste_recherche', candidat.PosteRecherche);
        payload.append('niveau_experience', candidat.niveauExperience);
        payload.append('formation_juridique', candidat.formationJuridique);

        candidat.specialisations.forEach((s, i) => payload.append(`specialisations[${i}][specialisation]`, s));
        candidat.domainExperiences.forEach((d, i) => payload.append(`domain_experiences[${i}][domain_experience]`, d));
        candidat.typeTravailRecherche.forEach((t, i) => payload.append(`type_travails[${i}][type_travail]`, t));
        candidat.villesTravailRecherche.forEach((v, i) => payload.append(`ville_travails[${i}][ville]`, v));
        candidat.modeTravailRecherche.forEach((m, i) => payload.append(`mode_travails[${i}][mode_travail]`, m));

        candidat.langues.forEach((lang, i) => {
            payload.append(`langues[${i}][nom]`, lang.nom);
            payload.append(`langues[${i}][niveau]`, lang.niveau);
        });

        candidat.formations.forEach((f, i) => {
            payload.append(`formations[${i}][annee_debut]`, f.anneeDebut);
            payload.append(`formations[${i}][annee_fin]`, f.anneeFin);
            payload.append(`formations[${i}][niveau]`, f.niveau);
            payload.append(`formations[${i}][domaine]`, f.domaine);
            payload.append(`formations[${i}][ecole]`, f.ecole);
            if (f.diplomaFile) {
                payload.append(`formations[${i}][diploma_file]`, f.diplomaFile);
            }
        });

        candidat.experiences.forEach((e, i) => {
            payload.append(`experiences[${i}][debut]`, e.debut);
            payload.append(`experiences[${i}][fin]`, e.fin);
            payload.append(`experiences[${i}][type]`, e.type);
            payload.append(`experiences[${i}][entreprise]`, e.entreprise);
            payload.append(`experiences[${i}][poste]`, e.poste);
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
                    // Map backend validation errors back to our sections
                    const userKeys: (keyof UserFormData)[] = ['nom', 'prenom', 'email', 'telephone', 'password'];
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
                    if (firstError) toast.error(firstError as string);

                    reject(new Error(firstError as string || 'Erreur lors de l\'inscription'));
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
            const requiredFields: (keyof UserFormData)[] = ['nom', 'prenom', 'email', 'password', 'confirmPassword'];
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

            // Async email uniqueness check
            if (valid && formData.user.email) {
                try {
                    const res = await fetch('/check-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '' },
                        body: JSON.stringify({ email: formData.user.email }),
                    });
                    if (res.status === 409) {
                        newErrors.email = 'Cet email est déjà utilisé';
                        toast.error('Cet email est déjà associé à un compte.');
                        valid = false;
                    }
                } catch {
                    // Network error — backend will validate on final submit
                }
            }
        } else if (step === 2) {
            section = 'candidat';
            const requiredFields: (keyof CandidatFormData)[] = ['niveauExperience', 'formationJuridique', 'specialisations', 'langues', 'domainExperiences', 'PosteRecherche', 'typeTravailRecherche', 'villesTravailRecherche', 'modeTravailRecherche'];
            requiredFields.forEach((field) => {
                const value = formData.candidat[field];
                if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0)) {
                    newErrors[field] = 'Ce champ est obligatoire';
                    valid = false;
                }
            });
        } else if (step === 3) {
            section = 'candidat';
            const { formations = [], experiences = [] } = formData.candidat;

            if (formations.length === 0) {
                newErrors.formations = 'Veuillez ajouter au moins une formation.';
                valid = false;
            } else if (formations.some((f: Formation) => !f.anneeDebut || !f.anneeFin || !f.niveau || !f.domaine || !f.ecole || !f.diplomaFile)) {
                newErrors.formations = 'Veuillez remplir tous les champs de chaque formation, y compris le diplôme PDF.';
                valid = false;
            }

            if (experiences.length === 0) {
                newErrors.experiences = 'Veuillez ajouter au moins une expérience.';
                valid = false;
            } else if (experiences.some((e: Experience) => !e.debut || !e.fin || !e.type || !e.entreprise || !e.poste)) {
                newErrors.experiences = 'Veuillez remplir tous les champs de chaque expérience.';
                valid = false;
            }
        } else {
            return true;
        }

        setErrors((prev) => ({ ...prev, [section]: { ...((prev as any)[section] || {}), ...newErrors } }));
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
                    />
                );
            case 2:
                return (
                    <FormCandidat
                        formData={formData.candidat}
                        onFieldChange={(field, value) => onFieldChange('candidat', field as string, value)}
                        errors={errors.candidat || {}}
                    />
                );
            case 3:
                return (
                    <CandidatDetails
                        formData={formData.candidat}
                        onFieldChange={(field, value) => onFieldChange('candidat', field as string, value)}
                        errors={errors.candidat || {}}
                    />
                );
            case 4:
                return <FormConfirmation formData={formData} onSubmit={handleSubmit} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Toaster position="top-right" />

            {/* Decorative blobs */}
            <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
                <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-muted/60 blur-3xl" />
            </div>

            <main className="relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
                    <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">

                        {/* Left sidebar */}
                        <aside className="hidden lg:block lg:col-span-1">
                            <div className="sticky top-10">
                                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
                                    <Icon name="Sparkles" size={16} />
                                    Inscription candidat
                                </span>

                                <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
                                    Créez votre compte et trouvez le poste juridique idéal
                                </h1>

                                <p className="mt-3 text-muted-foreground">
                                    Un processus simple, une présentation professionnelle et des correspondances intelligentes.
                                </p>

                                <ul className="mt-6 space-y-3">
                                    {['Profil clair et structuré', 'Mise en avant de vos spécialités', 'Matching avec les meilleures opportunités'].map((text) => (
                                        <li key={text} className="flex items-start gap-3">
                                            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                                                <Icon name="Check" size={13} />
                                            </span>
                                            <span className="text-sm">{text}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                                    <div className="rounded-lg border border-border bg-card p-3">
                                        <div className="flex items-center gap-2 font-medium"><Icon name="Shield" size={16} /> Sécurisé</div>
                                        <p className="mt-1 text-xs text-muted-foreground">Vos données restent privées et protégées.</p>
                                    </div>
                                    <div className="rounded-lg border border-border bg-card p-3">
                                        <div className="flex items-center gap-2 font-medium"><Icon name="Clock" size={16} /> Rapide</div>
                                        <p className="mt-1 text-xs text-muted-foreground">Inscription en moins de 3 minutes.</p>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Right: form wizard */}
                        <section className="lg:col-span-2">
                            <div className="mx-auto w-full max-w-2xl rounded-2xl border border-border bg-card/80 backdrop-blur p-4 sm:p-6 shadow-lg">
                                <FormNavigator onNextStep={handleNextStepValidation}>
                                    {renderStep}
                                </FormNavigator>

                                <p className="mt-6 text-center text-sm text-muted-foreground">
                                    Déjà un compte ?{' '}
                                    <a href="/login" className="font-medium underline-offset-4 hover:underline">Se connecter</a>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
