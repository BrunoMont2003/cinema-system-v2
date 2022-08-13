<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (\App\Models\Hall::all() as $hall) {
            $capacity = $hall->capacity;
            $number_of_columns = intdiv($capacity, 10);
            if (DB::table('seats')->where('hall_id', $hall->id)->count() >= $capacity) {
                break;
            }
            for ($row = 'A'; $row < 'Z'; $row++) {
                for ($column = 1; $column <= $number_of_columns; $column++) {
                    if (DB::table('seats')->where('hall_id', $hall->id)->count() >= $capacity) {
                        break;
                    }

                    \App\Models\Seat::factory()->create([
                        'hall_id' => $hall->id,
                        'row' => $row,
                        'column' => $column,
                    ]);
                }
            }
        }
    }
}
