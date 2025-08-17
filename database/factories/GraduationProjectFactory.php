<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class GraduationProjectFactory extends Factory
{
    public function definition(): array
    {
        // مثال لملفات وصور محفوظة في المسار storage/app/public
        $thesisFile = 'theses/' . $this->faker->unique()->uuid . '.pdf';
        $projectImages = [
            'images/projects/' . $this->faker->unique()->uuid . '.jpg',
            'images/projects/' . $this->faker->unique()->uuid . '.png'
        ];

        return [
            'specialization_id' => 1, // يمكنك تغيره لاحقاً بقيمة مناسبة أو relations
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'thesis_file' => $thesisFile,
            'project_images' => json_encode($projectImages),
            'graduation_year' => $this->faker->year(),
            'team_members' => json_encode([
                $this->faker->name(),
                $this->faker->name(),
            ]),
            'supervisor' => $this->faker->name(),
        ];
    }
}
