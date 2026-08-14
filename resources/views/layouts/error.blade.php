<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>@yield('title') - JuriJob</title>
    
    <!-- Google Fonts: Outfit -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
    
    @vite(['resources/css/app.css','resources/js/app.tsx'])
    
    <style>
        h1, h2 { font-family: 'Source Serif 4', serif; }
body, p { font-family: 'Inter', sans-serif; }
        /* On conserve uniquement l'animation de flottaison qui est spécifique */
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
        @media (prefers-reduced-motion: reduce) {
            .animate-float { animation: none; }
        }
    </style>
</head>
<body class="font-['Outfit'] bg-[#FDFCF8] text-[#1a1f1e] min-h-screen flex flex-col justify-between overflow-x-hidden relative antialiased">
    

    <main class="relative z-10 flex-1 flex items-center justify-center py-12 px-6">
        
        <div class="w-full max-w-[580px] text-center">
             <!-- Header -->
             <header class="relative z-10 w-full border-b border-[#1a1f1e]/[0.08] bg-[#FDFCF8]/85 backdrop-blur-[8px]">
                <div class="max-w-7xl mx-auto h-20 flex items-center justify-center px-6">
                    <a href="/" aria-label="JuriJob Accueil">
                        <img src="/images/logo_jurijob.png" alt="JuriJob Logo" class="h-[150px] w-auto object-contain transition-opacity duration-200 hover:opacity-85">
                    </a>
                </div>
            </header>

            @hasSection('illustration')
                <div class="relative flex justify-center items-center h-[160px] mb-6">
                    @yield('illustration')
                </div>
            @endif

            <h1 class="text-[32px] sm:text-[40px] font-extrabold tracking-tight text-[#1a1f1e] leading-[1.2] mb-4">
                @yield('title')
            </h1>
            
            <p class="text-base leading-relaxed text-[#1a1f1e]/72 max-w-[460px] mx-auto mb-8">
                @yield('message')
            </p>

            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full">
                @yield('actions')
            </div>
        </div>
    </main>

    <footer class="relative z-10 border-t border-[#1a1f1e]/[0.08] p-6 text-center text-xs text-[#1a1f1e]/60">
        <p>&copy; {{ date('Y') }} JuriJob — Plateforme de recrutement juridique et fiscal au Maroc.</p>
    </footer>
</body>
</html>