<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\College;

class CollegeSeeder extends Seeder
{
    public function run(): void
    {
        // يُنشأ 20 كلية عشوائياً (عدد قابل للتغيير)
        College::factory()->count(20)->create();
    }
}
