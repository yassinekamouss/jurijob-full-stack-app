import { Head } from '@inertiajs/react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import AdminLayout from '@/layouts/admin-layout';
import { useTranslation } from 'react-i18next';
import { Scale, Globe, BarChart3, CheckSquare, ChevronDown } from 'lucide-react';
import { useState } from 'react';

ChartJS.register(...registerables);

interface DashboardProps {
    auth: any;
    stats: {
        cvtheque: { total: number; valides: number; en_attente: number };
        demandes_en_cours: { total: number; terminees: number; annulees: number };
        encaisse: { total_mad: number; paiements_confirmes: number };
        alertes_actives: { total: number };
        ecart_specialisation: { id: number; name_fr: string; name_en: string; demande: number; offre: number; excedent: number; deficit: number }[];
        repartition_geographique: { country_code: string; country_fr: string; country_en: string; count: number; percentage: number }[];
        tunnel_conversion: {
            demandes_recues: { count: number; percentage: number };
            short_lists_envoyees: { count: number; percentage: number };
            payees: { count: number; percentage: number };
        };
        qualite_profils: { complets: number; total_valides: number; percentage: number };
    };
}

const breadcrumbs = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Dashboard', href: '/admin/dashboard' },
];

export default function Dashboard({ auth, stats }: DashboardProps) {
    const { t, i18n } = useTranslation();
    const isFr = i18n.language === 'fr';

    const [visibleEcartCount, setVisibleEcartCount] = useState(8);

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat(isFr ? 'fr-FR' : 'en-US').format(num);
    };

    // Prepare Doughnut Chart Data
    const topCountries = stats.repartition_geographique.slice(0, 5);
    const otherCountries = stats.repartition_geographique.slice(5);
    const othersCount = otherCountries.reduce((sum, c) => sum + c.count, 0);
    const othersPercentage = otherCountries.reduce((sum, c) => sum + c.percentage, 0);

    const geoDataList = [...topCountries];
    if (othersCount > 0) {
        geoDataList.push({
            country_code: 'OTHER',
            country_fr: t('admin_dashboard.autres'),
            country_en: t('admin_dashboard.autres'),
            count: othersCount,
            percentage: othersPercentage,
        });
    }

    const chartColors = ['#0a1c35', '#b39d73', '#718096', '#a0aec0', '#cbd5e1', '#e2e8f0'];

    const pieData = {
        labels: geoDataList.map((c) => (isFr ? c.country_fr : c.country_en)),
        datasets: [
            {
                data: geoDataList.map((c) => c.count),
                backgroundColor: chartColors,
                borderWidth: 0,
                hoverOffset: 4,
                cutout: '70%',
            },
        ],
    };

    const pieOptions = {
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#0a1c35',
                padding: 12,
                titleFont: { size: 13, family: 'Inter' },
                bodyFont: { size: 12, family: 'Inter' },
                cornerRadius: 6,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title={t('admin_dashboard.page_title')} />

            <div className="flex flex-col gap-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                {/* Top Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    {/* CVthèque */}
                    <div className="bg-[#0b162c] rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm relative overflow-hidden">
                        <p className="text-[11px] font-semibold text-[#b39d73] uppercase tracking-wider mb-2">
                            {t('admin_dashboard.cvtheque')}
                        </p>
                        <h2 className="text-4xl font-bold text-white mb-2">{formatNumber(stats.cvtheque.total)}</h2>
                        <p className="text-xs text-slate-400">
                            {t('admin_dashboard.cvtheque_sub', {
                                valides: stats.cvtheque.valides,
                                en_attente: stats.cvtheque.en_attente,
                            })}
                        </p>
                    </div>

                    {/* Demandes en cours */}
                    <div className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                        <p className="text-[11px] font-semibold text-[#b39d73] uppercase tracking-wider mb-2">
                            {t('admin_dashboard.demandes_en_cours')}
                        </p>
                        <h2 className="text-4xl font-bold text-[#0b162c] mb-2">{formatNumber(stats.demandes_en_cours.total)}</h2>
                        <p className="text-xs text-slate-400">
                            {t('admin_dashboard.demandes_sub', {
                                terminees: stats.demandes_en_cours.terminees,
                                annulees: stats.demandes_en_cours.annulees,
                            })}
                        </p>
                    </div>

                    {/* Encaissé */}
                    <div className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                        <p className="text-[11px] font-semibold text-[#b39d73] uppercase tracking-wider mb-2">
                            {t('admin_dashboard.encaisse')}
                        </p>
                        <h2 className="text-4xl font-bold text-[#276749] mb-2 flex items-baseline gap-1">
                            {formatNumber(stats.encaisse.total_mad)} <span className="text-sm font-medium text-slate-400">MAD</span>
                        </h2>
                        <p className="text-xs text-slate-400">
                            {stats.encaisse.paiements_confirmes > 1
                                ? t('admin_dashboard.encaisse_sub', { count: stats.encaisse.paiements_confirmes })
                                : t('admin_dashboard.encaisse_sub_singular', { count: stats.encaisse.paiements_confirmes })}
                        </p>
                    </div>

                    {/* Alertes actives */}
                    <div className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                        <p className="text-[11px] font-semibold text-[#b39d73] uppercase tracking-wider mb-2">
                            {t('admin_dashboard.alertes_actives')}
                        </p>
                        <h2 className="text-4xl font-bold text-[#b39d73] mb-2">{formatNumber(stats.alertes_actives.total)}</h2>
                        <p className="text-xs text-slate-400">
                            {stats.alertes_actives.total === 0
                                ? t('admin_dashboard.alertes_sub_zero')
                                : t('admin_dashboard.alertes_sub', { count: stats.alertes_actives.total })}
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2 items-start">
                    {/* Écart offre / demande par spécialisation */}
                    <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-center gap-2 mb-6 text-slate-500">
                            <Scale className="w-5 h-5 text-slate-400" />
                            <h3 className="font-semibold">{t('admin_dashboard.ecart_specialisation')}</h3>
                        </div>

                        <div className="space-y-6">
                            {stats.ecart_specialisation.slice(0, visibleEcartCount).map((spec) => (
                                <div key={spec.id} className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-slate-700 text-sm">
                                            {isFr ? spec.name_fr : spec.name_en}
                                        </span>
                                        {spec.excedent > 0 ? (
                                            <span className="px-2 py-1 rounded-full bg-[#f0fdf4] text-[#166534] text-xs font-medium">
                                                {t('admin_dashboard.excedent_de', { count: spec.excedent })}
                                            </span>
                                        ) : spec.deficit > 0 ? (
                                            <span className="px-2 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                                                {t('admin_dashboard.deficit_de', { count: spec.deficit })}
                                            </span>
                                        ) : null}
                                    </div>
                                    
                                    <div className="space-y-2">
                                        {/* Demande */}
                                        <div className="flex items-center text-xs text-slate-400 gap-2">
                                            <span className="w-16">{t('admin_dashboard.demande')}</span>
                                            <span className="w-4 font-medium">{spec.demande}</span>
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden flex items-center relative">
                                                <div 
                                                    className="h-full bg-[#b39d73] rounded-full absolute left-0" 
                                                    style={{ width: `${Math.min(100, (spec.demande / Math.max(1, stats.cvtheque.total)) * 100 * 5)}%` }}
                                                />
                                                <div className="w-2 h-2 rounded-full bg-[#b39d73] absolute left-0 z-10" />
                                            </div>
                                        </div>
                                        {/* Offre */}
                                        <div className="flex items-center text-xs text-slate-400 gap-2">
                                            <span className="w-16">{t('admin_dashboard.offre')}</span>
                                            <span className="w-4 font-medium">{spec.offre}</span>
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#0b162c] rounded-full" 
                                                    style={{ width: `${Math.min(100, (spec.offre / Math.max(1, stats.cvtheque.total)) * 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {visibleEcartCount < stats.ecart_specialisation.length && (
                            <div className="mt-8 flex justify-center border-t border-slate-100 pt-6">
                                <button
                                    onClick={() => setVisibleEcartCount(prev => prev + 6)}
                                    className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:text-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-[#b39d73] focus:ring-offset-2"
                                >
                                    {t('admin_dashboard.load_more')}
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <div className="mt-8 text-[11px] text-center text-slate-400 leading-relaxed max-w-sm mx-auto">
                            {t('admin_dashboard.ecart_note')}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Répartition géographique */}
                        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-center gap-2 mb-6 text-slate-500">
                                <Globe className="w-5 h-5 text-slate-400" />
                                <h3 className="font-semibold text-center">
                                    {t('admin_dashboard.repartition_geographique', { count: stats.cvtheque.valides })}
                                </h3>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="w-40 h-40 relative flex-shrink-0">
                                    <Doughnut data={pieData} options={pieOptions} />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-2xl font-bold text-[#0b162c]">{stats.cvtheque.valides}</span>
                                        <span className="text-[10px] text-slate-400 uppercase">profils</span>
                                    </div>
                                </div>

                                <div className="flex-1 w-full space-y-4">
                                    {geoDataList.map((item, idx) => (
                                        <div key={item.country_code} className="space-y-1">
                                            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: chartColors[idx % chartColors.length] }} />
                                                    {isFr ? item.country_fr : item.country_en}
                                                </div>
                                                <div className="flex gap-4">
                                                    <span className="font-bold">{item.count}</span>
                                                    <span className="text-slate-400 w-6 text-right">{item.percentage}%</span>
                                                </div>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full rounded-full" 
                                                    style={{ width: `${item.percentage}%`, backgroundColor: chartColors[idx % chartColors.length] }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tunnel de conversion */}
                        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-center gap-2 mb-6 text-slate-500">
                                <BarChart3 className="w-5 h-5 text-slate-400" />
                                <h3 className="font-semibold">{t('admin_dashboard.tunnel_conversion')}</h3>
                            </div>

                            <div className="space-y-5">
                                {/* Demandes */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-medium text-slate-600">
                                        <span>{t('admin_dashboard.demandes_recues')}</span>
                                        <span className="font-bold">{stats.tunnel_conversion.demandes_recues.count}</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#0b162c] rounded-full" style={{ width: '100%' }} />
                                    </div>
                                </div>

                                {/* Short-lists */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-medium text-slate-600">
                                        <span>{t('admin_dashboard.short_lists_envoyees')}</span>
                                        <span>
                                            <span className="font-bold mr-1">{stats.tunnel_conversion.short_lists_envoyees.count}</span> 
                                            <span className="text-slate-400">({stats.tunnel_conversion.short_lists_envoyees.percentage}%)</span>
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-[#b39d73] rounded-full" 
                                            style={{ width: `${stats.tunnel_conversion.short_lists_envoyees.percentage}%` }} 
                                        />
                                    </div>
                                </div>

                                {/* Payées */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-medium text-slate-600">
                                        <span>{t('admin_dashboard.payees')}</span>
                                        <span>
                                            <span className="font-bold mr-1">{stats.tunnel_conversion.payees.count}</span> 
                                            <span className="text-slate-400">({stats.tunnel_conversion.payees.percentage}%)</span>
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-[#276749] rounded-full" 
                                            style={{ width: `${stats.tunnel_conversion.payees.percentage}%` }} 
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-5 text-[11px] text-center text-slate-400 leading-relaxed">
                                {t('admin_dashboard.tunnel_note')}
                            </div>
                        </div>

                        {/* Qualité des profils */}
                        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-center gap-2 mb-6 text-slate-500">
                                <CheckSquare className="w-5 h-5 text-[#276749]" />
                                <h3 className="font-semibold">{t('admin_dashboard.qualite_profils')}</h3>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between text-xs font-medium text-slate-600">
                                    <span>{t('admin_dashboard.profils_complets')}</span>
                                    <span className="font-bold text-[#0b162c]">
                                        {stats.qualite_profils.complets}/{stats.qualite_profils.total_valides} 
                                        <span className="text-slate-500 font-normal ml-1">({stats.qualite_profils.percentage}%)</span>
                                    </span>
                                </div>
                                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-[#276749] rounded-full" 
                                        style={{ width: `${stats.qualite_profils.percentage}%` }} 
                                    />
                                </div>
                            </div>

                            <div className="mt-4 text-[11px] text-center text-slate-400">
                                {t('admin_dashboard.scoring_note')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}