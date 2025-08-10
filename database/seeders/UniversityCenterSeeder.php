<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UniversityCenter;

class UniversityCenterSeeder extends Seeder
{
    public function run()
    {
        // أنشئ 50 مركز جامعي وهمي
        UniversityCenter::factory()->count(50)->create();
    }
}
