<?php

namespace Database\Factories;

use App\Models\College;
use App\Models\Specialization;
use Illuminate\Database\Eloquent\Factories\Factory;

class SpecializationFactory extends Factory
{
    protected $model = Specialization::class;

    public function definition()
    {
        return [

            // 'college_id' => \App\Models\College::factory(), // يُفترض وجود Factory لـ College
            // 'name' => $this->faker->unique()->words(3, true),
            // 'summary' => $this->faker->paragraph,
            // 'details' => $this->faker->text(500),
            // 'title' => $this->faker->word,
            // 'icon' => $this->faker->imageUrl(64, 64, 'abstract'),
            // 'degree_type' => $this->faker->randomElement(['Bachelor', 'Master', 'PhD']),
            // 'academic_year_number' => $this->faker->numberBetween(1, 6),

            // assuming college_id exists in colleges table
            'college_id' => College::factory(),
            'name' => $this->faker->unique()->words(2, true),
            'summary' => $this->faker->sentence(10),
            'details' => $this->faker->paragraphs(3, true),
            'title' => $this->faker->sentence(3),
            'icon' => $this->faker->imageUrl(60, 60, 'abstract', true), // random image url
            'degree_type' => $this->faker->randomElement(['بكالوريوس', 'ماجستير', 'دكتوراه']),
            'academic_year_number' => $this->faker->numberBetween(1, 5),

        ];
    }
}
