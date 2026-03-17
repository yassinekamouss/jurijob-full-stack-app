import { Link, usePage } from '@inertiajs/react';
import { User, LogOut, LayoutDashboard, Briefcase, FileText, Bell, Settings } from 'lucide-react';
import { dashboard as candidateDashboard } from '@/routes/candidate';
import { edit as profileEdit } from '@/routes/profile';
import { logout } from '@/routes';

export default function DashboardHeader() {
    const { auth } = usePage().props as any;
    const { url } = usePage();

    const isCurrent = (path: string) => url === path;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#e5e7eb]/50 bg-[#FDFCF8]/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo Section */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a1f1e] to-[#2c3533] shadow-lg shadow-[#1a1f1e]/10">
                            <span className="text-xl font-bold italic text-[#FDFCF8]">J</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[#1a1f1e] md:block hidden">
                            JuriJob
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link
                            href={candidateDashboard.url()}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                                isCurrent(candidateDashboard.definition.url)
                                    ? 'bg-[#1a1f1e]/5 text-[#1a1f1e]'
                                    : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5'
                            }`}
                        >
                            <LayoutDashboard className="h-4 w-4" />
                            Tableau de bord
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#1a1f1e]/60 transition-colors hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5 rounded-lg"
                        >
                            <Briefcase className="h-4 w-4" />
                            Mes candidatures
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#1a1f1e]/60 transition-colors hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5 rounded-lg"
                        >
                            <FileText className="h-4 w-4" />
                            Documents
                        </Link>
                    </nav>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <button className="relative p-2 text-[#1a1f1e]/60 transition-colors hover:text-[#1a1f1e] hover:bg-[#1a1f1e]/5 rounded-lg">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-[#FDFCF8]"></span>
                    </button>

                    <div className="h-6 w-px bg-[#e5e7eb]"></div>

                    {/* Profile Dropdown (Simplified for now) */}
                    <div className="flex items-center gap-3">
                        <div className="hidden text-right lg:block">
                            <p className="text-sm font-semibold text-[#1a1f1e]">
                                {auth.user.email.split('@')[0]}
                            </p>
                            <p className="text-xs text-[#1a1f1e]/40 font-medium">Candidate</p>
                        </div>
                        <div className="relative group">
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1a1f1e]/5 to-[#1a1f1e]/10 border border-[#1a1f1e]/10 hover:border-[#1a1f1e]/20 transition-all">
                                <User className="h-5 w-5 text-[#1a1f1e]" />
                            </button>
                            
                            {/* Simple Hover Menu */}
                            <div className="absolute right-0 top-full mt-2 hidden group-hover:block w-48 rounded-xl border border-[#e5e7eb] bg-[#FDFCF8] p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                                <Link
                                    href={profileEdit.url()}
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#1a1f1e]/70 transition-colors hover:bg-[#1a1f1e]/5 hover:text-[#1a1f1e]"
                                >
                                    <Settings className="h-4 w-4" />
                                    Paramètres
                                </Link>
                                <div className="my-1 h-px bg-[#e5e7eb]"></div>
                                <Link
                                    href={logout.url()}
                                    method="post"
                                    as="button"
                                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Déconnexion
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
