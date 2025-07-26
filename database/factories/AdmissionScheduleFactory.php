<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AdmissionSchedule>
 */
class AdmissionScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'title' => $this->faker->sentence(3),
            // 'body' => $this->faker->paragraph(3),
            // 'date' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            // 'name' => $this->faker->name,
            'title' => $this->faker->sentence(3),
            'body' => $this->faker->paragraph(3),
            'date' => $this->faker->dateTimeBetween('now', '+1 year')->format('Y-m-d'),
            'name' => $this->faker->name,
            'file_url' => 'admission_files/sample-file.pdf',
        ];
    }
}
