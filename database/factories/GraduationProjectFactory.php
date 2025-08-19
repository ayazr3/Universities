<?php

namespace Database\Factories;


use Illuminate\Database\Eloquent\Factories\Factory;

// class GraduationProjectFactory extends Factory
// {
//     public function definition(): array
//     {
//         // مثال لملفات وصور محفوظة في المسار storage/app/public
//         $thesisFile = 'theses/' . $this->faker->unique()->uuid . '.pdf';
//         $projectImages = [
//             'images/projects/' . $this->faker->unique()->uuid . '.jpg',
//             'images/projects/' . $this->faker->unique()->uuid . '.png'
//         ];

//         return [
//             'specialization_id' => 1, // يمكنك تغيره لاحقاً بقيمة مناسبة أو relations
//             'name' => $this->faker->sentence(3),
//             'description' => $this->faker->paragraph(),
//             'thesis_file' => $thesisFile,
//             'project_images' => json_encode($projectImages),
//             'graduation_year' => $this->faker->year(),
//             'team_members' => json_encode([
//                 $this->faker->name(),
//                 $this->faker->name(),
//             ]),

use App\Models\GraduationProject;
use App\Models\Specialization;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GraduationProject>
 */
class GraduationProjectFactory extends Factory
{
    protected $model = GraduationProject::class;

    public function definition()
    {
        $specialization = Specialization::inRandomOrder()->first();

        return [
            'specialization_id' => $specialization ? $specialization->id : null,
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(4),
            'thesis_file' => 'graduation_theses/' . $this->faker->unique()->word() . '.pdf',
            'project_images' => [
                'graduation_images/' . $this->faker->unique()->word() . '.jpg',
                'graduation_images/' . $this->faker->unique()->word() . '.jpg',
            ],
            'graduation_year' => $this->faker->year(),
            'team_members' => $this->faker->randomElements([
                $this->faker->name(),
                $this->faker->name(),
                $this->faker->name(),
                $this->faker->name()
            ], $this->faker->numberBetween(1, 4)),

            'supervisor' => $this->faker->name(),
        ];
    }
}
