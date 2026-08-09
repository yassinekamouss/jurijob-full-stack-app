import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    Server,
    ShieldCheck,
    Scale,
    Lock,
    FileText,
    Mail,
    MapPin,
    Hash,
    UserCheck,
    Globe,
    CheckCircle2,
    ArrowUpRight,
    Copy,
    Check,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/home/Reveal';

interface LegalArticle {
    id: string;
    num: string;
    title: string;
}

const articles: LegalArticle[] = [
    { id: 'article-1', num: 'Article 1', title: 'Éditeur du site' },
    { id: 'article-2', num: 'Article 2', title: 'Hébergement' },
    { id: 'article-3', num: 'Article 3', title: 'Propriété intellectuelle' },
    { id: 'article-4', num: 'Article 4', title: 'Traitement des données personnelles' },
    { id: 'article-5', num: 'Article 5', title: 'Responsabilité' },
    { id: 'article-6', num: 'Article 6', title: 'Droit applicable' },
];

export default function MentionsLegales() {
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
                <title>Mentions Légales & Informations Juridiques - JURIJOB</title>
                <meta
                    name="description"
                    content="Mentions légales de JURIJOB : éditeur Sentissi Legal Advisory (SLA), hébergement, protection des données personnelles (CNDP, loi 09-08) et propriété intellectuelle."
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
                                        <ShieldCheck className="h-3.5 w-3.5" />
                                        Cadre Réglementaire & Transparence
                                    </div>

                                    <h1
                                        className="mt-6 text-4xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl"
                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                    >
                                        Informations <span className="italic text-[#C06041]">Juridiques</span>
                                    </h1>

                                    <p className="mt-4 text-base font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                                        Mentions légales, informations relatives à l'éditeur, à l'hébergement et aux engagements de protection des données personnelles de la plateforme JURIJOB.
                                    </p>

                                    <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-[#1a1f1e]/50">
                                        <span>Dernière mise à jour : août 2026</span>
                                        <span>•</span>
                                        <span>Conforme Droit Marocain</span>
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
                                            Accès rapide aux articles légaux
                                        </p>
                                    </div>

                                    <nav className="space-y-1.5">
                                        {articles.map((art) => {
                                            const isActive = activeSection === art.id;
                                            return (
                                                <button
                                                    key={art.id}
                                                    onClick={() => scrollToArticle(art.id)}
                                                    className={`group flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm transition-all ${
                                                        isActive
                                                            ? 'bg-[#1a1f1e] text-[#FDFCF8] font-medium shadow-sm'
                                                            : 'text-[#1a1f1e]/70 hover:bg-[#1a1f1e]/5 hover:text-[#1a1f1e]'
                                                    }`}
                                                >
                                                    <span className="truncate">
                                                        <span
                                                            className={`mr-2 font-serif ${
                                                                isActive ? 'text-[#C06041]' : 'text-[#C06041]'
                                                            }`}
                                                        >
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
                                            <p className="font-semibold text-[#1a1f1e]">Besoin d'assistance juridique ?</p>
                                            <p className="mt-1 text-[#1a1f1e]/70">
                                                Pour toute demande de clarification réglementaire :
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

                            {/* Legal Articles Content */}
                            <div className="space-y-16 lg:col-span-8">
                                {/* Article 1: Éditeur du site */}
                                <section id="article-1" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Building2 className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 1
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Éditeur du site
                                                    </h2>
                                                </div>
                                            </div>

                                            <p className="text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                Le site <a href="https://www.jurijob.ma" target="_blank" rel="noopener noreferrer" className="font-medium text-[#C06041] underline underline-offset-4 hover:opacity-80">www.jurijob.ma</a> et la plateforme <strong className="font-semibold text-[#1a1f1e]">JURIJOB</strong> sont édités par :
                                            </p>

                                            {/* Structured Grid for Corporate Details */}
                                            <div className="grid gap-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm sm:grid-cols-2">
                                                <div className="space-y-1">
                                                    <span className="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">
                                                        Dénomination sociale
                                                    </span>
                                                    <p className="text-base font-semibold text-[#1a1f1e]">
                                                        SENTISSI LEGAL ADVISORY (SLA)
                                                    </p>
                                                </div>

                                                <div className="space-y-1">
                                                    <span className="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">
                                                        Forme juridique
                                                    </span>
                                                    <p className="text-sm font-medium text-[#1a1f1e]">
                                                        Société à responsabilité limitée à associé unique (SARL AU)
                                                    </p>
                                                </div>

                                                <div className="space-y-1">
                                                    <span className="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">
                                                        Capital social
                                                    </span>
                                                    <p className="text-sm font-medium text-[#1a1f1e]">
                                                        10 000 MAD
                                                    </p>
                                                </div>

                                                <div className="space-y-1 sm:col-span-2">
                                                    <span className="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">
                                                        Siège social
                                                    </span>
                                                    <p className="flex items-start gap-2 text-sm font-medium text-[#1a1f1e]">
                                                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C06041]" />
                                                        <span>12, rue Saria Ben Zounaim, étage 3, appartement 3 — Palmier, Casablanca, Maroc</span>
                                                    </p>
                                                </div>

                                                <div className="space-y-1">
                                                    <span className="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">
                                                        Registre du commerce
                                                    </span>
                                                    <p className="flex items-center gap-1.5 text-sm font-medium text-[#1a1f1e]">
                                                        <Hash className="h-3.5 w-3.5 text-[#C06041]" />
                                                        <span>RC n° 641427 — Tribunal de commerce de Casablanca</span>
                                                    </p>
                                                </div>

                                                <div className="space-y-1">
                                                    <span className="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">
                                                        Identifiant commun (ICE)
                                                    </span>
                                                    <p className="text-sm font-medium text-[#1a1f1e]">
                                                        ICE 003569200000033
                                                    </p>
                                                </div>

                                                <div className="space-y-1">
                                                    <span className="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">
                                                        Identifiant fiscal (IF)
                                                    </span>
                                                    <p className="text-sm font-medium text-[#1a1f1e]">
                                                        IF 66067629
                                                    </p>
                                                </div>

                                                <div className="space-y-1">
                                                    <span className="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">
                                                        Responsable de la publication
                                                    </span>
                                                    <p className="flex items-center gap-1.5 text-sm font-medium text-[#1a1f1e]">
                                                        <UserCheck className="h-4 w-4 text-[#C06041]" />
                                                        <span>Mohammed Sentissi, gérant</span>
                                                    </p>
                                                </div>

                                                <div className="space-y-1 sm:col-span-2 pt-2 border-t border-[#1a1f1e]/10">
                                                    <span className="text-xs font-medium uppercase tracking-wider text-[#1a1f1e]/50">
                                                        Contact officiel
                                                    </span>
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <a
                                                            href="mailto:recrutement@sentissilegal.com"
                                                            className="inline-flex items-center gap-2 text-sm font-medium text-[#C06041] hover:underline"
                                                        >
                                                            <Mail className="h-4 w-4" />
                                                            <span>recrutement@sentissilegal.com</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Trademark Callout Card */}
                                            <div className="border border-[#C06041]/20 bg-[#C06041]/5 p-5">
                                                <div className="flex items-start gap-3">
                                                    <Globe className="mt-0.5 h-5 w-5 shrink-0 text-[#C06041]" />
                                                    <div className="text-sm leading-relaxed text-[#1a1f1e]/85">
                                                        <strong className="font-semibold text-[#1a1f1e]">Marque déposée OMPIC :</strong>{' '}
                                                        JURIJOB est une marque déposée auprès de l'OMPIC sous la dénomination{' '}
                                                        <span className="italic font-medium">« JURIJOB — Smart Recrutement Juridique »</span>. La plateforme est exploitée par Sentissi Legal Advisory, également éditrice du site{' '}
                                                        <a
                                                            href="https://www.sentissilegal.com"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="font-medium text-[#C06041] underline underline-offset-2 hover:opacity-80"
                                                        >
                                                            www.sentissilegal.com
                                                        </a>.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 2: Hébergement */}
                                <section id="article-2" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Server className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 2
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Hébergement & Infrastructure
                                                    </h2>
                                                </div>
                                            </div>

                                            <p className="text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                L'infrastructure technique de la plateforme s'appuie sur des partenaires internationaux garantissant haute disponibilité, sécurité et conformité :
                                            </p>

                                            <div className="grid gap-4 sm:grid-cols-3">
                                                <div className="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5">
                                                    <div className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Hébergement Web
                                                    </div>
                                                    <h3 className="mt-1 text-base font-semibold text-[#1a1f1e]">Vercel Inc.</h3>
                                                    <p className="mt-2 text-xs leading-relaxed text-[#1a1f1e]/70">
                                                        Société de droit américain.
                                                        <br />
                                                        340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
                                                    </p>
                                                </div>

                                                <div className="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5">
                                                    <div className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Base de Données
                                                    </div>
                                                    <h3 className="mt-1 text-base font-semibold text-[#1a1f1e]">Supabase Inc.</h3>
                                                    <p className="mt-2 text-xs leading-relaxed text-[#1a1f1e]/70">
                                                        Infrastructure sécurisée pour le stockage et la gestion des données de la plateforme.
                                                    </p>
                                                </div>

                                                <div className="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5">
                                                    <div className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        E-mails Transactionnels
                                                    </div>
                                                    <h3 className="mt-1 text-base font-semibold text-[#1a1f1e]">Resend</h3>
                                                    <p className="mt-2 text-xs leading-relaxed text-[#1a1f1e]/70">
                                                        Acheminement des courriels via serveurs d'envoi situés en Irlande (Union européenne).
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 3: Propriété intellectuelle */}
                                <section id="article-3" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Scale className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 3
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Propriété intellectuelle
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 border-l-4 border-[#C06041] bg-[#1a1f1e]/5 p-6 text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                                                <p>
                                                    L'ensemble des éléments composant le site — structure, textes, graphismes, logo, charte visuelle, base de données et méthodologie de sélection — est protégé par la <strong className="font-semibold text-[#1a1f1e]">loi 2-00</strong> relative aux droits d'auteur et droits voisins, ainsi que par la <strong className="font-semibold text-[#1a1f1e]">loi 17-97</strong> relative à la protection de la propriété industrielle.
                                                </p>
                                                <p>
                                                    Toute reproduction, représentation, extraction ou réutilisation, totale ou partielle, sans autorisation écrite préalable de <strong className="font-semibold text-[#1a1f1e]">Sentissi Legal Advisory</strong>, est strictement interdite.
                                                </p>
                                                <p className="text-xs text-[#1a1f1e]/70 italic border-t border-[#1a1f1e]/10 pt-3">
                                                    * Les contenus déposés par les candidats demeurent leur propriété exclusive ; ceux-ci concèdent à la plateforme une licence d'utilisation limitée aux seules finalités du service.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 4: Traitement des données personnelles */}
                                <section id="article-4" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Lock className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 4
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Traitement des données personnelles (Loi 09-08)
                                                    </h2>
                                                </div>
                                            </div>

                                            <p className="text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                Par le biais de ce formulaire, Mohammed Sentissi collecte vos données personnelles en vue de leur inscription dans la CVthèque JURIJOB, plateforme de sélection de profils juridiques destinée à mettre les candidats en relation avec des recruteurs identifiés au Maroc et en Afrique francophone.
                                            </p>

                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5 space-y-2">
                                                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        <CheckCircle2 className="h-4 w-4" />
                                                        Déclaration CNDP
                                                    </div>
                                                    <p className="text-xs leading-relaxed text-[#1a1f1e]/80">
                                                        Ce traitement a fait l'objet d'une déclaration auprès de la CNDP sous le numéro en cours de traitement par la CNDP. Les données personnelles collectées peuvent être transmises à tous les recruteurs potentiels au Maroc conformément à la demande de transfert déposée auprès de la CNDP.
                                                    </p>
                                                </div>

                                                <div className="border border-[#1a1f1e]/10 bg-[#FDFCF8] p-5 space-y-2">
                                                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        <ShieldCheck className="h-4 w-4" />
                                                        Accès Réservé & Protection
                                                    </div>
                                                    <p className="text-xs leading-relaxed text-[#1a1f1e]/80">
                                                        L'accès aux profils est strictement réservé aux recruteurs dont le paiement a été confirmé. Aucune diffusion publique n'est effectuée. Les données sont conservées tant que le candidat maintient son profil actif ; celui-ci peut le supprimer définitivement à tout moment depuis son espace personnel.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="border border-[#1a1f1e]/15 bg-[#1a1f1e]/5 p-6 space-y-3">
                                                <h4 className="text-sm font-semibold text-[#1a1f1e] uppercase tracking-wider">
                                                    Exercice de vos droits (Loi 09-08)
                                                </h4>
                                                <p className="text-sm leading-relaxed text-[#1a1f1e]/80">
                                                    Vous pouvez vous adresser à{' '}
                                                    <a
                                                        href="mailto:recrutement@sentissilegal.com"
                                                        className="font-medium text-[#C06041] underline underline-offset-2"
                                                    >
                                                        recrutement@sentissilegal.com
                                                    </a>{' '}
                                                    pour exercer vos droits d'accès, de rectification et d'opposition conformément aux dispositions de la loi marocaine 09-08.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 5: Responsabilité */}
                                <section id="article-5" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <FileText className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 5
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Limitation de Responsabilité
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    JURIJOB intervient en qualité d'outil de sourcing et de mise en relation. La plateforme n'est pas partie aux relations contractuelles qui se nouent entre candidats et recruteurs, et ne saurait être tenue responsable du déroulement des entretiens, des décisions d'embauche ou des engagements pris entre les parties.
                                                </p>
                                                <p>
                                                    Les informations figurant dans les profils sont déclarées par les candidats sous leur seule responsabilité. Sentissi Legal Advisory s'efforce d'assurer la disponibilité et l'exactitude du service, sans garantir une accessibilité ininterrompue.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 6: Droit applicable */}
                                <section id="article-6" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Scale className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 6
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Droit applicable & juridiction compétente
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 space-y-4 shadow-sm">
                                                <p className="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                                                    Les présentes mentions légales sont régies par le <strong className="font-semibold text-[#1a1f1e]">droit marocain</strong>.
                                                </p>
                                                <p className="text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                                                    Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des <strong className="font-semibold text-[#1a1f1e]">tribunaux de Casablanca</strong>, à défaut de résolution amiable.
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
