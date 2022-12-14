<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Hall>
 */
class HallFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->bothify('Hall ?##'),
            'capacity' => $this->faker->numberBetween(160, 250),
            'number_of_columns' => $this->faker->numberBetween(10, 15),
        ];
    }
}
