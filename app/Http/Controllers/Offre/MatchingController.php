<?php

namespace App\Http\Controllers\Offre;

use App\Http\Controllers\Controller;
use App\Models\Offre\Offre;
use App\Services\CandidateMatching\MatchingEngine;
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
        if ($offre->recruteur_id !== $request->user()->recruteur->id) {
            abort(403);
        }

        return Inertia::render('Offres/Matching', [
            'offre' => $offre->load(['poste', 'typeTravail']),
            'filters' => [
                'allow_overqualified' => $request->boolean('allow_overqualified'),
            ],
            'candidates' => Inertia::defer(fn () => $this->matchingEngine->getMatches($offre)),
        ]);
    }
}
