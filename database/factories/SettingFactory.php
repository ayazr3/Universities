<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Setting>
 */
class SettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
             'site_name'   => $this->faker->company,
            'logo'        => $this->faker->imageUrl(100, 100, 'business', true, 'logo'),
            'url'         => $this->faker->url,
            'location'    => json_encode([
                'lat' => $this->faker->latitude(24.4, 24.9),  // نطاق تقريبي لخط العرض (مثلاً الرياض)
                'lng' => $this->faker->longitude(46.5, 47.0), // نطاق تقريبي لخط الطول
            ]),
            'description' => $this->faker->paragraph,
        ];
    }
}
