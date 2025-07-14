<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RegistrationStep>
 */
class RegistrationStepFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //   'step_name' => $this->faker->words(3, true), // اسم الخطوة مكون من 3 كلمات
            // 'description' => $this->faker->paragraph,     // وصف نصي
            // 'sub_step' => json_encode([
            //     $this->faker->sentence,
            //     $this->faker->sentence,
            //     $this->faker->sentence,
            // ]), // مصفوفة JSON من خطوات فرعية
            // 'created_at' => now(),
            // 'updated_at' => now(),

            'step_name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'sub_step' => json_encode($this->faker->sentences(3)),
        ];
    }
}
