<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\Client::factory(30)->create();
        // \App\Models\Movie::factory(30)->create();
        // \App\Models\Hall::factory(30)->create();
        // \App\Models\Funxtion::factory(30)->create();
        // \App\Models\Seat::factory(30)->create();
        // \App\Models\Ticket::factory(30)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
            'password' => bcrypt('test'),
        ]);
    }
}
