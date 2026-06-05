import { Head } from '@inertiajs/react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';
import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, Building2, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

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

export default function Dashboard({ auth, chartData = { totals: { candidats: 0, recruteurs: 0 }, growth: { candidats: [], recruteurs: [] } } }: DashboardProps) {
    const pieData = {
        labels: ['Candidats', 'Recruteurs'],
        datasets: [{
            data: [chartData.totals.candidats, chartData.totals.recruteurs],
            backgroundColor: ['oklch(0.6 0.118 184.704)', 'oklch(0.205 0 0)'], // Consistent with project colors
            hoverOffset: 12,
            borderWidth: 0,
            borderRadius: 8,
        }],
    };

    const lineData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
        datasets: [
            {
                label: 'Candidats',
                data: chartData.growth.candidats.map((d: any) => d.total),
                borderColor: 'oklch(0.6 0.118 184.704)',
                backgroundColor: 'rgba(96, 165, 250, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
            {
                label: 'Recruteurs',
                data: chartData.growth.recruteurs.map((d: any) => d.total),
                borderColor: 'oklch(0.205 0 0)',
                backgroundColor: 'rgba(31, 41, 55, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { family: 'Instrument Sans' }
                }
            },
            tooltip: {
                backgroundColor: '#1f2937',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                cornerRadius: 8,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(0, 0, 0, 0.05)' },
            },
            x: {
                grid: { display: false },
            }
        }
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin" />

            <div className="flex flex-col gap-8">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Bienvenue, {auth.user.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Voici un aperçu de l'activité sur JuriJob.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Candidats</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{chartData.totals.candidats}</div>
                            <p className="text-xs text-muted-foreground">Inscrits sur la plateforme</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Recruteurs</CardTitle>
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{chartData.totals.recruteurs}</div>
                            <p className="text-xs text-muted-foreground">Entreprises & Cabinets</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Utilisateurs Global</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{chartData.totals.candidats + chartData.totals.recruteurs}</div>
                            <p className="text-xs text-muted-foreground">Activité totale</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid gap-6 md:grid-cols-7">
                    <Card className="md:col-span-4">
                        <CardHeader>
                            <CardTitle>Croissance des Utilisateurs</CardTitle>
                            <CardDescription>Évolution des inscriptions mensuelles</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[350px] w-full">
                                <Line data={lineData} options={chartOptions} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-3">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PieChartIcon className="h-4 w-4" />
                                Répartition
                            </CardTitle>
                            <CardDescription>Candidats vs Recruteurs</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center flex-col items-center">
                            <div className="h-[300px] w-full">
                                <Pie data={pieData} options={chartOptions} />
                            </div>
                            <div className="mt-4 space-y-2 w-full">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2"><div className="size-3 rounded-full bg-[oklch(0.6_0.118_184.704)]" /> Candidats</span>
                                    <span className="font-semibold">{chartData.totals.candidats}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2"><div className="size-3 rounded-full bg-[oklch(0.205_0_0)]" /> Recruteurs</span>
                                    <span className="font-semibold">{chartData.totals.recruteurs}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}