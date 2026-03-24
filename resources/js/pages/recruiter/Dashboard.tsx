import { Head, Link } from '@inertiajs/react';
import {
    Buil motion } from 'framer-motion';
import {ding2,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    Search,
    LogOut,
    Settings,
    Briefcase,
} from 'lucide-react';
import { motion } frents/recruiter/DashboardHeader';

interface Props {
    recruteur: any;
    user: any;
}

export default function Dashboard({ recruteur, user }: Props) {
    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FDFCF8] text-[#1a1f1e]">
            <Head title="Espace Recruteur - Jurijob" />

            {/* Grain Texture */}
            <div
                className="pointer-events-none fixed inset-0 z-[100] opacity-[0.25] mix-blend-multiply"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
            />

            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                    {/* Left Column: Core Dashboard Content */}
                    <div className="space-y-12 lg:col-span-8">
                        {/* HERO SECTION */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#1a1f1e]/10 bg-white/50 px-4 py-1.5 text-[10px] font-black tracking-widest text-[#1a1f1e] uppercase shadow-sm backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                                </span>
                                Interface Recruteur
                            </div>

                            <h1 className="font-serif text-4xl font-bold tracking-tight italic md:text-5xl lg:text-6xl">
                                Bienvenue,{' '}
                                {recruteur?.nom_entreprise || 'Recruteur'}
                            </h1>

                            <p className="max-w-xl text-lg leading-relaxed font-medium text-[#1a1f1e]/50">
                                Trouvez les meilleurs talents juridiques pour
                                votre entreprise. Gérez vos offres et découvrez
                                les profils qui correspondent à vos besoins.
                            </p>
                        </motion.div>

                        {/* STATUS CARD (Similar to candidate, but for recruiter) */}
                        <div className="relative overflow-hidden rounded-[32px] border border-[#1a1f1e]/10 bg-white p-8 shadow-sm">
                            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`h-3 w-3 rounded-full ${user.is_active ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)]' : 'bg-amber-500'}`}
                                        />
                                        <h3 className="text-lg font-bold">
                                            {user.is_active
                                                ? 'Compte Actif'
                                                : 'Compte en attente'}
                                        </h3>
                                    </div>
                                    <p className="max-w-md text-sm font-medium text-[#1a1f1e]/50">
                                        {user.is_active
                                            ? 'Votre compte est validé. Vous pouvez dès à présent consulter les profils.'
                                            : 'Veuillez compléter votre profil pour profiter de toutes les fonctionnalités.'}
                                    </p>
                                </div>

                                <Link
                                    href="/recruteur/settings"
                                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#1a1f1e] px-8 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-[#1a1f1e]/90 active:scale-95"
                                >
                                    Mettre à jour le profil
                                </Link>
                            </div>
                        </div>

                        {/* COMPANY INFO GRID */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-sm font-black tracking-[0.2em] text-[#1a1f1e]/30 uppercase">
                                    Informations de l'entreprise
                                </h3>

                                <Link
                                    href="/recruteur/settings"
                                    className="flex items-center gap-1.5 text-xs font-bold hover:underline"
                                >
                                    Modifier
                                    <Search className="h-3 w-3" />
                                </Link>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-3xl border border-[#1a1f1e]/10 bg-white p-6 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                            <Building2 className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="mb-1 text-xs font-bold tracking-wider text-[#1a1f1e]/50 uppercase">
                                                Type d'organisation
                                            </p>
                                            <p className="font-semibold">
                                                {recruteur?.type_organisation ||
                                                    'Non défini'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-3xl border border-[#1a1f1e]/10 bg-white p-6 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
                                            <Briefcase className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <p className="mb-1 text-xs font-bold tracking-wider text-[#1a1f1e]/50 uppercase">
                                                Taille de l'entreprise
                                            </p>
                                            <p className="font-semibold">
                                                {recruteur?.taille_entreprise ||
                                                    'Non défini'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="space-y-8 lg:sticky lg:top-24">
                            {/* PROFESSIONAL MINI CARD */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className="group relative overflow-hidden rounded-[40px] border border-[#1a1f1e]/10 bg-[#1a1f1e] p-10 text-[#FDFCF8] shadow-2xl">
                                    <div className="absolute top-0 right-0 -mt-12 -mr-12 h-40 w-40 rounded-full bg-[#FDFCF8]/5 blur-3xl transition-all group-hover:bg-[#FDFCF8]/10" />

                                    <div className="relative flex flex-col items-center text-center">
                                        <div className="mb-6 h-24 w-24 overflow-hidden rounded-[24px] border-4 border-[#FDFCF8]/10 bg-[#FDFCF8] p-1 shadow-inner">
                                            <div className="flex h-full w-full items-center justify-center rounded-[18px] bg-white text-[#1a1f1e]">
                                                <Building2 className="h-10 w-10 opacity-50" />
                                            </div>
                                        </div>

                                        <h3 className="mb-1 font-serif text-2xl font-bold italic">
                                            {recruteur?.nom_entreprise ||
                                                'Entreprise'}
                                        </h3>

                                        <p className="mb-8 text-sm font-bold tracking-widest text-[#FDFCF8]/50 uppercase">
                                            {recruteur?.poste || 'Recruteur'}
                                        </p>

                                        <div className="w-full space-y-4 border-t border-[#FDFCF8]/10 pt-8 text-left">
                                            <div className="flex items-center gap-4 text-sm font-medium">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDFCF8]/5">
                                                    <Mail className="h-4 w-4 opacity-70" />
                                                </div>
                                                <span className="truncate opacity-80">
                                                    {user.email}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm font-medium">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDFCF8]/5">
                                                    <Phone className="h-4 w-4 opacity-70" />
                                                </div>
                                                <span className="opacity-80">
                                                    {user.telephone ||
                                                        '+212 -- -- -- --'}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm font-medium">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDFCF8]/5">
                                                    <MapPin className="h-4 w-4 opacity-70" />
                                                </div>
                                                <span className="opacity-80">
                                                    {recruteur?.ville ||
                                                        'Ville non définie'}
                                                </span>
                                            </div>

                                            {recruteur?.site_web && (
                                                <div className="flex items-center gap-4 text-sm font-medium">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDFCF8]/5">
                                                        <ExternalLink className="h-4 w-4 opacity-70" />
                                                    </div>
                                                    <a
                                                        href={
                                                            recruteur.site_web
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="truncate opacity-80 hover:underline"
                                                    >
                                                        {recruteur.site_web.replace(
                                                            /^https?:\/\//,
                                                            '',
                                                        )}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* HELP CARD */}
                            <div className="group cursor-pointer rounded-[32px] border border-blue-100 bg-blue-50 p-8 transition-all hover:bg-blue-100/50">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                                    <Building2 className="h-6 w-6" />
                                </div>

                                <h4 className="text-lg font-bold">
                                    Attirez les meilleurs talents
                                </h4>

                                <p className="mt-2 text-sm leading-relaxed text-[#1a1f1e]/60">
                                    Un profil complet valorise votre marque
                                    employeur auprès des candidats.
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-xs font-black tracking-widest text-blue-700 uppercase">
                                    Mettre à jour
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
