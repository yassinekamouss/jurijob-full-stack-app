import { Form } from '@inertiajs/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Reveal from '@/components/home/Reveal';
import InputError from '@/components/input-error';
import SocialAuthButtons from '@/components/auth/SocialAuthButtons';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import SEO from '@/components/SEO';
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
    const { t } = useTranslation();

    return (
        <div
            className="relative flex min-h-screen flex-col overflow-clip bg-[#FDFCF8] text-[#1a1f1e]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
            <SEO
                title={t('auth.login.seo_title')}
                description={t('auth.login.hero_desc')}
                canonical="https://jurijob.ma/login"
            />

            <Header />

            <main className="relative flex flex-1 items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                {/* Decorative Elements for luxury aesthetic */}
                <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    <div className="absolute -top-[10%] -right-[15%] h-[70%] w-[50%] rounded-full bg-[#E5D5C5] opacity-30 blur-[120px]" />
                    <div className="absolute -bottom-[20%] -left-[10%] h-[70%] w-[50%] rounded-full bg-[#E5D5C5] opacity-20 blur-[120px]" />
                </div>

                <div className="z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-10 sm:gap-16 lg:grid-cols-2 lg:gap-24">
                    {/* Left Column: Login Form */}
                    <Reveal
                        direction="up"
                        duration={0.8}
                        className="mx-auto w-full max-w-md lg:mr-0 lg:ml-auto"
                    >
                        <div className="relative overflow-hidden border border-[#1a1f1e]/10 bg-white/60 p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-12">
                            {/* Subtle inner border accent */}
                            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#1a1f1e] to-transparent opacity-20"></div>

                            <div className="mb-8 text-center sm:mb-10 lg:text-left">
                                <h1
                                    className="mb-3 text-3xl font-light tracking-tight text-[#1a1f1e] sm:text-4xl"
                                    style={{
                                        fontFamily:
                                            "'Cormorant Garamond', serif",
                                    }}
                                >
                                    {t('auth.login.title')}
                                </h1>
                                <p className="text-sm text-gray-600 sm:text-base">
                                    {t('auth.login.subtitle')}
                                </p>
                            </div>

                            {status && (
                                <div
                                    className={`mb-6 border p-4 text-center text-sm font-medium ${
                                        status.includes('Candidat ou Recruteur')
                                            ? 'border-amber-200 bg-amber-50 text-amber-800'
                                            : 'border-green-200 bg-green-50 text-green-800'
                                    }`}
                                >
                                    {status.includes('Candidat ou Recruteur') && (
                                        <span className="mr-2">⚠️</span>
                                    )}
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
                                                    {t('auth.login.email_label')}
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="email"
                                                    placeholder={t('auth.login.email_placeholder')}
                                                    className="h-12 rounded-none border-t-0 border-r-0 border-b border-l-0 border-[#1a1f1e]/30 bg-transparent px-0 font-medium text-[#1a1f1e] placeholder:text-gray-400 hover:border-[#1a1f1e]/30 focus:border-[#1a1f1e] focus:ring-0 focus-visible:border-[#1a1f1e] focus-visible:ring-0 focus-visible:ring-offset-0"
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
                                                        {t('auth.login.password_label')}
                                                    </Label>
                                                    {canResetPassword && (
                                                        <TextLink
                                                            href={request()}
                                                            className="text-xs font-medium text-[#1a1f1e] underline-offset-4 opacity-70 transition-opacity hover:underline hover:opacity-100"
                                                            tabIndex={5}
                                                        >
                                                            {t('auth.login.forgot_password')}
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
                                                    {t('auth.login.remember_me')}
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
                                                {t('auth.login.submit')}
                                            </Button>

                                            {/* Social Login Divider */}
                                            <div className="relative my-2 flex items-center">
                                                <div className="flex-1 border-t border-[#1a1f1e]/10" />
                                                <span className="mx-4 shrink-0 text-xs font-semibold tracking-widest text-gray-400 uppercase">{t('auth.login.or')}</span>
                                                <div className="flex-1 border-t border-[#1a1f1e]/10" />
                                            </div>

                                            <SocialAuthButtons />
                                        </div>

                                        {canRegister && (
                                            <div className="mt-4 text-center text-sm text-gray-600 lg:text-left">
                                                {t('auth.login.no_account')}{' '}
                                                <TextLink
                                                    href={register()}
                                                    tabIndex={5}
                                                    className="font-semibold text-[#1a1f1e] underline-offset-4 transition-all hover:underline"
                                                >
                                                    {t('auth.login.register_link')}
                                                </TextLink>
                                            </div>
                                        )}
                                    </>
                                )}
                            </Form>
                        </div>
                    </Reveal>

                    {/* Right Column: Descriptive Content */}
                    <Reveal
                        direction="left"
                        duration={0.8}
                        className="flex flex-col justify-center space-y-8 lg:max-w-lg lg:pl-10"
                    >
                        <div>
                            <h2
                                className="mb-4 text-3xl leading-[1.15] font-light tracking-tight text-[#1a1f1e] sm:mb-6 sm:text-5xl lg:text-6xl"
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                }}
                            >
                                {t('auth.login.hero_title_1')} <br />
                                <span className="text-gray-600 italic">
                                    {t('auth.login.hero_title_2')}
                                </span>
                            </h2>
                            <p className="text-base leading-relaxed font-light text-gray-700 sm:text-lg">
                                {t('auth.login.hero_desc')}
                            </p>
                        </div>

                        <div className="space-y-6 border-t border-[#1a1f1e]/10 pt-6 sm:space-y-8">
                            <div className="flex items-start">
                                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1a1f1e]/20 bg-[#1a1f1e]/5">
                                    <div className="h-2 w-2 rounded-full bg-[#1a1f1e]" />
                                </div>
                                <div className="ml-4 sm:ml-5">
                                    <h3 className="text-sm font-semibold tracking-widest text-[#1a1f1e] uppercase">
                                        {t('auth.login.feature1_title')}
                                    </h3>
                                    <p className="mt-2 text-sm font-light text-gray-600 sm:text-base">
                                        {t('auth.login.feature1_desc')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#1a1f1e]/20 bg-[#1a1f1e]/5">
                                    <div className="h-2 w-2 rounded-full bg-[#1a1f1e]" />
                                </div>
                                <div className="ml-4 sm:ml-5">
                                    <h3 className="text-sm font-semibold tracking-widest text-[#1a1f1e] uppercase">
                                        {t('auth.login.feature2_title')}
                                    </h3>
                                    <p className="mt-2 text-sm font-light text-gray-600 sm:text-base">
                                        {t('auth.login.feature2_desc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </main>

            <Footer />
        </div>
    );
}
