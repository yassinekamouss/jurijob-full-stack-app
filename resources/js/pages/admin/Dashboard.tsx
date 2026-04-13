import { Head, Link } from '@inertiajs/react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

// Enregistrement des composants Chart.js
ChartJS.register(...registerables);

// On définit des valeurs par défaut pour éviter le "undefined"
export default function Dashboard({ auth, chartData = { totals: { candidats: 0, recruteurs: 0 }, growth: { candidats: [], recruteurs: [] } } }: any) {
    // ... reste du code
    // 1. Configuration du Pie Chart (Répartition)
    // console.log("Données reçues :", chartData); // Regardez dans la console F12 de votre navigateur
    const pieData = {
        labels: ['Candidats', 'Recruteurs'],
        datasets: [{
            data: [chartData.totals.candidats, chartData.totals.recruteurs],
            backgroundColor: ['#3b82f6', '#10b981'],
            hoverOffset: 4,
            borderWidth: 1,
        }],
    };

    // 2. Configuration du Line Chart (Croissance)
    // Note : On utilise les données réelles reçues du backend
    const lineData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
        datasets: [
            {
                label: 'Candidats',
                data: chartData.growth.candidats.map((d: any) => d.total),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Recruteurs',
                data: chartData.growth.recruteurs.map((d: any) => d.total),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    return (
        <div style={{ padding: '2rem' }}>
            <Head title="Admin Dashboard" />

            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
                        Welcome to the Admin Panel, {auth.user.name}
                    </h1>
                    <p style={{ color: '#6b7280' }}>You are logged in via the Admin Guard.</p>
                </div>

                <Link
                    href="/admin/logout"
                    method="post"
                    as="button"
                    style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Logout
                </Link>

                {/*boutton pour pages des utilisateurs candidats et recruteurs*/}

                <Link
                    href="/admin/candidats"
                    as="button"
                    style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Candidats
                </Link>

                <Link
                    href="/admin/Recruteurs"
                    as="button"
                    style={{
                        backgroundColor: '#10b981',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Recruteurs
                </Link>


            </div>

            {/* Charts Grid Section */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Card Répartition */}
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        Répartition des utilisateurs
                    </h3>
                    <div style={{ height: '300px' }}>
                        <Pie data={pieData} options={chartOptions} />
                    </div>
                </div>

                {/* Card Croissance */}
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        Croissance des inscriptions
                    </h3>
                    <div style={{ height: '300px' }}>
                        <Line data={lineData} options={chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
}