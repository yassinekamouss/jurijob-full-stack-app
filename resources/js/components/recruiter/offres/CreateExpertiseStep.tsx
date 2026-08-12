import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    onNext?: () => void;
    onPrev?: () => void;
    taxonomies: any;
}

export default function CreateExpertiseStep({ data, setData, errors, onNext, onPrev, taxonomies }: Props) {
    const { t } = useTranslation();
    const groupedSpecialisations = useMemo(() => {
        const groups: Record<string, any[]> = {};

        (taxonomies.specialisations || []).forEach((item: any) => {
            const domaine = item.domaine || t('offer_creation.expertise.other');
            if (!groups[domaine]) {
                groups[domaine] = [];
            }
            groups[domaine].push(item);
        });

        return Object.entries(groups).map(([domaine, items]) => ({ domaine, items }));
    }, [taxonomies.specialisations]);

    const selectedSpecialisations = data.requirements.filter((req: any) => req.taxonomy_type === 'SPECIALISATION');

    const isSelected = (taxonomyId: number) => {
        return data.requirements.some(
            (req: any) => req.taxonomy_id === taxonomyId && req.taxonomy_type === 'SPECIALISATION'
        );
    };

    const toggleSpecialisation = (taxonomyId: number) => {
        if (isSelected(taxonomyId)) {
            setData(
                'requirements',
                data.requirements.filter(
                    (req: any) => !(req.taxonomy_id === taxonomyId && req.taxonomy_type === 'SPECIALISATION')
                )
            );
            return;
        }

        setData('requirements', [
            ...data.requirements,
            {
                taxonomy_id: taxonomyId,
                taxonomy_type: 'SPECIALISATION',
                metadata: {},
            },
        ]);
    };

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1a1f1e]/5 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a1f1e]/55">
                    {t('offer_creation.expertise.step_indicator')}
                </div>
                <div>
                    <h2 className="font-serif text-3xl font-bold italic tracking-tight text-[#1a1f1e] sm:text-4xl">
                        {t('offer_creation.expertise.title')}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1a1f1e]/55 sm:text-base">
                        {t('offer_creation.expertise.description')}
                    </p>
                </div>
            </div>

            <section className="space-y-6 rounded-[32px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">{t('offer_creation.expertise.expertise_label')}</p>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                            {t('offer_creation.expertise.specializations_skills')}
                        </h3>
                    </div>
                    <Badge
                        variant="outline"
                        className="w-fit rounded-full border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500"
                    >
                        {selectedSpecialisations.length > 1
                            ? t('offer_creation.expertise.selected_plural', { count: selectedSpecialisations.length })
                            : t('offer_creation.expertise.selected', { count: selectedSpecialisations.length })}
                    </Badge>
                </div>

                <div className="space-y-8">
                    {groupedSpecialisations.map((group) => {
                        const selectedInGroup = group.items.filter((item: any) => isSelected(item.id)).length;

                        return (
                            <div key={group.domaine} className="space-y-4">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <h4 className="text-base font-bold text-slate-900 sm:text-lg">{group.domaine}</h4>
                                    <Badge
                                        variant="outline"
                                        className="rounded-full border-slate-200 bg-[#FCFCFB] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500"
                                    >
                                        {group.items.length}
                                    </Badge>
                                    {selectedInGroup > 0 && (
                                        <span className="text-xs font-semibold text-[#C06041]">
                                            {selectedInGroup > 1
                                                ? t('offer_creation.expertise.chosen_plural', { count: selectedInGroup })
                                                : t('offer_creation.expertise.chosen', { count: selectedInGroup })}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2.5">
                                    {group.items.map((item: any) => {
                                        const active = isSelected(item.id);

                                        return (
                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() => toggleSpecialisation(item.id)}
                                                className={cn(
                                                    'inline-flex max-w-full items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-left text-sm font-semibold transition-all sm:text-[15px]',
                                                    active
                                                        ? 'border-[#1a1f1e] bg-[#1a1f1e] text-white shadow-sm'
                                                        : 'border-slate-200 bg-[#FCFCFB] text-slate-700 hover:border-[#C06041]/35 hover:bg-white'
                                                )}
                                            >
                                                <span className="leading-snug break-words">{item.nom}</span>
                                                {active && <CheckCircle2 className="h-4 w-4 shrink-0 text-[#F4C7B8]" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
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
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t('offer_creation.expertise.back')}
                </Button>
                <Button
                    type="button"
                    onClick={onNext}
                    className="h-12 rounded-full bg-[#1a1f1e] px-8 text-sm font-semibold text-white sm:px-10"
                    disabled={selectedSpecialisations.length === 0}
                >
                    {t('offer_creation.expertise.next_languages')}
                </Button>
            </div>
        </div>
    );
}
