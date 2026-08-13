import { Link, usePage } from '@inertiajs/react';
import { LogOut, LayoutDashboard, Bell, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { logout } from '@/routes';
import { dashboard as candidateDashboard, settings as candidateSettings } from '@/routes/candidate';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// --- Sous-composant Brand ---
const Brand = () => {
    const { t } = useTranslation();
    return (
        <Link
            href={candidateDashboard.url()}
            className="flex items-center tracking-tight"
            aria-label={t('candidate_dashboard_header.dashboard')}
        >
            <img
                src="/images/logo_jurijob.png"
                alt="JuriJob - Logo"
                width={100}
                height={100}
                className="w-auto h-20 sm:h-24 md:h-28 lg:h-32 transition-all"
            />
        </Link>
    );
};


export default function DashboardHeader() {
    const { t } = useTranslation();
    const { auth } = usePage().props as any;
    const { url } = usePage();

    const isCurrent = (path: string) => url === path;

    return (
        <header className="fixed w-full z-50 border-b border-[#1a1f1e]/10 bg-[#FDFCF8]/90 mix-blend-normal backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
                {/* Logo Section */}
                <div className="flex items-center gap-4 sm:gap-8">

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
                            {t('candidate_dashboard_header.dashboard')}
                        </Link>
                    </nav>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-1.5 sm:gap-4">
                    <LanguageSwitcher />
                    <div className="h-5 w-px bg-[#e5e7eb] hidden sm:block"></div>
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Mobile & Quick Dashboard Button */}
                        <Link
                            href={candidateDashboard.url()}
                            className={`p-1.5 sm:p-2 transition-colors rounded-lg ${isCurrent(candidateDashboard.definition.url)
                                ? 'bg-[#1a1f1e]/10 text-[#1a1f1e]'
                                : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5'
                                }`}
                            title={t('candidate_dashboard_header.dashboard')}
                        >
                            <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <button className="relative p-1.5 sm:p-2 text-[#1a1f1e]/60 transition-colors hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5 rounded-lg" title={t('candidate_dashboard_header.notifications')}>
                            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-[#FDFCF8]"></span>
                        </button>

                        <Link
                            href={candidateSettings.url()}
                            className={`p-1.5 sm:p-2 transition-colors rounded-lg ${isCurrent(candidateSettings.definition.url)
                                ? 'bg-[#1a1f1e]/10 text-[#1a1f1e]'
                                : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5'
                                }`}
                            title={t('candidate_dashboard_header.settings')}
                        >
                            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <Link
                            href={logout.url()}
                            method="post"
                            as="button"
                            className="relative p-1.5 sm:p-2 text-red-500 transition-colors hover:text-red-700 hover:bg-red-50 rounded-lg"
                            title={t('candidate_dashboard_header.logout')}
                        >
                            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                    </div>

                    <div className="h-5 w-px bg-[#e5e7eb] hidden sm:block"></div>

                    {/* Profile Info */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="hidden lg:block text-right">
                            <p className="text-sm font-semibold text-[#1a1f1e]">
                                {auth?.user?.email?.split('@')[0]}
                            </p>
                            <p className="text-xs text-[#1a1f1e]/40 font-medium">{t('candidate_dashboard_header.candidate')}</p>
                        </div>
                        <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full overflow-hidden border border-[#1a1f1e]/10 bg-white shrink-0">
                            <img
                                src="/images/default_profile_image.avif"
                                alt="Profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
