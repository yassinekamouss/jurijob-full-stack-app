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
    ShieldCheck,
    ShieldAlert,
    Building,
} from 'lucide-react';
import { useState, useEffect } from 'react';

import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';

interface Props {
    recruteur: any;
    user: any;
}

type TabType = 'profile' | 'security';

export default function Settings({ recruteur, user }: Props) {
    const [activeTab, setActiveTab] = useState<TabType>('profile');

    const { data, setData, put, processing, errors } = useForm({
        nom_entreprise: recruteur?.nom_entreprise || '',
        poste: recruteur?.poste || '',
        type_organisation: recruteur?.type_organisation || '',
        taille_entreprise: recruteur?.taille_entreprise || '',
        site_web: recruteur?.site_web || '',
        ville: recruteur?.ville || '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put('/recruteur/settings/profile', {
            preserveScroll: true,
        });
    };

    // 2FA logic
    const { auth } = usePage().props as any;
    const isTwoFactorEnabled = !!user?.two_factor_confirmed_at;

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
            <Head title="Paramètres Recruteur - Jurijob" />

            {/* Grain Texture */}
            <div
                className="pointer-events-none fixed inset-0 z-[100] opacity-[0.25] mix-blend-multiply"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
            />

            <main className="relative z-10 mx-auto max-w-5xl px-4 pt-12 pb-20 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <Link
                        href="/recruteur/dashboard"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#1a1f1e]/50 transition-colors hover:text-[#1a1f1e]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Retour au tableau de bord
                    </Link>
                    <h1 className="mb-2 font-serif text-4xl font-bold text-blue-900 italic">
                        Paramètres de l'entreprise
                    </h1>
                    <p className="font-medium text-[#1a1f1e]/50">
                        Gérez vos informations d'entreprise et la sécurité de
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
                                <Building className="h-4 w-4" />
                                Profil Entreprise
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
                                Sécurité & 2FA
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
                                    <section className="relative overflow-hidden rounded-[32px] border border-[#1a1f1e]/10 bg-white p-8 shadow-sm">
                                        <form
                                            onSubmit={submit}
                                            className="relative z-10 space-y-8"
                                        >
                                            <div className="grid gap-6 sm:grid-cols-2">
                                                {/* Nom de l'entreprise */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <Building2 className="h-4 w-4 opacity-50" />
                                                        Nom de l'entreprise *
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
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-[#FDFCF8] px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
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
                                                        Votre Poste *
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
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-[#FDFCF8] px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
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
                                                        Type d'organisation *
                                                    </label>
                                                    <select
                                                        value={
                                                            data.type_organisation
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'type_organisation',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-[#FDFCF8] px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Sélectionner le type
                                                        </option>
                                                        <option value="Cabinet d'avocats">
                                                            Cabinet d'avocats
                                                        </option>
                                                        <option value="Entreprise (Direction juridique)">
                                                            Entreprise
                                                            (Direction
                                                            juridique)
                                                        </option>
                                                        <option value="Etude de notaire">
                                                            Etude de notaire
                                                        </option>
                                                        <option value="Cabinet de recrutement">
                                                            Cabinet de
                                                            recrutement
                                                        </option>
                                                        <option value="Autre">
                                                            Autre
                                                        </option>
                                                    </select>
                                                    {errors.type_organisation && (
                                                        <div className="text-xs text-red-500">
                                                            {
                                                                errors.type_organisation
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Taille de l'entreprise */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <Users className="h-4 w-4 opacity-50" />
                                                        Taille de l'entreprise *
                                                    </label>
                                                    <select
                                                        value={
                                                            data.taille_entreprise
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'taille_entreprise',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-[#FDFCF8] px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                        required
                                                    >
                                                        <option
                                                            value=""
                                                            disabled
                                                        >
                                                            Sélectionner la
                                                            taille
                                                        </option>
                                                        <option value="1-10">
                                                            1-10 employés
                                                        </option>
                                                        <option value="11-50">
                                                            11-50 employés
                                                        </option>
                                                        <option value="51-200">
                                                            51-200 employés
                                                        </option>
                                                        <option value="201-500">
                                                            201-500 employés
                                                        </option>
                                                        <option value="500+">
                                                            Plus de 500 employés
                                                        </option>
                                                    </select>
                                                    {errors.taille_entreprise && (
                                                        <div className="text-xs text-red-500">
                                                            {
                                                                errors.taille_entreprise
                                                            }
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Ville */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <MapPin className="h-4 w-4 opacity-50" />
                                                        Ville *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={data.ville}
                                                        onChange={(e) =>
                                                            setData(
                                                                'ville',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-[#FDFCF8] px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                        required
                                                    />
                                                    {errors.ville && (
                                                        <div className="text-xs text-red-500">
                                                            {errors.ville}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Site Web */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-bold">
                                                        <Globe className="h-4 w-4 opacity-50" />
                                                        Site Web (Optionnel)
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
                                                        className="w-full rounded-xl border border-[#1a1f1e]/10 bg-[#FDFCF8] px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                    />
                                                    {errors.site_web && (
                                                        <div className="text-xs text-red-500">
                                                            {errors.site_web}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex justify-end border-t border-[#1a1f1e]/10 pt-6">
                                                <button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="inline-flex items-center gap-2 rounded-xl bg-[#1a1f1e] px-8 py-3 text-sm font-black tracking-widest text-white uppercase transition-all hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
                                                >
                                                    <Save className="h-4 w-4" />
                                                    Enregistrer les
                                                    modifications
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
