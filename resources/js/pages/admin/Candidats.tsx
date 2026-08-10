import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, GraduationCap, Briefcase, Globe, Clock, MapPin, Phone, Mail, Archive } from 'lucide-react';

const breadcrumbs = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Candidats', href: '/admin/candidats' },
];

export default function Candidats({ candidates, currentStatus }: any) {
    const handleApprove = (id: number) => {
        router.post(route('admin.candidates.approve', id), {}, { preserveScroll: true });
    };

    const handleReject = (id: number) => {
        router.post(route('admin.candidates.reject', id), {}, { preserveScroll: true });
    };

    const handleArchive = (id: number) => {
        router.post(route('admin.candidates.archive', id), {}, { preserveScroll: true });
    };

    const getInitials = (nom: string, prenom: string) => {
        return `${prenom?.charAt(0) || ''}${nom?.charAt(0) || ''}`.toUpperCase();
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Candidats" />

            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Candidats</h1>
                        <p className="text-muted-foreground mt-1">
                            Gérez les profils des candidats inscrits ({candidates.total} au total).
                        </p>
                    </div>
                </div>

                <div className="flex border-b">
                    <Link
                        href="/admin/candidats?status=en_attente"
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${currentStatus === 'en_attente' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                    >
                        En attente
                    </Link>
                    <Link
                        href="/admin/candidats?status=accepte"
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${currentStatus === 'accepte' || !currentStatus ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                    >
                        Acceptés
                    </Link>
                    <Link
                        href="/admin/candidats?status=refuse"
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${currentStatus === 'refuse' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                    >
                        Refusés
                    </Link>
                    <Link
                        href="/admin/candidats?status=archive"
                        className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${currentStatus === 'archive' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                    >
                        Archivés
                    </Link>
                </div>

                <div className="flex flex-col gap-6">
                    {candidates.data.map((candidat: any) => (
                        <Card key={candidat.id} className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-muted shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                {/* Top Layout: Avatar, Info, Actions */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-lg">
                                        {getInitials(candidat.nom, candidat.prenom)}
                                    </div>
                                    
                                    <div className="flex-1 text-center px-4">
                                        <h3 className="text-xl font-bold text-foreground">
                                            {candidat.prenom} {candidat.nom}
                                        </h3>
                                        <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
                                            {candidat.poste?.name && <span>{candidat.poste.name}</span>}
                                            {candidat.ville_travails?.length > 0 && (
                                                <>
                                                    <span className="text-muted-foreground/50">•</span>
                                                    <span>{candidat.ville_travails.map((v: any) => v.ville?.name).join(', ')}</span>
                                                </>
                                            )}
                                            {candidat.formation_juridique?.name && (
                                                <>
                                                    <span className="text-muted-foreground/50">•</span>
                                                    <span>{candidat.formation_juridique.name}</span>
                                                </>
                                            )}
                                            {candidat.niveau_experience?.name && (
                                                <>
                                                    <span className="text-muted-foreground/50">•</span>
                                                    <span>{candidat.niveau_experience.name}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                        {currentStatus === 'en_attente' && (
                                            <>
                                                <Button onClick={() => handleApprove(candidat.id)} variant="outline" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200">
                                                    <Check className="h-4 w-4 mr-1" />
                                                    Accepter
                                                </Button>
                                                <Button onClick={() => handleReject(candidat.id)} variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                                                    <X className="h-4 w-4 mr-1" />
                                                    Refuser
                                                </Button>
                                            </>
                                        )}
                                        {currentStatus === 'refuse' && (
                                            <Button onClick={() => handleApprove(candidat.id)} variant="outline" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200">
                                                <Check className="h-4 w-4 mr-1" />
                                                Accepter
                                            </Button>
                                        )}
                                        {currentStatus === 'accepte' && (
                                            <>
                                                <Button onClick={() => handleReject(candidat.id)} variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200">
                                                    <X className="h-4 w-4 mr-1" />
                                                    Refuser
                                                </Button>
                                            </>
                                        )}
                                        {currentStatus !== 'archive' && (
                                            <Button onClick={() => handleArchive(candidat.id)} variant="outline" size="sm" className="text-muted-foreground">
                                                <Archive className="h-4 w-4 mr-1" />
                                                Archiver
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Formations Section */}
                                {candidat.formations?.length > 0 && (
                                    <div className="mb-4 text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2 text-foreground font-medium">
                                            <GraduationCap className="h-4 w-4" />
                                            <span>Formation</span>
                                        </div>
                                        <div className="space-y-1">
                                            {candidat.formations.map((form: any) => (
                                                <p key={form.id} className="text-sm text-muted-foreground">
                                                    {form.formation_juridique?.name} — {form.ecole?.name} ({form.annee_fin})
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Experiences Section */}
                                {candidat.experiences?.length > 0 && (
                                    <div className="mb-6 text-center">
                                        <div className="flex items-center justify-center gap-2 mb-2 text-foreground font-medium">
                                            <Briefcase className="h-4 w-4" />
                                            <span>Expérience</span>
                                        </div>
                                        <div className="space-y-1">
                                            {candidat.experiences.map((exp: any) => (
                                                <p key={exp.id} className="text-sm text-muted-foreground">
                                                    {exp.poste?.name} — {exp.entreprise} ({exp.debut} – {exp.fin || 'Présent'})
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tags (Specialisations & Domaines) */}
                                <div className="flex flex-wrap justify-center gap-2 mb-6">
                                    {candidat.specialisations?.map((spec: any) => (
                                        <Badge key={spec.id} variant="secondary" className="bg-secondary/40 text-secondary-foreground font-normal px-3 py-1">
                                            {spec.specialisation?.name}
                                        </Badge>
                                    ))}
                                    {candidat.domain_experiences?.map((dom: any) => (
                                        <Badge key={dom.id} variant="secondary" className="bg-secondary/40 text-secondary-foreground font-normal px-3 py-1">
                                            {dom.domaine_experience?.name}
                                        </Badge>
                                    ))}
                                </div>

                                {/* Preferences Footer */}
                                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                                    {candidat.langues?.length > 0 && (
                                        <div className="flex items-center gap-1">
                                            <Globe className="h-4 w-4 text-blue-500" />
                                            <span>{candidat.langues.map((l: any) => l.langue?.name).join(', ')}</span>
                                        </div>
                                    )}
                                    {candidat.type_travails?.length > 0 && (
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4 text-orange-500" />
                                            <span>{candidat.type_travails.map((t: any) => t.type_travail?.name).join(', ')}</span>
                                        </div>
                                    )}
                                    {candidat.mode_travails?.length > 0 && (
                                        <div className="flex items-center gap-1">
                                            <MapPin className="h-4 w-4 text-teal-500" />
                                            <span>{candidat.mode_travails.map((m: any) => m.mode_travail?.name).join(' / ')}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Details */}
                                <div className="flex items-center justify-center gap-6 text-sm font-medium text-foreground pt-4 border-t border-muted/50">
                                    {candidat.user?.telephone && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4 text-muted-foreground" />
                                            <span>{candidat.user.telephone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <a href={`mailto:${candidat.user?.email}`} className="hover:underline">{candidat.user?.email}</a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    
                    {candidates.data.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            Aucun candidat trouvé pour ce statut.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {candidates.total > 0 && (
                    <div className="flex items-center justify-between px-2">
                        <p className="text-sm text-muted-foreground">
                            Affichage de {candidates.from} à {candidates.to} sur {candidates.total} candidats
                        </p>
                        <div className="flex gap-2">
                            {candidates.links.map((link: any, index: number) => {
                                if (link.label.includes('Previous')) {
                                    return (
                                        <Button key={index} variant="outline" size="sm" asChild={!!link.url} disabled={!link.url}>
                                            {link.url ? <Link href={link.url}>Précédent</Link> : <span>Précédent</span>}
                                        </Button>
                                    );
                                }
                                if (link.label.includes('Next')) {
                                    return (
                                        <Button key={index} variant="outline" size="sm" asChild={!!link.url} disabled={!link.url}>
                                            {link.url ? <Link href={link.url}>Suivant</Link> : <span>Suivant</span>}
                                        </Button>
                                    );
                                }
                                if (!link.url || isNaN(Number(link.label))) return null;
                                return (
                                    <Button key={index} variant={link.active ? "default" : "outline"} size="sm" asChild>
                                        <Link href={link.url}>{link.label}</Link>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}