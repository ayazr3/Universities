<?php

namespace Database\Seeders;

use App\Models\AdmissionSchedule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdmissionScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // إنشاء 50 سجل وهمي
        AdmissionSchedule::factory()->count(10)->create();
    }
}
