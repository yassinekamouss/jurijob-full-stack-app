import {
    AlertTriangle,
    ArrowLeft,
    GraduationCap,
    Minus,
    NotebookText,
    Plus,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface Props {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    onNext?: () => void;
    onPrev?: () => void;
    taxonomies: any;
}

const CV_UNIT_PRICE_MAD = 1500;
const CV_MIN = 1;
const CV_MAX = 200;

const formatMad = (amount: number) =>
    new Intl.NumberFormat('fr-MA', {
        style: 'currency',
        currency: 'MAD',
        maximumFractionDigits: 0,
    }).format(amount);

export default function CreateProfileStep({
    data,
    setData,
    errors,
    onNext,
    onPrev,
    taxonomies,
}: Props) {
    const { t } = useTranslation();
    const parsedCv = Number.parseInt(String(data.nombre_cv), 10);
    const cvCount = Number.isNaN(parsedCv)
        ? CV_MIN
        : Math.min(CV_MAX, Math.max(CV_MIN, parsedCv));
    const totalPrice = cvCount * CV_UNIT_PRICE_MAD;

    const updateCvCount = (next: number) => {
        setData('nombre_cv', Math.min(CV_MAX, Math.max(CV_MIN, next)));
    };

    const PillGrid = ({
        items,
        value,
        onSelect,
        columns = 'sm:grid-cols-2',
    }: {
        items: any[];
        value: string;
        onSelect: (id: string) => void;
        columns?: string;
    }) => (
        <div className={cn('grid gap-3', columns)}>
            {items.map((item: any) => {
                const active = String(item.id) === String(value);

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onSelect(String(item.id))}
                        className={cn(
                            'min-h-[56px] rounded-2xl border px-4 py-3.5 text-left text-sm font-semibold transition-all sm:text-[15px]',
                            active
                                ? 'border-[#C06041]/35 bg-[#C06041]/8 text-[#1a1f1e] shadow-[0_10px_28px_rgba(192,96,65,0.12)]'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-[#C06041]/25 hover:bg-[#FCFCFB]',
                        )}
                    >
                        {item.nom}
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1a1f1e]/5 px-3.5 py-1.5 text-[10px] font-black tracking-[0.2em] text-[#1a1f1e]/55 uppercase">
                    {t('offer_creation.profile.step_indicator')}
                </div>
                <div>
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-[#1a1f1e] italic sm:text-4xl">
                        {t('offer_creation.profile.title')}
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1a1f1e]/55 sm:text-base">
                        {t('offer_creation.profile.description')}
                    </p>
                </div>
            </div>

            <section className="grid gap-5 lg:grid-cols-2 lg:gap-6">
                <div className="rounded-[32px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                    <div className="space-y-5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1a1f1e]/5 text-[#C06041]">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black tracking-[0.2em] text-[#C06041] uppercase">
                                    {t('offer_creation.profile.experience')}
                                </p>
                                <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                                    {t(
                                        'offer_creation.profile.experience_level',
                                    )}
                                </h3>
                            </div>
                        </div>
                        <PillGrid
                            items={taxonomies.niveauExperiences || []}
                            value={String(data.niveau_experience_id || '')}
                            onSelect={(id) =>
                                setData('niveau_experience_id', id)
                            }
                        />
                        {errors.niveau_experience_id && (
                            <p className="text-sm text-red-500">
                                {errors.niveau_experience_id}
                            </p>
                        )}
                    </div>
                </div>

                <div className="rounded-[32px] border border-slate-100 bg-[#FCFCFB] p-5 shadow-sm sm:p-7 lg:p-8">
                    <div className="space-y-5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1a1f1e]/5 text-[#C06041]">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black tracking-[0.2em] text-[#C06041] uppercase">
                                    {t('offer_creation.profile.education')}
                                </p>
                                <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                                    {t(
                                        'offer_creation.profile.legal_education',
                                    )}
                                </h3>
                            </div>
                        </div>
                        <PillGrid
                            items={taxonomies.formationJuridiques || []}
                            value={String(data.formation_juridique_id || '')}
                            onSelect={(id) =>
                                setData('formation_juridique_id', id)
                            }
                        />
                        {errors.formation_juridique_id && (
                            <p className="text-sm text-red-500">
                                {errors.formation_juridique_id}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="grid gap-5 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-6">
                <div className="rounded-[32px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                    <div className="space-y-5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1a1f1e]/5 text-[#C06041]">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black tracking-[0.2em] text-[#C06041] uppercase">
                                    {t('offer_creation.profile.priority')}
                                </p>
                                <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                                    {t('offer_creation.profile.urgency_volume')}
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-sm font-semibold text-slate-900">
                                {t('offer_creation.profile.urgency_level')}
                            </Label>
                            <PillGrid
                                items={taxonomies.urgences || []}
                                value={String(data.urgence_id || '')}
                                onSelect={(id) => setData('urgence_id', id)}
                                columns="grid-cols-1"
                            />
                            {errors.urgence_id && (
                                <p className="text-sm text-red-500">
                                    {errors.urgence_id}
                                </p>
                            )}
                        </div>

                        <div className="space-y-4 border-t border-slate-100 pt-5">
                            <div>
                                <Label className="text-sm font-semibold text-slate-900">
                                    {t(
                                        'offer_creation.profile.desired_cv_count',
                                    )}
                                </Label>
                                <p className="mt-1 text-xs text-slate-500">
                                    1 CV = {formatMad(CV_UNIT_PRICE_MAD)} HT
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    aria-label="Diminuer le nombre de CV"
                                    onClick={() => updateCvCount(cvCount - 1)}
                                    disabled={cvCount <= CV_MIN}
                                    className={cn(
                                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all',
                                        cvCount <= CV_MIN
                                            ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300'
                                            : 'border-slate-200 bg-white text-slate-700 hover:border-[#C06041]/30 hover:bg-[#C06041]/5',
                                    )}
                                >
                                    <Minus className="h-4 w-4" />
                                </button>

                                <div className="flex h-12 min-w-[120px] flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-[#FCFCFB] px-3">
                                    <input
                                        id="nombre_cv"
                                        type="number"
                                        min={CV_MIN}
                                        max={CV_MAX}
                                        value={
                                            data.nombre_cv === '' ||
                                            data.nombre_cv === null
                                                ? ''
                                                : data.nombre_cv
                                        }
                                        onChange={(e) => {
                                            const raw = e.target.value;

                                            if (raw === '') {
                                                setData('nombre_cv', '');

                                                return;
                                            }

                                            const parsed = Number.parseInt(
                                                raw,
                                                10,
                                            );

                                            if (Number.isNaN(parsed)) {
                                                return;
                                            }

                                            setData('nombre_cv', parsed);
                                        }}
                                        onBlur={() => {
                                            const parsed = Number.parseInt(
                                                String(data.nombre_cv),
                                                10,
                                            );
                                            updateCvCount(
                                                Number.isNaN(parsed)
                                                    ? CV_MIN
                                                    : parsed,
                                            );
                                        }}
                                        className="w-16 [appearance:textfield] border-0 bg-transparent text-center text-xl font-black text-slate-900 tabular-nums outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    />
                                    <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                        {t('offer_creation.profile.cv')}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    aria-label="Augmenter le nombre de CV"
                                    onClick={() => updateCvCount(cvCount + 1)}
                                    disabled={cvCount >= CV_MAX}
                                    className={cn(
                                        'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-all',
                                        cvCount >= CV_MAX
                                            ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300'
                                            : 'border-slate-200 bg-white text-slate-700 hover:border-[#C06041]/30 hover:bg-[#C06041]/5',
                                    )}
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="rounded-2xl border border-[#C06041]/20 bg-[#C06041]/5 px-4 py-3.5">
                                <div className="flex items-end justify-between gap-3">
                                    <div>
                                        <p className="text-[10px] font-black tracking-[0.18em] text-[#C06041] uppercase">
                                            {t(
                                                'offer_creation.profile.estimated_total',
                                            )}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {cvCount}{' '}
                                            {t('offer_creation.profile.cv')} ×{' '}
                                            {formatMad(CV_UNIT_PRICE_MAD)} HT
                                        </p>
                                    </div>
                                    <p className="text-xl font-black text-[#1a1f1e] tabular-nums">
                                        {formatMad(totalPrice)} HT
                                    </p>
                                </div>
                            </div>

                            {errors.nombre_cv && (
                                <p className="text-sm text-red-500">
                                    {errors.nombre_cv}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="rounded-[32px] border border-slate-100 bg-[#FCFCFB] p-5 shadow-sm sm:p-7 lg:p-8">
                    <div className="flex h-full flex-col space-y-5">
                        <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1a1f1e]/5 text-[#C06041]">
                                <NotebookText className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black tracking-[0.2em] text-[#C06041] uppercase">
                                    {t('offer_creation.profile.context')}
                                </p>
                                <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl">
                                    {t(
                                        'offer_creation.profile.additional_notes',
                                    )}
                                </h3>
                            </div>
                        </div>
                        <textarea
                            id="notes_complementaires"
                            value={data.notes_complementaires || ''}
                            onChange={(e) =>
                                setData('notes_complementaires', e.target.value)
                            }
                            rows={10}
                            placeholder={t(
                                'offer_creation.profile.notes_placeholder',
                            )}
                            className="min-h-[220px] w-full flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#C06041]/20 focus-visible:outline-none sm:text-[15px]"
                        />
                        {errors.notes_complementaires && (
                            <p className="text-sm text-red-500">
                                {errors.notes_complementaires}
                            </p>
                        )}
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
                    <ArrowLeft className="mr-2 h-4 w-4" />{' '}
                    {t('offer_creation.profile.back')}
                </Button>
                <Button
                    type="button"
                    onClick={onNext}
                    className="h-12 rounded-full bg-[#1a1f1e] px-8 text-sm font-semibold text-white sm:px-10"
                    disabled={!data.niveau_experience_id || !data.urgence_id}
                >
                    {t('offer_creation.profile.next_expertise')}
                </Button>
            </div>
        </div>
    );
}
