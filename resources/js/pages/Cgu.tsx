import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import {
    FileCheck,
    BookOpen,
    Users,
    UserCheck,
    Building2,
    ShieldAlert,
    Scale,
    Lock,
    RefreshCw,
    AlertCircle,
    CheckCircle2,
    ArrowUpRight,
    Copy,
    Check,
    Mail,
    Globe,
    HelpCircle,
    Sparkles,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Reveal from '@/components/home/Reveal';

interface CguArticle {
    id: string;
    num: string;
    title: string;
}

const articles: CguArticle[] = [
    { id: 'article-1', num: 'Article 1', title: "Objet et champ d'application" },
    { id: 'article-2', num: 'Article 2', title: 'Définitions' },
    { id: 'article-3', num: 'Article 3', title: 'Accès au service' },
    { id: 'article-4', num: 'Article 4', title: 'Inscription et compte utilisateur' },
    { id: 'article-5', num: 'Article 5', title: 'Obligations du candidat' },
    { id: 'article-6', num: 'Article 6', title: 'Obligations du recruteur' },
    { id: 'article-7', num: 'Article 7', title: 'Rôle et limites de la Plateforme' },
    { id: 'article-8', num: 'Article 8', title: 'Propriété intellectuelle' },
    { id: 'article-9', num: 'Article 9', title: 'Données personnelles' },
    { id: 'article-10', num: 'Article 10', title: 'Modification des CGU' },
    { id: 'article-11', num: 'Article 11', title: 'Droit applicable et litiges' },
];

export default function Cgu() {
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
                <title>Conditions Générales d'Utilisation (CGU) - JURIJOB</title>
                <meta
                    name="description"
                    content="Conditions Générales d'Utilisation de JURIJOB : règles d'accès, d'inscription, obligations des candidats et recruteurs, limites de responsabilité et droit marocain."
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
                                        <FileCheck className="h-3.5 w-3.5" />
                                        Cadre Contractuel & Utilisation
                                    </div>

                                    <h1
                                        className="mt-6 text-4xl font-normal tracking-tight text-[#1a1f1e] sm:text-5xl lg:text-6xl"
                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                    >
                                        Conditions Générales <span className="italic text-[#C06041]">d'Utilisation</span>
                                    </h1>

                                    <p className="mt-4 text-base font-light leading-relaxed text-[#1a1f1e]/75 sm:text-lg">
                                        Les règles d'accès et d'utilisation de la plateforme JURIJOB, applicables aux candidats comme aux recruteurs.
                                    </p>

                                    <div className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-[#1a1f1e]/50">
                                        <span>Dernière mise à jour : août 2026</span>
                                        <span>•</span>
                                        <span>Droit Marocain</span>
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
                                            Table des articles des CGU
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
                                            <p className="font-semibold text-[#1a1f1e]">Une question sur les CGU ?</p>
                                            <p className="mt-1 text-[#1a1f1e]/70">
                                                Écrivez-nous directement à notre adresse dédiée :
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

                            {/* CGU Articles Content */}
                            <div className="space-y-16 lg:col-span-8">
                                {/* Article 1: Objet et champ d'application */}
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
                                                        Objet et champ d'application
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                                                <p>
                                                    Les présentes Conditions Générales d'Utilisation (ci-après les « <strong className="font-semibold text-[#1a1f1e]">CGU</strong> ») définissent les modalités d'accès et d'utilisation de la plateforme <strong className="font-semibold text-[#1a1f1e]">JURIJOB</strong>, accessible à l'adresse{' '}
                                                    <a href="https://www.jurijob.ma" target="_blank" rel="noopener noreferrer" className="font-medium text-[#C06041] underline underline-offset-4 hover:opacity-80">www.jurijob.ma</a>, éditée par la société <strong className="font-semibold text-[#1a1f1e]">SENTISSI LEGAL ADVISORY SARL AU</strong> (ci-après « SLA » ou « la Plateforme »).
                                                </p>
                                                <p>
                                                    JURIJOB est un outil de sourcing spécialisé dans les métiers du droit. La Plateforme met en relation des professionnels du droit — <span className="italic">juristes d'entreprise, avocats, notaires, fiscalistes, compliance officers</span> — avec des recruteurs identifiés au Maroc et en Afrique francophone.
                                                </p>
                                                <div className="border-l-4 border-[#C06041] bg-[#1a1f1e]/5 p-4 font-medium text-[#1a1f1e]">
                                                    Toute utilisation de la Plateforme emporte acceptation pleine et entière des présentes CGU. L'utilisateur qui n'accepte pas ces conditions doit renoncer à utiliser le service.
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 2: Définitions */}
                                <section id="article-2" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Users className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 2
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Définitions clés
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <div className="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Candidat
                                                    </span>
                                                    <p className="text-sm leading-relaxed text-[#1a1f1e]/80">
                                                        Toute personne physique créant un profil dans la CVthèque JURIJOB en vue d'être proposée à des recruteurs.
                                                    </p>
                                                </div>

                                                <div className="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Recruteur
                                                    </span>
                                                    <p className="text-sm leading-relaxed text-[#1a1f1e]/80">
                                                        Toute personne morale ou physique agissant dans le cadre de son activité professionnelle, déposant une demande de sourcing sur la Plateforme.
                                                    </p>
                                                </div>

                                                <div className="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Short-list
                                                    </span>
                                                    <p className="text-sm leading-relaxed text-[#1a1f1e]/80">
                                                        Sélection de profils de candidats, évalués puis validés manuellement, transmise à un recruteur en réponse à sa demande.
                                                    </p>
                                                </div>

                                                <div className="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        CVthèque
                                                    </span>
                                                    <p className="text-sm leading-relaxed text-[#1a1f1e]/80">
                                                        Base de données des profils candidats constituée et exploitée exclusivement par SLA.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 3: Accès au service */}
                                <section id="article-3" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Globe className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 3
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Accès au service
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    La consultation des pages publiques de la Plateforme est libre et gratuite. La création d'un compte est nécessaire pour déposer un profil candidat ou une demande de sourcing.
                                                </p>
                                                <p>
                                                    L'utilisateur est responsable de son équipement informatique et de sa connexion Internet. Les frais d'accès au réseau demeurent à sa charge exclusive.
                                                </p>
                                                <p>
                                                    SLA se réserve le droit de suspendre temporairement l'accès à la Plateforme pour des raisons de maintenance, de mise à jour ou de sécurité, sans que cette interruption puisse ouvrir droit à une quelconque indemnisation.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 4: Inscription et compte utilisateur */}
                                <section id="article-4" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <UserCheck className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 4
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Inscription et compte utilisateur
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    L'inscription requiert la communication d'informations exactes, complètes et à jour. L'utilisateur s'engage à maintenir l'exactitude de ces informations pendant toute la durée d'utilisation du service.
                                                </p>
                                                <p>
                                                    Une adresse e-mail valide est exigée ; son activation peut être soumise à vérification. Chaque utilisateur est seul responsable de la confidentialité de ses identifiants et de toute activité effectuée depuis son compte.
                                                </p>
                                            </div>

                                            {/* Special Callout: One email = One role */}
                                            <div className="border border-[#C06041]/30 bg-[#C06041]/5 p-5 space-y-2">
                                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                    <AlertCircle className="h-4 w-4" />
                                                    Règle d'unicité de compte par rôle
                                                </div>
                                                <p className="text-xs sm:text-sm leading-relaxed text-[#1a1f1e]/85">
                                                    Une même adresse e-mail ne peut être associée qu'à un seul rôle — candidat ou recruteur. Pour disposer des deux espaces, l'utilisateur doit créer deux comptes distincts avec des adresses e-mail différentes.
                                                </p>
                                            </div>

                                            <p className="text-xs text-[#1a1f1e]/70 italic">
                                                SLA se réserve le droit de suspendre ou de supprimer tout compte en cas de manquement aux présentes CGU, notamment en cas d'informations manifestement fausses ou d'usurpation d'identité.
                                            </p>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 5: Obligations du candidat */}
                                <section id="article-5" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <CheckCircle2 className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 5
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Obligations du candidat
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                                                <ul className="space-y-3 list-disc list-inside text-[#1a1f1e]/80">
                                                    <li>
                                                        <strong className="text-[#1a1f1e]">Sincérité des informations :</strong> Le candidat garantit l'exactitude des informations déclarées (identité, coordonnées, formations, expériences professionnelles, spécialisations et compétences linguistiques).
                                                    </li>
                                                    <li>
                                                        <strong className="text-[#1a1f1e]">Légitimité des données :</strong> Il s'engage à ne renseigner que des données le concernant personnellement et dont il est en droit de disposer.
                                                    </li>
                                                    <li>
                                                        <strong className="text-[#1a1f1e]">Maîtrise du profil :</strong> Le candidat peut consulter, modifier, compléter ou supprimer définitivement son profil à tout moment depuis son espace personnel.
                                                    </li>
                                                </ul>

                                                <div className="border-t border-[#1a1f1e]/10 pt-4 text-xs text-[#C06041] font-medium">
                                                    * Toute déclaration inexact de nature à induire un recruteur en erreur engage la responsabilité exclusive du candidat et peut entraîner la suppression de son profil.
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 6: Obligations du recruteur */}
                                <section id="article-6" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Building2 className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 6
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Obligations du recruteur
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 border border-[#1a1f1e]/15 bg-[#FDFCF8] p-6 shadow-sm text-sm leading-relaxed text-[#1a1f1e]/85 sm:text-base">
                                                <p>
                                                    Le recruteur agit exclusivement dans le cadre de son activité professionnelle et garantit disposer des pouvoirs nécessaires pour engager la structure qu'il représente.
                                                </p>
                                                <p>
                                                    Il s'engage à formuler des critères de recherche conformes au droit du travail applicable, notamment aux dispositions prohibant toute discrimination à l'embauche.
                                                </p>
                                                
                                                <div className="border border-[#1a1f1e]/10 bg-[#1a1f1e]/5 p-4 text-xs sm:text-sm font-medium text-[#1a1f1e]">
                                                    <strong className="text-[#C06041] uppercase tracking-wider block mb-1 text-xs">Usage strictement confidentiel :</strong>
                                                    Les profils communiqués sont destinés au seul processus de recrutement au titre duquel ils ont été demandés. Toute extraction, conservation en base interne, revente, cession ou transmission à un tiers est strictement interdite.
                                                </div>

                                                <p className="text-xs text-[#1a1f1e]/70">
                                                    Le recruteur demeure seul responsable de la conduite des entretiens, de l'appréciation des candidats et de sa décision finale d'embauche.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 7: Rôle et limites de la Plateforme */}
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
                                                        Rôle et limites de la Plateforme
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    JURIJOB agit en qualité d'outil de sourcing et d'intermédiaire technique. La Plateforme n'exerce pas l'activité d'agence de recrutement privée et n'intervient pas dans la relation contractuelle qui peut se nouer entre un candidat et un recruteur.
                                                </p>
                                                <p>
                                                    SLA ne garantit ni l'embauche d'un candidat, ni sa disponibilité effective, ni l'exactitude des informations qu'il a déclarées sous sa propre responsabilité.
                                                </p>
                                                <p>
                                                    La Plateforme ne saurait être tenue responsable du déroulement des processus de recrutement, des engagements pris entre les parties, ni des conséquences d'une embauche.
                                                </p>
                                            </div>

                                            {/* Point Essentiel Banner */}
                                            <div className="border-l-4 border-[#C06041] border-y border-r border-[#1a1f1e]/15 bg-[#1a1f1e] p-6 text-[#FDFCF8] shadow-md">
                                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C06041]">
                                                    <Sparkles className="h-4 w-4" />
                                                    Point Essentiel
                                                </div>
                                                <p className="mt-2 text-base font-medium leading-relaxed sm:text-lg">
                                                    JURIJOB identifie et présente des profils pertinents. Le recruteur conserve l'intégralité de la maîtrise des entretiens et de la décision d'embauche.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 8: Propriété intellectuelle */}
                                <section id="article-8" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Scale className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 8
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Propriété intellectuelle
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    La Plateforme, sa structure, son design, ses textes, son logo, sa charte graphique, sa base de données et sa méthodologie de sélection sont protégés par les lois marocaines <strong className="font-semibold text-[#1a1f1e]">2-00</strong> (droits d'auteur et droits voisins) et <strong className="font-semibold text-[#1a1f1e]">17-97</strong> (propriété industrielle).
                                                </p>
                                                <p>
                                                    La marque <span className="italic font-medium">« JURIJOB — Smart Recrutement Juridique »</span> est déposée auprès de l'OMPIC. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable, est interdite.
                                                </p>
                                                <p className="text-xs text-[#1a1f1e]/70 italic border-t border-[#1a1f1e]/10 pt-3">
                                                    Les contenus déposés par les utilisateurs demeurent leur propriété. Ceux-ci concèdent à SLA une licence d'utilisation non exclusive, limitée aux seules finalités de fonctionnement du service.
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 9: Données personnelles */}
                                <section id="article-9" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <Lock className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 9
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Données personnelles
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    Le traitement des données personnelles est effectué conformément à la <strong className="font-semibold text-[#1a1f1e]">loi 09-08</strong> relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, et a fait l'objet d'une déclaration auprès de la CNDP.
                                                </p>
                                                <p>
                                                    Les profils candidats ne font l'objet d'aucune diffusion publique. Leur accès est strictement réservé aux recruteurs dont le paiement a été confirmé, et limité aux profils composant la short-list qui leur a été adressée.
                                                </p>

                                                <div className="border border-[#1a1f1e]/15 bg-[#FDFCF8] p-5 space-y-2">
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Droits des utilisateurs
                                                    </span>
                                                    <p className="text-xs sm:text-sm text-[#1a1f1e]/85">
                                                        Chaque utilisateur dispose d'un droit d'accès, de rectification et d'opposition, qu'il peut exercer en écrivant à{' '}
                                                        <a href="mailto:recrutement@sentissilegal.com" className="font-medium text-[#C06041] underline underline-offset-2">
                                                            recrutement@sentissilegal.com
                                                        </a>. Les modalités détaillées figurent dans les{' '}
                                                        <Link href="/mentions-legales" className="font-medium text-[#C06041] underline underline-offset-2">
                                                            mentions légales
                                                        </Link>.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                </section>

                                {/* Article 10: Modification des CGU */}
                                <section id="article-10" className="scroll-mt-28">
                                    <Reveal>
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 border-b border-[#1a1f1e]/10 pb-4">
                                                <div className="flex h-10 w-10 items-center justify-center bg-[#1a1f1e] text-[#FDFCF8]">
                                                    <RefreshCw className="h-5 w-5 text-[#C06041]" />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C06041]">
                                                        Article 10
                                                    </span>
                                                    <h2
                                                        className="text-2xl font-normal text-[#1a1f1e] sm:text-3xl"
                                                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                                                    >
                                                        Modification des CGU
                                                    </h2>
                                                </div>
                                            </div>

                                            <div className="space-y-4 text-sm leading-relaxed text-[#1a1f1e]/80 sm:text-base">
                                                <p>
                                                    SLA se réserve le droit de modifier les présentes CGU à tout moment afin de les adapter à l'évolution du service ou de la réglementation.
                                                </p>
                                                <p>
                                                    Les utilisateurs sont informés de toute modification substantielle. La poursuite de l'utilisation de la Plateforme après modification vaut acceptation des nouvelles conditions.
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
                                                    Les présentes CGU sont régies par le <strong className="font-semibold text-[#1a1f1e]">droit marocain</strong>.
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
