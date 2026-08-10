import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
    ArrowLeft,
    Briefcase,
    CheckCircle2,
    Eye,
    FileText,
    Globe,
    GraduationCap,
    MapPin,
    ShieldCheck,
    Sparkles,
    Wallet,
} from 'lucide-react';
import { useMemo } from 'react';

interface Props {
    data: any;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onPrev: () => void;
    taxonomies: any;
}

const importanceLevels: { [key: string]: { label: string; color: string } } = {
    indispensable: { label: 'Indispensable', color: 'bg-rose-100 text-rose-700' },
    important: { label: 'Important', color: 'bg-orange-100 text-orange-700' },
    souhaitable: { label: 'Souhaitable', color: 'bg-sky-100 text-sky-700' },
    facultatif: { label: 'Facultatif', color: 'bg-gray-100 text-gray-700' },
};

export default function CreateReviewStep({ data, processing, onSubmit, onPrev, taxonomies }: Props) {
    const selectedSpecialisations = useMemo(() => {
        return data.requirements.filter((req: any) => req.taxonomy_type === 'SPECIALISATION');
    }, [data.requirements]);

    const selectedLanguages = useMemo(() => {
        return data.requirements.filter((req: any) => req.taxonomy_type === 'LANGUE');
    }, [data.requirements]);

    const getTaxonomyName = (taxId: number, type: string) => {
        const keyMap: { [key: string]: string } = {
            SPECIALISATION: 'specialisations',
            LANGUE: 'langues',
        };

        const key = keyMap[type];
        const item = taxonomies[key]?.find((tax: any) => tax.id === taxId);

        return item?.nom || 'Inconnu';
    };

    const getValue = (taxonomyKey: string, value: string) => {
        return taxonomies[taxonomyKey]?.find((item: any) => String(item.id) === String(value))?.nom || 'Non spécifié';
    };

    const hasRemoteMode = /teletravail|télétravail/i.test(getValue('modeTravails', data.mode_travail_id));
    const cvCount = Math.max(1, Number(data.nombre_cv) || 1);
    const cvUnitPrice = 1490;
    const cvTotalPrice = cvCount * cvUnitPrice;
    const formatMad = (amount: number) =>
        new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD',
            maximumFractionDigits: 0,
        }).format(amount);

    const infoItems = [
        { label: 'Poste', value: getValue('postes', data.poste_id), icon: Briefcase },
        { label: 'Contrat', value: getValue('typeTravails', data.type_travail_id), icon: ShieldCheck },
        { label: 'Mode', value: getValue('modeTravails', data.mode_travail_id), icon: Eye },
        {
            label: 'Localisation',
            value: hasRemoteMode ? 'Télétravail' : getValue('villes', data.ville_id),
            icon: MapPin,
        },
        {
            label: 'Salaire',
            value: data.salaire_id ? getValue('salaires', data.salaire_id) : 'Budget confidentiel',
            icon: Wallet,
        },
        { label: 'Urgence', value: getValue('urgences', data.urgence_id), icon: Sparkles },
        {
            label: 'CV souhaités',
            value: `${cvCount} CV · ${formatMad(cvTotalPrice)} HT`,
            icon: FileText,
        },
    ];

    return (
        <div className="space-y-8">
            <div className="rounded-[32px] border border-slate-100 bg-[#FCFCFB] p-5 sm:p-7">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1a1f1e] text-white">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">
                            Étape 6 · Récapitulatif
                        </p>
                        <h2 className="font-serif text-3xl font-bold italic tracking-tight text-[#1a1f1e] sm:text-4xl">
                            Relisez avant publication
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed text-[#1a1f1e]/55 sm:text-base">
                            Vérifiez les informations essentielles dans un format clair et professionnel.
                        </p>
                    </div>
                </div>
            </div>

            <section className="rounded-[32px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">Aperçu</p>
                        <h3 className="mt-2 font-serif text-2xl font-bold italic tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                            {data.titre || 'Sans titre'}
                        </h3>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {infoItems.map((item) => (
                            <div
                                key={item.label}
                                className="rounded-2xl border border-slate-100 bg-[#FCFCFB] px-4 py-4"
                            >
                                <div className="flex items-center gap-2 text-slate-400">
                                    <item.icon className="h-4 w-4" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.18em]">{item.label}</p>
                                </div>
                                <p className="mt-2 text-sm font-semibold leading-snug text-slate-900 sm:text-[15px]">
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-[28px] border border-slate-100 bg-[#FCFCFB] p-5 sm:p-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Description</p>
                        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-[15px]">
                            {data.description || 'Aucune description renseignée.'}
                        </p>
                    </div>

                    {data.notes_complementaires && (
                        <div className="rounded-[28px] border border-amber-100 bg-amber-50/70 p-5 sm:p-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">
                                Notes complémentaires
                            </p>
                            <p className="mt-3 text-sm leading-7 text-amber-900/80 sm:text-[15px]">
                                {data.notes_complementaires}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <section className="grid gap-5 lg:grid-cols-2 lg:gap-6">
                <div className="rounded-[32px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <GraduationCap className="h-5 w-5 text-[#C06041]" />
                        <h3 className="text-lg font-bold tracking-tight text-slate-900">Expérience et formation</h3>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-100 bg-[#FCFCFB] p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Niveau d'expérience
                            </p>
                            <p className="mt-2 text-sm font-semibold text-slate-900">
                                {getValue('niveauExperiences', data.niveau_experience_id)}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-[#FCFCFB] p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                Formation juridique
                            </p>
                            <p className="mt-2 text-sm font-semibold text-slate-900">
                                {getValue('formationJuridiques', data.formation_juridique_id)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[32px] border border-slate-100 bg-[#1a1f1e] p-5 text-white shadow-sm sm:p-7">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Résumé</p>
                            <p className="mt-1 text-sm text-white/80">
                                {data.requirements.length} critère{data.requirements.length > 1 ? 's' : ''} ajouté
                                {data.requirements.length > 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white/5 p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">Expertise</p>
                            <p className="mt-2 text-3xl font-black text-white">{selectedSpecialisations.length}</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">Langues</p>
                            <p className="mt-2 text-3xl font-black text-white">{selectedLanguages.length}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-5 lg:grid-cols-2 lg:gap-6">
                <div className="rounded-[32px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <Sparkles className="h-5 w-5 text-[#C06041]" />
                        <h3 className="text-lg font-bold tracking-tight text-slate-900">Expertise</h3>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                        {selectedSpecialisations.length === 0 ? (
                            <div className="w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-sm text-slate-500">
                                Aucun critère d'expertise sélectionné.
                            </div>
                        ) : (
                            selectedSpecialisations.map((req: any) => (
                                <Badge
                                    key={`${req.taxonomy_type}-${req.taxonomy_id}`}
                                    variant="secondary"
                                    className="rounded-full border border-slate-200 bg-[#FCFCFB] px-3.5 py-2 text-sm font-semibold text-slate-800"
                                >
                                    {getTaxonomyName(req.taxonomy_id, 'SPECIALISATION')}
                                </Badge>
                            ))
                        )}
                    </div>
                </div>

                <div className="rounded-[32px] border border-slate-100 bg-[#FCFCFB] p-5 shadow-sm sm:p-7">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <Globe className="h-5 w-5 text-[#C06041]" />
                        <h3 className="text-lg font-bold tracking-tight text-slate-900">Langues</h3>
                    </div>
                    <div className="mt-5 space-y-3">
                        {selectedLanguages.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-5 text-sm text-slate-500">
                                Aucune langue sélectionnée.
                            </div>
                        ) : (
                            selectedLanguages.map((req: any) => {
                                const languageName = getTaxonomyName(req.taxonomy_id, 'LANGUE');
                                const levelName = taxonomies.niveauLangues?.find(
                                    (item: any) => String(item.id) === String(req.metadata?.niveau_langue_id)
                                )?.nom;
                                const importance =
                                    importanceLevels[req.metadata?.importance || 'important'] ||
                                    importanceLevels.important;

                                return (
                                    <div
                                        key={`${req.taxonomy_type}-${req.taxonomy_id}`}
                                        className="rounded-2xl border border-slate-100 bg-white p-4"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-slate-900 sm:text-[15px]">
                                                    {languageName}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-500">
                                                    Niveau : {levelName || 'Non spécifié'}
                                                </p>
                                            </div>
                                            <Badge
                                                className={cn(
                                                    'shrink-0 rounded-full border-none text-[10px] font-bold',
                                                    importance.color
                                                )}
                                            >
                                                {importance.label}
                                            </Badge>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </section>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Button
                    variant="ghost"
                    onClick={onPrev}
                    className="h-12 px-6 text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={processing}
                    className="h-12 rounded-full bg-[#1a1f1e] px-8 text-sm font-semibold text-white shadow-lg shadow-[#1a1f1e]/10 transition-transform hover:scale-[1.01] active:scale-[0.99] sm:px-10"
                >
                    {processing ? 'Publication...' : 'Publier mon offre'}
                </Button>
            </div>
        </div>
    );
}
