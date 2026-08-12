import { Link, usePage } from '@inertiajs/react';
import { LogOut, LayoutDashboard, Bell, Settings } from 'lucide-react';
import { logout } from '@/routes';
import { dashboard as recruiterDashboard, settings as recruiterSettings } from '@/routes/recruteur';
import { index as offresIndex, create as offresCreate } from '@/routes/offres';
import { Briefcase, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Brand = () => {
    const { t } = useTranslation();
    return (
    <Link
        href="/"
        className="flex items-center tracking-tight"
        aria-label={t('recruiter_dashboard_header.home')}
    >
        <img
            src="/images/logo_jurijob.png"
            alt="JuriJob - Logo"
            width={100}
            height={100}
            className="w-auto h-32"
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
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo Section */}
                <div className="flex items-center gap-8">
                    <Brand />

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            href={recruiterDashboard.url?.() ?? '/recruteur/dashboard'}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${isCurrent(recruiterDashboard?.definition?.url ?? '/recruteur/dashboard')
                                ? 'bg-[#1a1f1e]/5 text-[#1a1f1e]'
                                : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5'
                                }`}
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            {t('recruiter_dashboard_header.dashboard')}
                        </Link>

                        <Link
                            href={offresIndex().url}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${isCurrent(offresIndex().url)
                                ? 'bg-[#1a1f1e]/5 text-[#1a1f1e]'
                                : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5'
                                }`}
                        >
                            <Briefcase className="h-4 w-4" />
                            {t('recruiter_dashboard_header.my_offers')}
                        </Link>

                        <Link
                            href={offresCreate().url}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${isCurrent(offresCreate().url)
                                ? 'bg-[#1a1f1e]/5 text-[#1a1f1e]'
                                : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5'
                                }`}
                        >
                            <Plus className="h-4 w-4" />
                            {t('recruiter_dashboard_header.publish')}
                        </Link>
                    </nav>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button className="relative p-2 text-[#1a1f1e]/60 transition-colors hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5 rounded-lg" title={t('recruiter_dashboard_header.notifications')}>
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-[#FDFCF8]"></span>
                        </button>

                        <Link
                            href={recruiterSettings.url?.() ?? '/recruteur/settings'}
                            className={`relative p-2 transition-colors rounded-lg ${isCurrent(recruiterSettings?.definition?.url ?? '/recruteur/settings')
                                ? 'bg-[#1a1f1e]/5 text-[#1a1f1e]'
                                : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5'
                                }`}
                            title={t('recruiter_dashboard_header.settings')}
                        >
                            <Settings className="h-5 w-5" />
                        </Link>

                        <Link
                            href={logout.url?.() ?? '/logout'}
                            method="post"
                            as="button"
                            className="relative p-2 text-red-500 transition-colors hover:text-red-700 hover:bg-red-50 rounded-lg"
                            title={t('recruiter_dashboard_header.logout')}
                        >
                            <LogOut className="h-5 w-5" />
                        </Link>
                    </div>

                    <div className="h-6 w-px bg-[#e5e7eb]"></div>

                    {/* Profile Info */}
                    <div className="flex items-center gap-3">
                        <div className="hidden text-right lg:block">
                            <p className="text-sm font-semibold text-[#1a1f1e]">
                                {auth?.user?.email?.split('@')[0]}
                            </p>
                            <p className="text-xs text-[#1a1f1e]/40 font-medium">{t('recruiter_dashboard_header.recruiter')}</p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden border border-[#1a1f1e]/10 bg-white">
                            {auth?.user?.recruteur?.logo_url ? (
                                <img
                                    src={`${import.meta.env.VITE_APP_URL}/recruteur/logo-image/${auth.user.recruteur.id}`}
                                    alt={t('recruiter_dashboard_header.logo_alt')}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <img
                                    src="/images/default_profile_image.avif"
                                    alt={t('recruiter_dashboard_header.default_profile')}
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
