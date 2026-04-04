import { Head, useForm, usePage, Deferred, router } from '@inertiajs/react';
import DashboardHeader from '@/components/candidate/DashboardHeader';
import {
    User,
    Mail,
    Phone,
    Lock,
    Camera,
    ShieldCheck,
    ShieldAlert,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    Briefcase,
    GraduationCap,
    Eye,
    EyeOff,
    LayoutGrid,
    Folder,
    Languages,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    updateProfile as updateProfileRoute,
    updateAccount as updateAccountRoute,
    updateImage as updateImageRoute,
} from '@/routes/candidate/settings';
import { useTaxonomies, useLoadingTaxonomy, getTaxonomyLabel } from '@/hooks/use-taxonomies';
import ExperienceSection from '@/components/candidate/settings/ExperienceSection';
import FormationSection from '@/components/candidate/settings/FormationSection';
import SpecialisationSection from '@/components/candidate/settings/SpecialisationSection';
import LanguageSection from '@/components/candidate/settings/LanguageSection';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';

interface Props {
    candidat: any;
    user: any;
    experiences?: any[];
    formations?: any[];
    specialisations?: any[];
    langues?: any[];
}

type TabType =
    | 'profile'
    | 'account'
    | 'experiences'
    | 'formations'
    | 'specialisations'
    | 'langues'
    | 'security';

export default function Settings({
    candidat,
    user,
    experiences,
    formations,
    specialisations,
    langues,
}: Props) {
    const { flash } = usePage().props as any;
    const { postes, niveauExperiences, formationJuridiques } = useTaxonomies();
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    const [visibleFlash, setVisibleFlash] = useState<{
        success?: string;
        error?: string;
    } | null>(null);

    // 2FA logic
    const { auth } = usePage().props as any;
    const isTwoFactorEnabled = !!(
        auth?.user?.two_factor_confirmed_at || user?.two_factor_confirmed_at
    );

    const {
        qrCodeSvg,
        manualSetupKey,
        recoveryCodesList,
        errors,
        clearSetupData,
        fetchSetupData,
        fetchRecoveryCodes,
    } = useTwoFactorAuth();

    const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
    const [enablingTwoFactor, setEnablingTwoFactor] = useState(false);

    const enableTwoFactor = () => {
        setEnablingTwoFactor(true);
        router.post(
            '/user/two-factor-authentication',
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSetupModalOpen(true);
                },
                onFinish: () => setEnablingTwoFactor(false),
            },
        );
    };

    const disableTwoFactor = () => {
        router.delete('/user/two-factor-authentication', {
            preserveScroll: true,
            onSuccess: () => clearSetupData(),
        });
    };

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setVisibleFlash({ success: flash.success, error: flash.error });
            const timer = setTimeout(() => {
                setVisibleFlash(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab') as TabType;
        if (
            tab &&
            [
                'profile',
                'account',
                'experiences',
                'formations',
                'specialisations',
                'langues',
                'security',
            ].includes(tab)
        ) {
            setActiveTab(tab);
        }
    }, []);
    const [showPassword, setShowPassword] = useState(false);

    const SectionSkeleton = () => (
        <div className="animate-pulse space-y-6 px-4 sm:px-0">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-6 w-48 rounded-lg bg-[#1a1f1e]/5" />
                    <div className="h-4 w-64 rounded-lg bg-[#1a1f1e]/5" />
                </div>
                <div className="h-10 w-32 rounded-xl bg-[#1a1f1e]/5" />
            </div>
            <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="flex h-24 items-center justify-between rounded-[24px] border border-[#1a1f1e]/10 bg-white p-6"
                    >
                        <div className="flex items-center gap-6">
                            <div className="h-12 w-12 rounded-2xl bg-[#1a1f1e]/5" />
                            <div className="space-y-2">
                                <div className="h-5 w-40 rounded-md bg-[#1a1f1e]/5" />
                                <div className="h-4 w-32 rounded-md bg-[#1a1f1e]/5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Profile Form
    const profileForm = useForm({
        nom: candidat?.nom || '',
        prenom: candidat?.prenom || '',
        poste_id: candidat?.poste_id || '',
        niveau_experience_id: candidat?.niveau_experience_id || '',
        formation_juridique_id: candidat?.formation_juridique_id || '',
        is_active: user.is_active,
    });

    // Account Form
    const accountForm = useForm({
        email: user.email || '',
        telephone: user.telephone || '',
        password: '',
        password_confirmation: '',
    });

    // Image Form
    const imageForm = useForm({
        image: null as File | null,
    });

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        profileForm.put(updateProfileRoute.url(), {
            preserveScroll: true,
        });
    };

    const handleAccountSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        accountForm.put(updateAccountRoute.url(), {
            preserveScroll: true,
            onSuccess: () =>
                accountForm.reset('password', 'password_confirmation'),
        });
    };

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                // 2. Créer une URL temporaire pour l'affichage immédiat
                const localUrl = URL.createObjectURL(file);
                setPreviewUrl(localUrl);

                router.post(
                    updateImageRoute.url(),
                    { _method: 'POST', image: file },
                    {
                        forceFormData: true,
                        preserveScroll: true,
                        onFinish: () => {
                            // Optionnel : nettoyer l'URL locale pour éviter les fuites mémoire
                            // URL.revokeObjectURL(localUrl);
                        }
                    }
                );
            }
        };


        const currentImageSrc = previewUrl 
    ? previewUrl 
    : (candidat?.image_url 
        ? `${import.meta.env.VITE_APP_URL}/candidate/profile-image/${candidat.id}` 
        : "/images/default_profile_image.avif");


    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FDFCF8] text-[#1a1f1e]">
            <Head title="Paramètres - Jurijob" />

            {/* Grain Texture */}
            <div
                className="pointer-events-none fixed inset-0 z-[100] opacity-[0.25] mix-blend-multiply"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
            />

            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="mb-2 font-serif text-4xl font-bold italic">
                        Paramètres du compte
                    </h1>
                    <p className="font-medium text-[#1a1f1e]/50">
                        Gérez vos informations personnelles et la sécurité de
                        votre accès.
                    </p>
                </div>

                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Sidebar Tabs */}
                    <div className="flex-shrink-0 lg:w-64">
                        <nav className="flex gap-2 rounded-2xl bg-[#1a1f1e]/5 p-1 lg:flex-col">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                                    activeTab === 'profile'
                                        ? 'bg-white text-[#1a1f1e] shadow-sm'
                                        : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                }`}
                            >
                                <User className="h-4 w-4" />
                                Profil Général
                            </button>
                            <button
                                onClick={() => setActiveTab('experiences')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                                    activeTab === 'experiences'
                                        ? 'bg-white text-[#1a1f1e] shadow-sm'
                                        : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                }`}
                            >
                                <LayoutGrid className="h-4 w-4" />
                                Expériences
                            </button>
                            <button
                                onClick={() => setActiveTab('formations')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                                    activeTab === 'formations'
                                        ? 'bg-white text-[#1a1f1e] shadow-sm'
                                        : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                }`}
                            >
                                <GraduationCap className="h-4 w-4" />
                                Formations
                            </button>
                            <button
                                onClick={() => setActiveTab('specialisations')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                                    activeTab === 'specialisations'
                                        ? 'bg-white text-[#1a1f1e] shadow-sm'
                                        : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                }`}
                            >
                                <Folder className="h-4 w-4" />
                                Spécialisations
                            </button>
                            <button
                                onClick={() => setActiveTab('langues')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                                    activeTab === 'langues'
                                        ? 'bg-white text-[#1a1f1e] shadow-sm'
                                        : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                }`}
                            >
                                <Languages className="h-4 w-4" />
                                Langues
                            </button>
                            <button
                                onClick={() => setActiveTab('account')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                                    activeTab === 'account'
                                        ? 'bg-white text-[#1a1f1e] shadow-sm'
                                        : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                }`}
                            >
                                <Lock className="h-4 w-4" />
                                Compte & Sécurité
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                                    activeTab === 'security'
                                        ? 'bg-white text-[#1a1f1e] shadow-sm'
                                        : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                }`}
                            >
                                <ShieldCheck className="h-4 w-4" />
                                2FA (Bientôt)
                            </button>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="max-w-2xl flex-1">
                        <AnimatePresence mode="wait">
                            {activeTab === 'profile' && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-10"
                                >
                                    {/* Photo Section */}
                                    <section className="rounded-[32px] border border-[#1a1f1e]/10 bg-white p-8 shadow-sm">
                                        <div className="flex flex-col items-center gap-8 sm:flex-row">
                                            <div className="group relative">
                                                <div className="h-24 w-24 overflow-hidden rounded-[28px] border-4 border-[#1a1f1e]/5 bg-[#1a1f1e]/5 ring-1 ring-[#1a1f1e]/10">
                                                    {currentImageSrc && (
                                                        <img
                                                            src={currentImageSrc}
                                                            alt="Avatar"
                                                            className="h-full w-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <label className="absolute -right-2 -bottom-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-[#1a1f1e] text-white shadow-lg transition-transform hover:scale-110">
                                                    <Camera className="h-5 w-5" />
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        disabled={
                                                            imageForm.processing
                                                        }
                                                    />
                                                </label>
                                            </div>
                                            <div>
                                                <h3 className="mb-1 font-serif text-xl font-bold italic">
                                                    Photo de profil
                                                </h3>
                                                <p className="mb-3 text-sm font-medium text-[#1a1f1e]/50">
                                                    Une photo professionnelle
                                                    aide à établir la confiance.
                                                </p>
                                                <div className="text-[10px] font-black tracking-widest text-[#1a1f1e]/30 uppercase">
                                                    JPG, PNG or WebP • Max 2MB
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Info Form */}
                                    <section className="rounded-[32px] border border-[#1a1f1e]/10 bg-white p-8 shadow-sm">
                                        <form
                                            onSubmit={handleProfileSubmit}
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                        Prénom
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            profileForm.data
                                                                .prenom
                                                        }
                                                        onChange={(e) =>
                                                            profileForm.setData(
                                                                'prenom',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                        Nom
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            profileForm.data.nom
                                                        }
                                                        onChange={(e) =>
                                                            profileForm.setData(
                                                                'nom',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                    Poste Recherché
                                                </label>
                                                <div className="relative">
                                                    <Briefcase className="absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 text-[#1a1f1e]/30" />
                                                    <select
                                                        value={
                                                            profileForm.data
                                                                .poste_id
                                                        }
                                                        onChange={(e) =>
                                                            profileForm.setData(
                                                                'poste_id',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full cursor-pointer appearance-none rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] py-4 pr-10 pl-12 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                                    >
                                                        <option value="">
                                                            Choisir un poste
                                                        </option>
                                                        {useLoadingTaxonomy(postes) ? (
                                                            <option disabled>Chargement...</option>
                                                        ) : (
                                                            postes.map((opt) => (
                                                                <option
                                                                    key={opt.id}
                                                                    value={opt.id}
                                                                >
                                                                    {opt.nom}
                                                                </option>
                                                            ))
                                                        )}
                                                        <option value="Autre">
                                                            Autre
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                        Niveau d'expérience
                                                    </label>
                                                    <select
                                                        value={
                                                            profileForm.data
                                                                .niveau_experience_id
                                                        }
                                                        onChange={(e) =>
                                                            profileForm.setData(
                                                                'niveau_experience_id',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full cursor-pointer appearance-none rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                                    >
                                                        <option value="">
                                                            Choisir un niveau
                                                        </option>
                                                        {useLoadingTaxonomy(niveauExperiences) ? (
                                                            <option disabled>Chargement...</option>
                                                        ) : (
                                                            niveauExperiences.map(
                                                                (opt) => (
                                                                    <option
                                                                        key={opt.id}
                                                                        value={opt.id}
                                                                    >
                                                                        {opt.nom}
                                                                    </option>
                                                                )
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                        Formation Majuscule
                                                    </label>
                                                    <div className="relative">
                                                        <GraduationCap className="absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 text-[#1a1f1e]/30" />
                                                        <select
                                                            value={
                                                                profileForm.data
                                                                    .formation_juridique_id
                                                            }
                                                            onChange={(e) =>
                                                                profileForm.setData(
                                                                    'formation_juridique_id',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full cursor-pointer appearance-none rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] py-4 pr-10 pl-12 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                                        >
                                                            <option value="">
                                                                Choisir une
                                                                formation
                                                            </option>
                                                            {useLoadingTaxonomy(formationJuridiques) ? (
                                                                <option disabled>Chargement...</option>
                                                            ) : (
                                                                formationJuridiques.map(
                                                                    (opt) => (
                                                                        <option
                                                                            key={
                                                                                opt.id
                                                                        }
                                                                        value={
                                                                            opt.id
                                                                        }
                                                                    >
                                                                        {opt.nom}
                                                                    </option>
                                                                )
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between border-t border-[#1a1f1e]/5 pt-4">
                                                <div className="flex items-center gap-3">
                                                    <label className="relative inline-flex cursor-pointer items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={
                                                                profileForm.data
                                                                    .is_active
                                                            }
                                                            onChange={(e) =>
                                                                profileForm.setData(
                                                                    'is_active',
                                                                    e.target
                                                                        .checked,
                                                                )
                                                            }
                                                            className="peer sr-only"
                                                        />
                                                        <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-emerald-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full"></div>
                                                    </label>
                                                    <span className="text-sm font-bold">
                                                        Activer ma visibilité
                                                    </span>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={
                                                        profileForm.processing ||
                                                        !profileForm.isDirty
                                                    }
                                                    className="rounded-xl bg-[#1a1f1e] px-8 py-3 text-sm font-black tracking-widest text-white uppercase transition-all hover:bg-[#343a38] disabled:opacity-50"
                                                >
                                                    Enregistrer
                                                </button>
                                            </div>
                                        </form>
                                    </section>
                                </motion.div>
                            )}

                            {activeTab === 'experiences' && (
                                <motion.div
                                    key="experiences"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Deferred
                                        data="experiences"
                                        fallback={<SectionSkeleton />}
                                    >
                                        <ExperienceSection
                                            experiences={experiences || []}
                                        />
                                    </Deferred>
                                </motion.div>
                            )}

                            {activeTab === 'formations' && (
                                <motion.div
                                    key="formations"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Deferred
                                        data="formations"
                                        fallback={<SectionSkeleton />}
                                    >
                                        <FormationSection
                                            formations={formations || []}
                                        />
                                    </Deferred>
                                </motion.div>
                            )}

                            {activeTab === 'specialisations' && (
                                <motion.div
                                    key="specialisations"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Deferred
                                        data="specialisations"
                                        fallback={<SectionSkeleton />}
                                    >
                                        <SpecialisationSection
                                            specialisations={
                                                specialisations || []
                                            }
                                        />
                                    </Deferred>
                                </motion.div>
                            )}

                            {activeTab === 'langues' && (
                                <motion.div
                                    key="langues"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Deferred
                                        data="langues"
                                        fallback={<SectionSkeleton />}
                                    >
                                        <LanguageSection
                                            langues={langues || []}
                                        />
                                    </Deferred>
                                </motion.div>
                            )}

                            {activeTab === 'account' && (
                                <motion.div
                                    key="account"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-10"
                                >
                                    <section className="rounded-[32px] border border-[#1a1f1e]/10 bg-white p-8 shadow-sm">
                                        <h3 className="mb-6 font-serif text-xl font-bold italic">
                                            Informations de connexion
                                        </h3>
                                        <form
                                            onSubmit={handleAccountSubmit}
                                            className="space-y-6"
                                        >
                                            <div className="space-y-2">
                                                <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                    Email professionnel
                                                </label>
                                                <div className="relative">
                                                    <Mail className="absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 text-[#1a1f1e]/30" />
                                                    <input
                                                        type="email"
                                                        value={
                                                            accountForm.data
                                                                .email
                                                        }
                                                        onChange={(e) =>
                                                            accountForm.setData(
                                                                'email',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] py-4 pr-5 pl-12 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                    Téléphone
                                                </label>
                                                <div className="relative">
                                                    <Phone className="absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 text-[#1a1f1e]/30" />
                                                    <input
                                                        type="tel"
                                                        value={
                                                            accountForm.data
                                                                .telephone
                                                        }
                                                        onChange={(e) => {
                                                            const val =
                                                                e.target.value;
                                                            accountForm.setData(
                                                                'telephone',
                                                                val,
                                                            );
                                                            if (
                                                                val &&
                                                                !/^\+?[0-9]*$/.test(
                                                                    val,
                                                                )
                                                            ) {
                                                                accountForm.setError(
                                                                    'telephone',
                                                                    'Format: + et chiffres uniquement',
                                                                );
                                                            } else if (
                                                                accountForm
                                                                    .errors
                                                                    .telephone ===
                                                                'Format: + et chiffres uniquement'
                                                            ) {
                                                                accountForm.clearErrors(
                                                                    'telephone',
                                                                );
                                                            }
                                                        }}
                                                        className={`w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] py-4 pr-5 pl-12 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0 ${accountForm.errors.telephone ? 'border-red-300 ring-red-50' : ''}`}
                                                    />
                                                </div>
                                                {accountForm.errors
                                                    .telephone && (
                                                    <p className="ml-1 text-xs font-bold text-red-500">
                                                        {
                                                            accountForm.errors
                                                                .telephone
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div className="border-t border-[#1a1f1e]/5 pt-6">
                                                <h4 className="mb-6 text-sm font-black tracking-[0.2em] text-[#1a1f1e]/30 uppercase italic">
                                                    Modification du mot de passe
                                                </h4>

                                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                            Nouveau mot de passe
                                                        </label>
                                                        <div className="relative">
                                                            <input
                                                                type={
                                                                    showPassword
                                                                        ? 'text'
                                                                        : 'password'
                                                                }
                                                                value={
                                                                    accountForm
                                                                        .data
                                                                        .password
                                                                }
                                                                onChange={(e) =>
                                                                    accountForm.setData(
                                                                        'password',
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setShowPassword(
                                                                        !showPassword,
                                                                    )
                                                                }
                                                                className="absolute top-1/2 right-5 -translate-y-1/2 text-[#1a1f1e]/30 hover:text-[#1a1f1e]/60"
                                                            >
                                                                {showPassword ? (
                                                                    <EyeOff className="h-4 w-4" />
                                                                ) : (
                                                                    <Eye className="h-4 w-4" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                            Confirmation
                                                        </label>
                                                        <input
                                                            type={
                                                                showPassword
                                                                    ? 'text'
                                                                    : 'password'
                                                            }
                                                            value={
                                                                accountForm.data
                                                                    .password_confirmation
                                                            }
                                                            onChange={(e) =>
                                                                accountForm.setData(
                                                                    'password_confirmation',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold transition-all outline-none focus:border-[#C06041] focus:ring-0"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-end pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={
                                                        accountForm.processing ||
                                                        !accountForm.isDirty
                                                    }
                                                    className="rounded-xl bg-[#1a1f1e] px-8 py-3 text-sm font-black tracking-widest text-white uppercase transition-all hover:bg-[#343a38] disabled:opacity-50"
                                                >
                                                    Mettre à jour le compte
                                                </button>
                                            </div>
                                        </form>
                                    </section>
                                </motion.div>
                            )}

                            {activeTab === 'security' && (
                                <motion.div
                                    key="security"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-10"
                                >
                                    <section className="relative overflow-hidden rounded-[32px] border border-[#1a1f1e]/10 bg-white p-8 shadow-sm">
                                        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />

                                        <div className="relative z-10 space-y-6">
                                            {!isTwoFactorEnabled ? (
                                                <div className="flex flex-col items-center rounded-[32px] border-2 border-dashed border-[#1a1f1e]/10 p-8 text-center">
                                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-gray-50 text-gray-400">
                                                        <ShieldAlert className="h-8 w-8" />
                                                    </div>
                                                    <h4 className="mb-2 font-serif text-xl font-bold italic">
                                                        Sécurité standard
                                                    </h4>
                                                    <p className="mb-8 max-w-xs text-sm text-[#1a1f1e]/40">
                                                        Votre compte est
                                                        uniquement protégé par
                                                        votre mot de passe.
                                                    </p>
                                                    <button
                                                        onClick={
                                                            enableTwoFactor
                                                        }
                                                        disabled={
                                                            enablingTwoFactor
                                                        }
                                                        className="rounded-xl bg-[#1a1f1e] px-8 py-3 text-sm font-black tracking-widest text-white uppercase transition-all hover:scale-105 disabled:opacity-50"
                                                    >
                                                        {enablingTwoFactor
                                                            ? 'Activation...'
                                                            : 'Activer le 2FA'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-8">
                                                    <div className="flex items-center gap-6 rounded-[32px] border border-emerald-100 bg-emerald-50 p-6">
                                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                                                            <ShieldCheck className="h-7 w-7" />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-emerald-900">
                                                                2FA Activé
                                                            </div>
                                                            <div className="text-sm text-emerald-700/70">
                                                                Votre compte est
                                                                hautement
                                                                sécurisé.
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={
                                                                disableTwoFactor
                                                            }
                                                            className="ml-auto text-xs font-black tracking-widest text-red-500 uppercase transition-colors hover:text-red-700"
                                                        >
                                                            Désactiver
                                                        </button>
                                                    </div>

                                                    <TwoFactorRecoveryCodes
                                                        recoveryCodesList={
                                                            recoveryCodesList
                                                        }
                                                        fetchRecoveryCodes={
                                                            fetchRecoveryCodes
                                                        }
                                                        errors={errors}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <TwoFactorSetupModal
                                            isOpen={isSetupModalOpen}
                                            onClose={() =>
                                                setIsSetupModalOpen(false)
                                            }
                                            requiresConfirmation={true}
                                            twoFactorEnabled={
                                                isTwoFactorEnabled
                                            }
                                            qrCodeSvg={qrCodeSvg}
                                            manualSetupKey={manualSetupKey}
                                            clearSetupData={clearSetupData}
                                            fetchSetupData={fetchSetupData}
                                            errors={errors}
                                        />
                                    </section>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Notifications Toasts Placeholder */}
                <AnimatePresence>
                    {visibleFlash?.success && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="fixed bottom-8 left-1/2 z-[200] w-fit -translate-x-1/2"
                        >
                            <div className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-[#1a1f1e] px-6 py-4 text-white shadow-2xl backdrop-blur-md">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-bold tracking-tight whitespace-nowrap">
                                    {visibleFlash?.success}
                                </span>
                            </div>
                        </motion.div>
                    )}

                    {visibleFlash?.error && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="fixed bottom-8 left-1/2 z-[200] w-fit -translate-x-1/2"
                        >
                            <div className="flex items-center gap-3 rounded-[20px] border border-white/10 bg-red-600 px-6 py-4 text-white shadow-2xl backdrop-blur-md">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                                    <AlertCircle className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-bold tracking-tight whitespace-nowrap">
                                    {visibleFlash.error}
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
