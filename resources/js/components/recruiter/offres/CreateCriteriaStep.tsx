import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ArrowLeft, CheckCircle2, GraduationCap, Languages, Sparkles, BookOpen } from 'lucide-react';
import { useMemo } from 'react';

interface Props {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    onNext?: () => void;
    onPrev?: () => void;
    taxonomies: any;
}

const importanceLevels = [
    { label: 'Indispensable', value: 'indispensable', className: 'bg-rose-50 text-rose-700 border-rose-200' },
    { label: 'Important', value: 'important', className: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'Souhaitable', value: 'souhaitable', className: 'bg-sky-50 text-sky-700 border-sky-200' },
    { label: 'Facultatif', value: 'facultatif', className: 'bg-slate-50 text-slate-600 border-slate-200' },
];

export default function CreateCriteriaStep({ data, setData, errors, onNext, onPrev, taxonomies }: Props) {
    const groupedSpecialisations = useMemo(() => {
        const groups: Record<string, Array<{ id: number; nom: string; domaine: string }>> = {};

        (taxonomies.specialisations || []).forEach((item: any) => {
            const domaine = item.domaine || 'Autre';

            if (!groups[domaine]) {
                groups[domaine] = [];
            }

            groups[domaine].push(item);
        });

        return Object.entries(groups).map(([domaine, items]) => ({ domaine, items }));
    }, [taxonomies.specialisations]);

    const selectedSpecialisations = data.requirements.filter((req: any) => req.taxonomy_type === 'SPECIALISATION');
    const selectedLanguages = data.requirements.filter((req: any) => req.taxonomy_type === 'LANGUE');

    const isSelected = (taxonomyId: number, taxonomyType: string) => {
        return data.requirements.some((req: any) => req.taxonomy_id === taxonomyId && req.taxonomy_type === taxonomyType);
    };

    const toggleRequirement = (taxonomyId: number, taxonomyType: string) => {
        if (isSelected(taxonomyId, taxonomyType)) {
            setData('requirements', data.requirements.filter((req: any) => !(req.taxonomy_id === taxonomyId && req.taxonomy_type === taxonomyType)));
            return;
        }

        const newRequirement: any = {
            taxonomy_id: taxonomyId,
            taxonomy_type: taxonomyType,
            metadata: taxonomyType === 'LANGUE'
                ? {
                    importance: 'important',
                    niveau_langue_id: taxonomies.niveauLangues?.[0]?.id || null,
                }
                : {},
        };

        setData('requirements', [...data.requirements, newRequirement]);
    };

    const updateImportance = (taxonomyId: number, importance: string) => {
        setData('requirements', data.requirements.map((req: any) => {
            if (req.taxonomy_id !== taxonomyId || req.taxonomy_type !== 'LANGUE') {
                return req;
            }

            return { ...req, metadata: { ...req.metadata, importance } };
        }));
    };

    const updateLevel = (taxonomyId: number, levelId: number) => {
        setData('requirements', data.requirements.map((req: any) => {
            if (req.taxonomy_id !== taxonomyId || req.taxonomy_type !== 'LANGUE') {
                return req;
            }

            return { ...req, metadata: { ...req.metadata, niveau_langue_id: levelId } };
        }));
    };

    const selectedExperience = taxonomies.niveauExperiences?.find((item: any) => String(item.id) === String(data.niveau_experience_id));
    const selectedFormation = taxonomies.formationJuridiques?.find((item: any) => String(item.id) === String(data.formation_juridique_id));

    const OptionCard = ({
        id,
        label,
        active,
        onClick,
        subtitle,
    }: {
        id: number | string;
        label: string;
        active: boolean;
        onClick: () => void;
        subtitle?: string;
    }) => (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'flex min-h-[86px] w-full flex-col items-start justify-between rounded-[20px] border px-4 py-4 text-left transition-all duration-200',
                active
                    ? 'border-[#C06041]/30 bg-[#C06041]/8 shadow-[0_10px_30px_rgba(192,96,65,0.12)]'
                    : 'border-slate-200 bg-white hover:border-[#C06041]/20 hover:bg-[#FCFCFB]'
            )}
        >
            <div className="flex w-full items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className={cn('text-sm font-semibold leading-snug', active ? 'text-[#1a1f1e]' : 'text-slate-700')}>
                        {label}
                    </p>
                    {subtitle && <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{subtitle}</p>}
                </div>
                {active && <CheckCircle2 className="h-4 w-4 shrink-0 text-[#C06041]" />}
            </div>
        </button>
    );

    const LanguageRow = ({ language }: { language: any }) => {
        const selected = data.requirements.find((req: any) => req.taxonomy_id === language.id && req.taxonomy_type === 'LANGUE');

        if (!selected) {
            return null;
        }

        return (
            <div className="rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{language.nom}</p>
                        <p className="text-[11px] text-slate-500">Choisissez le niveau et l'importance</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => toggleRequirement(language.id, 'LANGUE')}
                        className="rounded-full border border-slate-200 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:bg-slate-50"
                    >
                        Retirer
                    </button>
                </div>

                <div className="mt-4 space-y-4">
                    <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Niveau</p>
                        <div className="flex flex-wrap gap-2">
                            {taxonomies.niveauLangues?.map((level: any) => {
                                const active = String(selected.metadata?.niveau_langue_id) === String(level.id);

                                return (
                                    <button
                                        key={level.id}
                                        type="button"
                                        onClick={() => updateLevel(language.id, level.id)}
                                        className={cn(
                                            'rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                                            active
                                                ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-[#C06041]/30 hover:bg-[#FCFCFB]'
                                        )}
                                    >
                                        {level.nom}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Importance</p>
                        <div className="flex flex-wrap gap-2">
                            {importanceLevels.map((level) => {
                                const active = selected.metadata?.importance === level.value;

                                return (
                                    <button
                                        key={level.value}
                                        type="button"
                                        onClick={() => updateImportance(language.id, level.value)}
                                        className={cn(
                                            'rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                                            active
                                                ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white'
                                                : level.className
                                        )}
                                    >
                                        {level.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-10">
            <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1a1f1e]/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a1f1e]/55">
                    Étape 2 · Critères
                </div>
                <div>
                    <h2 className="font-serif text-3xl font-bold italic tracking-tight text-[#1a1f1e]">Expertise, expérience et langues</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#1a1f1e]/55">
                        Les critères sont affichés directement pour garder une lecture fluide et une sélection rapide.
                    </p>
                </div>
            </div>

            <section className="space-y-6 rounded-[32px] border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">
                            <Sparkles className="h-3.5 w-3.5" /> Expertise
                        </div>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900">Spécialisations et compétences clés</h3>
                    </div>
                    <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        {selectedSpecialisations.length} sélectionnée{selectedSpecialisations.length > 1 ? 's' : ''}
                    </Badge>
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                    {groupedSpecialisations.map((group) => (
                        <Card key={group.domaine} className="rounded-[24px] border border-slate-100 bg-[#FCFCFB] p-5 shadow-sm">
                            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">Domaine</p>
                                    <h4 className="mt-1 text-base font-bold text-slate-900">{group.domaine}</h4>
                                </div>
                                <Badge variant="outline" className="rounded-full border-slate-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                    {group.items.length}
                                </Badge>
                            </div>

                            <div className="mt-4 max-h-72 space-y-2 overflow-auto pr-1">
                                {group.items.map((item) => {
                                    const active = isSelected(item.id, 'SPECIALISATION');

                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => toggleRequirement(item.id, 'SPECIALISATION')}
                                            className={cn(
                                                'flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-all',
                                                active
                                                    ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white shadow-md'
                                                    : 'border-slate-200 bg-white text-slate-700 hover:border-[#C06041]/25 hover:bg-[#FCFCFB]'
                                            )}
                                        >
                                            <span className="text-sm font-semibold leading-snug break-words">{item.nom}</span>
                                            {active && <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F4C7B8]" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </Card>
                    ))}
                </div>
                {errors.requirements && <p className="text-sm text-red-500">{errors.requirements}</p>}
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
                <Card className="rounded-[32px] border border-slate-100 bg-[#FCFCFB] p-6 shadow-lg shadow-slate-200/50">
                    <div className="space-y-5">
                        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                            <div>
                                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">
                                    <GraduationCap className="h-3.5 w-3.5" /> Expérience
                                </div>
                                <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900">Niveau d'expérience</h3>
                            </div>
                            {selectedExperience && <Badge className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">Choisi</Badge>}
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            {taxonomies.niveauExperiences?.map((item: any) => (
                                <OptionCard
                                    key={item.id}
                                    id={item.id}
                                    label={item.nom}
                                    active={String(data.niveau_experience_id) === String(item.id)}
                                    subtitle={item.nom}
                                    onClick={() => setData('niveau_experience_id', String(item.id))}
                                />
                            ))}
                        </div>
                    </div>
                </Card>

                <Card className="rounded-[32px] border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50">
                    <div className="space-y-5">
                        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                            <div>
                                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">
                                    <BookOpen className="h-3.5 w-3.5" /> Formation
                                </div>
                                <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900">Formation juridique</h3>
                            </div>
                            {selectedFormation && <Badge className="rounded-full bg-slate-900 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">Choisie</Badge>}
                        </div>

                        <div className="grid gap-3 md:grid-cols-2">
                            {taxonomies.formationJuridiques?.map((item: any) => (
                                <OptionCard
                                    key={item.id}
                                    id={item.id}
                                    label={item.nom}
                                    active={String(data.formation_juridique_id) === String(item.id)}
                                    onClick={() => setData('formation_juridique_id', String(item.id))}
                                />
                            ))}
                        </div>
                    </div>
                </Card>
            </section>

            <section className="space-y-6 rounded-[32px] border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/50">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">
                            <Languages className="h-3.5 w-3.5" /> Langues
                        </div>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900">Langues et niveau</h3>
                    </div>
                    <Badge variant="outline" className="rounded-full border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                        {selectedLanguages.length} sélectionnée{selectedLanguages.length > 1 ? 's' : ''}
                    </Badge>
                </div>

                <div className="grid gap-5 xl:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)]">
                    <div className="space-y-3 rounded-[24px] border border-slate-100 bg-[#FCFCFB] p-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Choisir une langue</p>
                        <div className="flex flex-wrap gap-2">
                            {taxonomies.langues?.map((language: any) => {
                                const active = isSelected(language.id, 'LANGUE');

                                return (
                                    <button
                                        key={language.id}
                                        type="button"
                                        onClick={() => toggleRequirement(language.id, 'LANGUE')}
                                        className={cn(
                                            'rounded-full border px-4 py-2 text-sm font-semibold transition-all',
                                            active
                                                ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white'
                                                : 'border-slate-200 bg-white text-slate-700 hover:border-[#C06041]/25 hover:bg-white'
                                        )}
                                    >
                                        {language.nom}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ajuster les critères sélectionnés</p>
                        <div className="space-y-3">
                            {selectedLanguages.length === 0 ? (
                                <div className="rounded-[20px] border border-dashed border-slate-200 bg-slate-50/70 p-5 text-sm text-slate-500">
                                    Sélectionnez une langue pour préciser son niveau et son importance.
                                </div>
                            ) : (
                                selectedLanguages.map((language: any) => (
                                    <LanguageRow key={language.taxonomy_id} language={taxonomies.langues?.find((item: any) => String(item.id) === String(language.taxonomy_id)) || { id: language.taxonomy_id, nom: 'Inconnu' }} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Card className="rounded-[32px] border border-slate-100 bg-[#FCFCFB] p-6 shadow-sm">
                <div className="space-y-3">
                    <Label htmlFor="notes_complementaires" className="text-sm font-semibold text-slate-900">Notes complémentaires pour l'équipe</Label>
                    <textarea
                        id="notes_complementaires"
                        value={data.notes_complementaires || ''}
                        onChange={(e) => setData('notes_complementaires', e.target.value)}
                        rows={4}
                        placeholder="Précisez des attentes particulières, des contraintes ou un contexte spécifique..."
                        className="flex w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C06041]/20 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {errors.notes_complementaires && <p className="text-sm text-red-500">{errors.notes_complementaires}</p>}
                </div>
            </Card>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={onPrev} className="h-11 px-6 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                </Button>
                <Button
                    type="button"
                    onClick={onNext}
                    className="h-12 rounded-full bg-[#1a1f1e] px-8 text-sm font-semibold text-white shadow-lg shadow-[#1a1f1e]/10 transition-transform hover:scale-[1.01] active:scale-[0.99]"
                    disabled={data.requirements.length === 0 || !data.niveau_experience_id}
                >
                    Suivant : récapitulatif
                </Button>
            </div>
        </div>
    );
}