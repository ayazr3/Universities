<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        // إنشاء 50 مستخدمًا وهميًا
        \App\Models\User::factory(5)->create();
    }
}
