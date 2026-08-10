@extends('layouts.guest-blade')

@section('title')
@yield('title', 'JuriJob - Smart Recrutement Juridique')
@endsection

@section('meta_description')
@yield('meta_description', 'Plateforme de recrutement spécialisée dans le secteur juridique au Maroc.')
@endsection

@section('content')
    @yield('content')
@endsection

@push('scripts')
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const links = document.querySelectorAll('aside nav a[href^="#"]');
            if (!links.length) return;

            const sections = Array.from(links).map(link => {
                const id = link.getAttribute('href').replace('#', '');
                return document.getElementById(id);
            }).filter(Boolean);

            function updateScrollSpy() {
                const scrollPosition = window.scrollY + 160;

                let currentSection = sections[0];
                for (let i = 0; i < sections.length; i++) {
                    if (sections[i].offsetTop <= scrollPosition) {
                        currentSection = sections[i];
                    }
                }

                if (currentSection) {
                    links.forEach(link => {
                        const targetId = link.getAttribute('href').replace('#', '');
                        if (targetId === currentSection.id) {
                            link.classList.add('bg-[#C06041]/10', 'text-[#C06041]', 'font-semibold', 'border-l-2', 'border-[#C06041]');
                            link.classList.remove('text-[#1a1f1e]/70');
                        } else {
                            link.classList.remove('bg-[#C06041]/10', 'text-[#C06041]', 'font-semibold', 'border-l-2', 'border-[#C06041]');
                            link.classList.add('text-[#1a1f1e]/70');
                        }
                    });
                }
            }

            window.addEventListener('scroll', updateScrollSpy, { passive: true });
            updateScrollSpy();
        });
    </script>
@endpush
