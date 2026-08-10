import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    ShoppingBag,
    BookOpen,
    FileCheck,
    Coins,
    Truck,
    CreditCard,
    RotateCcw,
    ShieldAlert,
    Lock,
    Scale,
    FileText,
    Check,
    Copy,
    ArrowUpRight,
    Sparkles,
    AlertCircle,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/home/Reveal';

interface CgvArticle {
    id: string;
    num: string;
    title: string;
}

const articles: CgvArticle[] = [
    { id: 'article-1', num: 'Article 1', title: 'Objet' },
    { id: 'article-2', num: 'Article 2', title: 'Prestation : la short-list' },
    { id: 'article-3', num: 'Article 3', title: 'Prix et Tarification' },
    { id: 'article-4', num: 'Article 4', title: 'Commande et livraison' },
    { id: 'article-5', num: 'Article 5', title: 'Modalités de paiement' },
    { id: 'article-6', num: 'Article 6', title: 'Annulation et rétractation' },
    { id: 'article-7', num: 'Article 7', title: 'Absence de garantie de résultat' },
    { id: 'article-8', num: 'Article 8', title: 'Utilisation des profils livrés' },
    { id: 'article-9', num: 'Article 9', title: 'Responsabilité' },
    { id: 'article-10', num: 'Article 10', title: 'Facturation et données personnelles' },
    { id: 'article-11', num: 'Article 11', title: 'Droit applicable et litiges' },
];

export default function Cgv() {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [activeSection, setActiveSection] = useState('article-1');

    useEffect(() => {
        const fontLink = document.createElement('link');
        fontLink.href =
            'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (const article of articles) {
                const element = document.getElementById(article.id);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(article.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const scrollToArticle = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <>
            <Head>
                <title>Conditions Générales de Vente (CGV) - JURIJOB</title>
                <meta
                    name="description"
                    content="Conditions Générales de Vente de JURIJOB : tarifs, commande, livraison de la short-list, paiement par virement, annulation et cadre légal."
                />
            </Head>

            <div
                className="relative flex min-h-screen flex-col overflow-clip bg-[#FDFCF8] text-[#1a1f1e]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
            >
                <Header />

                <main className="w-full flex-1 pb-24 pt-10 sm:pt-14">
                    {/* Hero Section */}
                    <section className="relative border-b border-[#1a1f1e]/10 pb-12 pt-6 sm:pb-16 lg:pb-20">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <Reveal direction="down">
                                <div className="mx-auto max-w-3xl text-center">
                                    <div className="inline-flex items-center gap-2 border border-[#C06041]/30 bg-[#C06041]/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#C06041]">
                                        <ShoppingBag className="h-3.5 w-3.5" />
                                        Prestations Payantes & Recruteurs
                                    </div>

                                    <h1
                                        className="mt-6 text-4xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl"
                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                    >
                                        Conditions Générales <span className="italic text-[#C06041]">de Vente</span>
                                    </h1>

                                    <p className="mt-4 text-base font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                                        Les conditions applicables aux prestations payantes de JURIJOB, destinées aux recruteurs professionnels.
                                    </p>

                                    <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-[#1a1f1e]/50">
                                        <span>Dernière mise à jour : août 2026</span>
                                        <span>•</span>
                                        <span>Droit Commercial Marocain</span>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </section>

                    {/* Main Content Layout with Sticky Sidebar Navigation */}
                    <div className="mx-auto max-w-7xl px-6 pt-12 lg:px-8">
                        <div className="grid gap-12 lg:grid-cols-12">
                            {/* Sticky Table of Contents Sidebar */}
                            <aside className="hidden lg:block lg:col-span-4">
                                <div className="sticky top-28 space-y-6 border border-[#1a1f1e]/10 bg-[#FDFCF8] p-6 shadow-sm">
                                    <div>
                                        <h3
                                            className="text-lg font-normal text-[#1a1f1e]"
                                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                        >
                                            Sommaire interactif
                                        </h3>
                                        <p className="text-xs font-light text-[#1a1f1e]/60">
                                            Table des articles des CGV
                                        </p>
                                    </div>

                                    <nav className="space-y-1">
                                        {articles.map((art) => {
                                            const isActive = activeSection === art.id;
                                            return (
                                                <button
                                                    key={art.id}
                                                    onClick={() => scrollToArticle(art.id)}
                                                    className={`group flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-all ${
                                                        isActive
                                                            ? 'bg-[#1a1f1e] text-[#FDFCF8] font-medium shadow-sm'
                                                            : 'text-[#1a1f1e]/70 hover:bg-[#1a1f1e]/5 hover:text-[#1a1f1e]'
                                                    }`}
                                                >
                                                    <span className="truncate">
                                                        <span className="mr-1.5 font-serif text-[#C06041]">
                                                            {art.num}
                                                        </span>
                                                        {art.title}
                                                    </span>
                                                    <ArrowUpRight
                                                        className={`h-3.5 w-3.5 shrink-0 transition-transform ${
                                                            isActive
                                                                ? 'opacity-100 text-[#C06041]'
                                                                : 'opacity-0 group-hover:opacity-70'
                                                        }`}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </nav>

                                    <div className="border-t border-[#1a1f1e]/10 pt-4">
                                        <div className="bg-[#1a1f1e]/5 p-4 text-xs">
                                            <p className="font-semibold text-[#1a1f1e]">Une question sur votre commande ?</p>
                                            <p className="mt-1 text-[#1a1f1e]/70">
                                                Contactez notre équipe dédiée aux recruteurs :
                                            </p>
                                            <button
                                                onClick={() => copyToClipboard('recrutement@sentissilegal.com')}
                                                className="mt-3 flex w-full items-center justify-center gap-2 border border-[#1a1f1e]/20 bg-[#FDFCF8] px-3 py-1.5 text-xs font-medium text-[#1a1f1e] hover:border-[#1a1f1e]"
                                            >
                                                {copiedEmail ? (
                                                    <>
                                                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                                                        <span>Copié dans le presse-papier</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="h-3.5 w-3.5 text-[#C06041]" />
                                                        <span>recrutement@sentissilegal.com</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </aside>

                            {/* CGV Articles Content */}
                            <div className="space-y-16 lg:col-span-8">
                                {/* Article 1: Objet */}
                                <section id="article-1" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <BookOpen className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 1
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Objet
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                                                <p>
                                                    Les présentes Conditions Générales de Vente (ci-après les « <strong className="font-semibold text-[#1a1f1e]">CGV</strong> ») régissent les prestations payantes proposées par <strong className="font-semibold text-[#1a1f1e]">SENTISSI LEGAL ADVISORY SARL AU</strong> (ci-après « SLA ») aux recruteurs professionnels via la plateforme JURIJOB.
                                                </p>
                                                <p>
                                                    Elles complètent les <Link href="/cgu" className="font-medium text-[#C06041] underline underline-offset-4">Conditions Générales d'Utilisation</Link>, auxquelles elles ne dérogent pas. En cas de contradiction, les présentes CGV prévalent pour tout ce qui concerne les prestations payantes.
                                                </p>
                                                <div className="border-l-4 border-[#C06041] bg-[#1a1f1e]/5 p-4 font-medium text-[#1a1f1e]">
                                                    Toute commande emporte acceptation pleine et entière des présentes CGV.
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 2: Prestation : la short-list de profils juridiques */}
                                <section id="article-2" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <FileCheck className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 2
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Prestation : la short-list de profils juridiques
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                                                <p>
                                                    La prestation principale consiste en la livraison d'une short-list de profils juridiques présélectionnés, établie en réponse aux critères définis par le recruteur : <span className="italic">spécialisations, niveau d'expérience, diplôme, langues et modalité de travail</span>.
                                                </p>
                                                <p>
                                                    Chaque profil est évalué au moyen d'un algorithme de scoring propriétaire portant sur quatre dimensions, puis la sélection est validée manuellement avant transmission.
                                                </p>

                                                <div className="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-3">
                                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Contenu du livrable pour chaque profil
                                                    </h3>
                                                    <ul className="grid gap-2 sm:grid-cols-2 text-xs sm:text-sm text-[#1a1f1e]/80">
                                                        <li className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 bg-[#C06041]" />
                                                            Identité et coordonnées du candidat
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 bg-[#C06041]" />
                                                            Parcours complet de formation
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 bg-[#C06041]" />
                                                            Expériences professionnelles détaillées
                                                        </li>
                                                        <li className="flex items-center gap-2">
                                                            <div className="h-1.5 w-1.5 bg-[#C06041]" />
                                                            Spécialisations & compétences linguistiques
                                                        </li>
                                                    </ul>
                                                </div>

                                                <p className="text-xs text-[#1a1f1e]/70 italic">
                                                    La prestation ne comprend ni la conduite des entretiens, ni l'évaluation approfondie des candidats, ni aucune garantie d'embauche. Ces prestations peuvent faire l'objet de services complémentaires distincts, sur devis.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 3: Prix */}
                                <section id="article-3" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Coins className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 3
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Prix et Tarification
                                                    </h2>
                                                </div>
                                            </div>

                                            {/* Pricing Card Highlight */}
                                            <div className="border border-[#1a1f1e] bg-[#FDFCF8] p-6 shadow-md space-y-4">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#1a1f1e]/10 pb-4">
                                                    <div>
                                                        <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                            Tarif unitaire réglementé
                                                        </span>
                                                        <div className="text-3xl font-bold text-[#1a1f1e] mt-1">
                                                            1 490 MAD <span className="text-sm font-normal text-[#1a1f1e]/60">HT / profil</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-medium text-[#1a1f1e]/70">
                                                        Soit <strong className="text-[#1a1f1e] font-semibold">1 788 MAD TTC</strong> (TVA 20%)
                                                    </div>
                                                </div>

                                                <p className="text-sm leading-relaxed text-[#1a1f1e]/85">
                                                    Le montant total dû correspond au prix unitaire multiplié par le nombre de profils effectivement composant la short-list livrée. Ce montant est affiché au recruteur avant tout engagement de paiement.
                                                </p>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    Des conditions tarifaires spécifiques peuvent être consenties pour les besoins récurrents ou les volumes importants. Elles sont communiquées directement au recruteur et font l'objet d'un accord distinct.
                                                </p>
                                                <p>
                                                    Les prix sont susceptibles d'évoluer ; le tarif applicable est celui en vigueur au jour de la livraison de la short-list.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 4: Commande et livraison */}
                                <section id="article-4" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Truck className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 4
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Commande et livraison
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    Le recruteur dépose sa demande depuis son espace personnel en précisant ses critères et le nombre de profils souhaité.
                                                </p>
                                                <p>
                                                    SLA s'engage à livrer la short-list dans un délai indicatif de <strong className="font-semibold text-[#1a1f1e]">48 heures ouvrées</strong> à compter de la validation de la demande, sous réserve que la CVthèque comporte des profils correspondant aux critères exprimés.
                                                </p>

                                                <div className="border border-[#C06041]/30 bg-[#C06041]/5 p-5 space-y-2">
                                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        <AlertCircle className="h-4 w-4" />
                                                        Garantie 0 MAD en cas d'absence de correspondance
                                                    </div>
                                                    <p className="text-xs sm:text-sm leading-relaxed text-[#1a1f1e]/85">
                                                        Lorsque aucun profil ne correspond aux critères, aucune short-list n'est livrée et aucune somme n'est due. SLA en informe le recruteur et peut lui proposer une prestation complémentaire de recherche directe, sur devis séparé.
                                                    </p>
                                                </div>

                                                <p>
                                                    Le nombre de profils livrés peut être inférieur au nombre demandé si la CVthèque ne permet pas de constituer une sélection pertinente. Le montant facturé est alors ajusté au nombre de profils effectivement livrés.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 5: Modalités de paiement */}
                                <section id="article-5" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <CreditCard className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 5
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Modalités de paiement
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                                                <p>
                                                    Le paiement s'effectue par <strong className="font-semibold text-[#1a1f1e]">virement bancaire</strong> sur le compte de SENTISSI LEGAL ADVISORY, dont les coordonnées et la référence de virement sont communiquées au recruteur au moment de la commande.
                                                </p>
                                                <p>
                                                    Le recruteur signale son virement depuis son espace personnel. L'accès aux profils est débloqué après vérification et confirmation de la réception des fonds par SLA, généralement sous 24 heures ouvrées.
                                                </p>

                                                <div className="border-t border-[#1a1f1e]/10 pt-4 space-y-2">
                                                    <p className="text-xs sm:text-sm text-[#1a1f1e]/80">
                                                        Tant que le paiement n'a pas été confirmé, les profils composant la short-list demeurent inaccessibles au recruteur. Le défaut de paiement n'entraîne aucune pénalité : la short-list reste simplement verrouillée et devient caduque.
                                                    </p>
                                                    <p className="text-xs font-medium text-[#C06041]">
                                                        * La référence de virement indiquée doit impérativement être reportée lors du transfert, à défaut de quoi le rapprochement du paiement ne peut être garanti.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 6: Annulation et rétractation */}
                                <section id="article-6" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <RotateCcw className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 6
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Annulation et rétractation
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    Le recruteur peut retirer sa demande à tout moment, tant qu'aucun paiement n'a été effectué, sans frais ni justification, en informant SLA à l'adresse{' '}
                                                    <a href="mailto:recrutement@sentissilegal.com" className="font-medium text-[#C06041] underline underline-offset-2">
                                                        recrutement@sentissilegal.com
                                                    </a>.
                                                </p>
                                                <p>
                                                    Une fois le paiement confirmé et l'accès aux profils débloqué, la prestation est réputée exécutée. Les services étant fournis à des professionnels agissant dans le cadre de leur activité, et l'accès aux contenus débutant dès la confirmation du paiement, le droit de rétractation ne trouve pas à s'appliquer.
                                                </p>
                                                <p>
                                                    Aucun remboursement ne peut être demandé au motif qu'aucun candidat de la short-list n'aurait été retenu à l'issue des entretiens. Le recruteur reconnaît que la prestation porte sur l'identification et la livraison de profils qualifiés, et non sur le résultat du recrutement.
                                                </p>
                                            </div>

                                            {/* À retenir Banner */}
                                            <div className="border-l-4 border-[#C06041] border-y border-r border-[#1a1f1e]/15 bg-[#1a1f1e] p-6 text-[#FDFCF8] shadow-md">
                                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C06041]">
                                                    <Sparkles className="h-4 w-4" />
                                                    À retenir
                                                </div>
                                                <p className="mt-2 text-base font-medium leading-relaxed sm:text-lg">
                                                    Le recruteur connaît le nombre de profils et le montant total avant de payer. Le paiement n'intervient donc jamais à l'aveugle.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 7: Absence de garantie de résultat */}
                                <section id="article-7" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <ShieldAlert className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 7
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Absence de garantie de résultat
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    SLA est tenue à une <strong className="font-semibold text-[#1a1f1e]">obligation de moyens</strong> et non de résultat. La prestation consiste à identifier et livrer des profils correspondant aux critères exprimés.
                                                </p>
                                                <p>
                                                    SLA ne garantit ni l'embauche d'un candidat, ni son acceptation d'une proposition, ni sa disponibilité effective à la date souhaitée, ni le maintien de sa candidature.
                                                </p>
                                                <p>
                                                    Les informations composant les profils sont déclarées par les candidats sous leur seule responsabilité. Il appartient au recruteur de procéder aux vérifications qu'il juge nécessaires, notamment quant aux diplômes et aux expériences déclarés.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 8: Utilisation des profils livrés */}
                                <section id="article-8" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Lock className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 8
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Utilisation des profils livrés
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                                                <p>
                                                    Les profils livrés sont destinés au seul processus de recrutement au titre duquel la short-list a été commandée.
                                                </p>
                                                <div className="border border-[#1a1f1e]/10 bg-[#1a1f1e]/5 p-4 text-xs sm:text-sm font-medium text-[#1a1f1e] space-y-2">
                                                    <strong className="text-[#C06041] uppercase tracking-wider block text-xs">Interdictions strictes :</strong>
                                                    <ul className="list-disc list-inside space-y-1 font-normal text-[#1a1f1e]/80">
                                                        <li>Extraction massive de données</li>
                                                        <li>Conservation des profils dans une base interne au-delà du processus concerné</li>
                                                        <li>Revente, cession ou communication à un tiers</li>
                                                        <li>Réutilisation pour un poste distinct sans nouvelle commande</li>
                                                    </ul>
                                                </div>
                                                <p className="text-xs text-[#1a1f1e]/70">
                                                    Tout manquement engage la responsabilité du recruteur et peut donner lieu à la suspension immédiate de son accès, sans préjudice de toute action ultérieure.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 9: Responsabilité */}
                                <section id="article-9" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Scale className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 9
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Limitation de responsabilité
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    La responsabilité de SLA, si elle venait à être engagée, ne saurait excéder le <strong className="font-semibold text-[#1a1f1e]">montant effectivement réglé</strong> par le recruteur au titre de la prestation concernée.
                                                </p>
                                                <p>
                                                    SLA ne saurait être tenue responsable des dommages indirects, notamment de la perte d'exploitation, de la perte de chance ou du préjudice commercial résultant d'un recrutement non abouti.
                                                </p>
                                                <p className="text-xs text-[#1a1f1e]/70 italic">
                                                    SLA s'efforce d'assurer la disponibilité de la Plateforme sans garantir une accessibilité ininterrompue.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 10: Facturation et données personnelles */}
                                <section id="article-10" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <FileText className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 10
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Facturation et données personnelles
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    Une facture est établie pour chaque prestation et adressée au recruteur à l'adresse électronique associée à son compte.
                                                </p>
                                                <p>
                                                    Le traitement des données personnelles est effectué conformément à la <strong className="font-semibold text-[#1a1f1e]">loi 09-08</strong> et aux <Link href="/mentions-legales" className="font-medium text-[#C06041] underline underline-offset-2">mentions légales</Link> de la Plateforme.
                                                </p>
                                                <p className="border border-[#1a1f1e]/10 bg-[#1a1f1e]/5 p-4 text-xs sm:text-sm text-[#1a1f1e]/85">
                                                    Le recruteur, en sa qualité de destinataire de données personnelles de candidats, s'engage à en assurer la confidentialité et à n'en faire usage que pour la finalité de recrutement prévue.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 11: Droit applicable et litiges */}
                                <section id="article-11" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Scale className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 11
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Droit applicable et litiges
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 space-y-4 shadow-sm">
                                                <p className="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                                                    Les présentes CGV sont régies par le <strong className="font-semibold text-[#1a1f1e]">droit marocain</strong>.
                                                </p>
                                                <p className="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                                                    Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des <strong className="font-semibold text-[#1a1f1e]">tribunaux de Casablanca</strong>, à défaut de résolution amiable préalable.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
