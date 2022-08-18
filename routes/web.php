<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ClientviewController;
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

Route::resource('/clients', ClientController::class)->middleware(['auth', 'verified']);
Route::resource('/seats', SeatController::class)->middleware(['auth', 'verified']);
Route::resource('/functions', FunxtionController::class)->middleware(['auth', 'verified']);
Route::resource('/tickets', TicketController::class)->middleware(['auth', 'verified']);
Route::resource('/movies', MovieController::class)->middleware(['auth', 'verified']);
Route::resource('/halls', HallController::class)->middleware(['auth', 'verified']);
Route::get('/dashboard', [ClientviewController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/results', [ClientviewController::class, 'filterFunctions'])->middleware(['auth', 'verified'])->name('clientview.results');
Route::get('/functions/{id}/seats', [ClientviewController::class, 'chooseSeats'])->middleware(['auth', 'verified'])->name('clientview.seats');
Route::get('/functions/{id}/tickets/create', [ClientviewController::class, 'createTickets'])->middleware(['auth', 'verified'])->name('clientview.tickets.create');
Route::post('/functions/{id}/tickets', [ClientviewController::class, 'storeTickets'])->middleware(['auth', 'verified'])->name('clientview.tickets.store');
Route::get('/functions/{id}/tickets', [ClientviewController::class, 'showTickets'])->middleware(['auth', 'verified'])->name('clientview.tickets.show');
Route::get('/premiere', [ClientviewController::class, 'getBillboard'])->middleware(['auth', 'verified'])->name('clientview.premiere');
require __DIR__ . '/auth.php';
