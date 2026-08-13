import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Search, Building2, MapPin, Briefcase, Clock, CheckCircle2, FileText, Users, Archive } from 'lucide-react';

type OffreStatut = 'EN_TRAITEMENT' | 'ATTENTE_PAIEMENT' | 'VERIFICATION_PAIEMENT' | 'CV_ENVOYES' | 'ARCHIVE';

type OffreItem = {
    id: number;
    titre: string;
    statut: OffreStatut;
    nombre_cv: number;
    created_at: string;
    recruteur?: { nom_entreprise?: string };
    poste?: { nom?: string };
    ville?: { nom?: string };
    type_travail?: { nom?: string };
    mode_travail?: { nom?: string };
    niveau_experience?: { nom?: string };
};

const statutTabs: { value: OffreStatut; labelKey: string }[] = [
    { value: 'EN_TRAITEMENT', labelKey: 'admin_offers.tabs.processing' },
    { value: 'ATTENTE_PAIEMENT', labelKey: 'admin_offers.tabs.awaiting_payment' },
    { value: 'VERIFICATION_PAIEMENT', labelKey: 'admin_offers.tabs.payment_verification' },
    { value: 'CV_ENVOYES', labelKey: 'admin_offers.tabs.cv_sent' },
    { value: 'ARCHIVE', labelKey: 'admin_offers.tabs.archived' },
];

const statutStyles: Record<OffreStatut, { dot: string; badge: string; labelKey: string }> = {
    EN_TRAITEMENT: { dot: 'bg-amber-400', badge: 'bg-amber-50 text-amber-700 border-amber-200', labelKey: 'admin_offers.status.EN_TRAITEMENT' },
    ATTENTE_PAIEMENT: { dot: 'bg-orange-400', badge: 'bg-orange-50 text-orange-700 border-orange-200', labelKey: 'admin_offers.status.ATTENTE_PAIEMENT' },
    VERIFICATION_PAIEMENT: { dot: 'bg-blue-400', badge: 'bg-blue-50 text-blue-700 border-blue-200', labelKey: 'admin_offers.status.VERIFICATION_PAIEMENT' },
    CV_ENVOYES: { dot: 'bg-emerald-400', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', labelKey: 'admin_offers.status.CV_ENVOYES' },
    ARCHIVE: { dot: 'bg-slate-300', badge: 'bg-slate-50 text-slate-600 border-slate-200', labelKey: 'admin_offers.status.ARCHIVE' },
};

export default function Offres({ offres, currentStatut, filters }: any) {
    const { t, i18n } = useTranslation();
    const [search, setSearch] = useState(filters?.search || '');
    const [confirmOffre, setConfirmOffre] = useState<OffreItem | null>(null);
    const [isConfirming, setIsConfirming] = useState(false);
    const [archiveOffre, setArchiveOffre] = useState<OffreItem | null>(null);
    const [isArchiving, setIsArchiving] = useState(false);
    const [backToTraitementOffre, setBackToTraitementOffre] = useState<OffreItem | null>(null);
    const [isReverting, setIsReverting] = useState(false);

    const breadcrumbs = [
        { title: 'Admin', href: '/admin/dashboard' },
        { title: t('admin_offers.breadcrumb'), href: '/admin/offres' },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/offres', { statut: currentStatut, search }, { preserveState: true, preserveScroll: true });
    };

    const handleConfirmPayment = () => {
        if (!confirmOffre || isConfirming) {
            return;
        }

        setIsConfirming(true);
        router.post(
            `/admin/offres/${confirmOffre.id}/confirm-payment`,
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setIsConfirming(false);
                    setConfirmOffre(null);
                },
            },
        );
    };

    const handleArchive = () => {
        if (!archiveOffre || isArchiving) {
            return;
        }

        setIsArchiving(true);
        router.post(
            `/admin/offres/${archiveOffre.id}/archive`,
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setIsArchiving(false);
                    setArchiveOffre(null);
                },
            },
        );
    };

    const searchQuery = search ? `&search=${encodeURIComponent(search)}` : '';

    const handleBackToTraitement = () => {
        if (!backToTraitementOffre || isReverting) {
            return;
        }
        setIsReverting(true);
        router.post(
            `/admin/offres/${backToTraitementOffre.id}/revert-to-traitement`,
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setIsReverting(false);
                    setBackToTraitementOffre(null);
                },
            }
        );
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={t('admin_offers.page_title')} />

            <div className="flex flex-col gap-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {/* Header */}
                <div className="border-b border-[#1a1f1e]/10 pb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#C06041] font-medium mb-2">
                            {t('admin_offers.admin_label')}
                        </p>
                        <h1
                            className="text-4xl md:text-5xl text-[#1a1f1e] font-light leading-tight"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            {t('admin_offers.title_part1')} <span className="italic">{t('admin_offers.title_part2')}</span>
                        </h1>
                        <p className="text-[#1a1f1e]/40 mt-2 text-sm">
                            {offres.total > 1
                                ? t('admin_offers.total_count_plural', { count: offres.total })
                                : t('admin_offers.total_count', { count: offres.total })}
                        </p>
                    </div>

                    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:max-w-xs">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/30" />
                            <Input
                                type="text"
                                placeholder={t('admin_offers.search_placeholder')}
                                className="pl-9 border-[#1a1f1e]/20 bg-white rounded-none h-10 text-sm focus-visible:ring-[#C06041] focus-visible:border-[#C06041]"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="bg-[#1a1f1e] text-white hover:bg-[#1a1f1e]/80 rounded-none h-10 px-4 text-xs uppercase tracking-wider"
                        >
                            {t('admin_offers.search_btn')}
                        </Button>
                    </form>
                </div>

                {/* Status tabs */}
                <div className="flex overflow-x-auto border-b border-[#1a1f1e]/10 -mt-4 gap-0">
                    {statutTabs.map((tab) => (
                        <Link
                            key={tab.value}
                            href={`/admin/offres?statut=${tab.value}${searchQuery}`}
                            className={`whitespace-nowrap px-4 py-3 text-xs font-medium uppercase tracking-wider transition-all border-b-2 ${
                                currentStatut === tab.value
                                    ? 'border-[#C06041] text-[#C06041]'
                                    : 'border-transparent text-[#1a1f1e]/40 hover:text-[#1a1f1e]'
                            }`}
                        >
                            {t(tab.labelKey)}
                        </Link>
                    ))}
                </div>

                {/* Offres list */}
                <div className="flex flex-col gap-3">
                    {offres.data.length === 0 ? (
                        <div className="bg-white border border-[#1a1f1e]/8 py-16 text-center">
                            <p className="text-[#1a1f1e]/30 text-sm uppercase tracking-wider">{t('admin_offers.empty_state')}</p>
                        </div>
                    ) : (
                        offres.data.map((offre: any) => {
                            const style = statutStyles[offre.statut as OffreStatut] ?? statutStyles.ARCHIVE;
                            return (
                                <div
                                    key={offre.id}
                                    className="bg-white border border-[#1a1f1e]/8 p-6 group hover:border-[#1a1f1e]/20 transition-colors relative overflow-hidden"
                                >
                                    <div className="absolute left-0 top-0 w-[2px] h-full bg-[#C06041] opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="min-w-0 flex-1 space-y-3">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${style.dot}`} />
                                                <h3 className="text-base font-semibold text-[#1a1f1e] leading-tight">
                                                    {offre.titre}
                                                </h3>
                                                <span className={`text-[9px] uppercase tracking-[0.15em] font-semibold px-2 py-0.5 border ${style.badge}`}>
                                                    {t(style.labelKey)}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#1a1f1e]/50">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Building2 className="h-3.5 w-3.5" />
                                                    {offre.recruteur?.nom_entreprise || t('admin_offers.company_na')}
                                                </span>
                                                {offre.poste?.nom && (
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Briefcase className="h-3.5 w-3.5" />
                                                        {offre.poste.nom}
                                                    </span>
                                                )}
                                                {offre.ville?.nom && (
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <MapPin className="h-3.5 w-3.5" />
                                                        {offre.ville.nom}
                                                    </span>
                                                )}
                                                <span className="inline-flex items-center gap-1.5">
                                                    <FileText className="h-3.5 w-3.5" />
                                                    {t('admin_offers.cv_count', { count: offre.nombre_cv })}
                                                </span>
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {new Date(offre.created_at).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'fr-FR')}
                                                </span>
                                            </div>

                                            {(offre.type_travail?.nom || offre.mode_travail?.nom || offre.niveau_experience?.nom) && (
                                                <div className="flex flex-wrap gap-1.5">
                                                    {offre.type_travail?.nom && (
                                                        <span className="text-[10px] uppercase tracking-wider border border-[#1a1f1e]/15 text-[#1a1f1e]/50 px-2 py-0.5">
                                                            {offre.type_travail.nom}
                                                        </span>
                                                    )}
                                                    {offre.mode_travail?.nom && (
                                                        <span className="text-[10px] uppercase tracking-wider border border-[#1a1f1e]/15 text-[#1a1f1e]/50 px-2 py-0.5">
                                                            {offre.mode_travail.nom}
                                                        </span>
                                                    )}
                                                    {offre.niveau_experience?.nom && (
                                                        <span className="text-[10px] uppercase tracking-wider border border-[#1a1f1e]/15 text-[#1a1f1e]/50 px-2 py-0.5">
                                                            {offre.niveau_experience.nom}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex shrink-0 flex-wrap gap-2 items-start">
                                            {currentStatut === 'EN_TRAITEMENT' && (
                                                <Link
                                                    href={`/admin/offres/${offre.id}/matching`}
                                                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider border border-[#1a1f1e]/20 text-[#1a1f1e] px-4 py-2 hover:bg-[#1a1f1e] hover:text-white transition-colors"
                                                >
                                                    <Users className="h-3.5 w-3.5" />
                                                    {t('admin_offers.actions.matching')}
                                                </Link>
                                            )}
                                            {currentStatut === 'VERIFICATION_PAIEMENT' && (
                                                <button
                                                    type="button"
                                                    onClick={() => setConfirmOffre(offre)}
                                                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider border border-emerald-600 text-emerald-700 px-4 py-2 hover:bg-emerald-600 hover:text-white transition-colors"
                                                >
                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                    {t('admin_offers.actions.confirm_payment')}
                                                </button>
                                            )}
                                            {offre.statut === 'ATTENTE_PAIEMENT' && (
                                                <button
                                                    type="button"
                                                    onClick={() => setBackToTraitementOffre(offre)}
                                                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider border border-orange-600 text-orange-700 px-4 py-2 hover:bg-orange-600 hover:text-white transition-colors"
                                                >
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {t('admin_offers.actions.revert_to_traitement')}
                                                </button>
                                            )}

                                            {currentStatut !== 'ARCHIVE' && (
                                                <button
                                                    type="button"
                                                    onClick={() => setArchiveOffre(offre)}
                                                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider border border-[#1a1f1e]/20 text-[#1a1f1e]/60 px-4 py-2 hover:bg-[#1a1f1e] hover:text-white transition-colors"
                                                >
                                                    <Archive className="h-3.5 w-3.5" />
                                                    {t('admin_offers.actions.archive')}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <Dialog
                    open={confirmOffre !== null}
                    onOpenChange={(open) => {
                        if (!open && !isConfirming) {
                            setConfirmOffre(null);
                        }
                    }}
                >
                    <DialogContent className="rounded-none border-[#1a1f1e]/10 sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle
                                className="text-xl font-light text-[#1a1f1e]"
                                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            >
                                {t('admin_offers.confirm_payment_modal.title')}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-[#1a1f1e]/60">
                                {t('admin_offers.confirm_payment_modal.description', { title: confirmOffre?.titre })}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="gap-2 sm:gap-2">
                            <button
                                type="button"
                                onClick={() => setConfirmOffre(null)}
                                disabled={isConfirming}
                                className="border border-[#1a1f1e]/15 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/60 transition-colors hover:border-[#1a1f1e]/40 hover:text-[#1a1f1e]"
                            >
                                {t('admin_offers.confirm_payment_modal.cancel')}
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmPayment}
                                disabled={isConfirming}
                                className="inline-flex items-center justify-center gap-2 bg-emerald-700 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-opacity disabled:opacity-40"
                            >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                {isConfirming
                                    ? t('admin_offers.confirm_payment_modal.confirming')
                                    : t('admin_offers.confirm_payment_modal.confirm')}
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog
                    open={archiveOffre !== null}
                    onOpenChange={(open) => {
                        if (!open && !isArchiving) {
                            setArchiveOffre(null);
                        }
                    }}
                >
                    <DialogContent className="rounded-none border-[#1a1f1e]/10 sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle
                                className="text-xl font-light text-[#1a1f1e]"
                                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            >
                                {t('admin_offers.archive_modal.title')}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-[#1a1f1e]/60">
                                {t('admin_offers.archive_modal.description', { title: archiveOffre?.titre })}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="gap-2 sm:gap-2">
                            <button
                                type="button"
                                onClick={() => setArchiveOffre(null)}
                                disabled={isArchiving}
                                className="border border-[#1a1f1e]/15 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/60 transition-colors hover:border-[#1a1f1e]/40 hover:text-[#1a1f1e]"
                            >
                                {t('admin_offers.archive_modal.cancel')}
                            </button>
                            <button
                                type="button"
                                onClick={handleArchive}
                                disabled={isArchiving}
                                className="inline-flex items-center justify-center gap-2 bg-[#1a1f1e] px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-opacity disabled:opacity-40"
                            >
                                <Archive className="h-3.5 w-3.5" />
                                {isArchiving ? t('admin_offers.archive_modal.archiving') : t('admin_offers.archive_modal.confirm')}
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Back to traitement modal */}
                <Dialog
                    open={backToTraitementOffre !== null}
                    onOpenChange={(open) => {
                        if (!open && !isReverting) {
                            setBackToTraitementOffre(null);
                        }
                    }}
                >
                    <DialogContent className="rounded-none border-[#1a1f1e]/10 sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle
                                className="text-xl font-light text-[#1a1f1e]"
                                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            >
                                {t('admin_offers.revert_modal.title')}
                            </DialogTitle>
                            <DialogDescription className="text-sm text-[#1a1f1e]/60">
                                {t('admin_offers.revert_modal.description')}
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="gap-2 sm:gap-2">
                            <button
                                type="button"
                                onClick={() => setBackToTraitementOffre(null)}
                                disabled={isReverting}
                                className="border border-[#1a1f1e]/15 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/60 transition-colors hover:border-[#1a1f1e]/40 hover:text-[#1a1f1e]"
                            >
                                {t('admin_offers.revert_modal.cancel')}
                            </button>
                            <button
                                type="button"
                                onClick={handleBackToTraitement}
                                disabled={isReverting}
                                className="inline-flex items-center justify-center gap-2 bg-orange-700 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-opacity disabled:opacity-40"
                            >
                                <Clock className="h-3.5 w-3.5" />
                                {isReverting ? t('admin_offers.revert_modal.reverting') : t('admin_offers.revert_modal.confirm')}
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Pagination */}
                {offres.links?.length > 3 && (
                    <div className="flex flex-wrap gap-1.5 border-t border-[#1a1f1e]/8 pt-6">
                        {offres.links.map((link: any, index: number) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1.5 text-xs border transition-colors ${
                                        link.active
                                            ? 'bg-[#1a1f1e] text-white border-[#1a1f1e]'
                                            : 'border-[#1a1f1e]/15 text-[#1a1f1e]/60 hover:border-[#1a1f1e]/40 hover:text-[#1a1f1e]'
                                    }`}
                                />
                            ) : (
                                <span
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className="px-3 py-1.5 text-xs border border-[#1a1f1e]/8 text-[#1a1f1e]/25 cursor-not-allowed"
                                />
                            ),
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
