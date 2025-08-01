<?php

namespace Database\Factories;

use App\Models\Specialization;
use App\Models\College;
use Illuminate\Database\Eloquent\Factories\Factory;

class SpecializationFactory extends Factory
{
    protected $model = Specialization::class;

    public function definition()
    {
        return [
            'college_id' => College::factory(), // تفترض وجود factory لـ College
            'name' => $this->faker->unique()->words(3, true), // اسم مكون من عدة كلمات
            'summary' => $this->faker->paragraph(),
            'details' => $this->faker->paragraphs(3, true),
            'graduate_future' => $this->faker->paragraph(),
            'name_graduate_future' => $this->faker->jobTitle(),
            'icon' => $this->faker->imageUrl(100, 100, 'education', true, 'icon'),
            'degree_type' => $this->faker->randomElement(['بكالوريوس', 'ماجستير', 'دكتوراه']),
            'academic_year_number' => $this->faker->numberBetween(1, 5),
        ];
    }
}
