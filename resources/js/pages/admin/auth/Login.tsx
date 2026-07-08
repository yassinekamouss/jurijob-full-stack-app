import { useForm, Head } from '@inertiajs/react';
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Loader2 } from 'lucide-react';

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
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
            <Head title="Admin – JuriJob" />

            <div className="w-full max-w-md space-y-6">
                {/* Logo & Brand */}
                <div className="flex flex-col items-center gap-3 text-center">
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/logo_jurijob.jpg"
                            alt="JuriJob"
                            className="h-12 w-12 rounded-xl object-cover shadow-sm"
                        />
                        <span className="text-2xl font-bold tracking-tight">JuriJob</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Shield className="h-3.5 w-3.5" />
                        <span>Espace Administrateur</span>
                    </div>
                </div>

                {/* Login Card */}
                <Card className="shadow-lg">
                    <CardHeader className="pb-0 pt-6 px-6">
                        <h1 className="text-xl font-semibold">Connexion Admin</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Entrez vos identifiants pour accéder au panel de gestion.
                        </p>
                    </CardHeader>
                    <CardContent className="pt-4 pb-6 px-6">
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="email">Adresse email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="admin@jurijob.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={errors.email ? 'border-destructive' : ''}
                                />
                                {errors.email && (
                                    <p className="text-xs text-destructive">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="password">Mot de passe</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={errors.password ? 'border-destructive' : ''}
                                />
                                {errors.password && (
                                    <p className="text-xs text-destructive">{errors.password}</p>
                                )}
                            </div>

                            <Button type="submit" className="w-full mt-2" disabled={processing}>
                                {processing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Connexion en cours…
                                    </>
                                ) : (
                                    'Se connecter'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-muted-foreground">
                    Accès réservé aux administrateurs JuriJob
                </p>
            </div>
        </div>
    );
}