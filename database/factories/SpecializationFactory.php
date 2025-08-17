<?php

namespace Database\Factories;

use App\Models\Specialization;
use Illuminate\Database\Eloquent\Factories\Factory;

class SpecializationFactory extends Factory
{
    protected $model = Specialization::class;

    public function definition()
    {
        return [
            'college_id' => \App\Models\College::factory(), // يُفترض وجود Factory لـ College
            'name' => $this->faker->unique()->words(3, true),
            'summary' => $this->faker->paragraph,
            'details' => $this->faker->text(500),
            'title' => $this->faker->word,
            'icon' => $this->faker->imageUrl(64, 64, 'abstract'),
            'degree_type' => $this->faker->randomElement(['Bachelor', 'Master', 'PhD']),
            'academic_year_number' => $this->faker->numberBetween(1, 6),
        ];
    }
}
