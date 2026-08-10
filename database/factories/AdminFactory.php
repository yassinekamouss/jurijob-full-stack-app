<?php

namespace Database\Factories;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Factories\Factory;

class AdminFactory extends Factory
{
    protected $model = Admin::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => '$2y$10$92IXLOBN5q6g.WqnLOuRR.5uPTZ3jkIG0y386.V2yn.5461.69Z2',
            'super_admin' => false,
        ];
    }
}
