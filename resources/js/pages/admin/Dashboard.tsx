import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }: any) {
    return (
        <div style={{ padding: '2rem' }}>
            <Head title="Admin Dashboard" />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Welcome to the Admin Panel, {auth.user.name}</h1>

                {/* Logout Button */}
                <Link
                    href="/admin/logout"
                    method="post"
                    as="button"
                    className="logout-button"
                    style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Logout
                </Link>
            </div>

            <p>You are logged in via the Admin Guard.</p>
        </div>
    );
}