import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Head title="Tableau de Bord Recruteur" />
            
            <div className="p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-blue-600">
                    Hello Recruiter! 👋
                </h1>
                <p className="mt-2 text-gray-600">
                    La redirection vers l'espace recruteur fonctionne parfaitement.
                </p>
                
                <div className="mt-6">
                    <a 
                        href="/logout" 
                        className="text-sm text-red-500 hover:underline"
                        onClick={(e) => {
                            e.preventDefault();
                            // Note: Pour un vrai logout Inertia, on utiliserait router.post('/logout')
                            alert('Ici tu pourras configurer le bouton de déconnexion');
                        }}
                    >
                        Se déconnecter
                    </a>
                </div>
            </div>
        </div>
    );
}