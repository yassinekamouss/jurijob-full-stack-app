import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Briefcase, Building2, MapPin, ShieldCheck } from 'lucide-react';
import { FormEventHandler, useMemo } from 'react';

interface Props {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    onNext?: () => void;
    taxonomies: any;
}

export default function CreateBasicInfoStep({ data, setData, errors, onNext, taxonomies }: Props) {
    const handleNext: FormEventHandler = (e) => {
        e.preventDefault();
        if (onNext) {
            onNext();
        }
    };

    const selectedMode = useMemo(() => {
        return taxonomies.modeTravails?.find((mode: any) => String(mode.id) === String(data.mode_travail_id));
    }, [data.mode_travail_id, taxonomies.modeTravails]);

    const isRemoteMode = /télétravail/i.test(selectedMode?.nom || '');

    const selectMode = (modeId: number | string, modeName: string) => {
        setData('mode_travail_id', String(modeId));

        if (/télétravail/i.test(modeName)) {
            setData('ville_id', '');
        }
    };

    const ChoiceGrid = ({
        items,
        selectedValue,
        onSelect,
        icon,
        compact = false,
        dense = false,
        scrollable = false,
    }: {
        items: Array<{ id: number; nom: string }>;
        selectedValue: string;
        onSelect: (id: number, name: string) => void;
        icon?: React.ReactNode;
        compact?: boolean;
        dense?: boolean;
        scrollable?: boolean;
    }) => (
        <div className={cn(
            'grid gap-2.5',
            compact
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'
                : dense
                    ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            scrollable && 'max-h-64 overflow-auto pr-1'
        )}>
            {items.map((item) => {
                const active = String(item.id) === String(selectedValue);

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelect(item.id, item.nom)}
                        className={cn(
                            'group flex items-start gap-2.5 rounded-[16px] border px-3 py-3 text-left transition-all duration-200',
                            active
                                ? 'border-[#C06041]/30 bg-[#C06041]/8 shadow-[0_10px_30px_rgba(192,96,65,0.12)]'
                                : 'border-slate-200 bg-white hover:border-[#C06041]/25 hover:bg-[#FCFCFB] hover:shadow-sm'
                        )}
                    >
                        <div className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors', active ? 'bg-[#1a1f1e] text-white' : 'bg-slate-100 text-slate-500')}>
                            {icon ?? <Briefcase className="h-4 w-4" />}
                        </div>
                        <div className="min-w-0">
                            <p className={cn('text-xs sm:text-sm font-semibold leading-snug', active ? 'text-[#1a1f1e]' : 'text-slate-700')}>
                                {item.nom}
                            </p>
                        </div>
                    </button>
                );
            })}
        </div>
    );

    return (
        <form onSubmit={handleNext} className="space-y-7">
            <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1a1f1e]/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a1f1e]/55">
                    Étape 1 · Structure
                </div>
                <div>
                    <h2 className="font-serif text-3xl font-bold italic tracking-tight text-[#1a1f1e]">Construisez la base de l'annonce</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#1a1f1e]/55">
                        Titre, métier visé et organisation du poste doivent être visibles immédiatement pour donner un cadre clair.
                    </p>
                </div>
            </div>

            <Card className="rounded-[28px] border border-slate-100 bg-[#FCFCFB] p-6 shadow-sm">
                <div className="space-y-3">
                    <Label htmlFor="titre" className="text-sm font-semibold text-slate-900">Titre de l'annonce</Label>
                    <Input
                        id="titre"
                        value={data.titre}
                        onChange={(e) => setData('titre', e.target.value)}
                        placeholder="Ex: Avocat en droit du travail H/F"
                        className="h-12 rounded-2xl border-slate-200 bg-white text-base focus-visible:ring-[#C06041]/20"
                    />
                    {errors.titre && <p className="text-sm text-red-500">{errors.titre}</p>}
                </div>
            </Card>

            <section className="space-y-4 rounded-[28px] border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/40">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">
                            <Briefcase className="h-3.5 w-3.5" /> Métier visé
                        </div>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900">Choisissez le métier directement</h3>
                    </div>
                    <BadgeState value={data.poste_id} />
                </div>

                <ChoiceGrid
                    items={taxonomies.postes || []}
                    selectedValue={String(data.poste_id || '')}
                    onSelect={(id) => setData('poste_id', String(id))}
                    compact
                    dense
                />
                {errors.poste_id && <p className="text-sm text-red-500">{errors.poste_id}</p>}
            </section>

            <section className="space-y-5 rounded-[28px] border border-slate-100 bg-[#FCFCFB] p-5 shadow-lg shadow-slate-200/40">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">
                            <Building2 className="h-3.5 w-3.5" /> Organisation du poste
                        </div>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900">Contrat, mode de travail et localisation</h3>
                    </div>
                </div>

                <div className="grid gap-5 xl:grid-cols-12">
                    <div className="space-y-3 xl:col-span-4">
                        <Label className="text-sm font-semibold text-slate-900">Type de contrat</Label>
                        <ChoiceGrid
                            items={taxonomies.typeTravails || []}
                            selectedValue={String(data.type_travail_id || '')}
                            onSelect={(id) => setData('type_travail_id', String(id))}
                            dense
                        />
                        {errors.type_travail_id && <p className="text-sm text-red-500">{errors.type_travail_id}</p>}
                    </div>

                    <div className="space-y-3 xl:col-span-4">
                        <Label className="text-sm font-semibold text-slate-900">Mode de travail</Label>
                        <ChoiceGrid
                            items={taxonomies.modeTravails || []}
                            selectedValue={String(data.mode_travail_id || '')}
                            onSelect={(id, name) => selectMode(id, name)}
                            dense
                        />
                        {errors.mode_travail_id && <p className="text-sm text-red-500">{errors.mode_travail_id}</p>}
                    </div>

                    <div className="space-y-3 xl:col-span-4">
                        <Label className="text-sm font-semibold text-slate-900">Localisation</Label>
                        {isRemoteMode ? (
                            <div className="rounded-[20px] border border-dashed border-slate-200 bg-white p-5 text-sm text-slate-500">
                                Poste en télétravail. La localisation n'est pas requise.
                            </div>
                        ) : (
                            <ChoiceGrid
                                items={taxonomies.villes || []}
                                selectedValue={String(data.ville_id || '')}
                                onSelect={(id) => setData('ville_id', String(id))}
                                dense
                                scrollable
                            />
                        )}
                        {errors.ville_id && <p className="text-sm text-red-500">{errors.ville_id}</p>}
                    </div>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
                <Card className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
                    <div className="space-y-3">
                        <Label htmlFor="salaire_id" className="text-sm font-semibold text-slate-900">Salaire proposé</Label>
                        <Select
                            value={String(data.salaire_id || '')}
                            onValueChange={(val) => setData('salaire_id', val === 'confidentiel' ? '' : val)}
                        >
                            <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-white text-sm focus:ring-[#C06041]/20">
                                <SelectValue placeholder="Budget confidentiel" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="confidentiel">Budget confidentiel</SelectItem>
                                {taxonomies.salaires?.map((salaire: any) => (
                                    <SelectItem key={salaire.id} value={String(salaire.id)}>
                                        {salaire.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.salaire_id && <p className="text-sm text-red-500">{errors.salaire_id}</p>}
                    </div>
                </Card>

                <Card className="rounded-[28px] border border-slate-100 bg-[#FCFCFB] p-6 shadow-sm">
                    <div className="space-y-3">
                        <Label htmlFor="description" className="text-sm font-semibold text-slate-900">Description de l'offre</Label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={10}
                            placeholder="Présentez les missions, le profil recherché et l'entreprise..."
                            className="flex w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C06041]/20 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>
                </Card>
            </section>

            {!onNext && null}

            {onNext && (
                <div className="flex justify-end pt-2">
                    <Button
                        type="submit"
                        className="h-12 rounded-full bg-[#1a1f1e] px-8 text-sm font-semibold text-white shadow-lg shadow-[#1a1f1e]/10 transition-transform hover:scale-[1.01] active:scale-[0.99]"
                        disabled={!data.titre || !data.poste_id || !data.type_travail_id || !data.mode_travail_id || (!isRemoteMode && !data.ville_id) || !data.description}
                    >
                        Suivant : structurer les critères
                    </Button>
                </div>
            )}
        </form>
    );
}

function BadgeState({ value }: { value: string }) {
    return (
        <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            {value ? 'Sélectionné' : 'À choisir'}
        </div>
    );
}