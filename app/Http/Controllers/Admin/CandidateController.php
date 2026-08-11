<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Candidat\Candidat;
use Inertia\Inertia;

class CandidateController extends Controller
{
    public function index()
    {
        $status = request()->query('status', 'accepte');
        $search = request()->query('search');

        $query = Candidat::with([
            'user',
            'poste',
            'niveauExperience',
            'formationJuridique',
            'specialisations.specialisation',
            'langues.langue',
            'langues.niveauLangue',
            'typeTravails.typeTravail',
            'modeTravails.modeTravail',
            'villeTravails.ville',
            'formations.specialisation',
            'formations.formationJuridique',
            'formations.ecole',
            'experiences.poste',
            'experiences.typeTravail',
        ])
            ->where('status', $status);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('nom', 'like', "%{$search}%")
                    ->orWhere('prenom', 'like', "%{$search}%")
                    ->orWhereHas('user', function ($q) use ($search) {
                        $q->where('email', 'like', "%{$search}%");
                    });
            });
        }

        $candidates = $query->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('admin/Candidats', [
            'candidates' => $candidates,
            'currentStatus' => $status,
            'filters' => request()->only(['search']),
        ]);
    }

    public function approve(Candidat $candidate)
    {
        $candidate->update(['status' => 'accepte']);

        return redirect()->back()->with('success', 'Candidat accepté avec succès.');
    }

    public function reject(Candidat $candidate)
    {
        $candidate->update(['status' => 'refuse']);

        return redirect()->back()->with('success', 'Candidat refusé avec succès.');
    }

    public function archive(Candidat $candidate)
    {
        $candidate->update(['status' => 'archive']);

        return redirect()->back()->with('success', 'Candidat archivé avec succès.');
    }
}
