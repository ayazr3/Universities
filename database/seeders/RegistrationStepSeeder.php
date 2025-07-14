<?php

namespace Database\Seeders;

use App\Models\RegistrationStep;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegistrationStepSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         RegistrationStep::factory()->count(10)->create();
    }
}
