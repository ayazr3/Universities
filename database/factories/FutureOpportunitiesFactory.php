<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FutureOpportunitiesFactory extends Factory
{
    protected $model = \App\Models\FutureOpportunities::class;

    public function definition()
    {
        return [
            'specialization_id' => \App\Models\Specialization::factory(), // يفترض أنك تملك factory للـ specialization
            'name' => $this->faker->words(3, true),
            'details' => $this->faker->paragraph(),
            'icon' => $this->faker->imageUrl(100, 100, 'abstract'), // أو ضع مسارا ثابتاً
        ];
    }
}
