<?php

namespace Database\Seeders;

use App\Models\OfficialLink;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OfficialLinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OfficialLink::factory()->count(10)->create();
    }
}
