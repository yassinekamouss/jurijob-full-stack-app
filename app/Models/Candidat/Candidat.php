<?php

namespace App\Models\Candidat;

use App\Models\Taxonomy\FormationJuridique;
use App\Models\Taxonomy\NiveauExperience;
use App\Models\Taxonomy\Poste;
use App\Models\Taxonomy\Salaire;
use App\Models\Taxonomy\Urgence;
use App\Models\User;
use Carbon\Carbon;
use Database\Factories\CandidatFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Candidat extends Model
{
    use HasFactory;

    protected static function newFactory()
    {
        return CandidatFactory::new();
    }

    protected $fillable = [
        'user_id',
        'status',
        'nom',
        'prenom',
        'poste_id',
        'niveau_experience_id',
        'formation_juridique_id',
        'salaire_id',
        'urgence_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function specialisations(): HasMany
    {
        return $this->hasMany(CandidatSpecialisation::class);
    }

    public function langues(): HasMany
    {
        return $this->hasMany(CandidatLangue::class);
    }

    public function typeTravails(): HasMany
    {
        return $this->hasMany(CandidatTypeTravail::class);
    }

    public function modeTravails(): HasMany
    {
        return $this->hasMany(CandidatModeTravail::class);
    }

    public function villeTravails(): HasMany
    {
        return $this->hasMany(CandidatVilleTravail::class);
    }

    public function formations(): HasMany
    {
        return $this->hasMany(CandidatFormation::class);
    }

    public function experiences(): HasMany
    {
        return $this->hasMany(CandidatExperience::class);
    }

    public function poste(): BelongsTo
    {
        return $this->belongsTo(Poste::class);
    }

    public function niveauExperience(): BelongsTo
    {
        return $this->belongsTo(NiveauExperience::class);
    }

    public function formationJuridique(): BelongsTo
    {
        return $this->belongsTo(FormationJuridique::class);
    }

    public function salaire(): BelongsTo
    {
        return $this->belongsTo(Salaire::class);
    }

    public function urgence(): BelongsTo
    {
        return $this->belongsTo(Urgence::class);
    }

    public function isPendingVerification(): bool
    {
        return $this->status === 'en_attente';
    }

    /**
     * @return array{
     *     profile: bool,
     *     experiences: bool,
     *     formations: bool,
     *     specialisations: bool,
     *     langues: bool,
     *     localisation: bool,
     *     mode_travails: bool,
     *     type_travails: bool,
     *     is_complete: bool
     * }
     */
    public function profileCompletion(): array
    {
        $profile = filled($this->poste_id)
            && filled($this->niveau_experience_id)
            && filled($this->formation_juridique_id)
            && filled($this->salaire_id)
            && filled($this->urgence_id)
            && filled($this->nom)
            && filled($this->prenom);

        $experiences = $this->relationLoaded('experiences')
            ? $this->experiences->isNotEmpty()
            : $this->experiences()->exists();

        $formations = $this->relationLoaded('formations')
            ? $this->formations->isNotEmpty()
            : $this->formations()->exists();

        $specialisations = $this->relationLoaded('specialisations')
            ? $this->specialisations->isNotEmpty()
            : $this->specialisations()->exists();

        $langues = $this->relationLoaded('langues')
            ? $this->langues->isNotEmpty()
            : $this->langues()->exists();

        $localisation = $this->relationLoaded('villeTravails')
            ? $this->villeTravails->isNotEmpty()
            : $this->villeTravails()->exists();

        $modeTravails = $this->relationLoaded('modeTravails')
            ? $this->modeTravails->isNotEmpty()
            : $this->modeTravails()->exists();

        $typeTravails = $this->relationLoaded('typeTravails')
            ? $this->typeTravails->isNotEmpty()
            : $this->typeTravails()->exists();

        return [
            'profile' => $profile,
            'experiences' => $experiences,
            'formations' => $formations,
            'specialisations' => $specialisations,
            'langues' => $langues,
            'localisation' => $localisation,
            'mode_travails' => $modeTravails,
            'type_travails' => $typeTravails,
            'is_complete' => $profile
                && $experiences
                && $formations
                && $specialisations
                && $langues
                && $localisation
                && $modeTravails
                && $typeTravails,
        ];
    }

    public function calculateTotalExperienceMonths(): int
    {
        $experiences = $this->experiences()->whereNotNull('debut')->get();
        if ($experiences->isEmpty()) {
            return 0;
        }

        $periods = [];
        foreach ($experiences as $exp) {
            try {
                $start = Carbon::createFromFormat('Y-m', $exp->debut)->startOfMonth();
                $end = $exp->fin ? Carbon::createFromFormat('Y-m', $exp->fin)->endOfMonth() : now();
                if ($start->lessThanOrEqualTo($end)) {
                    $periods[] = ['start' => $start, 'end' => $end];
                }
            } catch (\Exception $e) {
                continue;
            }
        }

        if (empty($periods)) {
            return 0;
        }

        usort($periods, fn ($a, $b) => $a['start']->eq($b['start']) ? 0 : ($a['start']->lessThan($b['start']) ? -1 : 1));

        $merged = [];
        $current = $periods[0];

        for ($i = 1; $i < count($periods); $i++) {
            if ($periods[$i]['start']->lessThanOrEqualTo($current['end'])) {
                if ($periods[$i]['end']->greaterThan($current['end'])) {
                    $current['end'] = $periods[$i]['end'];
                }
            } else {
                $merged[] = $current;
                $current = $periods[$i];
            }
        }
        $merged[] = $current;

        $totalMonths = 0;
        foreach ($merged as $period) {
            $totalMonths += $period['start']->diffInMonths($period['end']) + 1;
        }

        return $totalMonths;
    }

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void {}
}
