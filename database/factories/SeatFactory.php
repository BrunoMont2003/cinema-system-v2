<?php

namespace Database\Factories;

use App\Models\Hall;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Seat>
 */
class SeatFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'hall_id' => Hall::pluck('id')->random(),
            'row' => $this->faker->randomLetter(),
            'column' => $this->faker->numberBetween(1, 25),
        ];
    }
}
