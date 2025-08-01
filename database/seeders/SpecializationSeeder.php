<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Specialization;

class SpecializationSeeder extends Seeder
{
    public function run()
    {
        // اذا ترغب في إنشاء بيانات خاصة لكل تخصص مثلاً
        Specialization::factory()->count(20)->create();
    }
}
