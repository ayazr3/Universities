<?php

namespace Database\Seeders;

use App\Models\Guidance;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GuidanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         Guidance::factory()->count(10)->create();
    }
}
