<?php

namespace App\Models\Recruteur;

use App\Models\Offre\Offre;
use App\Models\Taxonomy\TailleEntreprise;
use App\Models\Taxonomy\TypeOrganisation;
use App\Models\Taxonomy\Ville;
use App\Models\User;
use Database\Factories\RecruteurFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Recruteur extends Model
{
    /** @use HasFactory<RecruteurFactory> */
    use HasFactory;

    protected static function newFactory(): RecruteurFactory
    {
        return RecruteurFactory::new();
    }

    protected $fillable = [
        'user_id',
        'nom_entreprise',
        'poste',
        'type_organisation_id',
        'taille_entreprise_id',
        'site_web',
        'ville_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function typeOrganisation(): BelongsTo
    {
        return $this->belongsTo(TypeOrganisation::class);
    }

    public function tailleEntreprise(): BelongsTo
    {
        return $this->belongsTo(TailleEntreprise::class);
    }

    public function ville(): BelongsTo
    {
        return $this->belongsTo(Ville::class);
    }

    public function offres(): HasMany
    {
        return $this->hasMany(Offre::class);
    }

    /**
     * @return array{
     *     company_name: bool,
     *     position: bool,
     *     org_type: bool,
     *     company_size: bool,
     *     country: bool,
     *     city: bool,
     *     phone: bool,
     *     is_complete: bool
     * }
     */
    public function profileCompletion(): array
    {
        $companyName = filled($this->nom_entreprise);
        $position = filled($this->poste);
        $orgType = filled($this->type_organisation_id);
        $companySize = filled($this->taille_entreprise_id);
        $country = filled($this->ville?->pays_id);
        $city = filled($this->ville_id);
        $phone = filled($this->user?->telephone);

        return [
            'company_name' => $companyName,
            'position' => $position,
            'org_type' => $orgType,
            'company_size' => $companySize,
            'country' => $country,
            'city' => $city,
            'phone' => $phone,
            'is_complete' => $companyName
                && $position
                && $orgType
                && $companySize
                && $country
                && $city
                && $phone,
        ];
    }
}
