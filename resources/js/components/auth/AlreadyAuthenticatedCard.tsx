import { router, Link } from '@inertiajs/react';
import { LogOut, LayoutDashboard, User as UserIcon } from 'lucide-react';
import React from 'react';
import { logout, dashboard } from '@/routes';
import { User } from '@/types';

interface AlreadyAuthenticatedCardProps {
    user: User;
}

export default function AlreadyAuthenticatedCard({ user }: AlreadyAuthenticatedCardProps) {
    const handleLogout = () => {
        router.post(logout().url);
    };

    // Determine the user's name based on their role
    const displayName = user.role === 'candidat' 
        ? `${user.candidat?.prenom} ${user.candidat?.nom}`
        : user.recruteur?.nom_entreprise;

    const roleLabel = user.role === 'candidat' ? 'Candidat' : 'Recruteur';

    return (
        <div className="relative overflow-hidden rounded-[32px] border border-[#1a1f1e]/10 bg-white p-8 shadow-2xl shadow-[#1a1f1e]/5 sm:p-12">
            {/* Background Decorative Element */}
            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[#C06041]/5 blur-3xl" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1a1f1e]/5 text-[#C06041]">
                    <UserIcon size={40} />
                </div>

                <h2 className="mb-2 text-3xl font-bold tracking-tight text-[#1a1f1e]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                    Vous êtes déjà connecté
                </h2>
                
                <p className="mb-8 max-w-sm text-lg font-medium text-[#1a1f1e]/60">
                    Bonjour <span className="text-[#1a1f1e] font-bold">{displayName}</span>, vous avez déjà une session active sur Jurijob.
                </p>

                <div className="mb-10 w-full rounded-2xl bg-[#FDFCF8] border border-[#1a1f1e]/5 p-6">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#1a1f1e]/40">Compte actuel</span>
                        <span className="text-base font-bold text-[#1a1f1e]">{user.email}</span>
                        <span className="mt-1 inline-flex self-center items-center rounded-full bg-[#C06041]/10 px-3 py-0.5 text-xs font-bold text-[#C06041] uppercase">
                            {roleLabel}
                        </span>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-4 sm:flex-row">
                    <button
                        onClick={handleLogout}
                        className="group flex flex-1 items-center justify-center gap-3 rounded-2xl bg-[#1a1f1e] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#1a1f1e]/90 hover:shadow-lg active:scale-[0.98]"
                    >
                        <LogOut size={18} className="transition-transform group-hover:-translate-x-1" />
                        Se déconnecter et continuer
                    </button>

                    <Link
                        href={dashboard().url}
                        className="flex flex-1 items-center justify-center gap-3 rounded-2xl border-2 border-[#1a1f1e] bg-transparent px-8 py-4 text-sm font-bold text-[#1a1f1e] transition-all hover:bg-[#1a1f1e]/5 active:scale-[0.98]"
                    >
                        <LayoutDashboard size={18} />
                        Mon tableau de bord
                    </Link>
                </div>
                
                <p className="mt-8 text-xs font-medium text-[#1a1f1e]/40">
                    Besoin d'aide ? <a href="#" className="underline hover:text-[#C06041]">Contactez le support</a>
                </p>
            </div>
        </div>
    );
}
