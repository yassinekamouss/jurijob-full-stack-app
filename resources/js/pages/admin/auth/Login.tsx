import { useForm, Head } from '@inertiajs/react';
import React from 'react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="admin-login-container">
            <Head title="Admin Login" />

            <form onSubmit={submit}>
                <h1>Admin Access</h1>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>

                <button type="submit" disabled={processing}>
                    Login to Dashboard
                </button>
            </form>
        </div>
    );
}