import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Building2, Briefcase, Globe, MapPin, Users } from 'lucide-react';
import { FormEvent } from 'react';

interface Props {
    recruteur: any;
    user: any;
}

export default function Settings({ recruteur, user }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nom_entreprise: recruteur?.nom_entreprise || '',
        poste: recruteur?.poste || '',
        type_organisation: recruteur?.type_organisation || '',
        taille_entreprise: recruteur?.taille_entreprise || '',
        site_web: recruteur?.site_web || '',
        ville: recruteur?.ville || '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        put('/recruteur/settings/profile');
    };

    return (
        <div className="min-h-screen bg-[#FDFCF8] text-[#1a1f1e]">
            <Head title="Paramètres Recruteur - Jurijob" />

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link 
                            href="/recruteur/dashboard"
                            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1a1f1e]/50 hover:text-[#1a1f1e]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Retour au tableau de bord
                        </Link>
                        <h1 className="text-3xl font-bold font-serif italic text-blue-900">
                            Paramètres de l'entreprise
                        </h1>
                    </div>
                </div>

                <div className="rounded-[32px] border border-[#1a1f1e]/10 bg-white p-8 shadow-sm">
                    <form onSubmit={submit} className="space-y-8">
                        
                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Nom de l'entreprise */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold">
                                    <Building2 className="h-4 w-4 opacity-50" />
                                    Nom de l'entreprise *
                                </label>
                                <input
                                    type="text"
                                    value={data.nom_entreprise}
                                    onChange={e => setData('nom_entreprise', e.target.value)}
                                    className="w-full rounded-xl border border-[#1a1f1e]/10 bg-[#FDFCF8] px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                {errors.nom_entreprise && <div className="text-red-500 text-xs">{errors.nom_entreprise}</div>}
                            </div>

                            {/* Poste */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold">
                                    <Briefcase className="h-4 w-4 opacity-50" />
                                    Votre Poste *
                                </label>
                                <input
                                    type="text"
                                    value={data.poste}
                                    onChange={e => setData('poste', e.target.value)}
                                    className="w-full rounded-xl border border-[#1a1f1e]/10 bg-[#FDFCF8] px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                {errors.poste && <div className="text-red-500 text-xs">{errors.poste}</div>}
                            </div>

                            {/* Type d'organisation */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold">
                                    <Building2 className="h-4 w-4 opacity-50" />
                                    Type d'organisation *
                                </label>
                                <select
                                    value={data.type_organisation}
                                    onChange={e => setData('type_organisation', e.target.value)}
                                    className="w-full rounded-xl border border-[#1a1f1e]/10 bg-[#FDFCF8] px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                >
                                    <option value="" disabled>Sélectionner le type</option>
                                    <option value="Cabinet d'avocats">Cabinet d'avocats</option>
                                    <option value="Entreprise (Direction juridique)">Entreprise (Direction juridique)</option>
                                    <option value="Etude de notaire">Etude de notaire</option>
                                    <option value="Cabinet de recrutement">Cabinet de recrutement</option>
                                    <option value="Autre">Autre</option>
                                </select>
                                {errors.type_organisation && <div className="text-red-500 text-xs">{errors.type_organisation}</div>}
                            </div>

                            {/* Taille de l'entreprise */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold">
                                    <Users className="h-4 w-4 opacity-50" />
                                    Taille de l'entreprise *
                                </label>
                                <select
                                    value={data.taille_entreprise}
                                    onChange={e => setData('taille_entreprise', e.target.value)}
                                    className="w-full rounded-xl border border-[#1a1f1e]/10 bg-[#FDFCF8] px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                >
                                    <option value="" disabled>Sélectionner la taille</option>
                                    <option value="1-10">1-10 employés</option>
                                    <option value="11-50">11-50 employés</option>
                                    <option value="51-200">51-200 employés</option>
                                    <option value="201-500">201-500 employés</option>
                                    <option value="500+">Plus de 500 employés</option>
                                </select>
                                {errors.taille_entreprise && <div className="text-red-500 text-xs">{errors.taille_entreprise}</div>}
                            </div>

                            {/* Ville */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold">
                                    <MapPin className="h-4 w-4 opacity-50" />
                                    Ville *
                                </label>
                                <input
                                    type="text"
                                    value={data.ville}
                                    onChange={e => setData('ville', e.target.value)}
                                    className="w-full rounded-xl border border-[#1a1f1e]/10 bg-[#FDFCF8] px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    required
                                />
                                {errors.ville && <div className="text-red-500 text-xs">{errors.ville}</div>}
                            </div>

                            {/* Site Web */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-bold">
                                    <Globe className="h-4 w-4 opacity-50" />
                                    Site Web (Optionnel)
                                </label>
                                <input
                                    type="url"
                                    value={data.site_web}
                                    onChange={e => setData('site_web', e.target.value)}
                                    placeholder="https://www.exemple.com"
                                    className="w-full rounded-xl border border-[#1a1f1e]/10 bg-[#FDFCF8] px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                                {errors.site_web && <div className="text-red-500 text-xs">{errors.site_web}</div>}
                            </div>
                        </div>

                        <div className="flex justify-end border-t border-[#1a1f1e]/10 pt-6">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 rounded-full bg-[#1a1f1e] px-8 py-3 text-sm font-bold text-white transition-all hover:bg-[#1a1f1e]/90 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                <Save className="h-4 w-4" />
                                Enregistrer les modifications
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
