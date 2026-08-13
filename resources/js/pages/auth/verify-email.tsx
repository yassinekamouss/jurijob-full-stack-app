import { Form, Head, Link } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Spinner } from '@/components/ui/spinner';
import { home, logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {


    return (
        <div
            className="relative flex min-h-svh flex-col items-center justify-center overflow-clip bg-[#FDFCF8] px-4 py-10 text-[#1a1f1e]"
            style={{ fontFamily: "'Outfit', sans-serif" }}
        >
            <Head title="Vérification d'email" />

            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                <div className="absolute -top-[12%] -right-[18%] h-[55%] w-[45%] rounded-full bg-[#E5D5C5] opacity-30 blur-[120px]" />
                <div className="absolute -bottom-[18%] -left-[12%] h-[55%] w-[45%] rounded-full bg-[#E5D5C5] opacity-20 blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-md border border-[#1a1f1e]/10 bg-white/70 p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-10">
                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-[#1a1f1e] to-transparent opacity-20" />

                <div className="flex flex-col items-center text-center">
                    <Link href={home()} className="inline-flex items-center justify-center">
                        <img
                            src="/images/logo_jurijob.png"
                            alt="JuriJob - Logo"
                            width={100}
                            height={100}
                            className="w-auto h-32"
                        />
                    </Link>

                    <h1
                        className="mt-2 text-3xl font-medium tracking-tight text-[#1a1f1e]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        Vérifiez votre email
                    </h1>

                    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-[#1a1f1e]/65">
                        Un lien de confirmation vient d’être envoyé. Ouvrez votre boîte mail et
                        cliquez sur le lien pour activer votre compte.
                    </p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        Un nouveau lien de vérification a été envoyé à votre adresse e-mail.
                    </div>
                )}

                <Form
                        action={send()}
                        method="post"
                        className="mt-6 space-y-4"
                    >
                    {({ processing }) => (
                        <>
                            <p className="text-center text-sm text-[#1a1f1e]/55">
                                Vous n’avez rien reçu ? Vérifiez vos spams, ou renvoyez le lien.
                            </p>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1f1e] px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition-all hover:bg-[#1a1f1e]/90 disabled:cursor-wait disabled:opacity-60"
                            >
                                {processing && <Spinner />}
                                Renvoyer l’e-mail
                            </button>

                            <div className="border-t border-[#1a1f1e]/8 pt-4 text-center">
                                <TextLink
                                    href={logout()}
                                    className="text-sm font-medium text-[#1a1f1e]/50 underline-offset-4 hover:text-[#1a1f1e] hover:underline"
                                >
                                    Se déconnecter
                                </TextLink>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
