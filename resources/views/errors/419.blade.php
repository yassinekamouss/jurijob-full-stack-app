@extends('layouts.error')

@section('title', 'Session expirée')
@section('code', '419')
@section('message', 'Votre session a expiré. Veuillez actualiser la page et réessayer.')

@section('illustration')
    <span class="absolute text-[140px] font-extrabold tracking-tight text-[#1a1f1e]/[0.04] leading-none select-none pointer-events-none">
        419
    </span>
@endsection

@section('actions')
    <a href="/" class="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold no-underline cursor-pointer transition-all duration-200 w-full sm:w-auto border-none outline-none bg-[#1a1f1e] text-[#FDFCF8] shadow-[0_2px_4px_rgba(26,31,30,0.1)] hover:bg-[#343a38] hover:-translate-y-[1px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Retour à l'accueil
    </a>
    
    <button onclick="window.history.back()" type="button" class="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold no-underline cursor-pointer transition-all duration-200 w-full sm:w-auto bg-white text-[#1a1f1e] border border-[#1a1f1e]/20 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:bg-[#1a1f1e]/[0.04] hover:-translate-y-[1px]">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Page précédente
    </button>
@endsection