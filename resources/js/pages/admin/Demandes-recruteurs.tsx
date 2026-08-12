import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { ArrowLeft, Briefcase, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Poste {
    id: number;
    nom: string;
}

interface Ville {
    id: number;
    nom: string;
}

interface Offre {
    id: number;
    titre: string;
    statut: string;
    poste: Poste;
    ville: Ville;
    created_at: string;
}

interface Recruteur {
    id: number;
    nom_entreprise: string;
}

interface Props {
    recruteur: Recruteur;
    offres: Offre[];
}

const getStatutStyles = (t: any): Record<string, { dot: string; label: string; badge: string }> => ({
    EN_TRAITEMENT: { dot: 'bg-amber-400', label: t('admin_offers.tabs.processing'), badge: 'text-amber-600 border-amber-200 bg-amber-50' },
    ATTENTE_PAIEMENT: { dot: 'bg-orange-400', label: t('admin_offers.tabs.awaiting_payment'), badge: 'text-orange-600 border-orange-200 bg-orange-50' },
    VERIFICATION_PAIEMENT: { dot: 'bg-blue-400', label: t('admin_offers.tabs.payment_verification'), badge: 'text-blue-600 border-blue-200 bg-blue-50' },
    CV_ENVOYES: { dot: 'bg-emerald-400', label: t('admin_offers.tabs.cv_sent'), badge: 'text-emerald-600 border-emerald-200 bg-emerald-50' },
    ARCHIVE: { dot: 'bg-slate-300', label: t('admin_offers.tabs.archived'), badge: 'text-slate-500 border-slate-200 bg-slate-50' },
});

export default function DemandesRecruteurs({ recruteur, offres }: Props) {
    const { t, i18n } = useTranslation();
    const statutStyles = getStatutStyles(t);

    return (
        <AdminLayout breadcrumbs={[
            { title: 'Admin', href: '/admin/dashboard' },
            { title: t('admin_requests.breadcrumb_recruiters'), href: '/admin/recruteurs' },
            { title: recruteur.nom_entreprise, href: '#' },
        ]}>
            <Head title={t('admin_requests.page_title', { company: recruteur.nom_entreprise })} />

            <div className="flex flex-col gap-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {/* Header */}
                <div className="border-b border-[#1a1f1e]/10 pb-8">
                    <Link
                        href="/admin/recruteurs"
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#1a1f1e]/40 hover:text-[#C06041] transition-colors mb-6"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        {t('admin_requests.back_to_recruiters')}
                    </Link>

                    <p className="text-xs uppercase tracking-[0.2em] text-[#C06041] font-medium mb-2">
                        {t('admin_requests.recruiter_requests')}
                    </p>
                    <h1
                        className="text-4xl md:text-5xl text-[#1a1f1e] font-light leading-tight"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                        {recruteur.nom_entreprise}
                    </h1>
                    <p className="text-[#1a1f1e]/40 mt-2 text-sm">
                        {offres.length > 1
                            ? t('admin_requests.offers_submitted_plural', { count: offres.length })
                            : t('admin_requests.offers_submitted', { count: offres.length })}
                    </p>
                </div>

                {/* Offres */}
                <div className="flex flex-col gap-3">
                    {offres.length === 0 && (
                        <div className="bg-white border border-[#1a1f1e]/8 py-16 text-center">
                            <p className="text-[#1a1f1e]/25 text-sm uppercase tracking-wider">{t('admin_requests.empty_state')}</p>
                        </div>
                    )}

                    {offres.map((offre) => {
                        const style = statutStyles[offre.statut] ?? statutStyles.ARCHIVE;
                        return (
                            <div
                                key={offre.id}
                                className="bg-white border border-[#1a1f1e]/8 p-5 group hover:border-[#1a1f1e]/20 transition-colors relative overflow-hidden"
                            >
                                <div className="absolute left-0 top-0 w-[2px] h-full bg-[#C06041] opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="space-y-2 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${style.dot}`} />
                                            <h3 className="text-base font-semibold text-[#1a1f1e]">{offre.titre}</h3>
                                            <span className={`text-[9px] uppercase tracking-[0.15em] font-semibold px-2 py-0.5 border ${style.badge}`}>
                                                {style.label}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#1a1f1e]/40">
                                            {offre.poste?.nom && (
                                                <span className="flex items-center gap-1.5">
                                                    <Briefcase className="h-3 w-3" />
                                                    {offre.poste.nom}
                                                </span>
                                            )}
                                            {offre.ville?.nom && (
                                                <span className="flex items-center gap-1.5">
                                                    <MapPin className="h-3 w-3" />
                                                    {offre.ville.nom}
                                                </span>
                                            )}
                                            {offre.created_at && (
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="h-3 w-3" />
                                                    {new Date(offre.created_at).toLocaleDateString(i18n.language || 'fr-FR')}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <Link
                                        href={`/admin/offres/${offre.id}/matching`}
                                        className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider border border-[#1a1f1e]/20 text-[#1a1f1e]/60 px-4 py-2 hover:bg-[#1a1f1e] hover:text-white hover:border-[#1a1f1e] transition-colors shrink-0"
                                    >
                                        {t('admin_requests.view_matching')}
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AdminLayout>
    );
}