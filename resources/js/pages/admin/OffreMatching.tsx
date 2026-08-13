import { useMemo, useState, type ComponentType } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    ArrowLeft,
    Building2,
    Briefcase,
    GraduationCap,
    Globe,
    Mail,
    MapPin,
    Phone,
    Users,
    Award,
    Star,
    Check,
    Send,
    Clock,
    FileText,
} from 'lucide-react';

type MatchingBreakdown = {
    score: number;
    language_bonus: number;
    language_penalty: number;
    specialisation_penalty: number;
};

type Requirement = {
    taxonomy_id: number;
    taxonomy_type: 'SPECIALISATION' | 'LANGUE';
    label?: string;
    metadata?: {
        importance?: string;
        niveau_langue_id?: number;
        niveau_nom?: string;
    };
};

type MatchedCandidate = {
    id: number;
    nom: string;
    prenom: string;
    poste_id?: number;
    niveau_experience_id?: number;
    formation_juridique_id?: number | null;
    matching_score: number;
    matching_breakdown?: MatchingBreakdown;
    user?: { email?: string; telephone?: string };
    poste?: { id?: number; nom?: string };
    niveau_experience?: { id?: number; nom?: string };
    formation_juridique?: { id?: number; nom?: string };
    langues?: Array<{
        id: number;
        langue_id?: number;
        langue?: { id?: number; nom?: string };
        niveau_langue?: { nom?: string };
    }>;
    specialisations?: Array<{
        id: number;
        specialisation_id?: number;
        specialisation?: { id?: number; nom?: string };
    }>;
};

type OffreProps = {
    id: number;
    titre: string;
    description?: string | null;
    notes_complementaires?: string | null;
    statut: string;
    nombre_cv: number;
    poste_id?: number;
    niveau_experience_id?: number;
    formation_juridique_id?: number | null;
    recruteur?: { nom_entreprise?: string };
    poste?: { id?: number; nom?: string };
    ville?: { nom?: string };
    type_travail?: { nom?: string };
    mode_travail?: { nom?: string };
    niveau_experience?: { id?: number; nom?: string };
    formation_juridique?: { id?: number; nom?: string };
    salaire?: { nom?: string };
    urgence?: { nom?: string };
    requirements?: Requirement[];
};

type Props = {
    offre: OffreProps;
    candidates: MatchedCandidate[];
    alreadySent?: boolean;
};

const breadcrumbs = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Offres', href: '/admin/offres?statut=EN_TRAITEMENT' },
    { title: 'Matching', href: '#' },
];

function scoreColor(score: number): { bar: string; text: string; bg: string } {
    if (score >= 100) return { bar: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
    if (score >= 90) return { bar: 'bg-sky-500', text: 'text-sky-700', bg: 'bg-sky-50 border-sky-200' };
    if (score >= 80) return { bar: 'bg-amber-500', text: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' };
    return { bar: 'bg-rose-500', text: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' };
}

export default function OffreMatching({ offre, candidates, alreadySent = false }: Props) {
    const { flash } = usePage().props as { flash?: { error?: string; success?: string } };
    const requiredCount = offre.nombre_cv;

    const offerSpecialisationIds = useMemo(
        () =>
            new Set(
                (offre.requirements ?? [])
                    .filter((req) => req.taxonomy_type === 'SPECIALISATION')
                    .map((req) => req.taxonomy_id),
            ),
        [offre.requirements],
    );

    const offerLangueIds = useMemo(
        () =>
            new Set(
                (offre.requirements ?? [])
                    .filter((req) => req.taxonomy_type === 'LANGUE')
                    .map((req) => req.taxonomy_id),
            ),
        [offre.requirements],
    );

    const [selectedIds, setSelectedIds] = useState<number[]>(() =>
        alreadySent ? [] : candidates.slice(0, requiredCount).map((c) => c.id),
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const canSelect = !alreadySent && offre.statut === 'EN_TRAITEMENT';
    const canSend = selectedIds.length >= 1 && selectedIds.length <= requiredCount;

    const selectedCandidates = useMemo(
        () => candidates.filter((candidate) => selectedIds.includes(candidate.id)),
        [candidates, selectedIds],
    );

    const toggleCandidate = (id: number) => {
        if (!canSelect) {
            return;
        }

        setSelectedIds((current) => {
            if (current.includes(id)) {
                return current.filter((item) => item !== id);
            }

            if (current.length >= requiredCount) {
                return current;
            }

            return [...current, id];
        });
    };

    const openConfirm = () => {
        if (!canSelect || !canSend || isSubmitting) {
            return;
        }

        setConfirmOpen(true);
    };

    const handleSend = () => {
        if (!canSelect || !canSend || isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        router.post(
            `/admin/offres/${offre.id}/matching`,
            { candidat_ids: selectedIds },
            {
                onFinish: () => {
                    setIsSubmitting(false);
                    setConfirmOpen(false);
                },
            },
        );
    };

    const specialisations = (offre.requirements ?? []).filter((req) => req.taxonomy_type === 'SPECIALISATION');
    const langues = (offre.requirements ?? []).filter((req) => req.taxonomy_type === 'LANGUE');

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Matching — ${offre.titre}`} />

            <div className="flex flex-col gap-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <div className="border-b border-[#1a1f1e]/10 pb-8">
                    <Link
                        href="/admin/offres?statut=EN_TRAITEMENT"
                        className="mb-6 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#1a1f1e]/40 transition-colors hover:text-[#C06041]"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Retour aux offres
                    </Link>

                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#C06041]">
                        Résultats de matching
                    </p>
                    <h1
                        className="text-3xl font-light leading-tight text-[#1a1f1e] md:text-4xl"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                        {offre.titre}
                    </h1>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#1a1f1e]/50">
                        {offre.recruteur?.nom_entreprise && (
                            <span className="flex items-center gap-1.5">
                                <Building2 className="h-3.5 w-3.5" />
                                {offre.recruteur.nom_entreprise}
                            </span>
                        )}
                        {offre.poste?.nom && (
                            <span className="flex items-center gap-1.5">
                                <Briefcase className="h-3.5 w-3.5" />
                                {offre.poste.nom}
                            </span>
                        )}
                        {offre.niveau_experience?.nom && <span>{offre.niveau_experience.nom}</span>}
                        <span className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            {offre.nombre_cv} CV demandés
                        </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 border border-[#1a1f1e]/8 bg-white px-4 py-2">
                            <span className="text-xl font-medium text-[#1a1f1e]">{candidates.length}</span>
                            <span className="text-[10px] uppercase tracking-wider text-[#1a1f1e]/40">
                                profil(s) matchés
                            </span>
                        </div>
                        <div className="flex items-center gap-2 border border-emerald-200 bg-emerald-50 px-4 py-2">
                            <Star className="h-4 w-4 text-emerald-600" />
                            <span className="text-xl font-medium text-emerald-700">
                                {selectedIds.length}/{requiredCount}
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-emerald-600">sélectionnés</span>
                        </div>
                    </div>

                    {(flash?.error || flash?.success) && (
                        <div
                            className={`mt-4 border px-4 py-3 text-sm ${
                                flash.error
                                    ? 'border-rose-200 bg-rose-50 text-rose-700'
                                    : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            }`}
                        >
                            {flash.error || flash.success}
                        </div>
                    )}
                </div>

                {/* Offer details */}
                <section className="space-y-5 border border-[#1a1f1e]/8 bg-white p-6">
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-[#C06041]" />
                        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-[#1a1f1e]/50">
                            Informations de l'offre
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <OfferMeta icon={Briefcase} label="Poste" value={offre.poste?.nom} />
                        <OfferMeta icon={Award} label="Expérience" value={offre.niveau_experience?.nom} />
                        <OfferMeta icon={GraduationCap} label="Formation" value={offre.formation_juridique?.nom} />
                        <OfferMeta icon={MapPin} label="Ville" value={offre.ville?.nom} />
                        <OfferMeta icon={Clock} label="Type / Mode" value={[offre.type_travail?.nom, offre.mode_travail?.nom].filter(Boolean).join(' · ')} />
                        <OfferMeta icon={Users} label="Salaire" value={offre.salaire?.nom} />
                    </div>

                    {offre.description && (
                        <div>
                            <p className="mb-1 text-[10px] uppercase tracking-wider text-[#1a1f1e]/35">Description</p>
                            <p className="whitespace-pre-line text-sm leading-relaxed text-[#1a1f1e]/70">
                                {offre.description}
                            </p>
                        </div>
                    )}

                    {offre.notes_complementaires && (
                        <div>
                            <p className="mb-1 text-[10px] uppercase tracking-wider text-[#1a1f1e]/35">
                                Notes complémentaires
                            </p>
                            <p className="whitespace-pre-line text-sm leading-relaxed text-[#1a1f1e]/70">
                                {offre.notes_complementaires}
                            </p>
                        </div>
                    )}

                    {specialisations.length > 0 && (
                        <div>
                            <p className="mb-2 text-[10px] uppercase tracking-wider text-[#1a1f1e]/35">
                                Spécialisations requises
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {specialisations.map((spec) => (
                                    <span
                                        key={`offre-spec-${spec.taxonomy_id}`}
                                        className="bg-[#1a1f1e] px-2.5 py-1 text-[10px] uppercase tracking-wider text-white"
                                    >
                                        {spec.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {langues.length > 0 && (
                        <div>
                            <p className="mb-2 text-[10px] uppercase tracking-wider text-[#1a1f1e]/35">
                                Langues requises
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {langues.map((langue) => (
                                    <span
                                        key={`offre-lang-${langue.taxonomy_id}`}
                                        className="bg-[#1a1f1e] px-2.5 py-1 text-[10px] uppercase tracking-wider text-white"
                                    >
                                        {langue.label}
                                        {langue.metadata?.niveau_nom ? ` · ${langue.metadata.niveau_nom}` : ''}
                                        {langue.metadata?.importance ? ` · ${langue.metadata.importance}` : ''}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <p className="text-[11px] text-[#1a1f1e]/40">
                        Légende candidats : les éléments en commun avec l'offre apparaissent en fond noir.
                    </p>
                </section>

                {/* Selection bar */}
                {canSelect && (
                    <div className="sticky top-4 z-10 flex flex-col gap-3 border border-[#1a1f1e]/10 bg-white/95 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-medium text-[#1a1f1e]">
                                Sélectionnez jusqu’à {requiredCount} candidat{requiredCount > 1 ? 's' : ''} à envoyer
                            </p>
                            <p className="text-xs text-[#1a1f1e]/45">
                                {selectedIds.length} / {requiredCount} sélectionné
                                {selectedIds.length > 1 ? 's' : ''}
                                {selectedIds.length === 0 && ' — aucun candidat sélectionné'}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={openConfirm}
                            disabled={!canSend || isSubmitting}
                            className="inline-flex items-center justify-center gap-2 bg-[#1a1f1e] px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <Send className="h-3.5 w-3.5" />
                            {isSubmitting ? 'Envoi…' : 'Envoyer au recruteur'}
                        </button>
                    </div>
                )}

                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <DialogContent className="rounded-none border-[#1a1f1e]/10 sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle
                                className="text-xl font-light text-[#1a1f1e]"
                                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            >
                                Confirmer l’envoi
                            </DialogTitle>
                            <DialogDescription className="text-sm text-[#1a1f1e]/60">
                                Vous êtes sur le point d’envoyer {selectedIds.length} profil
                                {selectedIds.length > 1 ? 's' : ''} au recruteur. L’offre passera
                                en attente de paiement. Confirmez-vous cet envoi ?
                            </DialogDescription>
                        </DialogHeader>

                        <ul className="max-h-48 space-y-2 overflow-y-auto border border-[#1a1f1e]/8 bg-[#FDFCF8] p-3 text-sm text-[#1a1f1e]/80">
                            {selectedCandidates.map((candidate) => (
                                <li key={candidate.id} className="flex items-center justify-between gap-3">
                                    <span>
                                        {candidate.prenom} {candidate.nom}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-wider text-[#1a1f1e]/35">
                                        score {Math.min(candidate.matching_score, 100)}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <DialogFooter className="gap-2 sm:gap-2">
                            <button
                                type="button"
                                onClick={() => setConfirmOpen(false)}
                                disabled={isSubmitting}
                                className="border border-[#1a1f1e]/15 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/60 transition-colors hover:border-[#1a1f1e]/40 hover:text-[#1a1f1e]"
                            >
                                Annuler
                            </button>
                            <button
                                type="button"
                                onClick={handleSend}
                                disabled={isSubmitting}
                                className="inline-flex items-center justify-center gap-2 bg-[#1a1f1e] px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-opacity disabled:opacity-40"
                            >
                                <Send className="h-3.5 w-3.5" />
                                {isSubmitting ? 'Envoi…' : 'Oui, envoyer'}
                            </button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {alreadySent && (
                    <div className="border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        Cette offre n'est plus en traitement. La sélection de candidats est désactivée.
                    </div>
                )}

                {candidates.length === 0 && (
                    <div className="border border-[#1a1f1e]/8 bg-white py-20 text-center">
                        <p className="mb-2 text-sm uppercase tracking-widest text-[#1a1f1e]/25">Aucun résultat</p>
                        <p className="text-xs text-[#1a1f1e]/40">
                            Aucun candidat ne correspond aux critères de cette offre.
                        </p>
                    </div>
                )}

                {candidates.length > 0 && (
                    <div className="space-y-3">
                        {candidates.map((candidat, index) => {
                            const colors = scoreColor(candidat.matching_score);
                            const displayScore = Math.min(candidat.matching_score, 100);
                            const selected = selectedIds.includes(candidat.id);

                            return (
                                <CandidateCard
                                    key={candidat.id}
                                    candidat={candidat}
                                    index={index}
                                    colors={colors}
                                    displayScore={displayScore}
                                    selected={selected}
                                    selectable={canSelect}
                                    selectionLocked={!selected && selectedIds.length >= requiredCount}
                                    offerSpecialisationIds={offerSpecialisationIds}
                                    offerLangueIds={offerLangueIds}
                                    offerPosteId={offre.poste_id}
                                    offerExperienceId={offre.niveau_experience_id}
                                    offerFormationId={offre.formation_juridique_id}
                                    onToggle={() => toggleCandidate(candidat.id)}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

function OfferMeta({
    icon: Icon,
    label,
    value,
}: {
    icon: ComponentType<{ className?: string }>;
    label: string;
    value?: string | null;
}) {
    if (!value) {
        return null;
    }

    return (
        <div className="flex items-start gap-2 text-sm text-[#1a1f1e]/70">
            <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C06041]/70" />
            <div>
                <p className="text-[10px] uppercase tracking-wider text-[#1a1f1e]/35">{label}</p>
                <p>{value}</p>
            </div>
        </div>
    );
}

function CandidateCard({
    candidat,
    index,
    colors,
    displayScore,
    selected,
    selectable,
    selectionLocked,
    offerSpecialisationIds,
    offerLangueIds,
    offerPosteId,
    offerExperienceId,
    offerFormationId,
    onToggle,
}: {
    candidat: MatchedCandidate;
    index: number;
    colors: { bar: string; text: string; bg: string };
    displayScore: number;
    selected: boolean;
    selectable: boolean;
    selectionLocked: boolean;
    offerSpecialisationIds: Set<number>;
    offerLangueIds: Set<number>;
    offerPosteId?: number;
    offerExperienceId?: number;
    offerFormationId?: number | null;
    onToggle: () => void;
}) {
    const breakdown = candidat.matching_breakdown;
    const posteMatches =
        (candidat.poste_id ?? candidat.poste?.id) !== undefined &&
        (candidat.poste_id ?? candidat.poste?.id) === offerPosteId;
    const experienceMatches =
        (candidat.niveau_experience_id ?? candidat.niveau_experience?.id) !== undefined &&
        (candidat.niveau_experience_id ?? candidat.niveau_experience?.id) === offerExperienceId;
    const formationMatches =
        offerFormationId != null &&
        (candidat.formation_juridique_id ?? candidat.formation_juridique?.id) === offerFormationId;

    return (
        <div
            className={`relative overflow-hidden border bg-white p-5 transition-colors ${
                selected ? 'border-[#1a1f1e]' : 'border-[#1a1f1e]/8 hover:border-[#1a1f1e]/20'
            } ${selectable ? 'cursor-pointer' : ''} ${selectionLocked ? 'opacity-60' : ''}`}
            onClick={() => {
                if (selectable && (!selectionLocked || selected)) {
                    onToggle();
                }
            }}
        >
            <div
                className={`absolute left-0 top-0 h-full w-[2px] transition-opacity ${
                    selected ? 'bg-[#1a1f1e] opacity-100' : 'bg-[#C06041] opacity-0'
                }`}
            />

            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        {selectable && (
                            <span
                                className={`inline-flex h-5 w-5 items-center justify-center border ${
                                    selected
                                        ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white'
                                        : 'border-[#1a1f1e]/25 text-transparent'
                                }`}
                            >
                                <Check className="h-3 w-3" />
                            </span>
                        )}
                        <span className="text-[10px] font-medium uppercase tracking-widest text-[#1a1f1e]/25">
                            #{index + 1}
                        </span>
                        <h3 className="text-base font-semibold text-[#1a1f1e]">
                            {candidat.prenom} {candidat.nom}
                        </h3>
                        {selected && (
                            <span className="inline-flex items-center gap-1 border border-[#1a1f1e] bg-[#1a1f1e] px-2 py-0.5 text-[9px] uppercase tracking-widest text-white">
                                Sélectionné
                            </span>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                        {candidat.poste?.nom && (
                            <CommonBadge matched={!!posteMatches} icon={Briefcase} label={candidat.poste.nom} />
                        )}
                        {candidat.niveau_experience?.nom && (
                            <CommonBadge matched={!!experienceMatches} icon={Award} label={candidat.niveau_experience.nom} />
                        )}
                        {candidat.formation_juridique?.nom && (
                            <CommonBadge
                                matched={!!formationMatches}
                                icon={GraduationCap}
                                label={candidat.formation_juridique.nom}
                            />
                        )}
                    </div>

                    {candidat.specialisations && candidat.specialisations.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                            {candidat.specialisations.map((spec) => {
                                const specId = spec.specialisation_id ?? spec.specialisation?.id;
                                const matched = specId !== undefined && offerSpecialisationIds.has(specId);

                                return (
                                    <span
                                        key={spec.id}
                                        className={`px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                                            matched
                                                ? 'bg-[#1a1f1e] text-white'
                                                : 'border border-[#1a1f1e]/12 text-[#1a1f1e]/50'
                                        }`}
                                    >
                                        {spec.specialisation?.nom}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                    {candidat.langues && candidat.langues.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {candidat.langues.map((langue) => {
                                const langueId = langue.langue_id ?? langue.langue?.id;
                                const matched = langueId !== undefined && offerLangueIds.has(langueId);
                                const label = `${langue.langue?.nom ?? ''}${
                                    langue.niveau_langue?.nom ? ` (${langue.niveau_langue.nom})` : ''
                                }`;

                                return (
                                    <span
                                        key={langue.id}
                                        className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                                            matched
                                                ? 'bg-[#1a1f1e] text-white'
                                                : 'border border-[#1a1f1e]/12 text-[#1a1f1e]/50'
                                        }`}
                                    >
                                        <Globe className="h-3 w-3" />
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                    {breakdown && (
                        <div className="flex flex-wrap gap-3 text-[10px] uppercase tracking-wider text-[#1a1f1e]/35">
                            <span className="text-emerald-600">+{breakdown.language_bonus} bonus langues</span>
                            {breakdown.language_penalty > 0 && (
                                <span className="text-rose-500">−{breakdown.language_penalty} malus langues</span>
                            )}
                            {breakdown.specialisation_penalty > 0 && (
                                <span className="text-rose-500">
                                    −{breakdown.specialisation_penalty} malus spécialités
                                </span>
                            )}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-4 border-t border-[#1a1f1e]/6 pt-2 text-xs text-[#1a1f1e]/40">
                        {candidat.user?.telephone && (
                            <span className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                <Phone className="h-3 w-3" />
                                {candidat.user.telephone}
                            </span>
                        )}
                        {candidat.user?.email && (
                            <a
                                href={`mailto:${candidat.user.email}`}
                                className="flex items-center gap-1.5 transition-colors hover:text-[#C06041]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Mail className="h-3 w-3" />
                                {candidat.user.email}
                            </a>
                        )}
                    </div>
                </div>

                <div className={`flex min-w-[80px] shrink-0 flex-col items-center justify-center border px-5 py-4 ${colors.bg}`}>
                    <span className={`text-3xl font-medium ${colors.text}`}>{displayScore}</span>
                    <span className={`text-[9px] uppercase tracking-widest opacity-70 ${colors.text}`}>score</span>
                </div>
            </div>
        </div>
    );
}

function CommonBadge({
    matched,
    icon: Icon,
    label,
}: {
    matched: boolean;
    icon: ComponentType<{ className?: string }>;
    label: string;
}) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 ${
                matched ? 'bg-[#1a1f1e] text-white' : 'text-[#1a1f1e]/50'
            }`}
        >
            <Icon className="h-3 w-3" />
            {label}
        </span>
    );
}
