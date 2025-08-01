<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Faq>
 */
class FaqFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            'question' => $this->faker->sentence(8),  // جملة عشوائية كسؤال
            'answer' => $this->faker->paragraph(3),   // فقرة عشوائية كإجابة
        ];
    }
}
