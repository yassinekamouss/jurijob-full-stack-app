import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink } from 'lucide-react';

const breadcrumbs = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Recruteurs', href: '/admin/recruteurs' },
];

export default function Recruteurs({ recruteurs }: any) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Recruteurs" />

            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Recruteurs</h1>
                    <p className="text-muted-foreground mt-1">
                        Gérez les entreprises et cabinets inscrits ({recruteurs.total} au total).
                    </p>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50 border-b">
                                    <tr>
                                        <th className="px-6 py-4 text-left font-semibold">Entreprise</th>
                                        <th className="px-6 py-4 text-left font-semibold">Contact</th>
                                        <th className="px-6 py-4 text-left font-semibold">Ville</th>
                                        <th className="px-6 py-4 text-left font-semibold">Type / Taille</th>
                                        <th className="px-6 py-4 text-left font-semibold">Site Web</th>
                                        <th className="px-6 py-4 text-left font-semibold">Inscription</th>
                                        <th className="px-6 py-4 text-right font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {recruteurs.data.map((recruteur: any) => (
                                        <tr key={recruteur.id} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="font-medium">{recruteur.nom_entreprise}</div>
                                                <div className="text-xs text-muted-foreground">{recruteur.poste || '—'}</div>
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {recruteur.user?.email || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {recruteur.ville?.nom || '—'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <Badge variant="secondary" className="w-fit font-normal">
                                                        {recruteur.type_organisation?.nom || 'NC'}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        {recruteur.taille_entreprise?.nom || '—'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {recruteur.site_web ? (
                                                    <a
                                                        href={recruteur.site_web}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline text-xs"
                                                    >
                                                        Visiter
                                                    </a>
                                                ) : (
                                                    <span className="text-muted-foreground">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {new Date(recruteur.created_at).toLocaleDateString('fr-FR', {
                                                    day: 'numeric', month: 'short', year: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {recruteur.site_web && (
                                                        <Button variant="ghost" size="icon" asChild>
                                                            <a href={recruteur.site_web} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="h-4 w-4" />
                                                            </a>
                                                        </Button>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Pagination */}
                <div className="flex items-center justify-between px-2">
                    <p className="text-sm text-muted-foreground">
                        Affichage de {recruteurs.from} à {recruteurs.to} sur {recruteurs.total} recruteurs
                    </p>
                    <div className="flex gap-2">
                        {recruteurs.links.map((link: any, index: number) => {
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
                                <Button key={index} variant={link.active ? 'default' : 'outline'} size="sm" asChild>
                                    <Link href={link.url}>{link.label}</Link>
                                </Button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}