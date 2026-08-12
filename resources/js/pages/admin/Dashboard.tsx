import { Head } from '@inertiajs/react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import AdminLayout from '@/layouts/admin-layout';
import { Users, Building2, TrendingUp } from 'lucide-react';

ChartJS.register(...registerables);

interface DashboardProps {
    auth: any;
    chartData?: {
        totals: { candidats: number; recruteurs: number };
        growth: {
            candidats: { total: number; month: number }[];
            recruteurs: { total: number; month: number }[];
        };
    };
}

const breadcrumbs = [
    { title: 'Admin', href: '/admin/dashboard' },
    { title: 'Dashboard', href: '/admin/dashboard' },
];

const statCards = [
    {
        label: 'Total Candidats',
        sub: 'Inscrits sur la plateforme',
        icon: Users,
        key: 'candidats' as const,
        accent: 'bg-[#C06041]/10 text-[#C06041]',
    },
    {
        label: 'Total Recruteurs',
        sub: 'Entreprises & Cabinets',
        icon: Building2,
        key: 'recruteurs' as const,
        accent: 'bg-[#1a1f1e]/10 text-[#1a1f1e]',
    },
];

export default function Dashboard({
    auth,
    chartData = { totals: { candidats: 0, recruteurs: 0 }, growth: { candidats: [], recruteurs: [] } },
}: DashboardProps) {
    const total = chartData.totals.candidats + chartData.totals.recruteurs;

    const pieData = {
        labels: ['Candidats', 'Recruteurs'],
        datasets: [
            {
                data: [chartData.totals.candidats, chartData.totals.recruteurs],
                backgroundColor: ['#C06041', '#1a1f1e'],
                hoverOffset: 8,
                borderWidth: 0,
                borderRadius: 4,
            },
        ],
    };

    const lineData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
        datasets: [
            {
                label: 'Candidats',
                data: chartData.growth.candidats.map((d: any) => d.total),
                borderColor: '#C06041',
                backgroundColor: 'rgba(192,96,65,0.06)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 2,
            },
            {
                label: 'Recruteurs',
                data: chartData.growth.recruteurs.map((d: any) => d.total),
                borderColor: '#1a1f1e',
                backgroundColor: 'rgba(26,31,30,0.05)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 2,
            },
        ],
    };

    const baseOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { family: 'Outfit', size: 12 },
                    color: '#1a1f1e',
                },
            },
            tooltip: {
                backgroundColor: '#1a1f1e',
                padding: 12,
                titleFont: { size: 13, weight: 'bold' as const, family: 'Outfit' },
                bodyFont: { size: 12, family: 'Outfit' },
                cornerRadius: 6,
            },
        },
    };

    const lineOptions = {
        ...baseOptions,
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(26,31,30,0.05)' },
                ticks: { color: '#1a1f1e99', font: { family: 'Outfit', size: 11 } },
                border: { display: false },
            },
            x: {
                grid: { display: false },
                ticks: { color: '#1a1f1e99', font: { family: 'Outfit', size: 11 } },
                border: { display: false },
            },
        },
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin" />

            <div className="flex flex-col gap-10" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {/* Header */}
                <div className="border-b border-[#1a1f1e]/10 pb-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#C06041] font-medium mb-2">Panel administrateur</p>
                    <h1
                        className="text-4xl md:text-5xl text-[#1a1f1e] font-light leading-tight"
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                        Bienvenue,{' '}
                        <span className="italic font-medium">{auth.user.name}</span>
                    </h1>
                    <p className="text-[#1a1f1e]/50 mt-2 text-sm font-light">
                        Voici un aperçu de l'activité sur JuriJob.
                    </p>
                </div>

                {/* Stat Cards */}
                <div className="grid gap-4 sm:grid-cols-3">
                    {statCards.map((s) => (
                        <div
                            key={s.key}
                            className="bg-white border border-[#1a1f1e]/8 p-6 rounded-none relative overflow-hidden group hover:border-[#1a1f1e]/20 transition-colors"
                        >
                            <div className="absolute top-0 left-0 w-[2px] h-full bg-[#C06041] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-start justify-between mb-4">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1f1e]/40 font-medium">{s.label}</p>
                                <div className={`h-8 w-8 rounded flex items-center justify-center ${s.accent}`}>
                                    <s.icon className="h-4 w-4" />
                                </div>
                            </div>
                            <div
                                className="text-4xl text-[#1a1f1e] font-light"
                                style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            >
                                {chartData.totals[s.key]}
                            </div>
                            <p className="text-[11px] text-[#1a1f1e]/40 mt-1">{s.sub}</p>
                        </div>
                    ))}

                    <div className="bg-[#1a1f1e] p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="flex items-start justify-between mb-4">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium">Utilisateurs global</p>
                            <div className="h-8 w-8 rounded flex items-center justify-center bg-white/10 text-white">
                                <TrendingUp className="h-4 w-4" />
                            </div>
                        </div>
                        <div
                            className="text-4xl text-white font-light"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            {total}
                        </div>
                        <p className="text-[11px] text-white/40 mt-1">Activité totale sur la plateforme</p>
                    </div>
                </div>

                {/* Charts */}
                <div className="grid gap-6 lg:grid-cols-7">
                    <div className="lg:col-span-4 bg-white border border-[#1a1f1e]/8 p-6">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1f1e]/40 font-medium mb-1">Croissance</p>
                        <h2
                            className="text-xl text-[#1a1f1e] font-light mb-6"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            Évolution des inscriptions
                        </h2>
                        <div className="h-[300px] w-full">
                            <Line data={lineData} options={lineOptions} />
                        </div>
                    </div>

                    <div className="lg:col-span-3 bg-white border border-[#1a1f1e]/8 p-6">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#1a1f1e]/40 font-medium mb-1">Répartition</p>
                        <h2
                            className="text-xl text-[#1a1f1e] font-light mb-6"
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        >
                            Candidats vs Recruteurs
                        </h2>
                        <div className="h-[240px]">
                            <Pie data={pieData} options={baseOptions} />
                        </div>
                        <div className="mt-6 space-y-2 border-t border-[#1a1f1e]/8 pt-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-[#1a1f1e]/60">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#C06041]" />
                                    Candidats
                                </span>
                                <span className="font-semibold text-[#1a1f1e]">{chartData.totals.candidats}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2 text-[#1a1f1e]/60">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#1a1f1e]" />
                                    Recruteurs
                                </span>
                                <span className="font-semibold text-[#1a1f1e]">{chartData.totals.recruteurs}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}