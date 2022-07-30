<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Funxtion;
use App\Models\Seat;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'funxtion_id' => Funxtion::pluck('id')->random(),
            'client_id' => Client::pluck('id')->random(),
            'seat_id' => Seat::pluck('id')->random(),
        ];
    }
}
