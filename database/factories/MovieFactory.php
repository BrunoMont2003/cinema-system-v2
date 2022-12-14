<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(2),
            'description' => $this->faker->sentence(10),
            'duration' => $this->faker->numberBetween(1, 300),
            'director' => $this->faker->name(),
            'poster_path' => $this->faker->imageUrl(),
            'release_date' => $this->faker->dateTimeBetween('now', '2 weeks')->format('Y-m-d'),
        ];
    }
}
