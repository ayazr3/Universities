<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TopStudent;

class TopStudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // مثال: إنشاء 20 طالب متفوق عشوائي
        TopStudent::factory()->count(20)->create();
    }
}
