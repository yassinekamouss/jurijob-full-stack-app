import { Head, useForm, usePage, Deferred, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Mail,
    ShieldCheck,
    ShieldAlert,
    CheckCircle2,
    AlertCircle,
    Briefcase,
    GraduationCap,
    LayoutGrid,
    Folder,
    Languages,
    MapPin,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '@/components/candidate/DashboardHeader';
import PendingVerificationBanner from '@/components/candidate/PendingVerificationBanner';
import type {ProfileCompletion} from '@/components/candidate/PendingVerificationBanner';
import ExperienceSection from '@/components/candidate/settings/ExperienceSection';
import FormationSection from '@/components/candidate/settings/FormationSection';
import LanguageSection from '@/components/candidate/settings/LanguageSection';
import PreferencesSection from '@/components/candidate/settings/PreferencesSection';
import SpecialisationSection from '@/components/candidate/settings/SpecialisationSection';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { PhoneInput } from '@/components/ui/phone-input';
import { useTaxonomies, useLoadingTaxonomy, getTaxonomyLabel } from '@/hooks/use-taxonomies';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import {
    updateProfile as updateProfileRoute,
} from '@/routes/candidate/settings';

interface Props {
    candidat: any;
    user: any;
    experiences?: any[];
    formations?: any[];
    specialisations?: any[];
    langues?: any[];
    villeTravails?: any[];
    modeTravails?: any[];
    typeTravails?: any[];
    profileCompletion?: ProfileCompletion;
}

type TabType =
    | 'profile'
    | 'preferences'
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
    villeTravails = [],
    modeTravails = [],
    typeTravails = [],
    profileCompletion,
}: Props) {
    const { t } = useTranslation();
    const { flash } = usePage().props as any;
    const isPending = candidat?.status === 'en_attente';
    const { postes, niveauExperiences, formationJuridiques, salaires, urgences } = useTaxonomies();
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    const [visibleFlash, setVisibleFlash] = useState<{
        success?: string;
        error?: string;
    } | null>(null);

    // 2FA logic
    const { auth } = usePage().props as any;
    const isTwoFactorEnabled = !!(
        auth?.user?.data?.two_factor_confirmed_at ||
        auth?.user?.two_factor_confirmed_at ||
        user?.two_factor_confirmed_at
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
                'preferences',
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

    const profileForm = useForm({
        nom: candidat?.nom || '',
        prenom: candidat?.prenom || '',
        poste_id: candidat?.poste_id || '',
        niveau_experience_id: candidat?.niveau_experience_id || '',
        formation_juridique_id: candidat?.formation_juridique_id || '',
        salaire_id: candidat?.salaire_id || '',
        urgence_id: candidat?.urgence_id || '',
        telephone: user.telephone || '',
        is_active: user.is_active,
    });

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        profileForm.clearErrors();

        const requiredFields: Array<{ key: keyof typeof profileForm.data; message: string }> = [
            { key: 'prenom', message: t('candidate_settings.validation.firstname_required') },
            { key: 'nom', message: t('candidate_settings.validation.lastname_required') },
            { key: 'poste_id', message: t('candidate_settings.validation.job_required') },
            { key: 'niveau_experience_id', message: t('candidate_settings.validation.experience_required') },
            { key: 'formation_juridique_id', message: t('candidate_settings.validation.education_required') },
            { key: 'salaire_id', message: t('candidate_settings.validation.salary_required') },
            { key: 'urgence_id', message: t('candidate_settings.validation.availability_required') },
        ];

        let hasErrors = false;

        requiredFields.forEach(({ key, message }) => {
            if (!profileForm.data[key]) {
                profileForm.setError(key, message);
                hasErrors = true;
            }
        });

        if (hasErrors) {
            return;
        }

        profileForm.put(updateProfileRoute.url(), {
            preserveScroll: true,
        });
    };

    const profileFieldClass = (field: keyof typeof profileForm.data) =>
        profileForm.errors[field]
            ? 'border-red-300 bg-red-50/40 focus:border-red-400'
            : 'border border-[#1a1f1e]/10 bg-white focus:border-[#C06041]';

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FDFCF8] text-[#1a1f1e]">
            <Head title={t('candidate_settings.page_title')} />

            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="mb-2 font-serif text-4xl font-bold italic">
                        {t('candidate_settings.page_heading')}
                    </h1>
                    <p className="font-medium text-[#1a1f1e]/50">
                        {t('candidate_settings.page_description')}
                    </p>
                </div>

                {isPending && (
                    <div className="mb-12">
                        <PendingVerificationBanner
                            profileCompletion={profileCompletion}
                        />
                    </div>
                )}

                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Sidebar Tabs */}
                    <div className="flex-shrink-0 lg:w-64">
                        <nav className="flex gap-2 rounded-2xl bg-[#1a1f1e]/5 p-1 lg:flex-col">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === 'profile'
                                    ? 'bg-white text-[#1a1f1e] shadow-sm'
                                    : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                    }`}
                            >
                                <User className="h-4 w-4" />
                                {t('candidate_settings.tabs.profile')}
                            </button>
                            <button
                                onClick={() => setActiveTab('preferences')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === 'preferences'
                                    ? 'bg-white text-[#1a1f1e] shadow-sm'
                                    : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                    }`}
                            >
                                <MapPin className="h-4 w-4" />
                                {t('candidate_settings.tabs.preferences')}
                            </button>
                            <button
                                onClick={() => setActiveTab('experiences')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === 'experiences'
                                    ? 'bg-white text-[#1a1f1e] shadow-sm'
                                    : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                    }`}
                            >
                                <LayoutGrid className="h-4 w-4" />
                                {t('candidate_settings.tabs.experiences')}
                            </button>
                            <button
                                onClick={() => setActiveTab('formations')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === 'formations'
                                    ? 'bg-white text-[#1a1f1e] shadow-sm'
                                    : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                    }`}
                            >
                                <GraduationCap className="h-4 w-4" />
                                {t('candidate_settings.tabs.formations')}
                            </button>
                            <button
                                onClick={() => setActiveTab('specialisations')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === 'specialisations'
                                    ? 'bg-white text-[#1a1f1e] shadow-sm'
                                    : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                    }`}
                            >
                                <Folder className="h-4 w-4" />
                                {t('candidate_settings.tabs.specialisations')}
                            </button>
                            <button
                                onClick={() => setActiveTab('langues')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === 'langues'
                                    ? 'bg-white text-[#1a1f1e] shadow-sm'
                                    : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                    }`}
                            >
                                <Languages className="h-4 w-4" />
                                {t('candidate_settings.tabs.languages')}
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${activeTab === 'security'
                                    ? 'bg-white text-[#1a1f1e] shadow-sm'
                                    : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                    }`}
                            >
                                <ShieldCheck className="h-4 w-4" />
                                {t('candidate_settings.tabs.security')}
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
                                    {/* Info Form */}
                                    <section className="rounded-[28px] border border-[#1a1f1e]/5 bg-[#1a1f1e]/[0.02] p-6 sm:p-8">
                                        <form
                                            onSubmit={handleProfileSubmit}
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                        {t('candidate_settings.form.firstname')}
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
                                                        className={`w-full rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none focus:ring-0 ${profileFieldClass('prenom')}`}
                                                    />
                                                    {profileForm.errors.prenom && (
                                                        <p className="ml-1 text-xs font-bold text-red-500">
                                                            {profileForm.errors.prenom}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                        {t('candidate_settings.form.lastname')}
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
                                                        className={`w-full rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none focus:ring-0 ${profileFieldClass('nom')}`}
                                                    />
                                                    {profileForm.errors.nom && (
                                                        <p className="ml-1 text-xs font-bold text-red-500">
                                                            {profileForm.errors.nom}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                    {t('candidate_settings.form.email')}
                                                </label>
                                                <div className="relative">
                                                    <Mail className="absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 text-[#1a1f1e]/30" />
                                                    <input
                                                        type="email"
                                                        value={user.email || ''}
                                                        readOnly
                                                        className="w-full cursor-not-allowed rounded-2xl border border-[#1a1f1e]/10 bg-[#1a1f1e]/5 py-4 pr-5 pl-12 text-sm font-bold text-[#1a1f1e]/60 outline-none"
                                                    />
                                                </div>
                                                <p className="ml-1 text-xs font-medium text-[#1a1f1e]/40">
                                                    {t('candidate_settings.form.email_help')}
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                    {t('candidate_settings.form.phone')}
                                                </label>
                                                <PhoneInput
                                                    value={profileForm.data.telephone || ''}
                                                    onChange={(value) =>
                                                        profileForm.setData('telephone', value || '')
                                                    }
                                                    placeholder={t('candidate_settings.form.phone_placeholder')}
                                                    containerClassName="rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] focus-within:border-[#C06041]"
                                                    inputClassName="h-[50px] px-0 text-sm font-bold text-[#1a1f1e] placeholder:text-[#1a1f1e]/40"
                                                    searchPlaceholder={t('common.phone_country_search')}
                                                    aria-invalid={!!profileForm.errors.telephone}
                                                />
                                                {profileForm.errors.telephone && (
                                                    <p className="ml-1 text-xs font-bold text-red-500">
                                                        {profileForm.errors.telephone}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                    {t('candidate_settings.form.job_title')}
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
                                                        className={`w-full cursor-pointer appearance-none rounded-2xl py-4 pr-10 pl-12 text-sm font-bold transition-all outline-none focus:ring-0 ${profileFieldClass('poste_id')}`}
                                                    >
                                                        <option value="">
                                                            {t('candidate_settings.form.select_job')}
                                                        </option>
                                                        {useLoadingTaxonomy(postes) ? (
                                                            <option disabled>{t('candidate_settings.form.loading')}</option>
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
                                                    </select>
                                                </div>
                                                {profileForm.errors.poste_id && (
                                                    <p className="ml-1 text-xs font-bold text-red-500">
                                                        {profileForm.errors.poste_id}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                        {t('candidate_settings.form.experience_level')}
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
                                                        className={`w-full cursor-pointer appearance-none rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none focus:ring-0 ${profileFieldClass('niveau_experience_id')}`}
                                                    >
                                                        <option value="">
                                                            {t('candidate_settings.form.select_experience')}
                                                        </option>
                                                        {useLoadingTaxonomy(niveauExperiences) ? (
                                                            <option disabled>{t('candidate_settings.form.loading')}</option>
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
                                                    {profileForm.errors.niveau_experience_id && (
                                                        <p className="ml-1 text-xs font-bold text-red-500">
                                                            {profileForm.errors.niveau_experience_id}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                        {t('candidate_settings.form.education')}
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
                                                            className={`w-full cursor-pointer appearance-none rounded-2xl py-4 pr-10 pl-12 text-sm font-bold transition-all outline-none focus:ring-0 ${profileFieldClass('formation_juridique_id')}`}
                                                        >
                                                            <option value="">
                                                                {t('candidate_settings.form.select_education')}
                                                            </option>
                                                            {useLoadingTaxonomy(formationJuridiques) ? (
                                                                <option disabled>{t('candidate_settings.form.loading')}</option>
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
                                                    {profileForm.errors.formation_juridique_id && (
                                                        <p className="ml-1 text-xs font-bold text-red-500">
                                                            {profileForm.errors.formation_juridique_id}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                    {t('candidate_settings.form.salary')}
                                                </label>
                                                <select
                                                    value={profileForm.data.salaire_id}
                                                    onChange={(e) =>
                                                        profileForm.setData(
                                                            'salaire_id',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={`w-full cursor-pointer appearance-none rounded-2xl px-5 py-4 text-sm font-bold transition-all outline-none focus:ring-0 ${profileFieldClass('salaire_id')}`}
                                                >
                                                    <option value="">
                                                        {t('candidate_settings.form.select_salary')}
                                                    </option>
                                                    {useLoadingTaxonomy(salaires) ? (
                                                        <option disabled>{t('candidate_settings.form.loading')}</option>
                                                    ) : (
                                                        salaires.map((option) => (
                                                            <option key={option.id} value={option.id}>
                                                                {option.nom}
                                                            </option>
                                                        ))
                                                    )}
                                                </select>
                                                {profileForm.errors.salaire_id && (
                                                    <p className="ml-1 text-xs font-bold text-red-500">
                                                        {profileForm.errors.salaire_id}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="ml-1 text-xs font-black tracking-widest text-[#1a1f1e]/40 uppercase">
                                                    {t('candidate_settings.form.availability')}
                                                </label>
                                                <p className="ml-1 text-xs font-medium text-[#1a1f1e]/40">
                                                    {t('candidate_settings.form.availability_help')}
                                                </p>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {useLoadingTaxonomy(urgences) ? (
                                                        <p className="w-full py-4 text-center text-sm text-[#1a1f1e]/40">
                                                            {t('candidate_settings.form.loading')}
                                                        </p>
                                                    ) : (
                                                        urgences.map((option) => {
                                                            const isSelected =
                                                                String(profileForm.data.urgence_id) ===
                                                                String(option.id);

                                                            return (
                                                                <button
                                                                    key={option.id}
                                                                    type="button"
                                                                    onClick={() =>
                                                                        profileForm.setData(
                                                                            'urgence_id',
                                                                            option.id,
                                                                        )
                                                                    }
                                                                    className={`inline-flex items-center rounded-2xl border px-3.5 py-2.5 text-sm font-semibold transition-all ${
                                                                        isSelected
                                                                            ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white shadow-sm'
                                                                            : 'border-[#1a1f1e]/10 bg-white text-[#1a1f1e]/70 hover:border-[#1a1f1e]/30'
                                                                    }`}
                                                                >
                                                                    {option.nom}
                                                                </button>
                                                            );
                                                        })
                                                    )}
                                                </div>
                                                {profileForm.errors.urgence_id && (
                                                    <p className="ml-1 text-xs font-bold text-red-500">
                                                        {profileForm.errors.urgence_id}
                                                    </p>
                                                )}
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
                                                        {t('candidate_settings.form.active_visibility')}
                                                    </span>
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={profileForm.processing}
                                                    className="rounded-full bg-[#1a1f1e] px-8 py-3 text-xs font-black tracking-widest text-white uppercase transition-all hover:bg-[#343a38] disabled:cursor-not-allowed disabled:opacity-40"
                                                >
                                                    {t('candidate_settings.form.save')}
                                                </button>
                                            </div>
                                        </form>
                                    </section>
                                </motion.div>
                            )}

                            {activeTab === 'preferences' && (
                                <motion.div
                                    key="preferences"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <PreferencesSection
                                        villeTravails={villeTravails}
                                        modeTravails={modeTravails}
                                        typeTravails={typeTravails}
                                    />
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
                                                        {t('candidate_settings.security.standard')}
                                                    </h4>
                                                    <p className="mb-8 max-w-xs text-sm text-[#1a1f1e]/40">
                                                        {t('candidate_settings.security.standard_desc')}
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
                                                            ? t('candidate_settings.security.enabling')
                                                            : t('candidate_settings.security.enable_2fa')}
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
                                                                {t('candidate_settings.security.enabled')}
                                                            </div>
                                                            <div className="text-sm text-emerald-700/70">
                                                                {t('candidate_settings.security.enabled_desc')}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={
                                                                disableTwoFactor
                                                            }
                                                            className="ml-auto text-xs font-black tracking-widest text-red-500 uppercase transition-colors hover:text-red-700"
                                                        >
                                                            {t('candidate_settings.security.disable')}
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
