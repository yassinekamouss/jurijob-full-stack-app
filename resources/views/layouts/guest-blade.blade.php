<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'JuriJob - Smart Recrutement Juridique au Maroc')</title>
    <meta name="description" content="@yield('meta_description', 'Plateforme de recrutement spécialisée dans le secteur juridique au Maroc.')">
    <meta name="robots" content="@yield('meta_robots', 'index, follow')">
    <link rel="canonical" href="@yield('canonical', url()->current())">

    <!-- Open Graph -->
    <meta property="og:site_name" content="JuriJob">
    <meta property="og:title" content="@yield('og_title', View::yieldContent('title', 'JuriJob - Smart Recrutement Juridique'))">
    <meta property="og:description" content="@yield('og_description', View::yieldContent('meta_description', 'Plateforme de recrutement spécialisée dans le secteur juridique au Maroc.'))">
    <meta property="og:type" content="@yield('og_type', 'website')">
    <meta property="og:url" content="@yield('canonical', url()->current())">
    <meta property="og:image" content="@yield('og_image', asset('logo-512x512.png'))">
    <meta property="og:image:secure_url" content="@yield('og_image', asset('logo-512x512.png'))">
    <meta property="og:image:width" content="512">
    <meta property="og:image:height" content="512">
    <meta property="og:image:alt" content="JuriJob - Smart Recrutement Juridique">
    <meta property="og:locale" content="{{ app()->getLocale() === 'en' ? 'en_US' : 'fr_FR' }}">

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="@yield('og_title', View::yieldContent('title', 'JuriJob - Smart Recrutement Juridique'))">
    <meta name="twitter:description" content="@yield('og_description', View::yieldContent('meta_description', 'Plateforme de recrutement spécialisée dans le secteur juridique au Maroc.'))">
    <meta name="twitter:image" content="@yield('og_image', asset('logo-512x512.png'))">

    @yield('json_ld')

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    <!-- Favicons -->
    <link rel="icon" type="image/png" sizes="96x96" href="{{ asset('favicon-96x96.png') }}">
    <link rel="icon" type="image/png" sizes="192x192" href="{{ asset('web-app-manifest-192x192.png') }}">
    <link rel="icon" type="image/png" sizes="512x512" href="{{ asset('web-app-manifest-512x512.png') }}">
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    <link rel="shortcut icon" href="{{ asset('favicon.ico') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('apple-touch-icon.png') }}">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">

    @vite(['resources/css/app.css','resources/js/app.tsx'])
</head>

<body class="font-sans antialiased bg-[#FDFCF8] text-[#1a1f1e] selection:bg-[#C06041] selection:text-white">
    <div class="min-h-screen bg-[#FDFCF8] text-[#1a1f1e] flex flex-col w-full" style="font-family: 'Outfit', sans-serif;">
        <!-- Header / Navbar -->
        <header id="site-header" class="sticky top-0 z-50 border-b border-[#1a1f1e]/10 bg-[#FDFCF8]/90 backdrop-blur-xl">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-20 items-center justify-between">
                    <!-- Logo -->
                    <a href="/" class="flex items-center tracking-tight hover:opacity-90 transition-opacity" aria-label="{{ __t('navigation.brand_alt') }}">
                        <img src="/images/logo_jurijob.webp" alt="{{ __t('navigation.brand_alt') }}" width="100" height="100" class="w-auto h-32" />
                    </a>

                    <!-- Navigation Desktop -->
                    <nav class="hidden space-x-8 xl:space-x-12 lg:flex" aria-label="{{ __t('navigation.home') }}">
                        <a href="/#home" class="text-gray-700 transition-colors hover:text-black">{{ __t('navigation.home') }}</a>
                        <a href="/services" class="text-gray-700 transition-colors hover:text-black">{{ __t('navigation.services') }}</a>
                        <a href="/#how-it-works" class="text-gray-700 transition-colors hover:text-black">{{ __t('navigation.how_it_works') }}</a>
                        <a href="/#about" class="text-gray-700 transition-colors hover:text-black">{{ __t('navigation.about') }}</a>
                        <a href="/#pricing" class="text-gray-700 transition-colors hover:text-black">{{ __t('navigation.pricing') }}</a>
                        <a href="/faq" class="text-gray-700 transition-colors hover:text-black">{{ __t('navigation.faq') }}</a>
                    </nav>

                    <!-- Actions Desktop -->
                    <div class="hidden lg:flex items-center space-x-4 md:space-x-6">
                        <div class="inline-flex items-center gap-1 text-xs font-medium">
                            <form action="/locale/fr" method="POST" class="inline">
                                @csrf
                                <button type="submit" class="px-2 py-1 transition-colors {{ app()->getLocale() === 'fr' ? 'font-bold text-[#1a1f1e] underline underline-offset-4' : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e]' }}">FR</button>
                            </form>
                            <span class="text-[#1a1f1e]/30">|</span>
                            <form action="/locale/en" method="POST" class="inline">
                                @csrf
                                <button type="submit" class="px-2 py-1 transition-colors {{ app()->getLocale() === 'en' ? 'font-bold text-[#1a1f1e] underline underline-offset-4' : 'text-[#1a1f1e]/60 hover:text-[#1a1f1e]' }}">EN</button>
                            </form>
                        </div>
                        <a href="/login" class="px-2 py-2 text-sm font-medium text-[#1a1f1e] transition-opacity hover:opacity-70">
                            {{ __t('navigation.login') }}
                        </a>
                        <div class="relative group">
                            <button class="flex items-center gap-2 bg-[#1a1f1e] px-6 py-2.5 text-sm font-medium text-[#FDFCF8] transition-all hover:bg-[#343a38]">
                                {{ __t('navigation.register') }}
                                <svg class="h-3.5 w-3.5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <div class="absolute right-0 z-50 mt-1 hidden w-56 border border-[#1a1f1e]/10 bg-[#FDFCF8] py-1 shadow-2xl group-hover:block">
                                <a href="/register/recruteur" class="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#1a1f1e] transition-colors hover:bg-[#1a1f1e]/5">
                                    <svg class="h-4 w-4 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                    </svg>
                                    {{ __t('navigation.as_recruiter') }}
                                </a>
                                <a href="/register/candidat" class="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#1a1f1e] transition-colors hover:bg-[#1a1f1e]/5">
                                    <svg class="h-4 w-4 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                                    </svg>
                                    {{ __t('navigation.as_candidate') }}
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Mobile Controls (Language + Hamburger Button) -->
                    <div class="flex items-center gap-3 lg:hidden">
                        <div class="inline-flex items-center gap-1 text-xs font-medium">
                            <form action="/locale/fr" method="POST" class="inline">
                                @csrf
                                <button type="submit" class="px-1.5 py-1 transition-colors {{ app()->getLocale() === 'fr' ? 'font-bold text-[#1a1f1e] underline underline-offset-4' : 'text-[#1a1f1e]/60' }}">FR</button>
                            </form>
                            <span class="text-[#1a1f1e]/30">|</span>
                            <form action="/locale/en" method="POST" class="inline">
                                @csrf
                                <button type="submit" class="px-1.5 py-1 transition-colors {{ app()->getLocale() === 'en' ? 'font-bold text-[#1a1f1e] underline underline-offset-4' : 'text-[#1a1f1e]/60' }}">EN</button>
                            </form>
                        </div>
                        <button id="mobile-menu-toggle" aria-label="Toggle Navigation Menu" class="p-2 text-[#1a1f1e] hover:bg-[#1a1f1e]/5 rounded-md transition-colors">
                            <svg id="hamburger-icon" class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                            <svg id="close-icon" class="h-6 w-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Navigation Drawer -->
            <div id="mobile-menu-drawer" class="hidden lg:hidden border-t border-[#1a1f1e]/10 bg-[#FDFCF8] px-6 pt-4 pb-6 shadow-xl">
                <nav class="flex flex-col space-y-3 mb-6">
                    <a href="/#home" class="text-base font-medium text-[#1a1f1e] hover:text-[#C06041] transition-colors border-b border-[#1a1f1e]/5 pb-2">{{ __t('navigation.home') }}</a>
                    <a href="/services" class="text-base font-medium text-[#1a1f1e] hover:text-[#C06041] transition-colors border-b border-[#1a1f1e]/5 pb-2">{{ __t('navigation.services') }}</a>
                    <a href="/#how-it-works" class="text-base font-medium text-[#1a1f1e] hover:text-[#C06041] transition-colors border-b border-[#1a1f1e]/5 pb-2">{{ __t('navigation.how_it_works') }}</a>
                    <a href="/#about" class="text-base font-medium text-[#1a1f1e] hover:text-[#C06041] transition-colors border-b border-[#1a1f1e]/5 pb-2">{{ __t('navigation.about') }}</a>
                    <a href="/#pricing" class="text-base font-medium text-[#1a1f1e] hover:text-[#C06041] transition-colors border-b border-[#1a1f1e]/5 pb-2">{{ __t('navigation.pricing') }}</a>
                    <a href="/faq" class="text-base font-medium text-[#1a1f1e] hover:text-[#C06041] transition-colors border-b border-[#1a1f1e]/5 pb-2">{{ __t('navigation.faq') }}</a>
                </nav>

                <div class="flex flex-col gap-3 pt-2 border-t border-[#1a1f1e]/10">
                    <a href="/login" class="w-full text-center border border-[#1a1f1e] py-2.5 text-sm font-medium text-[#1a1f1e] hover:bg-[#1a1f1e]/5 transition-colors">
                        {{ __t('navigation.login') }}
                    </a>
                    <div class="flex flex-col gap-2 pt-1">
                        <span class="text-xs uppercase tracking-wider text-[#1a1f1e]/60 font-semibold mb-1">
                            {{ __t('navigation.register') }}
                        </span>
                        <a href="/register/recruteur" class="flex items-center gap-3 bg-[#1a1f1e] text-[#FDFCF8] px-4 py-3 text-sm font-medium hover:bg-[#343a38] transition-colors">
                            <svg class="h-4 w-4 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                            {{ __t('navigation.as_recruiter') }}
                        </a>
                        <a href="/register/candidat" class="flex items-center gap-3 border border-[#1a1f1e] text-[#1a1f1e] px-4 py-3 text-sm font-medium hover:bg-[#1a1f1e]/5 transition-colors">
                            <svg class="h-4 w-4 text-[#C06041]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                            </svg>
                            {{ __t('navigation.as_candidate') }}
                        </a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1 w-full">
            @yield('content')
        </main>

        <!-- Footer -->
        <footer class="border-t border-[#1a1f1e]/10 bg-[#FDFCF8] py-16 text-[#1a1f1e]">
            <div class="mx-auto max-w-7xl px-8 md:px-16">
                <div class="grid gap-12 md:grid-cols-4">
                    <div class="md:col-span-2">
                        <a href="/" class="inline-flex items-center tracking-tight hover:opacity-90 transition-opacity" aria-label="{{ __t('navigation.brand_alt') }}">
                            <img src="/images/logo_jurijob.webp" alt="{{ __t('navigation.brand_alt') }}" width="100" height="100" class="w-auto h-32" />
                        </a>
                        <p class="my-6 max-w-sm text-sm leading-relaxed font-light text-[#1a1f1e]/70">
                            {{ __t('footer.description') }}
                        </p>
                        <div class="flex items-center gap-2 text-xs font-medium tracking-widest text-[#C06041] uppercase">
                            <span>{{ __t('footer.specialized_badge') }}</span>
                        </div>
                    </div>

                    <div class="mt-10">
                        <h4 class="mb-6 text-sm font-medium tracking-widest text-[#1a1f1e] uppercase">{{ __t('footer.navigation_heading') }}</h4>
                        <ul class="space-y-4 text-sm font-light text-[#1a1f1e]/70">
                            <li><a href="/#about" class="transition-colors hover:text-[#C06041]">{{ __t('footer.vision') }}</a></li>
                            <li><a href="/services" class="transition-colors hover:text-[#C06041]">{{ __t('footer.services') }}</a></li>
                            <li><a href="/faq" class="transition-colors hover:text-[#C06041]">{{ __t('footer.faq') }}</a></li>
                            <li class="pt-2">
                                <a href="mailto:recrutement@sentissilegal.com" class="inline-block transition-colors text-[#C06041]">
                                    recrutement@sentissilegal.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="mt-10">
                        <h4 class="mb-6 text-sm font-medium tracking-widest text-[#1a1f1e] uppercase">{{ __t('footer.legal_heading') }}</h4>
                        <ul class="space-y-4 text-sm font-light text-[#1a1f1e]/70">
                            <li><a href="/mentions-legales" class="transition-colors hover:text-[#C06041]">{{ __t('footer.mentions_legales') }}</a></li>
                            <li><a href="/cgu" class="transition-colors hover:text-[#C06041]">{{ __t('footer.cgu') }}</a></li>
                            <li><a href="/cgv" class="transition-colors hover:text-[#C06041]">{{ __t('footer.cgv') }}</a></li>
                        </ul>
                    </div>
                </div>

                <div class="mt-16 flex flex-col items-center justify-between border-t border-[#1a1f1e]/10 pt-8 text-xs font-light tracking-widest text-[#1a1f1e]/50 uppercase md:flex-row">
                    <p>{{ __t('footer.copyright') }}</p>
                    <p class="mt-4 md:mt-0">{{ __t('footer.address') }}</p>
                </div>
            </div>
        </footer>
    </div>

    @stack('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const toggleBtn = document.getElementById('mobile-menu-toggle');
            const menuDrawer = document.getElementById('mobile-menu-drawer');
            const hamburgerIcon = document.getElementById('hamburger-icon');
            const closeIcon = document.getElementById('close-icon');

            if (toggleBtn && menuDrawer) {
                toggleBtn.addEventListener('click', () => {
                    const isOpen = !menuDrawer.classList.contains('hidden');
                    if (isOpen) {
                        menuDrawer.classList.add('hidden');
                        hamburgerIcon?.classList.remove('hidden');
                        closeIcon?.classList.add('hidden');
                    } else {
                        menuDrawer.classList.remove('hidden');
                        hamburgerIcon?.classList.add('hidden');
                        closeIcon?.classList.remove('hidden');
                    }
                });
            }
        });
    </script>
</body>

</html>
