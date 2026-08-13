import { Link, usePage } from '@inertiajs/react';
import { LogOut, LayoutDashboard, Bell, Settings } from 'lucide-react';
import { logout } from '@/routes';
import { dashboard as recruiterDashboard, settings as recruiterSettings } from '@/routes/recruteur';
import { index as offresIndex, create as offresCreate } from '@/routes/offres';
import { Briefcase, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Brand = () => {
    const { t } = useTranslation();
    return (
        <Link
            href={recruiterDashboard.url?.() ?? '/recruteur/dashboard'}
            className="flex items-center tracking-tight"
            aria-label={t('recruiter_dashboard_header.dashboard')}
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

                    {/* Navigation Desktop */}
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

                {/* Right Actions & Mobile Navigation Toolbar */}
                <div className="flex items-center gap-1 sm:gap-4">
                    <LanguageSwitcher />
                    <div className="h-5 w-px bg-[#e5e7eb] hidden sm:block"></div>
                    <div className="flex items-center gap-1 sm:gap-1.5">
                        {/* Quick Mobile Navigation Buttons */}
                        <Link
                            href={recruiterDashboard.url?.() ?? '/recruteur/dashboard'}
                            className={`md:hidden p-1.5 sm:p-2 transition-colors rounded-lg ${isCurrent(recruiterDashboard?.definition?.url ?? '/recruteur/dashboard')
                                ? 'bg-[#1a1f1e]/10 text-[#1a1f1e]'
                                : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5'
                                }`}
                            title={t('recruiter_dashboard_header.dashboard')}
                        >
                            <LayoutDashboard className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <Link
                            href={offresIndex().url}
                            className={`md:hidden p-1.5 sm:p-2 transition-colors rounded-lg ${isCurrent(offresIndex().url)
                                ? 'bg-[#1a1f1e]/10 text-[#1a1f1e]'
                                : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5'
                                }`}
                            title={t('recruiter_dashboard_header.my_offers')}
                        >
                            <Briefcase className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <Link
                            href={offresCreate().url}
                            className={`md:hidden p-1.5 sm:p-2 transition-colors rounded-lg ${isCurrent(offresCreate().url)
                                ? 'bg-[#C06041] text-white'
                                : 'text-[#C06041] hover:bg-[#C06041]/10'
                                }`}
                            title={t('recruiter_dashboard_header.publish')}
                        >
                            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <button className="relative p-1.5 sm:p-2 text-[#1a1f1e]/60 transition-colors hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5 rounded-lg" title={t('recruiter_dashboard_header.notifications')}>
                            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-[#FDFCF8]"></span>
                        </button>

                        <Link
                            href={recruiterSettings.url?.() ?? '/recruteur/settings'}
                            className={`p-1.5 sm:p-2 transition-colors rounded-lg ${isCurrent(recruiterSettings?.definition?.url ?? '/recruteur/settings')
                                ? 'bg-[#1a1f1e]/10 text-[#1a1f1e]'
                                : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5'
                                }`}
                            title={t('recruiter_dashboard_header.settings')}
                        >
                            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>

                        <Link
                            href={logout.url?.() ?? '/logout'}
                            method="post"
                            as="button"
                            className="p-1.5 sm:p-2 text-red-500 transition-colors hover:text-red-700 hover:bg-red-50 rounded-lg"
                            title={t('recruiter_dashboard_header.logout')}
                        >
                            <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                    </div>

                    <div className="h-5 w-px bg-[#e5e7eb] hidden sm:block"></div>

                    {/* Profile Info */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="hidden text-right lg:block">
                            <p className="text-sm font-semibold text-[#1a1f1e]">
                                {auth?.user?.email?.split('@')[0]}
                            </p>
                            <p className="text-xs text-[#1a1f1e]/40 font-medium">{t('recruiter_dashboard_header.recruiter')}</p>
                        </div>
                        <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full overflow-hidden border border-[#1a1f1e]/10 bg-white shrink-0">
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
