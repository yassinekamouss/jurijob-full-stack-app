// Components
import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Vérifiez votre email"
            description="Merci de confirmer votre adresse e-mail en cliquant sur le lien que nous venons de vous envoyer par courriel."
        >
            <Head title="Vérification d'email" />

            {/* Intégration du Logo */}
            <div className="flex justify-center mb-6">
                <img
                    src="/images/logo_jurijob.jpg"
                    alt="Logo JuriJob"
                    className="h-20 w-auto object-contain"
                />
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600 bg-green-50 p-3 rounded-md">
                    Un nouveau lien de vérification a été envoyé à l'adresse e-mail
                    que vous avez fournie lors de votre inscription.
                </div>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <div className="text-sm text-gray-600 mb-4">
                            Vous n'avez pas reçu l'email ? Nous pouvons vous en envoyer un autre.
                        </div>

                        <Button disabled={processing} variant="secondary" className="w-full">
                            {processing && <Spinner className="mr-2" />}
                            Renvoyer l'e-mail de vérification
                        </Button>

                        <div className="pt-4 border-t border-gray-100">
                            <TextLink
                                href={logout()}
                                className="mx-auto block text-sm text-gray-500 hover:text-gray-800"
                            >
                                Se déconnecter
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}