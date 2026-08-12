import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Search,
    Building2,
    MapPin,
    Briefcase,
    Clock,
    CheckCircle2,
    FileText,
    Users,
} from 'lucide-react';

type OffreStatut =
    | 'EN_TRAITEMENT'
    | 'ATTENTE_PAIEMENT'
    | 'VERIFICATION_PAIEMENT'
    | 'CV_ENVOYES'
    | 'ARCHIVE';

const breadcrumbs = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Offres', href: '/admin/offres' },
];

const statutTabs: { value: OffreStatut; label: string }[] = [
    { value: 'EN_TRAITEMENT', label: 'En traitement' },
    { value: 'ATTENTE_PAIEMENT', label: 'Attente paiement' },
    { value: 'VERIFICATION_PAIEMENT', label: 'Vérification paiement' },
    { value: 'CV_ENVOYES', label: 'CV envoyés' },
    { value: 'ARCHIVE', label: 'Archivées' },
];

const statutBadgeClass: Record<OffreStatut, string> = {
    EN_TRAITEMENT: 'bg-amber-100 text-amber-700',
    ATTENTE_PAIEMENT: 'bg-orange-100 text-orange-700',
    VERIFICATION_PAIEMENT: 'bg-blue-100 text-blue-700',
    CV_ENVOYES: 'bg-emerald-100 text-emerald-700',
    ARCHIVE: 'bg-slate-100 text-slate-700',
};

const statutLabel: Record<OffreStatut, string> = {
    EN_TRAITEMENT: 'En traitement',
    ATTENTE_PAIEMENT: 'Attente paiement',
    VERIFICATION_PAIEMENT: 'Vérification paiement',
    CV_ENVOYES: 'CV envoyés',
    ARCHIVE: 'Archivée',
};

export default function Offres({ offres, currentStatut, filters }: any) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            '/admin/offres',
            { statut: currentStatut, search },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleConfirmPayment = (id: number) => {
        router.post(`/admin/offres/${id}/confirm-payment`, {}, { preserveScroll: true });
    };

    const searchQuery = search ? `&search=${encodeURIComponent(search)}` : '';

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Offres" />

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Offres</h1>
                        <p className="mt-1 text-muted-foreground">
                            Suivez et validez les demandes des recruteurs ({offres.total} au total).
                        </p>
                    </div>
                    <form onSubmit={handleSearch} className="flex w-full items-center gap-2 sm:max-w-sm">
                        <div className="relative w-full">
                            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Rechercher par titre ou entreprise..."
                                className="bg-background pl-9"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button type="submit" variant="secondary">
                            Chercher
                        </Button>
                    </form>
                </div>

                <div className="flex overflow-x-auto border-b">
                    {statutTabs.map((tab) => (
                        <Link
                            key={tab.value}
                            href={`/admin/offres?statut=${tab.value}${searchQuery}`}
                            className={`whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                                currentStatut === tab.value
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    {offres.data.length === 0 ? (
                        <Card>
                            <CardContent className="py-12 text-center text-muted-foreground">
                                Aucune offre pour ce statut.
                            </CardContent>
                        </Card>
                    ) : (
                        offres.data.map((offre: any) => (
                            <Card
                                key={offre.id}
                                className="border-muted bg-card/50 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="min-w-0 flex-1 space-y-3">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="text-lg font-bold text-foreground">
                                                    {offre.titre}
                                                </h3>
                                                <Badge
                                                    className={`border-none text-[10px] uppercase tracking-wider ${
                                                        statutBadgeClass[offre.statut as OffreStatut] ||
                                                        'bg-slate-100 text-slate-700'
                                                    }`}
                                                >
                                                    {statutLabel[offre.statut as OffreStatut] || offre.statut}
                                                </Badge>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Building2 className="h-4 w-4" />
                                                    {offre.recruteur?.nom_entreprise || 'Entreprise N/A'}
                                                </span>
                                                {offre.poste?.nom && (
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Briefcase className="h-4 w-4" />
                                                        {offre.poste.nom}
                                                    </span>
                                                )}
                                                {offre.ville?.nom && (
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <MapPin className="h-4 w-4" />
                                                        {offre.ville.nom}
                                                    </span>
                                                )}
                                                <span className="inline-flex items-center gap-1.5">
                                                    <FileText className="h-4 w-4" />
                                                    {offre.nombre_cv} CV
                                                </span>
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Clock className="h-4 w-4" />
                                                    {new Date(offre.created_at).toLocaleDateString('fr-FR')}
                                                </span>
                                            </div>

                                            {(offre.type_travail?.nom ||
                                                offre.mode_travail?.nom ||
                                                offre.niveau_experience?.nom) && (
                                                <div className="flex flex-wrap gap-2">
                                                    {offre.type_travail?.nom && (
                                                        <Badge variant="outline">{offre.type_travail.nom}</Badge>
                                                    )}
                                                    {offre.mode_travail?.nom && (
                                                        <Badge variant="outline">{offre.mode_travail.nom}</Badge>
                                                    )}
                                                    {offre.niveau_experience?.nom && (
                                                        <Badge variant="outline">
                                                            {offre.niveau_experience.nom}
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex shrink-0 flex-wrap gap-2">
                                            {currentStatut === 'EN_TRAITEMENT' && (
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/admin/offres/${offre.id}/matching`}>
                                                        <Users className="mr-1 h-4 w-4" />
                                                        Voir le matching
                                                    </Link>
                                                </Button>
                                            )}
                                            {currentStatut === 'VERIFICATION_PAIEMENT' && (
                                                <Button
                                                    onClick={() => handleConfirmPayment(offre.id)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                                                >
                                                    <CheckCircle2 className="mr-1 h-4 w-4" />
                                                    Confirmer le paiement
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>

                {offres.links?.length > 3 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {offres.links.map((link: any, index: number) =>
                            link.url ? (
                                <Link
                                    key={index}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`rounded-md border px-3 py-1.5 text-sm ${
                                        link.active
                                            ? 'border-primary bg-primary text-primary-foreground'
                                            : 'border-border bg-background text-foreground hover:bg-muted'
                                    }`}
                                />
                            ) : (
                                <span
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className="rounded-md border border-transparent px-3 py-1.5 text-sm text-muted-foreground"
                                />
                            ),
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
