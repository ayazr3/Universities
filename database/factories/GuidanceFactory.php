<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Guidance>
 */
class GuidanceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //  'college_id' => \App\Models\College::factory(),
            'title' => $this->faker->sentence(3),
            'image' => $this->faker->imageUrl(),
            'description' => $this->faker->paragraph(),
            'link' => $this->faker->url(),
            'type' => $this->faker->randomElement(['article','booke','video','advice']),
        ];
    }
}
