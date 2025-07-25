<?php

namespace Database\Factories;

use App\Models\College;
use App\Models\Governorate; // تأكد أن الاسم صحيح حسب موديل المحافظات
use Illuminate\Database\Eloquent\Factories\Factory;

class CollegeFactory extends Factory
{
    protected $model = College::class;

    public function definition()
    {
        return [
            'governorate_id' => Governorate::inRandomOrder()->value('id') ?? 1, // اختر آي دي عشوائي أو 1 إذا ما فيه محافظات بعد
            'name' => $this->faker->company . ' College',
            'image' => $this->faker->imageUrl(400, 300, 'education', true, 'college'),
            'summary' => $this->faker->sentence(15),
            'details' => $this->faker->paragraph(3),
            'location' => json_encode([
                'lat' => $this->faker->latitude,
                'lng' => $this->faker->longitude,
                'address' => $this->faker->address,
            ]),
            'establishment_year' => $this->faker->year,
            'student_count' => $this->faker->numberBetween(1000, 10000),
            'official_link' => $this->faker->url,
            'college' => $this->faker->boolean(80), // 80% true
        ];
    }
}
