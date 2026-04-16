import { Head, Link } from '@inertiajs/react';

export default function Recruteurs({ recruteurs }: any) {
    return (
        <div style={{ padding: '2rem' }}>
            <Head title="Gestion des Recruteurs" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Liste des Recruteurs ({recruteurs.total})</h1>
                <Link href="/admin/dashboard" style={{ textDecoration: 'none', color: '#3b82f6' }}>
                    ← Retour au Dashboard
                </Link>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1000px' }}>
                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                            <th style={{ padding: '1rem' }}>Entreprise</th>
                            <th style={{ padding: '1rem' }}>Contact (Email)</th>
                            <th style={{ padding: '1rem' }}>Poste occupé</th>
                            <th style={{ padding: '1rem' }}>Ville</th>
                            <th style={{ padding: '1rem' }}>Type / Taille</th>
                            <th style={{ padding: '1rem' }}>Site Web</th>
                            <th style={{ padding: '1rem' }}>Date d'inscription</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recruteurs.data.map((recruteur: any) => (
                            <tr key={recruteur.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                {/* Nom Entreprise */}
                                <td style={{ padding: '1rem', fontWeight: '600' }}>{recruteur.nom_entreprise}</td>

                                {/* Email (via la relation User) */}
                                <td style={{ padding: '1rem' }}>{recruteur.user?.email || 'N/A'}</td>

                                {/* Poste */}
                                <td style={{ padding: '1rem' }}>{recruteur.poste || '-'}</td>

                                {/* Ville (via la relation Ville) */}
                                <td style={{ padding: '1rem' }}>{recruteur.ville?.nom || 'Non définie'}</td>

                                {/* Type et Taille */}
                                <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                                    <div>{recruteur.type_organisation?.nom || 'NC'}</div>
                                    <div style={{ color: '#6b7280' }}>{recruteur.taille_entreprise?.nom || '-'}</div>
                                </td>

                                {/* Site Web */}
                                <td style={{ padding: '1rem' }}>
                                    {recruteur.site_web ? (
                                        <a href={recruteur.site_web} target="_blank" style={{ color: '#3b82f6' }}>Lien</a>
                                    ) : '-'}
                                </td>

                                {/* Date */}
                                <td style={{ padding: '1rem' }}>{new Date(recruteur.created_at).toLocaleDateString()}</td>

                                {/* Actions */}
                                <td style={{ padding: '1rem' }}>
                                    <button style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer' }}>
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination sécurisée */}
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {recruteurs.links.map((link: any, index: number) => (
                    link.url ? (
                        <Link
                            key={index}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '0.25rem',
                                backgroundColor: link.active ? '#3b82f6' : 'white',
                                color: link.active ? 'white' : '#374151',
                                textDecoration: 'none',
                                border: '1px solid #d1d5db'
                            }}
                        />
                    ) : (
                        <span
                            key={index}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '0.25rem',
                                backgroundColor: '#f3f4f6',
                                color: '#9ca3af',
                                border: '1px solid #e5e7eb',
                                cursor: 'not-allowed'
                            }}
                        />
                    )
                ))}
            </div>
        </div>
    );
}