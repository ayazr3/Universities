<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'rateb@example.com',
        // ]);
           $this->call([
// SpecializationSeeder::class,
  //  AnnouncementSeeder::class,
//         UsersTableSeeder::class,
//           FaqSeeder::class,
//           AdmissionScheduleSeeder::class,
//         RegistrationStepSeeder::class,
//         SettingSeeder::class,
//         OfficialLinkSeeder::class,
//         TermSeeder::class,
//        GuidanceSeeder::class,
        // CollegeSeeder::class,
        // GovernoratesTableSeeder::class,
        // CourseSeeder::class
        // TopStudentSeeder::class
    //  GraduationProjectsTableSeeder::class
  //  FutureOpportunitiesSeeder::class
    //  SpecializationSeeder::class

// SpecializationSeeder::class,

        // AnnouncementSeeder::class,

        //   FaqSeeder::class,
          // AdmissionScheduleSeeder::class,
        // RegistrationStepSeeder::class,
        // SettingSeeder::class,
        OfficialLinkSeeder::class,
        // TermSeeder::class,
        // GuidanceSeeder::class,

      //     FaqSeeder::class,
      //     AdmissionScheduleSeeder::class,
      //   RegistrationStepSeeder::class,
      //   SettingSeeder::class,
      //   OfficialLinkSeeder::class,
      //   TermSeeder::class,
      //  GuidanceSeeder::class,
      //    GovernoratesTableSeeder::class,
      //   CollegeSeeder::class,
        //  SpecializationSeeder::class,
// UniversityCenterSeeder::class

    ]);
    }
}
