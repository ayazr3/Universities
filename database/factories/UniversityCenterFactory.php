<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UniversityCenterFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->company(),  // اسم عشوائي لاسم المركز
            'description' => $this->faker->paragraph(),  // وصف عشوائي
            'governorate_id' => \App\Models\Governorate::inRandomOrder()->first()->id,  // يفترض وجود جدول governorates
        ];
    }
}
