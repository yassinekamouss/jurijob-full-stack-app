import { Head, Link, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardHeader from '@/components/recruiter/DashboardHeader';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { confirmTransfer, index as offresIndex } from '@/routes/offres';

type PaymentBank = {
    beneficiary: string;
    bank_name: string;
    agency: string;
    rib: string;
    swift: string;
};

type Props = {
    offre: {
        id: number;
        titre: string;
        statut: string;
        payment_reference: string | null;
    };
    payment: {
        profiles_count: number;
        unit_price_mad: number;
        total_mad: number;
        bank: PaymentBank;
        support_email: string;
    };
};

function formatMad(amount: number, locale: string): string {
    return new Intl.NumberFormat(locale === 'en' ? 'en-MA' : 'fr-MA', {
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function Payment({ offre, payment }: Props) {
    const { t, i18n } = useTranslation();
    const { flash } = usePage().props as { flash?: { error?: string; success?: string } };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const locale = i18n.language?.startsWith('en') ? 'en' : 'fr';
    const count = payment.profiles_count;

    const bankRows: Array<{ key: string; label: string; value: string }> = [
        { key: 'beneficiary', label: t('recruiter.payment.bank.beneficiary'), value: payment.bank.beneficiary },
        { key: 'bank_name', label: t('recruiter.payment.bank.bank_name'), value: payment.bank.bank_name },
        { key: 'agency', label: t('recruiter.payment.bank.agency'), value: payment.bank.agency },
        { key: 'rib', label: t('recruiter.payment.bank.rib'), value: payment.bank.rib },
        { key: 'swift', label: t('recruiter.payment.bank.swift'), value: payment.bank.swift },
        {
            key: 'reference',
            label: t('recruiter.payment.bank.reference'),
            value: offre.payment_reference ?? '—',
        },
    ];

    const copyValue = async (key: string, value: string) => {
        try {
            await navigator.clipboard.writeText(value);
            setCopiedField(key);
            window.setTimeout(() => setCopiedField(null), 1600);
        } catch {
            // Clipboard may be unavailable in some contexts.
        }
    };

    const openConfirm = () => {
        if (isSubmitting || count < 1) {
            return;
        }

        setConfirmOpen(true);
    };

    const handleConfirmTransfer = () => {
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        router.post(confirmTransfer.url(offre.id), {}, {
            onFinish: () => {
                setIsSubmitting(false);
                setConfirmOpen(false);
            },
        });
    };

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-[#FDFCF8] text-[#1a1f1e]">
            <Head title={`${t('recruiter.payment.seo_title')} — ${offre.titre}`} />
            <DashboardHeader />

            <main className="relative z-10 mx-auto max-w-3xl px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8 sm:space-y-10"
                >
                    <div className="space-y-4">
                        <Link
                            href={offresIndex().url}
                            className="group inline-flex items-center text-xs font-black uppercase tracking-widest text-[#1a1f1e]/40 transition-all hover:text-[#1a1f1e]"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            {t('recruiter.payment.back')}
                        </Link>

                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C06041]">
                            {t('recruiter.payment.eyebrow')}
                        </p>
                        <h1 className="font-serif text-3xl font-bold italic tracking-tight sm:text-4xl md:text-5xl">
                            {offre.titre}
                        </h1>
                    </div>

                    {(flash?.error || flash?.success) && (
                        <div
                            className={`border px-4 py-3 text-sm ${
                                flash.error
                                    ? 'border-rose-200 bg-rose-50 text-rose-700'
                                    : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                            }`}
                        >
                            {flash.error || flash.success}
                        </div>
                    )}

                    <section className="space-y-6 border border-[#1a1f1e]/8 bg-white p-5 sm:p-8 shadow-sm shadow-[#1a1f1e]/5">
                        <div className="space-y-2 text-center sm:text-left">
                            <p className="font-serif text-2xl font-bold italic tracking-tight md:text-3xl">
                                {t('recruiter.payment.profiles_selected', { count })}
                            </p>
                            <p className="text-sm font-medium text-[#1a1f1e]/45">
                                {count} × {formatMad(payment.unit_price_mad, locale)} MAD
                            </p>
                            <p className="pt-2 text-4xl font-semibold tracking-tight text-[#1a1f1e]">
                                {formatMad(payment.total_mad, locale)} MAD
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#1a1f1e]/40">
                                {t('recruiter.payment.tax_note')}
                            </p>
                        </div>

                        <div className="border-t border-[#1a1f1e]/8 pt-6">
                            <div className="mb-4 flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-[#C06041]" />
                                <h2 className="text-xs font-black uppercase tracking-widest text-[#1a1f1e]/50">
                                    {t('recruiter.payment.bank_details')}
                                </h2>
                            </div>

                            <dl className="space-y-3">
                                {bankRows.map((row) => (
                                    <div
                                        key={row.key}
                                        className="flex flex-col gap-1 border-b border-[#1a1f1e]/5 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <dt className="text-[10px] font-black uppercase tracking-widest text-[#1a1f1e]/35">
                                            {row.label}
                                        </dt>
                                        <dd className="flex items-center gap-2 text-sm font-semibold text-[#1a1f1e]">
                                            <span className={row.key === 'reference' ? 'font-mono tracking-wide' : ''}>
                                                {row.value}
                                            </span>
                                            {row.value !== '—' && (
                                                <button
                                                    type="button"
                                                    onClick={() => copyValue(row.key, row.value)}
                                                    className="inline-flex h-7 w-7 items-center justify-center text-[#1a1f1e]/35 transition-colors hover:text-[#1a1f1e]"
                                                    aria-label={t('recruiter.payment.copy')}
                                                >
                                                    {copiedField === row.key ? (
                                                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                                                    ) : (
                                                        <Copy className="h-3.5 w-3.5" />
                                                    )}
                                                </button>
                                            )}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>

                        <p className="text-sm leading-relaxed text-[#1a1f1e]/60">
                            {t('recruiter.payment.instructions')}
                        </p>

                        <button
                            type="button"
                            onClick={openConfirm}
                            disabled={isSubmitting || count < 1}
                            className="inline-flex h-14 w-full items-center justify-center bg-[#1a1f1e] px-8 text-sm font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {isSubmitting
                                ? t('recruiter.payment.submitting')
                                : t('recruiter.payment.confirm_transfer')}
                        </button>

                        <p className="text-center text-sm text-[#1a1f1e]/45">
                            {t('recruiter.payment.question')}{' '}
                            <a
                                href={`mailto:${payment.support_email}`}
                                className="font-semibold text-[#1a1f1e] underline decoration-[#1a1f1e]/20 underline-offset-4 transition-colors hover:decoration-[#C06041]"
                            >
                                {payment.support_email}
                            </a>
                        </p>
                    </section>

                    <Dialog
                        open={confirmOpen}
                        onOpenChange={(open) => {
                            if (!isSubmitting) {
                                setConfirmOpen(open);
                            }
                        }}
                    >
                        <DialogContent className="rounded-none border-[#1a1f1e]/10 sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="font-serif text-2xl font-bold italic tracking-tight text-[#1a1f1e]">
                                    {t('recruiter.payment.confirm_dialog.title')}
                                </DialogTitle>
                                <DialogDescription className="text-sm leading-relaxed text-[#1a1f1e]/60">
                                    {t('recruiter.payment.confirm_dialog.description', {
                                        amount: `${formatMad(payment.total_mad, locale)} MAD`,
                                        reference: offre.payment_reference ?? '—',
                                    })}
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="gap-2 sm:gap-2">
                                <button
                                    type="button"
                                    onClick={() => setConfirmOpen(false)}
                                    disabled={isSubmitting}
                                    className="border border-[#1a1f1e]/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#1a1f1e]/60 transition-colors hover:border-[#1a1f1e]/40 hover:text-[#1a1f1e]"
                                >
                                    {t('recruiter.payment.confirm_dialog.cancel')}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmTransfer}
                                    disabled={isSubmitting}
                                    className="bg-[#1a1f1e] px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-opacity disabled:opacity-40"
                                >
                                    {isSubmitting
                                        ? t('recruiter.payment.submitting')
                                        : t('recruiter.payment.confirm_dialog.confirm')}
                                </button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </motion.div>
            </main>
        </div>
    );
}
