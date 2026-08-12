import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Building2, Globe, ExternalLink, ArrowLeft, Briefcase, MapPin, Users } from 'lucide-react';

const breadcrumbs = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Recruteurs', href: '/admin/recruteurs' },
];

export default function Recruteurs({ recruteurs }: any) {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Recruteurs" />

            <div className="flex flex-col gap-8" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {/* Header */}
                <div className="border-b border-[#1a1f1e]/10 pb-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#C06041] font-medium mb-2">
                        Administration
                    </p>
                    <h1
                        className="text-4xl md:text-5xl text-[#1a1f1e] font-light leading-tight"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                        Entreprises <span className="italic">& cabinets</span>
                    </h1>
                    <p className="text-[#1a1f1e]/40 mt-2 text-sm">
                        {recruteurs.total} recruteur{recruteurs.total > 1 ? 's' : ''} inscrits
                    </p>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse" style={{ minWidth: '900px' }}>
                        <thead>
                            <tr className="border-b border-[#1a1f1e]/10">
                                {['Entreprise', 'Contact', 'Poste occupé', 'Ville', 'Type / Taille', 'Site web', 'Inscrit le', 'Offres'].map((h) => (
                                    <th
                                        key={h}
                                        className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[#1a1f1e]/40 font-medium whitespace-nowrap"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {recruteurs.data.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="px-4 py-12 text-center text-sm text-[#1a1f1e]/30 uppercase tracking-wider">
                                        Aucun recruteur trouvé
                                    </td>
                                </tr>
                            )}
                            {recruteurs.data.map((recruteur: any, i: number) => (
                                <tr
                                    key={recruteur.id}
                                    className="border-b border-[#1a1f1e]/5 hover:bg-[#1a1f1e]/[0.015] transition-colors group"
                                >
                                    {/* Entreprise */}
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 bg-[#1a1f1e] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                                                {recruteur.nom_entreprise?.charAt(0)?.toUpperCase() || '?'}
                                            </div>
                                            <span className="font-semibold text-[#1a1f1e] text-sm">{recruteur.nom_entreprise}</span>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td className="px-4 py-4">
                                        {recruteur.user?.email ? (
                                            <a
                                                href={`mailto:${recruteur.user.email}`}
                                                className="text-xs text-[#1a1f1e]/60 hover:text-[#C06041] transition-colors"
                                            >
                                                {recruteur.user.email}
                                            </a>
                                        ) : (
                                            <span className="text-xs text-[#1a1f1e]/25">—</span>
                                        )}
                                    </td>

                                    {/* Poste */}
                                    <td className="px-4 py-4 text-xs text-[#1a1f1e]/60">
                                        {recruteur.poste || <span className="text-[#1a1f1e]/25">—</span>}
                                    </td>

                                    {/* Ville */}
                                    <td className="px-4 py-4 text-xs text-[#1a1f1e]/60">
                                        {recruteur.ville?.nom ? (
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-3 w-3 text-[#1a1f1e]/30" />
                                                {recruteur.ville.nom}
                                            </span>
                                        ) : (
                                            <span className="text-[#1a1f1e]/25">—</span>
                                        )}
                                    </td>

                                    {/* Type / Taille */}
                                    <td className="px-4 py-4">
                                        <div className="text-xs text-[#1a1f1e]/60">{recruteur.type_organisation?.nom || '—'}</div>
                                        {recruteur.taille_entreprise?.nom && (
                                            <div className="text-[10px] text-[#1a1f1e]/35 mt-0.5">{recruteur.taille_entreprise.nom}</div>
                                        )}
                                    </td>

                                    {/* Site */}
                                    <td className="px-4 py-4">
                                        {recruteur.site_web ? (
                                            <a
                                                href={recruteur.site_web}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-xs text-[#C06041] hover:underline"
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                                Visiter
                                            </a>
                                        ) : (
                                            <span className="text-xs text-[#1a1f1e]/25">—</span>
                                        )}
                                    </td>

                                    {/* Date */}
                                    <td className="px-4 py-4 text-xs text-[#1a1f1e]/40">
                                        {new Date(recruteur.created_at).toLocaleDateString('fr-FR')}
                                    </td>

                                    {/* Link to offres */}
                                    <td className="px-4 py-4">
                                        <Link
                                            href={`/admin/recruteurs/${recruteur.id}/offres`}
                                            className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider border border-[#1a1f1e]/20 text-[#1a1f1e]/60 px-2 py-1 hover:bg-[#1a1f1e] hover:text-white hover:border-[#1a1f1e] transition-colors"
                                        >
                                            <Briefcase className="h-3 w-3" />
                                            Voir
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {recruteurs.links?.length > 3 && (
                    <div className="flex flex-wrap gap-1.5 border-t border-[#1a1f1e]/8 pt-6">
                        {recruteurs.links.map((link: any, index: number) =>
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