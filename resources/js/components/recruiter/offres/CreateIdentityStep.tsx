import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Briefcase, CheckCircle2 } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Props {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    onNext?: () => void;
    taxonomies: any;
}

export default function CreateIdentityStep({ data, setData, errors, onNext, taxonomies }: Props) {
    const handleNext: FormEventHandler = (e) => {
        e.preventDefault();
        if (onNext) {
            onNext();
        }
    };

    return (
        <form onSubmit={handleNext} className="space-y-8">
            <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1a1f1e]/5 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a1f1e]/55">
                    Étape 1 · Identité
                </div>
                <div>
                    <h2 className="font-serif text-3xl font-bold italic tracking-tight text-[#1a1f1e] sm:text-4xl">
                        Positionnez l'annonce rapidement
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1a1f1e]/55 sm:text-base">
                        Commencez par un titre clair, le métier visé et une description concise pour cadrer l'offre.
                    </p>
                </div>
            </div>

            <section className="rounded-[32px] border border-slate-100 bg-[#FCFCFB] p-5 shadow-sm sm:p-7 lg:p-8">
                <div className="space-y-3">
                    <Label htmlFor="titre" className="text-sm font-semibold text-slate-900 sm:text-[15px]">
                        Titre de l'annonce
                    </Label>
                    <Input
                        id="titre"
                        value={data.titre}
                        onChange={(e) => setData('titre', e.target.value)}
                        placeholder="Ex: Juriste corporate senior"
                        className="h-12 rounded-2xl border-slate-200 bg-white text-base focus-visible:ring-[#C06041]/20"
                    />
                    {errors.titre && <p className="text-sm text-red-500">{errors.titre}</p>}
                </div>
            </section>

            <section className="space-y-5 rounded-[32px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-5">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">Métier visé</p>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Choix direct</h3>
                    </div>
                    <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 sm:flex">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        {data.poste_id ? 'Sélectionné' : 'À choisir'}
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {(taxonomies.postes || []).map((item: any) => {
                        const active = String(data.poste_id) === String(item.id);

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setData('poste_id', String(item.id))}
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
                                    <Briefcase className="h-4 w-4" />
                                </div>
                                <span className="pt-1 text-sm font-semibold leading-snug text-slate-800 sm:text-[15px]">
                                    {item.nom}
                                </span>
                            </button>
                        );
                    })}
                </div>
                {errors.poste_id && <p className="text-sm text-red-500">{errors.poste_id}</p>}
            </section>

            <section className="rounded-[32px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                <div className="space-y-3">
                    <Label htmlFor="description" className="text-sm font-semibold text-slate-900 sm:text-[15px]">
                        Description de l'offre
                    </Label>
                    <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows={8}
                        placeholder="Missions, contexte, profil attendu, environnement..."
                        className="flex min-h-[200px] w-full rounded-2xl border border-slate-200 bg-[#FCFCFB] px-4 py-4 text-sm leading-7 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C06041]/20 sm:text-[15px]"
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                </div>
            </section>

            <div className="flex justify-end border-t border-slate-100 pt-6">
                <Button
                    type="submit"
                    className="h-12 rounded-full bg-[#1a1f1e] px-8 text-sm font-semibold text-white shadow-lg shadow-[#1a1f1e]/10 sm:px-10"
                    disabled={!data.titre || !data.poste_id || !data.description}
                >
                    Suivant : organisation
                </Button>
            </div>
        </form>
    );
}
