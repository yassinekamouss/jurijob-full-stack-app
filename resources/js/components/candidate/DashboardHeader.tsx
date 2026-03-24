import { Link, usePage } from '@inertiajs/react';
import { LogOut, LayoutDashboard, Bell, Settings } from 'lucide-react';
import { logout } from '@/routes';
import { dashboard as candidateDashboard, settings as candidateSettings } from '@/routes/candidate';

// --- Sous-composant Brand ---
const Brand = () => (
    <Link
        href="/"
        className="flex items-center tracking-tight"
        aria-label="Accueil JuriJob"
    >
        <div
            className="bg-[#1a1f1e] px-3 py-1 text-lg font-medium text-[#FDFCF8]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
            JURI
        </div>
        <div
            className="border border-[#1a1f1e] px-3 py-1 text-lg font-medium text-[#1a1f1e]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
            JOB
        </div>
    </Link>
);

export default function DashboardHeader() {
    const { auth } = usePage().props as any;
    const { url } = usePage();

    const isCurrent = (path: string) => url === path;

    return (
        <header className="fixed w-full z-50 border-b border-[#1a1f1e]/10 bg-[#FDFCF8]/90 mix-blend-normal backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo Section */}
                <div className="flex items-center gap-8">

                    <Brand />

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            href={candidateDashboard.url()}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${isCurrent(candidateDashboard.definition.url)
                                ? 'bg-[#1a1f1e]/5 text-[#1a1f1e]'
                                : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5'
                                }`}
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Tableau de bord
                        </Link>
                    </nav>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button className="relative p-2 text-[#1a1f1e]/60 transition-colors hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5 rounded-lg" title="Notifications">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-[#FDFCF8]"></span>
                        </button>

                        <Link
                            href={candidateSettings.url()}
                            className="relative p-2 text-[#1a1f1e]/60 transition-colors hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5 rounded-lg"
                            title="Paramètres"
                        >
                            <Settings className="h-5 w-5" />
                        </Link>

                        <Link
                            href={logout.url()}
                            method="post"
                            as="button"
                            className="relative p-2 text-red-500 transition-colors hover:text-red-700 hover:bg-red-50 rounded-lg"
                            title="Déconnexion"
                        >
                            <LogOut className="h-5 w-5" />
                        </Link>
                    </div>

                    <div className="h-6 w-px bg-[#e5e7eb]"></div>

                    {/* Profile Info */}
                    <div className="flex items-center gap-3">
                        <div className="hidden text-right lg:block">
                            <p className="text-sm font-semibold text-[#1a1f1e]">
                                {auth.user.email.split('@')[0]}
                            </p>
                            <p className="text-xs text-[#1a1f1e]/40 font-medium">Candidate</p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border border-[#1a1f1e]/10 bg-white">
                            {auth.user.candidat?.image_url ? (
                                <img
                                    src={`${import.meta.env.VITE_APP_URL}/candidate/profile-image/${auth.user.candidat.id}`}
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <img
                                    src="/images/default_profile_image.avif"
                                    alt="Default Profile"
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
