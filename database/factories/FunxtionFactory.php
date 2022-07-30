<?php

namespace Database\Factories;

use App\Models\Hall;
use App\Models\Movie;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Funxtion>
 */
class FunxtionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'movie_id' => Movie::pluck('id')->random(),
            'hall_id' => Hall::pluck('id')->random(),
            'showtime' => $this->faker->dateTimeBetween('now', '+2 days'),
        ];
    }
}
