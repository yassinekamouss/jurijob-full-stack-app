import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Building2,
    Briefcase,
    GraduationCap,
    Globe,
    Mail,
    Phone,
    Users,
    Award,
} from 'lucide-react';

type MatchingBreakdown = {
    score: number;
    language_bonus: number;
    language_penalty: number;
    specialisation_penalty: number;
};

type MatchedCandidate = {
    id: number;
    nom: string;
    prenom: string;
    matching_score: number;
    matching_breakdown?: MatchingBreakdown;
    user?: { email?: string; telephone?: string };
    poste?: { nom?: string };
    niveau_experience?: { nom?: string };
    formation_juridique?: { nom?: string };
    langues?: Array<{
        id: number;
        langue?: { nom?: string };
        niveau_langue?: { nom?: string };
    }>;
    specialisations?: Array<{
        id: number;
        specialisation?: { nom?: string };
    }>;
};

type Props = {
    offre: {
        id: number;
        titre: string;
        statut: string;
        nombre_cv: number;
        recruteur?: { nom_entreprise?: string };
        poste?: { nom?: string };
        ville?: { nom?: string };
        niveau_experience?: { nom?: string };
        formation_juridique?: { nom?: string };
    };
    candidates: MatchedCandidate[];
};

const breadcrumbs = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Offres', href: '/admin/offres?statut=EN_TRAITEMENT' },
    { title: 'Matching', href: '#' },
];

function scoreTone(score: number): string {
    if (score >= 100) {
        return 'bg-emerald-100 text-emerald-800';
    }
    if (score >= 90) {
        return 'bg-sky-100 text-sky-800';
    }
    if (score >= 80) {
        return 'bg-amber-100 text-amber-800';
    }

    return 'bg-rose-100 text-rose-800';
}

function CandidatesList({
    candidates,
    nombreCv,
}: {
    candidates: MatchedCandidate[];
    nombreCv: number;
}) {
    if (candidates.length === 0) {
        return (
            <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                    Aucun candidat ne correspond aux critères durs de cette offre.
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
                {candidates.length} profil(s) classé(s) — short-list demandée : {nombreCv} CV
            </p>

            {candidates.map((candidat, index) => {
                const inShortlist = index < nombreCv;
                const breakdown = candidat.matching_breakdown;

                return (
                    <Card
                        key={candidat.id}
                        className={`border-muted shadow-sm transition-shadow hover:shadow-md ${
                            inShortlist ? 'ring-1 ring-emerald-200' : ''
                        }`}
                    >
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="min-w-0 flex-1 space-y-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                            #{index + 1}
                                        </span>
                                        <h3 className="text-lg font-bold">
                                            {candidat.prenom} {candidat.nom}
                                        </h3>
                                        {inShortlist && (
                                            <Badge className="border-none bg-emerald-100 text-emerald-800">
                                                Short-list
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                        {candidat.poste?.nom && (
                                            <span className="inline-flex items-center gap-1.5">
                                                <Briefcase className="h-4 w-4" />
                                                {candidat.poste.nom}
                                            </span>
                                        )}
                                        {candidat.niveau_experience?.nom && (
                                            <span className="inline-flex items-center gap-1.5">
                                                <Award className="h-4 w-4" />
                                                {candidat.niveau_experience.nom}
                                            </span>
                                        )}
                                        {candidat.formation_juridique?.nom && (
                                            <span className="inline-flex items-center gap-1.5">
                                                <GraduationCap className="h-4 w-4" />
                                                {candidat.formation_juridique.nom}
                                            </span>
                                        )}
                                    </div>

                                    {candidat.specialisations && candidat.specialisations.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {candidat.specialisations.map((spec) => (
                                                <Badge key={spec.id} variant="secondary">
                                                    {spec.specialisation?.nom}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    {candidat.langues && candidat.langues.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                            <Globe className="h-4 w-4" />
                                            <span>
                                                {candidat.langues
                                                    .map(
                                                        (langue) =>
                                                            `${langue.langue?.nom ?? ''}${
                                                                langue.niveau_langue?.nom
                                                                    ? ` (${langue.niveau_langue.nom})`
                                                                    : ''
                                                            }`,
                                                    )
                                                    .filter(Boolean)
                                                    .join(' · ')}
                                            </span>
                                        </div>
                                    )}

                                    {breakdown && (
                                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                                            <span>Bonus langues +{breakdown.language_bonus}</span>
                                            <span>Pénalité langues −{breakdown.language_penalty}</span>
                                            <span>Pénalité spécialités −{breakdown.specialisation_penalty}</span>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-4 border-t border-muted/60 pt-3 text-sm">
                                        {candidat.user?.telephone && (
                                            <span className="inline-flex items-center gap-1.5">
                                                <Phone className="h-4 w-4 text-muted-foreground" />
                                                {candidat.user.telephone}
                                            </span>
                                        )}
                                        {candidat.user?.email && (
                                            <a
                                                href={`mailto:${candidat.user.email}`}
                                                className="inline-flex items-center gap-1.5 hover:underline"
                                            >
                                                <Mail className="h-4 w-4 text-muted-foreground" />
                                                {candidat.user.email}
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <Badge
                                    className={`shrink-0 border-none px-3 py-1 text-sm font-bold ${scoreTone(
                                        candidat.matching_score,
                                    )}`}
                                >
                                    Score {candidat.matching_score}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

export default function OffreMatching({ offre, candidates }: Props) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={`Matching — ${offre.titre}`} />

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                        <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
                            <Link href="/admin/offres?statut=EN_TRAITEMENT">
                                <ArrowLeft className="mr-1 h-4 w-4" />
                                Retour aux offres
                            </Link>
                        </Button>
                        <h1 className="text-3xl font-bold tracking-tight">{offre.titre}</h1>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            {offre.recruteur?.nom_entreprise && (
                                <span className="inline-flex items-center gap-1.5">
                                    <Building2 className="h-4 w-4" />
                                    {offre.recruteur.nom_entreprise}
                                </span>
                            )}
                            {offre.poste?.nom && (
                                <span className="inline-flex items-center gap-1.5">
                                    <Briefcase className="h-4 w-4" />
                                    {offre.poste.nom}
                                </span>
                            )}
                            {offre.niveau_experience?.nom && <span>{offre.niveau_experience.nom}</span>}
                            {offre.formation_juridique?.nom && <span>{offre.formation_juridique.nom}</span>}
                            <span className="inline-flex items-center gap-1.5">
                                <Users className="h-4 w-4" />
                                {offre.nombre_cv} CV demandés
                            </span>
                        </div>
                    </div>
                </div>

                <CandidatesList candidates={candidates ?? []} nombreCv={offre.nombre_cv} />
            </div>
        </AdminLayout>
    );
}
