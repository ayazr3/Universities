<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GovernoratesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $governorates = [
            ['name' => 'القاهرة'],
            ['name' => 'الجيزة'],
            ['name' => 'الإسكندرية'],
            ['name' => 'المنصورة'],
            ['name' => 'أسوان'],
            ['name' => 'الأقصر'],
            ['name' => 'سوهاج'],
            ['name' => 'الشرقية'],
            ['name' => 'الدقهلية'],
            ['name' => 'المنوفية'],
        ];

        DB::table('governorates')->insert($governorates);
    }
}
