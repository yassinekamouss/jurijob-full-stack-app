<?php

namespace Tests\Unit\Requests\Candidate;

use App\Http\Requests\Candidate\StoreExperienceRequest;
use PHPUnit\Framework\TestCase;

class StoreExperienceRequestTest extends TestCase
{
    /**
     * Vérifie que passedValidation() transforme correctement les clés
     * du formulaire vers les colonnes de la base de données.
     */
    public function test_passed_validation_transforms_keys(): void
    {
        // Simuler une requête avec les données du formulaire
        $data = [
            'poste' => 5,
            'entreprise' => 'Cabinet Alpha',
            'debut' => '2024-01',
            'fin' => '2024-12',
            'type' => 3,
        ];

        // Créer une instance de la Form Request
        $request = new StoreExperienceRequest;

        // Simuler les données de la requête
        $request->replace($data);

        // Simuler les règles de validation (la requête passe)
        // On appelle passedValidation()
        $request = $request->merge($data); // Initialiser les données

        // Créer une nouvelle requête avec les bonnes données
        $request = new class extends StoreExperienceRequest
        {
            public function getPassedValidationData()
            {
                $this->merge([
                    'poste' => $this->poste,
                    'type' => $this->type,
                ]);
                $this->passedValidation();

                return $this->all();
            }
        };

        $request = $request->merge($data);
        $result = $request->getPassedValidationData();

        // Vérifier que les clés ont été transformées
        $this->assertArrayHasKey('poste_id', $result);
        $this->assertArrayHasKey('type_experience_id', $result);
        $this->assertEquals(5, $result['poste_id']);
        $this->assertEquals(3, $result['type_experience_id']);
    }

    /**
     * Vérifie que les règles de validation demandent les bons champs.
     */
    public function test_validation_rules_are_correct(): void
    {
        $request = new StoreExperienceRequest;
        $rules = $request->rules();

        // Vérifier que toutes les règles nécessaires sont présentes
        $this->assertArrayHasKey('poste', $rules);
        $this->assertArrayHasKey('entreprise', $rules);
        $this->assertArrayHasKey('debut', $rules);
        $this->assertArrayHasKey('fin', $rules);
        $this->assertArrayHasKey('type', $rules);

        // Vérifier que 'poste' et 'type' sont required (pas en tant que IDs)
        $this->assertContains('required', $rules['poste']);
        $this->assertContains('string', $rules['poste']);
    }
}
