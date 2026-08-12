import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, CheckCircle2, Info, Languages, ShieldAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    onNext?: () => void;
    onPrev?: () => void;
    taxonomies: any;
}

const importanceLevels = (t: any) => [
    {
        label: t('offer_creation.languages.levels.indispensable.label'),
        value: 'indispensable',
        className: 'bg-rose-50 text-rose-700 border-rose-200',
        title: t('offer_creation.languages.levels.indispensable.title'),
        description: t('offer_creation.languages.levels.indispensable.desc'),
    },
    {
        label: t('offer_creation.languages.levels.important.label'),
        value: 'important',
        className: 'bg-amber-50 text-amber-700 border-amber-200',
        title: t('offer_creation.languages.levels.important.title'),
        description: t('offer_creation.languages.levels.important.desc'),
    },
    {
        label: t('offer_creation.languages.levels.souhaitable.label'),
        value: 'souhaitable',
        className: 'bg-sky-50 text-sky-700 border-sky-200',
        title: t('offer_creation.languages.levels.souhaitable.title'),
        description: t('offer_creation.languages.levels.souhaitable.desc'),
    },
    {
        label: t('offer_creation.languages.levels.facultatif.label'),
        value: 'facultatif',
        className: 'bg-slate-50 text-slate-600 border-slate-200',
        title: t('offer_creation.languages.levels.facultatif.title'),
        description: t('offer_creation.languages.levels.facultatif.desc'),
    },
];

export default function CreateLanguagesStep({ data, setData, errors, onNext, onPrev, taxonomies }: Props) {
    const { t } = useTranslation();
    const selectedLanguages = data.requirements.filter((req: any) => req.taxonomy_type === 'LANGUE');

    const isSelected = (taxonomyId: number) => {
        return data.requirements.some((req: any) => req.taxonomy_id === taxonomyId && req.taxonomy_type === 'LANGUE');
    };

    const toggleLanguage = (taxonomyId: number) => {
        if (isSelected(taxonomyId)) {
            setData(
                'requirements',
                data.requirements.filter((req: any) => !(req.taxonomy_id === taxonomyId && req.taxonomy_type === 'LANGUE'))
            );
            return;
        }

        setData('requirements', [
            ...data.requirements,
            {
                taxonomy_id: taxonomyId,
                taxonomy_type: 'LANGUE',
                metadata: {
                    importance: 'important',
                    niveau_langue_id: taxonomies.niveauLangues?.[0]?.id || null,
                },
            },
        ]);
    };

    const updateImportance = (taxonomyId: number, importance: string) => {
        setData(
            'requirements',
            data.requirements.map((req: any) => {
                if (req.taxonomy_id !== taxonomyId || req.taxonomy_type !== 'LANGUE') {
                    return req;
                }
                return { ...req, metadata: { ...req.metadata, importance } };
            })
        );
    };

    const updateLevel = (taxonomyId: number, levelId: number) => {
        setData(
            'requirements',
            data.requirements.map((req: any) => {
                if (req.taxonomy_id !== taxonomyId || req.taxonomy_type !== 'LANGUE') {
                    return req;
                }
                return { ...req, metadata: { ...req.metadata, niveau_langue_id: levelId } };
            })
        );
    };

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1a1f1e]/5 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a1f1e]/55">
                    {t('offer_creation.languages.step_indicator')}
                </div>
                <div>
                    <h2 className="font-serif text-3xl font-bold italic tracking-tight text-[#1a1f1e] sm:text-4xl">
                        {t('offer_creation.languages.title')}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1a1f1e]/55 sm:text-base">
                        {t('offer_creation.languages.description')}
                    </p>
                </div>
            </div>

            <section className="rounded-[32px] border border-slate-100 bg-[#FCFCFB] p-5 sm:p-7">
                <div className="mb-5 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1a1f1e]/5 text-[#C06041]">
                        <Info className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">{t('offer_creation.languages.understand_importance')}</p>
                        <h3 className="mt-1 text-lg font-bold text-slate-900">{t('offer_creation.languages.meaning_levels')}</h3>
                    </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                    {importanceLevels(t).map((level) => (
                        <div key={level.value} className="rounded-2xl border border-slate-200 bg-white p-4">
                            <div className="flex flex-wrap items-center gap-2">
                                {level.value === 'indispensable' ? (
                                    <ShieldAlert className="h-4 w-4 text-rose-600" />
                                ) : null}
                                <Badge className={cn('rounded-full border text-[10px] font-bold', level.className)}>
                                    {level.label}
                                </Badge>
                                <span className="text-xs font-semibold text-slate-500">{level.title}</span>
                            </div>
                            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{level.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm leading-relaxed text-amber-900/80">
                    <strong className="font-semibold">{t('offer_creation.languages.tip')}</strong> {t('offer_creation.languages.tip_desc')}{' '}
                    <span className="font-semibold">{t('offer_creation.languages.tip_important')}</span>.
                </div>
            </section>

            <section className="space-y-6 rounded-[32px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a1f1e]/5 text-[#C06041]">
                            <Languages className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">{t('offer_creation.languages.languages_label')}</p>
                            <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">{t('offer_creation.languages.selection_settings')}</h3>
                        </div>
                    </div>
                    <Badge
                        variant="outline"
                        className="w-fit rounded-full border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
                    >
                        {selectedLanguages.length > 1
                            ? t('offer_creation.languages.selected_plural', { count: selectedLanguages.length })
                            : t('offer_creation.languages.selected', { count: selectedLanguages.length })}
                    </Badge>
                </div>

                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('offer_creation.languages.choose_languages')}</p>
                    <div className="flex flex-wrap gap-2.5">
                        {(taxonomies.langues || []).map((language: any) => {
                            const active = isSelected(language.id);

                            return (
                                <button
                                    key={language.id}
                                    type="button"
                                    onClick={() => toggleLanguage(language.id)}
                                    className={cn(
                                        'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all',
                                        active
                                            ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white'
                                            : 'border-slate-200 bg-[#FCFCFB] text-slate-700 hover:border-[#C06041]/25'
                                    )}
                                >
                                    {language.nom}
                                    {active && <CheckCircle2 className="h-3.5 w-3.5 text-[#F4C7B8]" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        {t('offer_creation.languages.adjust_level')}
                    </p>

                    {selectedLanguages.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-[#FCFCFB] px-5 py-8 text-center text-sm text-slate-500">
                            {t('offer_creation.languages.empty_selection')}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {selectedLanguages.map((req: any) => {
                                const label =
                                    taxonomies.langues?.find((item: any) => String(item.id) === String(req.taxonomy_id))
                                        ?.nom || t('offer_creation.languages.unknown');

                                return (
                                    <div key={req.taxonomy_id} className="rounded-[24px] border border-slate-200 bg-[#FCFCFB] p-4 sm:p-5">
                                        <p className="text-base font-semibold text-slate-900">{label}</p>

                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                                    {t('offer_creation.languages.required_level')}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {(taxonomies.niveauLangues || []).map((level: any) => {
                                                        const active =
                                                            String(req.metadata?.niveau_langue_id) === String(level.id);

                                                        return (
                                                            <button
                                                                key={level.id}
                                                                type="button"
                                                                onClick={() => updateLevel(req.taxonomy_id, level.id)}
                                                                className={cn(
                                                                    'rounded-full border px-3.5 py-2 text-xs font-semibold transition-all',
                                                                    active
                                                                        ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white'
                                                                        : 'border-slate-200 bg-white text-slate-600'
                                                                )}
                                                            >
                                                                {level.nom}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            <div>
                                                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                                    {t('offer_creation.languages.importance')}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {importanceLevels(t).map((importance) => {
                                                        const active = req.metadata?.importance === importance.value;

                                                        return (
                                                            <button
                                                                key={importance.value}
                                                                type="button"
                                                                onClick={() =>
                                                                    updateImportance(req.taxonomy_id, importance.value)
                                                                }
                                                                className={cn(
                                                                    'rounded-full border px-3.5 py-2 text-xs font-semibold transition-all',
                                                                    active
                                                                        ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white'
                                                                        : importance.className
                                                                )}
                                                            >
                                                                {importance.label}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                                {req.metadata?.importance === 'indispensable' && (
                                                    <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-rose-700">
                                                        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                                        {t('offer_creation.languages.eliminatory_criteria')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {errors.requirements && <p className="text-sm text-red-500">{errors.requirements}</p>}
            </section>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onPrev}
                    className="h-12 px-6 text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t('offer_creation.languages.back')}
                </Button>
                <Button
                    type="button"
                    onClick={onNext}
                    className="h-12 rounded-full bg-[#1a1f1e] px-8 text-sm font-semibold text-white sm:px-10"
                >
                    {t('offer_creation.languages.next_summary')}
                </Button>
            </div>
        </div>
    );
}
