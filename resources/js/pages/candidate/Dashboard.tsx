import { Head } from '@inertiajs/react';
import DashboardHeader from '@/components/candidate/DashboardHeader';
import StatusCard from '@/components/candidate/StatusCard';
import ProfileGrid from '@/components/candidate/ProfileGrid';
import {
    User,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    LayoutGrid,
    Folder,
    BookOpen,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
    candidat: any;
    user: any;
}

export default function Dashboard({ candidat, user }: Props) {
    return (
        <div className="relative min-h-screen bg-[#FDFCF8] text-[#1a1f1e] overflow-x-hidden">
            <Head title="Espace Candidat - Jurijob" />

            {/* Grain Texture */}
            <div
                className="pointer-events-none fixed inset-0 z-[100] opacity-[0.25] mix-blend-multiply"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
            />

            <DashboardHeader />

            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    {/* Left Column: Core Dashboard Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* HERO SECTION */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#1a1f1e]/10 bg-white/50 backdrop-blur-sm px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#1a1f1e] shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Tableau de bord professionnel
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl font-serif italic">
                                Bonjour, {candidat?.prenom || 'Candidat'}
                            </h1>

                            <p className="max-w-xl text-lg font-medium text-[#1a1f1e]/50 leading-relaxed">
                                Votre profil est l'atout majeur de votre carrière juridique.
                                Gérez votre visibilité et gardez vos informations à jour
                                pour les recruteurs.
                            </p>
                        </motion.div>

                        {/* STATUS CARD */}
                        <StatusCard isActive={user.is_active} />

                        {/* PROFILE GRID */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#1a1f1e]/30">
                                    Aperçu de votre expertise
                                </h3>

                                <a
                                    href="/settings"
                                    className="flex items-center gap-1.5 text-xs font-bold hover:underline"
                                >
                                    Modifier mon profil
                                    <Search className="h-3 w-3" />
                                </a>
                            </div>

                            <ProfileGrid candidat={candidat} />
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="lg:sticky lg:top-24 space-y-8">
                            {/* PROFESSIONAL MINI CARD */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="rounded-[40px] border border-[#1a1f1e]/10 bg-[#1a1f1e] p-10 text-[#FDFCF8] shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 -mr-12 -mt-12 h-40 w-40 rounded-full bg-[#FDFCF8]/5 blur-3xl transition-all group-hover:bg-[#FDFCF8]/10" />

                                    <div className="relative flex flex-col items-center text-center">
                                        <div className="mb-6 h-24 w-24 overflow-hidden rounded-[24px] border-4 border-[#FDFCF8]/10 bg-[#FDFCF8] shadow-inner p-1">
                                            {candidat?.image_url ? (
                                                <img
                                                    src={`${import.meta.env.VITE_APP_URL}/candidat-profile-image/${candidat.image_url}`}
                                                    alt="Profile"
                                                    className="h-full w-full rounded-[18px] object-cover"
                                                />
                                            ) : (
                                                <img
                                                    src="/images/default_profile_image.avif"
                                                    alt="Default Profile"
                                                    className="h-full w-full rounded-[18px] object-cover"
                                                />
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold font-serif italic mb-1">
                                            {candidat?.prenom} {candidat?.nom}
                                        </h3>

                                        <p className="text-[#FDFCF8]/50 text-sm font-bold uppercase tracking-widest mb-8">
                                            {candidat?.poste_recherche || 'Juriste'}
                                        </p>

                                        <div className="w-full space-y-4 text-left border-t border-[#FDFCF8]/10 pt-8">
                                            <div className="flex items-center gap-4 text-sm font-medium">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDFCF8]/5">
                                                    <Mail className="h-4 w-4 opacity-70" />
                                                </div>
                                                <span className="truncate opacity-80">{user.email}</span>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm font-medium">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDFCF8]/5">
                                                    <Phone className="h-4 w-4 opacity-70" />
                                                </div>
                                                <span className="opacity-80">
                                                    {user.telephone || '+212 -- -- -- --'}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm font-medium">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDFCF8]/5">
                                                    <MapPin className="h-4 w-4 opacity-70" />
                                                </div>
                                                <span className="opacity-80">
                                                    Région {candidat?.ville_travails?.[0]?.ville || 'Maroc'}
                                                </span>
                                            </div>
                                        </div>

                                        <button className="mt-10 group/btn relative w-full overflow-hidden rounded-2xl bg-[#FDFCF8] py-4 text-sm font-black uppercase tracking-widest text-[#1a1f1e] transition-all hover:bg-white active:scale-95 shadow-lg shadow-black/20">
                                            <span className="relative z-10">Optimiser mon CV</span>
                                            <div className="absolute inset-0 z-0 bg-gradient-to-r from-emerald-50 to-white opacity-0 transition-opacity group-hover/btn:opacity-100" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* QUICK ACTIONS */}
                            <div className="rounded-[32px] border border-[#1a1f1e]/10 bg-white p-8 shadow-sm">
                                <h4 className="text-sm font-black uppercase tracking-widest text-[#1a1f1e]/30 mb-6">
                                    Paramètres rapides
                                </h4>

                                <div className="space-y-2">
                                    <a
                                        href="/settings"
                                        className="flex items-center justify-between rounded-2xl border border-transparent p-4 transition-all hover:bg-[#1a1f1e]/5 hover:border-[#1a1f1e]/10 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a1f1e]/5">
                                                <LayoutGrid className="h-5 w-5" />
                                            </div>
                                            <span className="text-sm font-bold">
                                                Compte & Sécurité
                                            </span>
                                        </div>
                                        <Search className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                    </a>

                                    <a
                                        href="/settings/profile"
                                        className="flex items-center justify-between rounded-2xl border border-transparent p-4 transition-all hover:bg-[#1a1f1e]/5 hover:border-[#1a1f1e]/10 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a1f1e]/5">
                                                <Folder className="h-5 w-5" />
                                            </div>
                                            <span className="text-sm font-bold">
                                                Expériences & Diplômes
                                            </span>
                                        </div>
                                        <Search className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                    </a>
                                </div>
                            </div>

                            {/* HELP CARD */}
                            <div className="rounded-[32px] bg-emerald-50 p-8 border border-emerald-100 group cursor-pointer transition-all hover:bg-emerald-100/50">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm mb-6">
                                    <BookOpen className="h-6 w-6" />
                                </div>

                                <h4 className="font-bold text-lg">
                                    Comment être sélectionné ?
                                </h4>

                                <p className="mt-2 text-sm text-[#1a1f1e]/60 leading-relaxed">
                                    Les recruteurs utilisent notre matching intelligent.
                                    Un profil complet augmente vos chances d'être contacté.
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                                    Lire le guide
                                    <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    );
}