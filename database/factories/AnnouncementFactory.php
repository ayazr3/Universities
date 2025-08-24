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
        'image' => $this->faker->imageUrl(400, 300),
        'details' => $this->faker->paragraphs(3, true),
        'publish_date' => $this->faker->date(),  // إضافة حقل publish_date
        ];
    }
}
