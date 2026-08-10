<?php

namespace Tests\Unit\Requests\Candidate;

use App\Http\Requests\Candidate\StoreExperienceRequest;
use PHPUnit\Framework\TestCase;

class StoreExperienceRequestTest extends TestCase
{
    /**
     * Vérifie que la requête est autorisée.
     */
    public function test_authorize_returns_true(): void
    {
        $request = new StoreExperienceRequest;
        $this->assertTrue($request->authorize());
    }

    /**
     * Vérifie que les règles de validation demandent les bons champs.
     */
    public function test_validation_rules_are_correct(): void
    {
        $request = new StoreExperienceRequest;
        $rules = $request->rules();

        // Vérifier que toutes les règles nécessaires sont présentes
        $this->assertArrayHasKey('poste_id', $rules);
        $this->assertArrayHasKey('entreprise', $rules);
        $this->assertArrayHasKey('debut', $rules);
        $this->assertArrayHasKey('fin', $rules);
        $this->assertArrayHasKey('type_travail_id', $rules);

        // Vérifier les types de règles
        $this->assertContains('required', $rules['poste_id']);
        $this->assertContains('integer', $rules['poste_id']);
        $this->assertContains('required', $rules['entreprise']);
        $this->assertContains('required', $rules['debut']);
    }
}
