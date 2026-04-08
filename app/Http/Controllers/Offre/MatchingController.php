<?php

namespace App\Http\Controllers\Offre;

use App\Http\Controllers\Controller;
use App\Models\Offre\Offre;
use App\Services\Matching\MatchingEngine;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MatchingController extends Controller
{
    public function __construct(protected MatchingEngine $matchingEngine) {}

    /**
     * Display the matching results for a specific job offer.
     */
    public function index(Request $request, Offre $offre): Response
    {
        // Ensure the current recruiter owns the offer
        if ($offre->recruteur_id !== $request->user()->recruteur->id) {
            abort(403);
        }

        $allowOverqualified = $request->boolean('allow_overqualified');

        return Inertia::render('Offres/Matching', [
            'offre' => $offre->load(['poste', 'typeTravail']),
            'filters' => [
                'allow_overqualified' => $allowOverqualified,
            ],
            'candidates' => Inertia::defer(fn () => $this->matchingEngine->getMatches($offre, $allowOverqualified)),
        ]);
    }
}
