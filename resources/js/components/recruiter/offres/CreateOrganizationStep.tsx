import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { ArrowLeft, Building2, MapPin, ShieldCheck, Wallet } from 'lucide-react';
import { useMemo } from 'react';

interface Props {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    onNext?: () => void;
    onPrev?: () => void;
    taxonomies: any;
}

export default function CreateOrganizationStep({ data, setData, errors, onNext, onPrev, taxonomies }: Props) {
    const selectedMode = useMemo(() => {
        return taxonomies.modeTravails?.find((mode: any) => String(mode.id) === String(data.mode_travail_id));
    }, [data.mode_travail_id, taxonomies.modeTravails]);

    const isRemoteMode = /teletravail|télétravail/i.test(selectedMode?.nom || '');

    const ChoiceGrid = ({
        items,
        value,
        onChange,
        icon,
        columns = 'sm:grid-cols-2 lg:grid-cols-3',
    }: {
        items: any[];
        value: string;
        onChange: (id: string, name: string) => void;
        icon: React.ReactNode;
        columns?: string;
    }) => (
        <div className={cn('grid gap-3', columns)}>
            {items.map((item: any) => {
                const active = String(item.id) === String(value);

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onChange(String(item.id), item.nom)}
                        className={cn(
                            'flex min-h-[72px] items-start gap-3 rounded-2xl border px-4 py-4 text-left transition-all',
                            active
                                ? 'border-[#C06041]/35 bg-[#C06041]/8 shadow-[0_10px_28px_rgba(192,96,65,0.12)]'
                                : 'border-slate-200 bg-white hover:border-[#C06041]/25 hover:bg-[#FCFCFB]'
                        )}
                    >
                        <div
                            className={cn(
                                'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                                active ? 'bg-[#1a1f1e] text-white' : 'bg-slate-100 text-slate-500'
                            )}
                        >
                            {icon}
                        </div>
                        <span className="pt-1 text-sm font-semibold leading-snug text-slate-800 sm:text-[15px]">
                            {item.nom}
                        </span>
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1a1f1e]/5 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a1f1e]/55">
                    Étape 2 · Organisation
                </div>
                <div>
                    <h2 className="font-serif text-3xl font-bold italic tracking-tight text-[#1a1f1e] sm:text-4xl">
                        Cadrez l'organisation du poste
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1a1f1e]/55 sm:text-base">
                        Type de contrat, mode de travail, localisation et salaire sont regroupés pour une lecture rapide.
                    </p>
                </div>
            </div>

            <section className="space-y-8 rounded-[32px] border border-slate-100 bg-[#FCFCFB] p-5 sm:p-7 lg:p-8">
                <div className="border-b border-slate-200/70 pb-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">Organisation du poste</p>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                        Contrat, mode de travail et localisation
                    </h3>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <Label className="text-sm font-semibold text-slate-900 sm:text-[15px]">Type de contrat</Label>
                        <ChoiceGrid
                            items={taxonomies.typeTravails || []}
                            value={String(data.type_travail_id || '')}
                            onChange={(id) => setData('type_travail_id', id)}
                            icon={<ShieldCheck className="h-4 w-4" />}
                            columns="sm:grid-cols-2 xl:grid-cols-3"
                        />
                        {errors.type_travail_id && <p className="text-sm text-red-500">{errors.type_travail_id}</p>}
                    </div>

                    <div className="space-y-4">
                        <Label className="text-sm font-semibold text-slate-900 sm:text-[15px]">Mode de travail</Label>
                        <ChoiceGrid
                            items={taxonomies.modeTravails || []}
                            value={String(data.mode_travail_id || '')}
                            onChange={(id, name) => {
                                setData('mode_travail_id', id);
                                if (/teletravail|télétravail/i.test(name)) {
                                    setData('ville_id', '');
                                }
                            }}
                            icon={<Building2 className="h-4 w-4" />}
                            columns="sm:grid-cols-2 xl:grid-cols-3"
                        />
                        {errors.mode_travail_id && <p className="text-sm text-red-500">{errors.mode_travail_id}</p>}
                    </div>

                    <div className="space-y-4">
                        <Label className="text-sm font-semibold text-slate-900 sm:text-[15px]">Localisation</Label>
                        {isRemoteMode ? (
                            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-6 text-sm leading-relaxed text-slate-500">
                                Localisation non requise pour le mode télétravail.
                            </div>
                        ) : (
                            <div className="max-h-[320px] overflow-auto rounded-2xl border border-slate-100 bg-white p-3 sm:p-4">
                                <ChoiceGrid
                                    items={taxonomies.villes || []}
                                    value={String(data.ville_id || '')}
                                    onChange={(id) => setData('ville_id', id)}
                                    icon={<MapPin className="h-4 w-4" />}
                                    columns="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                />
                            </div>
                        )}
                        {errors.ville_id && <p className="text-sm text-red-500">{errors.ville_id}</p>}
                    </div>
                </div>
            </section>

            <section className="rounded-[32px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="min-w-0 flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a1f1e]/5 text-[#C06041]">
                                <Wallet className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">Rémunération</p>
                                <Label htmlFor="salaire_id" className="text-base font-bold text-slate-900 sm:text-lg">
                                    Salaire proposé
                                </Label>
                            </div>
                        </div>
                        <Select
                            value={String(data.salaire_id || '')}
                            onValueChange={(val) => setData('salaire_id', val === 'confidentiel' ? '' : val)}
                        >
                            <SelectTrigger className="h-12 w-full rounded-2xl border-slate-200 bg-[#FCFCFB] text-sm focus:ring-[#C06041]/20 sm:text-[15px]">
                                <SelectValue placeholder="Budget confidentiel" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="confidentiel">Budget confidentiel</SelectItem>
                                {taxonomies.salaires?.map((item: any) => (
                                    <SelectItem key={item.id} value={String(item.id)}>
                                        {item.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.salaire_id && <p className="text-sm text-red-500">{errors.salaire_id}</p>}
                    </div>
                </div>
            </section>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onPrev}
                    className="h-12 px-6 text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
                <Button
                    type="button"
                    onClick={onNext}
                    className="h-12 rounded-full bg-[#1a1f1e] px-8 text-sm font-semibold text-white sm:px-10"
                    disabled={!data.type_travail_id || !data.mode_travail_id || (!isRemoteMode && !data.ville_id)}
                >
                    Suivant : profil
                </Button>
            </div>
        </div>
    );
}
