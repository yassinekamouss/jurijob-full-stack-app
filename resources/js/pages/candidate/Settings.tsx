import { Head, useForm, usePage, Deferred, router } from '@inertiajs/react';
import DashboardHeader from '@/components/candidate/DashboardHeader';
import { 
    User, 
    Mail, 
    Phone, 
    Lock, 
    Camera, 
    ShieldCheck, 
    CheckCircle2, 
    AlertCircle,
    ChevronRight,
    Briefcase,
    GraduationCap,
    Eye,
    EyeOff,
    LayoutGrid,
    Folder,
    Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
    updateProfile as updateProfileRoute, 
    updateAccount as updateAccountRoute, 
    updateImage as updateImageRoute 
} from '@/routes/candidate/settings';
import { postes, niveauxExperience, formationsJuridiques } from '@/constants/options';
import ExperienceSection from '@/components/candidate/settings/ExperienceSection';
import FormationSection from '@/components/candidate/settings/FormationSection';
import SpecialisationSection from '@/components/candidate/settings/SpecialisationSection';
import LanguageSection from '@/components/candidate/settings/LanguageSection';

interface Props {
    candidat: any;
    user: any;
    experiences?: any[];
    formations?: any[];
    specialisations?: any[];
    langues?: any[];
}

type TabType = 'profile' | 'account' | 'experiences' | 'formations' | 'specialisations' | 'langues' | 'security';

export default function Settings({ candidat, user, experiences, formations, specialisations, langues }: Props) {
    const { flash } = usePage().props as any;
    const [activeTab, setActiveTab] = useState<TabType>('profile');
    const [visibleFlash, setVisibleFlash] = useState<{success?: string, error?: string} | null>(null);

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
        if (tab && ['profile', 'account', 'experiences', 'formations', 'specialisations', 'langues', 'security'].includes(tab)) {
            setActiveTab(tab);
        }
    }, []);
    const [showPassword, setShowPassword] = useState(false);

    const SectionSkeleton = () => (
        <div className="space-y-6 animate-pulse px-4 sm:px-0">
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <div className="h-6 w-48 bg-[#1a1f1e]/5 rounded-lg" />
                    <div className="h-4 w-64 bg-[#1a1f1e]/5 rounded-lg" />
                </div>
                <div className="h-10 w-32 bg-[#1a1f1e]/5 rounded-xl" />
            </div>
            <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 bg-white rounded-[24px] border border-[#1a1f1e]/10 p-6 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="h-12 w-12 rounded-2xl bg-[#1a1f1e]/5" />
                            <div className="space-y-2">
                                <div className="h-5 w-40 bg-[#1a1f1e]/5 rounded-md" />
                                <div className="h-4 w-32 bg-[#1a1f1e]/5 rounded-md" />
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
        poste_recherche: candidat?.poste_recherche || '',
        niveau_experience: candidat?.niveau_experience || '',
        formation_juridique: candidat?.formation_juridique || '',
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
            onSuccess: () => accountForm.reset('password', 'password_confirmation'),
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            imageForm.setData('image', file);
            // Auto submit image using router directly to avoid async setData issues
            router.post(updateImageRoute.url(), {
                _method: 'POST',
                image: file,
            }, {
                forceFormData: true,
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="relative min-h-screen bg-[#FDFCF8] text-[#1a1f1e] overflow-x-hidden">
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

            <main className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold font-serif italic mb-2">Paramètres du compte</h1>
                    <p className="text-[#1a1f1e]/50 font-medium">Gérez vos informations personnelles et la sécurité de votre accès.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Tabs */}
                    <div className="lg:w-64 flex-shrink-0">
                        <nav className="flex lg:flex-col gap-2 p-1 bg-[#1a1f1e]/5 rounded-2xl">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
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
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
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
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
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
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
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
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
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
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
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
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
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
                    <div className="flex-1 max-w-2xl">
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
                                    <section className="bg-white rounded-[32px] border border-[#1a1f1e]/10 p-8 shadow-sm">
                                        <div className="flex flex-col sm:flex-row items-center gap-8">
                                            <div className="relative group">
                                                <div className="h-24 w-24 rounded-[28px] overflow-hidden border-4 border-[#1a1f1e]/5 bg-[#1a1f1e]/5 ring-1 ring-[#1a1f1e]/10">
                                                    {candidat?.image_url ? (
                                                        <img 
                                                            src={`${import.meta.env.VITE_APP_URL}/candidate/profile-image/${candidat.id}`} 
                                                            alt="Avatar" 
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <img 
                                                            src="/images/default_profile_image.avif" 
                                                            alt="Default Avatar" 
                                                            className="h-full w-full object-cover opacity-60"
                                                        />
                                                    )}
                                                </div>
                                                <label className="absolute -bottom-2 -right-2 h-10 w-10 bg-[#1a1f1e] text-white rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                                                    <Camera className="h-5 w-5" />
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} disabled={imageForm.processing} />
                                                </label>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold font-serif italic mb-1">Photo de profil</h3>
                                                <p className="text-sm text-[#1a1f1e]/50 font-medium mb-3">Une photo professionnelle aide à établir la confiance.</p>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-[#1a1f1e]/30">JPG, PNG or WebP • Max 2MB</div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Info Form */}
                                    <section className="bg-white rounded-[32px] border border-[#1a1f1e]/10 p-8 shadow-sm">
                                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Prénom</label>
                                                    <input 
                                                        type="text" 
                                                        value={profileForm.data.prenom}
                                                        onChange={e => profileForm.setData('prenom', e.target.value)}
                                                        className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Nom</label>
                                                    <input 
                                                        type="text" 
                                                        value={profileForm.data.nom}
                                                        onChange={e => profileForm.setData('nom', e.target.value)}
                                                        className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Poste Recherché</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/30" />
                                                    <select 
                                                        value={profileForm.data.poste_recherche}
                                                        onChange={e => profileForm.setData('poste_recherche', e.target.value)}
                                                        className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] pl-12 pr-10 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                                                    >
                                                        <option value="">Choisir un poste</option>
                                                        {postes.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                        <option value="Autre">Autre</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Niveau d'expérience</label>
                                                    <select 
                                                        value={profileForm.data.niveau_experience}
                                                        onChange={e => profileForm.setData('niveau_experience', e.target.value)}
                                                        className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                                                    >
                                                        <option value="">Choisir un niveau</option>
                                                        {niveauxExperience.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Formation Majuscule</label>
                                                    <div className="relative">
                                                        <GraduationCap className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/30" />
                                                        <select 
                                                            value={profileForm.data.formation_juridique}
                                                            onChange={e => profileForm.setData('formation_juridique', e.target.value)}
                                                            className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] pl-12 pr-10 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                                                        >
                                                            <option value="">Choisir une formation</option>
                                                            {formationsJuridiques.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 flex items-center justify-between border-t border-[#1a1f1e]/5">
                                                <div className="flex items-center gap-3">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input 
                                                            type="checkbox" 
                                                            checked={profileForm.data.is_active}
                                                            onChange={e => profileForm.setData('is_active', e.target.checked)}
                                                            className="sr-only peer" 
                                                        />
                                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                                    </label>
                                                    <span className="text-sm font-bold">Activer ma visibilité</span>
                                                </div>

                                                <button 
                                                    type="submit" 
                                                    disabled={profileForm.processing || !profileForm.isDirty}
                                                    className="bg-[#1a1f1e] text-white px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#343a38] transition-all disabled:opacity-50"
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
                                    <Deferred data="experiences" fallback={<SectionSkeleton />}>
                                        <ExperienceSection experiences={experiences || []} />
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
                                    <Deferred data="formations" fallback={<SectionSkeleton />}>
                                        <FormationSection formations={formations || []} />
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
                                    <Deferred data="specialisations" fallback={<SectionSkeleton />}>
                                        <SpecialisationSection specialisations={specialisations || []} />
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
                                    <Deferred data="langues" fallback={<SectionSkeleton />}>
                                        <LanguageSection langues={langues || []} />
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
                                    <section className="bg-white rounded-[32px] border border-[#1a1f1e]/10 p-8 shadow-sm">
                                        <h3 className="text-xl font-bold font-serif italic mb-6">Informations de connexion</h3>
                                        <form onSubmit={handleAccountSubmit} className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Email professionnel</label>
                                                <div className="relative">
                                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/30" />
                                                    <input 
                                                        type="email" 
                                                        value={accountForm.data.email}
                                                        onChange={e => accountForm.setData('email', e.target.value)}
                                                        className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] pl-12 pr-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Téléphone</label>
                                                <div className="relative">
                                                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/30" />
                                                    <input 
                                                        type="tel" 
                                                        value={accountForm.data.telephone}
                                                        onChange={e => {
                                                            const val = e.target.value;
                                                            accountForm.setData('telephone', val);
                                                            if (val && !/^\+?[0-9]*$/.test(val)) {
                                                                accountForm.setError('telephone', 'Format: + et chiffres uniquement');
                                                            } else if (accountForm.errors.telephone === 'Format: + et chiffres uniquement') {
                                                                accountForm.clearErrors('telephone');
                                                            }
                                                        }}
                                                        className={`w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] pl-12 pr-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none ${accountForm.errors.telephone ? 'border-red-300 ring-red-50' : ''}`}
                                                    />
                                                </div>
                                                {accountForm.errors.telephone && <p className="text-xs text-red-500 font-bold ml-1">{accountForm.errors.telephone}</p>}
                                            </div>

                                            <div className="pt-6 border-t border-[#1a1f1e]/5">
                                                <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[#1a1f1e]/30 mb-6 italic">Modification du mot de passe</h4>
                                                
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Nouveau mot de passe</label>
                                                        <div className="relative">
                                                            <input 
                                                                type={showPassword ? "text" : "password"} 
                                                                value={accountForm.data.password}
                                                                onChange={e => accountForm.setData('password', e.target.value)}
                                                                className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none"
                                                            />
                                                            <button 
                                                                type="button" 
                                                                onClick={() => setShowPassword(!showPassword)}
                                                                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#1a1f1e]/30 hover:text-[#1a1f1e]/60"
                                                            >
                                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 ml-1">Confirmation</label>
                                                        <input 
                                                            type={showPassword ? "text" : "password"} 
                                                            value={accountForm.data.password_confirmation}
                                                            onChange={e => accountForm.setData('password_confirmation', e.target.value)}
                                                            className="w-full rounded-2xl border-[#1a1f1e]/10 bg-[#FDFCF8] px-5 py-4 text-sm font-bold focus:border-[#C06041] focus:ring-0 transition-all outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-4 flex justify-end">
                                                <button 
                                                    type="submit" 
                                                    disabled={accountForm.processing || !accountForm.isDirty}
                                                    className="bg-[#1a1f1e] text-white px-8 py-3 rounded-xl text-sm font-black uppercase tracking-widest hover:bg-[#343a38] transition-all disabled:opacity-50"
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
                                    <section className="bg-white rounded-[32px] border border-[#1a1f1e]/10 p-8 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 -mr-12 -mt-12 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl" />
                                        
                                        <div className="relative">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-8">
                                                <ShieldCheck className="h-7 w-7" />
                                            </div>

                                            <h3 className="text-2xl font-bold font-serif italic mb-2">Double Authentification (2FA)</h3>
                                            <p className="text-[#1a1f1e]/50 font-medium mb-8 max-w-md">Ajoutez une couche de sécurité supplémentaire à votre compte en demandant un code de vérification à chaque connexion.</p>

                                            <div className="flex flex-col gap-4">
                                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDFCF8] border border-[#1a1f1e]/5 opacity-60 grayscale cursor-not-allowed">
                                                    <div className="mt-1 h-5 w-5 rounded-full bg-[#1a1f1e]/10 flex items-center justify-center">
                                                        <div className="h-2 w-2 rounded-full bg-[#1a1f1e]/30" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-sm">Application d'authentification</div>
                                                        <div className="text-xs text-[#1a1f1e]/40">Utilisez Google Authenticator ou Authy.</div>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <span className="text-[10px] font-black bg-[#1a1f1e]/5 px-2 py-1 rounded-md text-[#1a1f1e]/40 uppercase tracking-widest">Bientôt</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDFCF8] border border-[#1a1f1e]/5 opacity-60 grayscale cursor-not-allowed">
                                                    <div className="mt-1 h-5 w-5 rounded-full bg-[#1a1f1e]/10 flex items-center justify-center">
                                                        <div className="h-2 w-2 rounded-full bg-[#1a1f1e]/30" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-sm">Authentification par SMS</div>
                                                        <div className="text-xs text-[#1a1f1e]/40">Recevez un code sur votre téléphone.</div>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <span className="text-[10px] font-black bg-[#1a1f1e]/5 px-2 py-1 rounded-md text-[#1a1f1e]/40 uppercase tracking-widest">Bientôt</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-10 p-6 rounded-3xl bg-[#1a1f1e] text-[#FDFCF8] relative overflow-hidden group">
                                               <div className="relative z-10 flex items-center justify-between">
                                                    <div>
                                                        <div className="font-serif italic text-lg mb-1">Passer à la sécurité supérieure</div>
                                                        <div className="text-xs opacity-50 font-bold uppercase tracking-widest">Action requise prochainement</div>
                                                    </div>
                                                    <ChevronRight className="h-6 w-6 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                               </div>
                                               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
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
                            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-fit"
                        >
                            <div className="flex items-center gap-3 bg-[#1a1f1e] text-white px-6 py-4 rounded-[20px] shadow-2xl border border-white/10 backdrop-blur-md">
                                <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
                                    <CheckCircle2 className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-bold tracking-tight whitespace-nowrap">{visibleFlash?.success}</span>
                            </div>
                        </motion.div>
                    )}

                    {visibleFlash?.error && (
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-fit"
                        >
                            <div className="flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-[20px] shadow-2xl border border-white/10 backdrop-blur-md">
                                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <AlertCircle className="h-5 w-5" />
                                </div>
                                <span className="text-sm font-bold tracking-tight whitespace-nowrap">{visibleFlash.error}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
        </div>
    );
}
