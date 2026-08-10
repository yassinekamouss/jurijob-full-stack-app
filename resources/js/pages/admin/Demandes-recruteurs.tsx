import React from 'react';
import { Head, Link } from '@inertiajs/react';

// --- Interfaces pour le typage TypeScript ---
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
}

interface Recruteur {
    id: number;
    nom_entreprise: string;
}

interface Props {
    recruteur: Recruteur;
    offres: Offre[];
}

const DemandesRecruteurs = ({ recruteur, offres }: Props) => {
    return (
        <div className="p-6 bg-white shadow-sm rounded-lg">
            <Head title={`Demandes de ${recruteur.nom_entreprise}`} />

            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">
                    Demandes de : <span className="text-blue-600">{recruteur.nom_entreprise}</span>
                </h2>
                <Link
                    href="/admin/recruteurs"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                >
                    Retour à la liste
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Titre</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Poste</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Ville</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Statut</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {offres.length > 0 ? (
                            offres.map((offre) => (
                                <tr key={offre.id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 py-4 whitespace-nowrap font-medium">{offre.titre}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{offre.poste?.nom || 'N/A'}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{offre.ville?.nom || 'N/A'}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${offre.statut === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'}`}
                                        >
                                            {offre.statut}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap text-center">
                                        <Link
                                            href={`/admin/offres/${offre.id}`}
                                            className="inline-flex items-center px-3 py-1 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            Détails
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-4 py-10 text-center text-gray-500 italic">
                                    Aucune demande trouvée pour ce recruteur.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DemandesRecruteurs;