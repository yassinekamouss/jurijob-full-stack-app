import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Save,
    Building2,
    Briefcase,
    Globe,
    MapPin,
    Users,
    User,
    ShieldCheck,
    ShieldAlert,
    Building,
    Loader2,
    Check,
    Phone,
    Mail,
} from 'lucide-react';
import type { FormEvent } from 'react';
import { useState, useEffect, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import DashboardHeader from '@/components/recruiter/DashboardHeader';
import ProfileCompletionBanner from '@/components/recruiter/ProfileCompletionBanner';
import type { RecruiterProfileCompletion } from '@/components/recruiter/ProfileCompletionBanner';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { PhoneInput } from '@/components/ui/phone-input';
import {
    useTaxonomies,
    useLoadingTaxonomy,
    getTaxonomyLabel,
} from '@/hooks/use-taxonomies';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';

interface Props {
    recruteur: any;
    user: any;
    profileCompletion?: RecruiterProfileCompletion;
}

type TabType = 'profile' | 'security';

export default function Settings({
    recruteur,
    user,
    profileCompletion,
}: Props) {
    const { t } = useTranslation();
    const { typeOrganisations, tailleEntreprises, pays, villes } =
        useTaxonomies();
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    const [selectedPaysId, setSelectedPaysId] = useState<string>('');

    const { data, setData, put, processing, recentlySuccessful, errors } =
        useForm({
            nom_entreprise: recruteur?.nom_entreprise || '',
            poste: recruteur?.poste || '',
            type_organisation_id: recruteur?.type_organisation_id || '',
            taille_entreprise_id: recruteur?.taille_entreprise_id || '',
            site_web: recruteur?.site_web || '',
            ville_id: recruteur?.ville_id || '',
            telephone: user.telephone || '',
        });

    useEffect(() => {
        if (selectedPaysId || !data.ville_id || villes.length === 0) {
            return;
        }

        const selectedCity = villes.find(
            (ville) => String(ville.id) === String(data.ville_id),
        );

        if (selectedCity?.pays_id) {
            setSelectedPaysId(String(selectedCity.pays_id));
        }
    }, [data.ville_id, selectedPaysId, villes]);

    const citiesForCountry = useMemo(() => {
        if (!selectedPaysId) {
            return [];
        }

        return villes.filter(
            (ville) => String(ville.pays_id) === String(selectedPaysId),
        );
    }, [selectedPaysId, villes]);

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put('/recruteur/settings/profile', {
            preserveScroll: true,
        });
    };

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
        errors: tfErrors,
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
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab') as TabType;

        if (tab && ['profile', 'security'].includes(tab)) {
            setActiveTab(tab);
        }
    }, []);

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FDFCF8] text-[#1a1f1e]">
            <Head title={t('recruiter_settings.page_title')} />

            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <Link
                        href="/recruteur/dashboard"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1a1f1e]/50 transition-colors hover:text-[#1a1f1e]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t('recruiter_settings.back_to_dashboard')}
                    </Link>
                    <h1 className="font-serif text-4xl font-bold tracking-tight italic md:text-5xl">
                        {t('recruiter_settings.page_header')}
                    </h1>
                    <p className="font-medium text-[#1a1f1e]/50">
                        {t('recruiter_settings.page_desc')}
                    </p>
                </div>

                <div className="mb-10">
                    <ProfileCompletionBanner
                        profileCompletion={profileCompletion}
                    />
                </div>

                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Sidebar Tabs */}
                    <div className="w-full flex-shrink-0 lg:w-64">
                        <nav className="flex w-full gap-2 overflow-x-auto rounded-2xl bg-[#1a1f1e]/5 p-1 lg:flex-col lg:overflow-visible">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex flex-1 items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-bold whitespace-nowrap transition-all lg:flex-none lg:justify-start ${
                                    activeTab === 'profile'
                                        ? 'bg-white text-[#1a1f1e] shadow-sm'
                                        : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                }`}
                            >
                                <Building className="h-4 w-4 flex-shrink-0" />
                                {t('recruiter_settings.tabs.profile')}
                            </button>

                            <button
                                onClick={() => setActiveTab('security')}
                                className={`flex flex-1 items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-bold whitespace-nowrap transition-all lg:flex-none lg:justify-start ${
                                    activeTab === 'security'
                                        ? 'bg-white text-[#1a1f1e] shadow-sm'
                                        : 'text-[#1a1f1e]/40 hover:text-[#1a1f1e]/60'
                                }`}
                            >
                                <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                                {t('recruiter_settings.tabs.security')}
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
                                    <section className="relative overflow-hidden rounded-xl border border-[#1a1f1e]/5 bg-[#1a1f1e]/[0.02] p-8 shadow-sm">
                                        <form
                                            onSubmit={submit}
                                            className="relative z-10 space-y-8"
                                        >
                                            <div className="grid gap-6 sm:grid-cols-2">
                                                {/* Nom de l'entreprise */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <Building2 className="h-4 w-4 opacity-50" />
                                                        {t(
                                                            'recruiter_settings.form.company_name',
                                                        )}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            data.nom_entreprise
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'nom_entreprise',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                        placeholder={t(
                                                            'recruiter_settings.form.company_name_placeholder',
                                                        )}
                                                        required
                                                    />
                                                    {errors.nom_entreprise && (
                                                        <div className="text-xs text-red-500">
                                                            {
                                                                errors.nom_entreprise
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Poste */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <Briefcase className="h-4 w-4 opacity-50" />
                                                        {t(
                                                            'recruiter_settings.form.job_title',
                                                        )}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.poste}
                                                        onChange={(e) =>
                                                            setData(
                                                                'poste',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                        placeholder={t(
                                                            'recruiter_settings.form.job_title_placeholder',
                                                        )}
                                                        required
                                                    />
                                                    {errors.poste && (
                                                        <div className="text-xs text-red-500">
                                                            {errors.poste}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Type d'organisation */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <Building2 className="h-4 w-4 opacity-50" />
                                                        {t(
                                                            'recruiter_settings.form.org_type',
                                                        )}
                                                    </label>
                                                    <select
                                                        value={
                                                            data.type_organisation_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'type_organisation_id',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            {t(
                                                                'recruiter_settings.form.select_type',
                                                            )}
                                                        </option>
                                                        {useLoadingTaxonomy(
                                                            typeOrganisations,
                                                        ) ? (
                                                            <option disabled>
                                                                {t(
                                                                    'recruiter_settings.form.loading',
                                                                )}
                                                            </option>
                                                        ) : (
                                                            typeOrganisations.map(
                                                                (opt) => (
                                                                    <option
                                                                        key={
                                                                            opt.id
                                                                        }
                                                                        value={
                                                                            opt.id
                                                                        }
                                                                    >
                                                                        {
                                                                            opt.nom
                                                                        }
                                                                    </option>
                                                                ),
                                                            )
                                                        )}
                                                    </select>
                                                    {errors.type_organisation_id && (
                                                        <div className="text-xs text-red-500">
                                                            {
                                                                errors.type_organisation_id
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Taille de l'entreprise */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <Users className="h-4 w-4 opacity-50" />
                                                        {t(
                                                            'recruiter_settings.form.company_size',
                                                        )}
                                                    </label>
                                                    <select
                                                        value={
                                                            data.taille_entreprise_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'taille_entreprise_id',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            {t(
                                                                'recruiter_settings.form.select_size',
                                                            )}
                                                        </option>
                                                        {useLoadingTaxonomy(
                                                            tailleEntreprises,
                                                        ) ? (
                                                            <option disabled>
                                                                {t(
                                                                    'recruiter_settings.form.loading',
                                                                )}
                                                            </option>
                                                        ) : (
                                                            tailleEntreprises.map(
                                                                (opt) => (
                                                                    <option
                                                                        key={
                                                                            opt.id
                                                                        }
                                                                        value={
                                                                            opt.id
                                                                        }
                                                                    >
                                                                        {
                                                                            opt.nom
                                                                        }
                                                                    </option>
                                                                ),
                                                            )
                                                        )}
                                                    </select>
                                                    {errors.taille_entreprise_id && (
                                                        <div className="text-xs text-red-500">
                                                            {
                                                                errors.taille_entreprise_id
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Pays + Ville */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <MapPin className="h-4 w-4 opacity-50" />
                                                        {t(
                                                            'recruiter_settings.form.country',
                                                        )}
                                                    </label>
                                                    <select
                                                        value={selectedPaysId}
                                                        onChange={(e) => {
                                                            setSelectedPaysId(
                                                                e.target.value,
                                                            );
                                                            setData(
                                                                'ville_id',
                                                                '',
                                                            );
                                                        }}
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            {t(
                                                                'recruiter_settings.form.select_country',
                                                            )}
                                                        </option>
                                                        {useLoadingTaxonomy(
                                                            pays,
                                                        ) ? (
                                                            <option disabled>
                                                                {t(
                                                                    'recruiter_settings.form.loading',
                                                                )}
                                                            </option>
                                                        ) : (
                                                            pays.map((opt) => (
                                                                <option
                                                                    key={opt.id}
                                                                    value={
                                                                        opt.id
                                                                    }
                                                                >
                                                                    {opt.nom}
                                                                </option>
                                                            ))
                                                        )}
                                                    </select>
                                                </div>

                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <MapPin className="h-4 w-4 opacity-50" />
                                                        {t(
                                                            'recruiter_settings.form.city',
                                                        )}
                                                    </label>
                                                    <select
                                                        value={data.ville_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                'ville_id',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                        required
                                                        disabled={
                                                            !selectedPaysId
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            {selectedPaysId
                                                                ? t(
                                                                      'recruiter_settings.form.select_city',
                                                                  )
                                                                : t(
                                                                      'recruiter_settings.form.select_country_first',
                                                                  )}
                                                        </option>
                                                        {useLoadingTaxonomy(
                                                            villes,
                                                        ) ? (
                                                            <option disabled>
                                                                {t(
                                                                    'recruiter_settings.form.loading',
                                                                )}
                                                            </option>
                                                        ) : (
                                                            citiesForCountry.map(
                                                                (opt) => (
                                                                    <option
                                                                        key={
                                                                            opt.id
                                                                        }
                                                                        value={
                                                                            opt.id
                                                                        }
                                                                    >
                                                                        {
                                                                            opt.nom
                                                                        }
                                                                    </option>
                                                                ),
                                                            )
                                                        )}
                                                    </select>
                                                    {errors.ville_id && (
                                                        <div className="text-xs text-red-500">
                                                            {errors.ville_id}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Site Web */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <Globe className="h-4 w-4 opacity-50" />
                                                        {t(
                                                            'recruiter_settings.form.website',
                                                        )}
                                                    </label>
                                                    <input
                                                        type="url"
                                                        value={data.site_web}
                                                        onChange={(e) =>
                                                            setData(
                                                                'site_web',
                                                                e.target.value,
                                                            )
                                                        }
                                                        placeholder="https://www.exemple.com"
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                    />
                                                    {errors.site_web && (
                                                        <div className="text-xs text-red-500">
                                                            {errors.site_web}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Téléphone */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <Phone className="h-4 w-4 opacity-50" />
                                                        {t(
                                                            'recruiter_settings.form.phone',
                                                        )}
                                                    </label>
                                                    <PhoneInput
                                                        value={data.telephone}
                                                        onChange={(value) =>
                                                            setData(
                                                                'telephone',
                                                                value || '',
                                                            )
                                                        }
                                                        placeholder={t(
                                                            'recruiter_settings.form.phone_placeholder',
                                                        )}
                                                        containerClassName="rounded-xl border-[#1a1f1e]/10 bg-[#FDFCF8] focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500"
                                                        inputClassName="h-11 px-0 text-sm"
                                                        searchPlaceholder={t(
                                                            'common.phone_country_search',
                                                        )}
                                                        aria-invalid={
                                                            !!errors.telephone
                                                        }
                                                    />
                                                    {errors.telephone && (
                                                        <div className="text-xs text-red-500">
                                                            {errors.telephone}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Email */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <Mail className="h-4 w-4 opacity-50" />
                                                        {t(
                                                            'recruiter_settings.form.email',
                                                        )}
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type="email"
                                                            value={
                                                                user.email || ''
                                                            }
                                                            readOnly
                                                            className="w-full cursor-not-allowed rounded-xl border border-[#1a1f1e]/10 bg-[#1a1f1e]/5 py-3 pr-4 pl-10 text-sm font-bold text-[#1a1f1e]/60 outline-none"
                                                        />
                                                        <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#1a1f1e]/30" />
                                                    </div>
                                                    <p className="text-xs font-medium text-[#1a1f1e]/40">
                                                        {t(
                                                            'recruiter_settings.form.email_help',
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex justify-end border-t border-[#1a1f1e]/10 pt-6">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className={`group relative inline-flex min-w-[220px] items-center justify-center overflow-hidden rounded-xl px-8 py-3.5 text-xs font-black tracking-widest uppercase shadow-sm transition-all duration-300 ${
                                                        recentlySuccessful
                                                            ? 'bg-emerald-700 text-white shadow-emerald-900/20'
                                                            : processing
                                                              ? 'cursor-wait bg-[#1a1f1e]/85 text-white/90'
                                                              : 'bg-[#1a1f1e] text-white hover:bg-[#343a38] active:scale-[0.98]'
                                                    } disabled:pointer-events-none`}
                                                >
                                                    {processing && (
                                                        <motion.div
                                                            initial={{
                                                                x: '-100%',
                                                            }}
                                                            animate={{
                                                                x: '100%',
                                                            }}
                                                            transition={{
                                                                repeat: Infinity,
                                                                duration: 1.2,
                                                                ease: 'linear',
                                                            }}
                                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                                                        />
                                                    )}
                                                    <AnimatePresence mode="wait">
                                                        {processing ? (
                                                            <motion.span
                                                                key="saving"
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 5,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                }}
                                                                exit={{
                                                                    opacity: 0,
                                                                    y: -5,
                                                                }}
                                                                className="inline-flex items-center gap-2.5"
                                                            >
                                                                <Loader2 className="h-4 w-4 animate-spin text-[#C06041]" />
                                                                <span>
                                                                    {t(
                                                                        'recruiter_settings.form.saving',
                                                                        'Enregistrement...',
                                                                    )}
                                                                </span>
                                                            </motion.span>
                                                        ) : recentlySuccessful ? (
                                                            <motion.span
                                                                key="saved"
                                                                initial={{
                                                                    opacity: 0,
                                                                    scale: 0.9,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    scale: 1,
                                                                }}
                                                                exit={{
                                                                    opacity: 0,
                                                                    scale: 0.9,
                                                                }}
                                                                className="inline-flex items-center gap-2.5 text-emerald-100"
                                                            >
                                                                <Check className="h-4 w-4 stroke-[3] text-emerald-300" />
                                                                <span>
                                                                    {t(
                                                                        'recruiter_settings.form.saved',
                                                                        'Modifications enregistrées !',
                                                                    )}
                                                                </span>
                                                            </motion.span>
                                                        ) : (
                                                            <motion.span
                                                                key="idle"
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 5,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                }}
                                                                exit={{
                                                                    opacity: 0,
                                                                    y: -5,
                                                                }}
                                                                className="inline-flex items-center gap-2.5"
                                                            >
                                                                <Save className="h-4 w-4 transition-transform group-hover:scale-110" />
                                                                <span>
                                                                    {t(
                                                                        'recruiter_settings.form.save',
                                                                    )}
                                                                </span>
                                                            </motion.span>
                                                        )}
                                                    </AnimatePresence>
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
                                                        {t(
                                                            'recruiter_settings.security.title_standard',
                                                        )}
                                                    </h4>
                                                    <p className="mb-8 max-w-xs text-sm text-[#1a1f1e]/40">
                                                        {t(
                                                            'recruiter_settings.security.desc_standard',
                                                        )}
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
                                                            ? t(
                                                                  'recruiter_settings.security.btn_enabling',
                                                              )
                                                            : t(
                                                                  'recruiter_settings.security.btn_enable',
                                                              )}
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
                                                                {t(
                                                                    'recruiter_settings.security.title_active',
                                                                )}
                                                            </div>
                                                            <div className="text-sm text-emerald-700/70">
                                                                {t(
                                                                    'recruiter_settings.security.desc_active',
                                                                )}
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={
                                                                disableTwoFactor
                                                            }
                                                            className="ml-auto text-xs font-black tracking-widest text-red-500 uppercase transition-colors hover:text-red-700"
                                                        >
                                                            {t(
                                                                'recruiter_settings.security.btn_disable',
                                                            )}
                                                        </button>
                                                    </div>

                                                    <TwoFactorRecoveryCodes
                                                        recoveryCodesList={
                                                            recoveryCodesList
                                                        }
                                                        fetchRecoveryCodes={
                                                            fetchRecoveryCodes
                                                        }
                                                        errors={tfErrors}
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
                                            errors={tfErrors}
                                        />
                                    </section>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}
