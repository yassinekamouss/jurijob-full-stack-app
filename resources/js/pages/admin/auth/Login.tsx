import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';

export default function Login() {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });



    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div
            className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#FAF8F5] text-[#1a1f1e] selection:bg-[#C06041] selection:text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
            <Head title={t('admin_login.page_title', { defaultValue: 'Connexion Administrateur — JuriJob' })} />        

            {/* Top Navigation Bar with Language Switcher */}
            <header className="relative z-10 flex items-center justify-between px-6 py-2 sm:px-12">
                <div className="flex items-center gap-3">
                    <img
                        src="/images/logo_jurijob.webp"
                        alt="JuriJob Administration"
                        className="h-30 w-auto object-contain transition-transform duration-300 hover:scale-105"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-2 sm:px-6">
                <div className="w-full max-w-lg space-y-8">
                    {/* Main Luxury Card Container */}
                    <div className="relative overflow-hidden p-8 sm:p-12">

                        {/* Card Header & Badge */}
                        <div className="mb-8 text-center space-y-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#C06041]/20 bg-[#C06041]/5 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#C06041]">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                <span>{t('admin_login.badge', { defaultValue: 'Espace d\'Administration' })}</span>
                            </div>

                            <h1
                                className="text-3xl sm:text-4xl font-light tracking-tight text-[#1a1f1e]"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                {t('admin_login.title_part1', { defaultValue: 'Connexion' })}{' '}
                                <span className="italic text-[#C06041]">
                                    {t('admin_login.title_part2', { defaultValue: 'Administrateur' })}
                                </span>
                            </h1>

                            <p className="text-xs sm:text-sm text-[#1a1f1e]/60 font-light leading-relaxed max-w-xs mx-auto">
                                {t('admin_login.subtitle', { defaultValue: 'Accès réservé au personnel autorisé de la plateforme JuriJob.' })}
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={submit} className="space-y-5">
                            {/* Email Input */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="email"
                                    className="text-xs font-semibold uppercase tracking-wider text-[#1a1f1e]/70"
                                >
                                    {t('admin_login.email_label', { defaultValue: 'Adresse Email' })}
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/40 pointer-events-none" />
                                    <Input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        autoFocus
                                        placeholder={t('admin_login.email_placeholder', { defaultValue: 'admin@jurijob.ma' })}
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`h-12 rounded-2xl border bg-white/90 pl-11 pr-4 text-sm font-medium text-[#1a1f1e] placeholder:text-[#1a1f1e]/30 transition-all duration-200 focus-visible:border-[#C06041] focus-visible:ring-2 focus-visible:ring-[#C06041]/20 ${
                                            errors.email ? 'border-rose-500 focus-visible:ring-rose-500/20' : 'border-[#1a1f1e]/15'
                                        }`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs font-medium text-rose-600 animate-in fade-in-50">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-xs font-semibold uppercase tracking-wider text-[#1a1f1e]/70"
                                >
                                    {t('admin_login.password_label', { defaultValue: 'Mot de passe' })}
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1a1f1e]/40 pointer-events-none" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        placeholder={t('admin_login.password_placeholder', { defaultValue: '••••••••••••' })}
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`h-12 rounded-2xl border bg-white/90 pl-11 pr-11 text-sm font-medium text-[#1a1f1e] placeholder:text-[#1a1f1e]/30 transition-all duration-200 focus-visible:border-[#C06041] focus-visible:ring-2 focus-visible:ring-[#C06041]/20 ${
                                            errors.password ? 'border-rose-500 focus-visible:ring-rose-500/20' : 'border-[#1a1f1e]/15'
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1a1f1e]/40 hover:text-[#1a1f1e] transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-xs font-medium text-rose-600 animate-in fade-in-50">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={processing}
                                className="group relative mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#1a1f1e] text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#C06041] hover:shadow-lg hover:shadow-[#C06041]/20 disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>{t('admin_login.submitting', { defaultValue: 'Connexion en cours…' })}</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{t('admin_login.submit', { defaultValue: 'Se connecter au panel' })}</span>
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center space-y-1">
                        <p className="text-xs text-[#1a1f1e]/40 font-medium">
                            {t('admin_login.footer_note', { defaultValue: 'Plateforme d\'administration sécurisée JuriJob' })}
                        </p>
                        <p className="text-[11px] text-[#1a1f1e]/25">
                            © {new Date().getFullYear()} JuriJob — All rights reserved.
                        </p>
                    </div>
                </div>
            </main>

            {/* Bottom Accent Bar */}
            <footer className="relative z-10 py-4 text-center">
                <div className="mx-auto h-0.5 w-24 rounded-full bg-[#1a1f1e]/10" />
            </footer>
        </div>
    );
}