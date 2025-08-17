<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\Specialization;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseFactory extends Factory
{
    protected $model = Course::class;

    public function definition()
    {
        return [
            'specialization_id' => Specialization::factory(),  // يعتمد على Factory للـ Specialization
            'name' => $this->faker->unique()->words(3, true), // مثال: "introduction to programming"
            'description' => $this->faker->paragraphs(2, true),
            'file_url' => $this->faker->url(),  // رابط ملف وهمي، يمكنك تغييره حسب حاجتك
            'academic_year_number' => $this->faker->numberBetween(1, 5),
        ];
    }
}
