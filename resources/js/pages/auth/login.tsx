import { Form, Head } from '@inertiajs/react';
import { useEffect } from 'react';
import Reveal from '@/components/home/Reveal';
import InputError from '@/components/input-error';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    useEffect(() => {
        // Preload fonts to match the main aesthetic
        const link = document.createElement('link');
        link.href =
            'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    return (
        <div
            className="relative flex min-h-screen flex-col overflow-clip bg-[#FDFCF8] text-[#1a1f1e]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
            <Head title="Connexion | JuriJob" />

            {/* Soft Organic Grain Texture */}
            <div
                className="pointer-events-none fixed inset-0 z-[100] opacity-[0.35] mix-blend-multiply"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                }}
            ></div>

            <Header />

            <main className="relative flex flex-1 items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
                {/* Decorative Elements for luxury aesthetic */}
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute -top-[10%] -right-[15%] h-[70%] w-[50%] rounded-full bg-[#E5D5C5] opacity-30 blur-[120px]" />
                    <div className="absolute -bottom-[20%] -left-[10%] h-[70%] w-[50%] rounded-full bg-[#E5D5C5] opacity-20 blur-[120px]" />
                </div>

                <Reveal
                    direction="up"
                    duration={0.8}
                    className="z-10 w-full max-w-md"
                >
                    <div className="relative overflow-hidden border border-[#1a1f1e]/10 bg-white/60 p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-12">
                        {/* Subtle inner border accent */}
                        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#1a1f1e] to-transparent opacity-20"></div>

                        <div className="mb-10 text-center">
                            <h1
                                className="mb-3 text-4xl font-light tracking-tight text-[#1a1f1e]"
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                }}
                            >
                                Bon retour
                            </h1>
                            <p className="text-base text-gray-600">
                                Connectez-vous à votre espace JuriJob
                            </p>
                        </div>

                        {status && (
                            <div className="mb-6 border border-green-200 bg-green-50 p-4 text-center text-sm font-medium text-green-800">
                                {status}
                            </div>
                        )}

                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-7"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="email"
                                                className="text-xs font-semibold tracking-wider text-gray-700 uppercase"
                                            >
                                                Adresse email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="email@exemple.com"
                                                className="h-12 rounded-none border-t-0 border-r-0 border-b border-l-0 border-[#1a1f1e]/30 bg-transparent px-0 font-medium text-[#1a1f1e] placeholder:text-gray-400 focus:border-[#1a1f1e] focus:ring-0 focus-visible:border-[#1a1f1e] focus-visible:ring-0 focus-visible:ring-offset-0 hover:border-[#1a1f1e]/30"
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label
                                                    htmlFor="password"
                                                    className="text-xs font-semibold tracking-wider text-gray-700 uppercase"
                                                >
                                                    Mot de passe
                                                </Label>
                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="text-xs font-medium text-[#1a1f1e] underline-offset-4 opacity-70 transition-opacity hover:underline hover:opacity-100"
                                                        tabIndex={5}
                                                    >
                                                        Mot de passe oublié ?
                                                    </TextLink>
                                                )}
                                            </div>
                                            <div className="relative">
                                                <PasswordInput
                                                    id="password"
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="••••••••"
                                                    className="h-12 rounded-none border-t-0 border-r-0 border-b border-l-0 border-[#1a1f1e]/30 bg-transparent px-0 font-medium text-[#1a1f1e] placeholder:text-gray-400 focus:border-[#1a1f1e] focus:ring-0 focus-visible:border-[#1a1f1e] focus-visible:ring-0 focus-visible:ring-offset-0"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        <div className="flex items-center space-x-3 pt-2">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                                className="h-4 w-4 rounded-none border-[#1a1f1e]/30 data-[state=checked]:bg-[#1a1f1e] data-[state=checked]:text-[#FDFCF8]"
                                            />
                                            <Label
                                                htmlFor="remember"
                                                className="text-sm font-normal text-gray-600"
                                            >
                                                Se souvenir de moi
                                            </Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-6 flex h-14 w-full items-center justify-center rounded-none bg-[#1a1f1e] px-8 text-sm font-semibold tracking-wider text-[#FDFCF8] uppercase transition-all hover:bg-[#343a38] disabled:opacity-70"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing && (
                                                <Spinner className="mr-3 h-4 w-4" />
                                            )}
                                            Se connecter
                                        </Button>
                                    </div>

                                    {canRegister && (
                                        <div className="mt-4 text-center text-sm text-gray-600">
                                            Vous n'avez pas de compte ?{' '}
                                            <TextLink
                                                href={register()}
                                                tabIndex={5}
                                                className="font-semibold text-[#1a1f1e] underline-offset-4 transition-all hover:underline"
                                            >
                                                Inscrivez-vous
                                            </TextLink>
                                        </div>
                                    )}
                                </>
                            )}
                        </Form>
                    </div>
                </Reveal>
            </main>

            <Footer />
        </div>
    );
}
