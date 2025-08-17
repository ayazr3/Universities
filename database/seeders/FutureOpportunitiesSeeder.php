<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FutureOpportunities;

class FutureOpportunitiesSeeder extends Seeder
{
    public function run()
    {
        FutureOpportunities::factory()->count(40)->create();
    }
}
