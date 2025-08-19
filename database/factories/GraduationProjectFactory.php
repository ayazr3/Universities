<?php

namespace Database\Factories;

use App\Models\GraduationProject;
use App\Models\Specialization;
use Illuminate\Database\Eloquent\Factories\Factory;

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
