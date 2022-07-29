<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\FunxtionController;
use App\Http\Controllers\HallController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\TicketController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('/clients', ClientController::class)->middleware(['auth', 'verified']);
Route::resource('/seats', SeatController::class)->middleware(['auth', 'verified']);
Route::resource('/functions', FunxtionController::class)->middleware(['auth', 'verified']);
Route::resource('/tickets', TicketController::class)->middleware(['auth', 'verified']);
Route::resource('/movies', MovieController::class)->middleware(['auth', 'verified']);
Route::resource('/halls', HallController::class)->middleware(['auth', 'verified']);
require __DIR__ . '/auth.php';
