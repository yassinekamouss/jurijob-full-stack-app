import { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    FileText, 
    Globe, 
    UserCheck, 
    ClipboardList, 
    Mail, 
    CheckCircle2, 
    Clock, 
    ShieldCheck, 
    ArrowRight,
    Sparkles
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/home/Reveal';

export default function Services() {
    useEffect(() => {
        const link = document.createElement('link');
        link.href =
            'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    return (
        <>
            <Head>
                <title>Nos Prestations & Services - JURIJOB</title>
                <meta
                    name="description"
                    content="Découvrez les prestations et services JURIJOB & Sentissi Legal Advisory : short-list de profils juridiques, contrats sur mesure, recrutement d'étrangers, évaluation d'entretiens et fiches de poste."
                />
            </Head>

            <div
                className="relative flex min-h-screen flex-col overflow-clip bg-[#FDFCF8] text-[#1a1f1e]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
            >
                <Header />

                <main className="w-full flex-1 pb-24 pt-12">
                    {/* Hero Section */}
                    <section className="relative py-12 lg:py-16">
                        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
                            <Reveal direction="down">
                                <div className="inline-flex items-center gap-2 border border-[#C06041]/20 bg-[#C06041]/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#C06041] uppercase mb-4">
                                    Nos prestations
                                </div>
                                <h1
                                    className="text-4xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl"
                                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                >
                                    Nos <span className="text-[#C06041]">services</span>
                                </h1>
                                <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                                    Au-delà de la mise en relation, JURIJOB et Sentissi Legal Advisory vous accompagnent à chaque étape de votre recrutement juridique.
                                </p>
                            </Reveal>
                        </div>
                    </section>

                    <div className="mx-auto max-w-6xl px-6 lg:px-8 space-y-24">
                        {/* Offre principale: Split-Layout (7 cols / 5 cols) */}
                        <section className="relative">
                            <Reveal delay={0.1}>
                                <div className="mb-8 border-b border-[#1a1f1e]/10 pb-4">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-[#C06041] mb-1">
                                        Solution sur mesure
                                    </div>
                                    <h2
                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl lg:text-4xl"
                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                    >
                                        Notre <span className="text-[#C06041]">offre principale</span>
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                    {/* Left Column: Description & Value Props (7 cols) */}
                                    <div className="lg:col-span-7 space-y-6">
                                        <div className="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-8 space-y-6">
                                            <div className="flex flex-wrap items-center justify-between gap-3">
                                                <h3
                                                    className="text-2xl font-normal text-[#1a1f1e]"
                                                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                >
                                                    La short-list de profils juridiques
                                                </h3>
                                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C06041] bg-[#C06041]/10 px-3 py-1">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    Livraison sous 48h ouvrées
                                                </span>
                                            </div>

                                            <p className="text-base font-light leading-relaxed text-[#1a1f1e]/80">
                                                Le cœur de JURIJOB : vous sélectionnez les critères du profil recherché — spécialisation, expérience, diplôme, langues — et le nombre de profils souhaité, et nous vous livrons une short-list de juristes présélectionnés et scorés, sous 48 heures ouvrées.
                                            </p>

                                            <div className="flex items-start gap-3 border-y border-[#1a1f1e]/10 py-4 text-sm text-[#1a1f1e]/85 font-light bg-[#1a1f1e]/[0.02] px-4">
                                                <ShieldCheck className="h-5 w-5 text-[#C06041] shrink-0 mt-0.5" />
                                                <span>
                                                    Chaque short-list est validée manuellement par un ex-Directeur juridique. Vous gardez la main sur l'entretien et la décision finale.
                                                </span>
                                            </div>

                                            {/* Key Highlights Pills */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                                                <div className="border border-[#1a1f1e]/10 p-3.5 bg-[#FDFCF8]">
                                                    <div className="font-semibold text-xs text-[#1a1f1e] flex items-center gap-1.5">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-[#C06041]" />
                                                        Sans abonnement
                                                    </div>
                                                    <div className="mt-1 text-[11px] text-[#1a1f1e]/70 font-light">
                                                        Vous ne payez que les profils reçus.
                                                    </div>
                                                </div>

                                                <div className="border border-[#1a1f1e]/10 p-3.5 bg-[#FDFCF8]">
                                                    <div className="font-semibold text-xs text-[#1a1f1e] flex items-center gap-1.5">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-[#C06041]" />
                                                        Sans commission
                                                    </div>
                                                    <div className="mt-1 text-[11px] text-[#1a1f1e]/70 font-light">
                                                        Aucun pourcentage prélevé sur le salaire.
                                                    </div>
                                                </div>

                                                <div className="border border-[#1a1f1e]/10 p-3.5 bg-[#FDFCF8]">
                                                    <div className="font-semibold text-xs text-[#1a1f1e] flex items-center gap-1.5">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-[#C06041]" />
                                                        Sans engagement
                                                    </div>
                                                    <div className="mt-1 text-[11px] text-[#1a1f1e]/70 font-light">
                                                        Demande ponctuelle ou récurrente.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column: Floating Pricing Card (5 cols) */}
                                    <div className="lg:col-span-5 relative lg:-mt-2">
                                        <div className="border-2 border-[#1a1f1e] bg-[#FDFCF8] p-8 shadow-xl relative z-10 space-y-6">
                                            <div className="flex items-center justify-between border-b border-[#1a1f1e]/10 pb-4">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                    Tarification Transparente
                                                </span>
                                                <span className="text-[11px] font-medium text-[#1a1f1e]/60 bg-[#1a1f1e]/5 px-2.5 py-0.5">
                                                    Paiement après livraison
                                                </span>
                                            </div>

                                            <div>
                                                <div className="text-4xl font-bold text-[#1a1f1e] tracking-tight">
                                                    1 490 MAD <span className="text-sm font-normal text-[#1a1f1e]/60">HT</span>
                                                </div>
                                                <div className="text-xs text-[#1a1f1e]/70 mt-1 font-light">
                                                    par profil livré · soit <strong className="font-medium text-[#1a1f1e]">1 788 MAD TTC</strong>
                                                </div>
                                            </div>

                                            <div className="space-y-2.5 text-xs text-[#1a1f1e]/80 font-light bg-[#1a1f1e]/[0.03] p-4 border-l-2 border-[#C06041]">
                                                <p>
                                                    • Le montant total vous est communiqué avant tout paiement. Si aucun profil de la CVthèque ne correspond à vos critères, aucune short-list n'est livrée et rien ne vous est facturé.
                                                </p>
                                                <p>
                                                    • Une tarification préférentielle s'applique à partir de <strong>cinq profils</strong>. Écrivez-nous pour un devis adapté à vos volumes.
                                                </p>
                                            </div>

                                            <div className="pt-2">
                                                <a
                                                    href="mailto:recrutement@sentissilegal.com"
                                                    className="w-full inline-flex items-center justify-center gap-2 bg-[#1a1f1e] px-6 py-3.5 text-sm font-medium text-[#FDFCF8] transition-colors hover:bg-[#343a38]"
                                                >
                                                    <Mail className="h-4 w-4 text-[#C06041]" />
                                                    <span>Demander un devis sur mesure</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </section>

                        {/* Services complémentaires: Bento Box Layout (Asymmetric Grid) */}
                        <section className="relative pt-4">
                            <Reveal delay={0.15}>
                                <div className="mb-8 border-b border-[#1a1f1e]/10 pb-4">
                                    <div className="text-xs font-semibold uppercase tracking-wider text-[#C06041] mb-1">
                                        Pour aller plus loin
                                    </div>
                                    <h2
                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl lg:text-4xl"
                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                    >
                                        Services <span className="text-[#C06041]">complémentaires</span>
                                    </h2>
                                </div>

                                {/* Bento Grid (7 / 5 asymmetric structure) */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                    {/* Bento Tile 1 (Span 7) - International Focus */}
                                    <div className="lg:col-span-7 border border-[#C06041]/30 bg-[#FDFCF8] p-8 space-y-4 relative overflow-hidden group hover:border-[#C06041]/60 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-11 w-11 items-center justify-center bg-[#C06041]/10 text-[#C06041]">
                                                <Globe className="h-6 w-6" />
                                            </div>
                                            <span className="text-xs font-medium uppercase tracking-wider text-[#C06041] bg-[#C06041]/10 px-2.5 py-1">
                                                Service International
                                            </span>
                                        </div>
                                        <h3
                                            className="text-2xl font-normal text-[#1a1f1e]"
                                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                        >
                                            Prise en charge du recrutement de profils étrangers
                                        </h3>
                                        <p className="text-sm font-light leading-relaxed text-[#1a1f1e]/80">
                                            Vous souhaitez recruter un talent non-marocain ? Nous prenons en charge l'intégralité des démarches liées à l'embauche de profils étrangers au Maroc : vous nous confiez le dossier, nous nous en occupons de bout en bout, jusqu'à sa finalisation.
                                        </p>
                                    </div>

                                    {/* Bento Tile 2 (Span 5) - Contrats sur mesure */}
                                    <div className="lg:col-span-5 border border-[#1a1f1e]/10 bg-[#FDFCF8] p-8 space-y-4 hover:border-[#1a1f1e]/30 transition-colors">
                                        <div className="flex h-11 w-11 items-center justify-center bg-[#C06041]/10 text-[#C06041]">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <h3
                                            className="text-2xl font-normal text-[#1a1f1e]"
                                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                        >
                                            Rédaction de contrats de travail sur mesure
                                        </h3>
                                        <p className="text-sm font-light leading-relaxed text-[#1a1f1e]/80">
                                            Nous rédigeons des contrats de travail personnalisés, adaptés à chaque poste et à votre contexte, dans le respect de la législation sociale en vigueur au Maroc.
                                        </p>
                                    </div>

                                    {/* Bento Tile 3 (Span 5) - Évaluation entretiens */}
                                    <div className="lg:col-span-5 border border-[#1a1f1e]/10 bg-[#FDFCF8] p-8 space-y-4 hover:border-[#1a1f1e]/30 transition-colors">
                                        <div className="flex h-11 w-11 items-center justify-center bg-[#C06041]/10 text-[#C06041]">
                                            <UserCheck className="h-6 w-6" />
                                        </div>
                                        <h3
                                            className="text-2xl font-normal text-[#1a1f1e]"
                                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                        >
                                            Participation et évaluation des entretiens
                                        </h3>
                                        <p className="text-sm font-light leading-relaxed text-[#1a1f1e]/80">
                                            Nos experts peuvent assister à vos entretiens d'embauche et évaluer chaque candidat selon une grille d'appréciation rigoureuse, pour sécuriser et objectiver votre décision finale.
                                        </p>
                                    </div>

                                    {/* Bento Tile 4 (Span 7) - Préparation fiche de poste */}
                                    <div className="lg:col-span-7 border border-[#1a1f1e]/10 bg-[#FDFCF8] p-8 space-y-4 hover:border-[#1a1f1e]/30 transition-colors">
                                        <div className="flex h-11 w-11 items-center justify-center bg-[#C06041]/10 text-[#C06041]">
                                            <ClipboardList className="h-6 w-6" />
                                        </div>
                                        <h3
                                            className="text-2xl font-normal text-[#1a1f1e]"
                                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                        >
                                            Préparation de la fiche de poste
                                        </h3>
                                        <p className="text-sm font-light leading-relaxed text-[#1a1f1e]/80">
                                            En amont du recrutement, nous vous aidons à définir précisément votre besoin et à construire une fiche de poste claire et structurée — la base d'une recherche efficace.
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        </section>

                        {/* Banner CTA contact: Full-Width overlap */}
                        <Reveal delay={0.2}>
                            <div className="mt-16 border-y border-[#1a1f1e]/10 bg-[#FDFCF8] p-10 text-center sm:p-12 w-screen relative left-1/2 -translate-x-1/2">
                                <div className="max-w-2xl mx-auto space-y-4">
                                    <h3
                                        className="text-3xl font-normal text-[#1a1f1e] sm:text-4xl"
                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                    >
                                        Un besoin <span className="text-[#C06041]">spécifique ?</span>
                                    </h3>
                                    <p className="text-sm font-light text-[#1a1f1e]/75 sm:text-base leading-relaxed">
                                        Chaque prestation est adaptée à votre contexte et fait l'objet d'un devis personnalisé. Écrivez-nous pour en discuter.
                                    </p>
                                    <div className="pt-2">
                                        <a
                                            href="mailto:recrutement@sentissilegal.com"
                                            className="inline-flex items-center gap-2.5 bg-[#1a1f1e] px-7 py-3.5 text-sm font-medium text-[#FDFCF8] transition-colors hover:bg-[#343a38]"
                                        >
                                            <Mail className="h-4 w-4 text-[#C06041]" />
                                            <span>recrutement@sentissilegal.com</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
