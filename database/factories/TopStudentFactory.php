<?php

namespace Database\Factories;

use App\Models\TopStudent;
use App\Models\Specialization;
use Illuminate\Database\Eloquent\Factories\Factory;

class TopStudentFactory extends Factory
{
    protected $model = TopStudent::class;

    public function definition()
    {
        return [
            'specialization_id' => Specialization::factory(), // إذا عندك factory لـ Specialization، أو استخدم id عشوائي موجود
            'name' => $this->faker->name(),
            'image' => $this->faker->imageUrl(100, 100, 'people'), // رابط صورة عشوائية
            'gpa' => $this->faker->randomFloat(2, 2.0, 4.0), // مثلاً من 2.0 إلى 4.0
            'rank' => $this->faker->numberBetween(1, 100),
            'graduation_year' => $this->faker->year('now'),  // سنة التخرج حتى السنة الحالية
        ];
    }
}
