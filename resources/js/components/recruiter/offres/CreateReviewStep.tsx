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
import { useTranslation } from 'react-i18next';

interface Props {
    data: any;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onPrev: () => void;
    taxonomies: any;
}

const importanceLevels = (t: any): { [key: string]: { label: string; color: string } } => ({
    indispensable: { label: t('offer_creation.languages.levels.indispensable.label'), color: 'bg-rose-100 text-rose-700' },
    important: { label: t('offer_creation.languages.levels.important.label'), color: 'bg-orange-100 text-orange-700' },
    souhaitable: { label: t('offer_creation.languages.levels.souhaitable.label'), color: 'bg-sky-100 text-sky-700' },
    facultatif: { label: t('offer_creation.languages.levels.facultatif.label'), color: 'bg-gray-100 text-gray-700' },
});

export default function CreateReviewStep({ data, processing, onSubmit, onPrev, taxonomies }: Props) {
    const { t } = useTranslation();
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

        return item?.nom || t('offer_creation.review.unknown');
    };

    const getValue = (taxonomyKey: string, value: string) => {
        return taxonomies[taxonomyKey]?.find((item: any) => String(item.id) === String(value))?.nom || t('offer_creation.review.not_specified');
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
        { label: t('offer_creation.review.info_labels.job'), value: getValue('postes', data.poste_id), icon: Briefcase },
        { label: t('offer_creation.review.info_labels.contract'), value: getValue('typeTravails', data.type_travail_id), icon: ShieldCheck },
        { label: t('offer_creation.review.info_labels.mode'), value: getValue('modeTravails', data.mode_travail_id), icon: Eye },
        {
            label: t('offer_creation.review.info_labels.location'),
            value: hasRemoteMode ? t('offer_creation.review.remote') : getValue('villes', data.ville_id),
            icon: MapPin,
        },
        {
            label: t('offer_creation.review.info_labels.salary'),
            value: data.salaire_id ? getValue('salaires', data.salaire_id) : t('offer_creation.review.confidential_budget'),
            icon: Wallet,
        },
        { label: t('offer_creation.review.info_labels.urgency'), value: getValue('urgences', data.urgence_id), icon: Sparkles },
        {
            label: t('offer_creation.review.info_labels.desired_cvs'),
            value: `${cvCount} ${t('offer_creation.review.cv')} · ${formatMad(cvTotalPrice)} HT`,
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
                            {t('offer_creation.review.step_indicator')}
                        </p>
                        <h2 className="font-serif text-3xl font-bold italic tracking-tight text-[#1a1f1e] sm:text-4xl">
                            {t('offer_creation.review.title')}
                        </h2>
                        <p className="max-w-2xl text-sm leading-relaxed text-[#1a1f1e]/55 sm:text-base">
                            {t('offer_creation.review.description')}
                        </p>
                    </div>
                </div>
            </div>

            <section className="rounded-[32px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">{t('offer_creation.review.preview')}</p>
                        <h3 className="mt-2 font-serif text-2xl font-bold italic tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                            {data.titre || t('offer_creation.review.untitled')}
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
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t('offer_creation.review.description_label')}</p>
                        <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-[15px]">
                            {data.description || t('offer_creation.review.no_description')}
                        </p>
                    </div>

                    {data.notes_complementaires && (
                        <div className="rounded-[28px] border border-amber-100 bg-amber-50/70 p-5 sm:p-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">
                                {t('offer_creation.review.additional_notes')}
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
                        <h3 className="text-lg font-bold tracking-tight text-slate-900">{t('offer_creation.review.experience_education')}</h3>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-100 bg-[#FCFCFB] p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                {t('offer_creation.review.experience_level')}
                            </p>
                            <p className="mt-2 text-sm font-semibold text-slate-900">
                                {getValue('niveauExperiences', data.niveau_experience_id)}
                            </p>
                        </div>
                        <div className="rounded-2xl border border-slate-100 bg-[#FCFCFB] p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                {t('offer_creation.review.legal_education')}
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
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{t('offer_creation.review.summary')}</p>
                            <p className="mt-1 text-sm text-white/80">
                                {data.requirements.length}{' '}
                                {data.requirements.length > 1
                                    ? t('offer_creation.review.criteria_added_plural')
                                    : t('offer_creation.review.criteria_added')}
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white/5 p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">{t('offer_creation.review.expertise')}</p>
                            <p className="mt-2 text-3xl font-black text-white">{selectedSpecialisations.length}</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">{t('offer_creation.review.languages')}</p>
                            <p className="mt-2 text-3xl font-black text-white">{selectedLanguages.length}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-5 lg:grid-cols-2 lg:gap-6">
                <div className="rounded-[32px] border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                        <Sparkles className="h-5 w-5 text-[#C06041]" />
                        <h3 className="text-lg font-bold tracking-tight text-slate-900">{t('offer_creation.review.expertise')}</h3>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2.5">
                        {selectedSpecialisations.length === 0 ? (
                            <div className="w-full rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-sm text-slate-500">
                                {t('offer_creation.review.no_expertise')}
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
                        <h3 className="text-lg font-bold tracking-tight text-slate-900">{t('offer_creation.review.languages')}</h3>
                    </div>
                    <div className="mt-5 space-y-3">
                        {selectedLanguages.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-5 text-sm text-slate-500">
                                {t('offer_creation.review.no_languages')}
                            </div>
                        ) : (
                            selectedLanguages.map((req: any) => {
                                const languageName = getTaxonomyName(req.taxonomy_id, 'LANGUE');
                                const levelName = taxonomies.niveauLangues?.find(
                                    (item: any) => String(item.id) === String(req.metadata?.niveau_langue_id)
                                )?.nom;
                                const importance =
                                    importanceLevels(t)[req.metadata?.importance || 'important'] ||
                                    importanceLevels(t).important;

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
                                                    {t('offer_creation.review.level')} : {levelName || t('offer_creation.review.not_specified')}
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
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t('offer_creation.review.back')}
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={processing}
                    className="h-12 rounded-full bg-[#1a1f1e] px-8 text-sm font-semibold text-white shadow-lg shadow-[#1a1f1e]/10 transition-transform hover:scale-[1.01] active:scale-[0.99] sm:px-10"
                >
                    {processing ? t('offer_creation.review.publishing') : t('offer_creation.review.publish_offer')}
                </Button>
            </div>
        </div>
    );
}
