<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class AnnouncementFactory extends Factory
{
    protected $model = \App\Models\Announcement::class;

    public function definition()
    {
        return [
            'title' => $this->faker->sentence(6, true),
            'summary' => $this->faker->text(200),
            'publisher' => $this->faker->name(),
            'image' => $this->faker->image('public/storage/images', 640, 480, null, false), // or just a filename string
            'publish_date' => $this->faker->date(),
            'details' => $this->faker->paragraphs(3, true),
        ];
    }
}
