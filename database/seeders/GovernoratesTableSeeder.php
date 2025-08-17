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
            ['name' => 'دمشق'],
            ['name' => 'حلب'],
            ['name' => 'حمص'],
            ['name' => 'ادلب '],
            ['name' => 'درعا'],
            ['name' => 'دير الزور'],
            ['name' => 'اللاذقية'],
            ['name' => 'طرطوس '],
            ['name' => 'الحسكة'],
            ['name' => 'حماة'],
        ];

        DB::table('governorates')->insert($governorates);

         // مثال على إنشاء محافظات وهمية أو ضع المحافظات الحقيقية
        // $names = [
        //     'بغداد', 'البصرة', 'الموصل', 'النجف', 'كربلاء', // ضع كل المحافظات الفعلية هنا
        // ];
        // foreach($names as $name){
        //     Governorate::create(['name' => $name]);
        // }
        // أو بفاكتوري وهمي:
        // Governorate::factory()->count(10)->create();
    }
}
