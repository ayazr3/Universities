<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Announcement>
 */
class AnnouncementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(6, true),          // عنوان عشوائي
            'summary' => $this->faker->paragraph(2, true),        // ملخص نصي
            'publisher' => $this->faker->name(),                   // اسم الناشر
            'image' => $this->faker->imageUrl(640, 480, 'business'), // رابط صورة عشوائي
            'publish_date' => $this->faker->date(),                // تاريخ نشر عشوائي
            'details' => $this->faker->paragraphs(3, true),        // تفاصيل نصية متعددة الفقرات
        ];
    }
}
