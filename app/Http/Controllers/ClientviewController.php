<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Funxtion;
use App\Models\Movie;
use App\Models\Ticket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientviewController extends Controller
{
    public function index(Request $request)
    {
        // if is empty the request do the above
        $movies = Movie::all();
        $days = $this->getSomeDays();
        $functions = null;
        $movie = '';
        $date = '';
        if (count($request->all()) > 0) {
            $validated = $request->validate([
                'date' => 'required|date',
                'movie' => 'required|integer|exists:movies,id',
            ]);
            $movie = Movie::find($validated['movie']);
            $date = Carbon::parse($validated['date'])->format('Y-m-d');
            $functions = Funxtion::where('movie_id', $movie->id)->where('showtime', 'like', $date . '%')->orderBy('showtime', 'asc')->get();
        }
        return Inertia::render('clientview/index', [
            'movies' => $movies,
            'days' => $days,
            'functions' => $functions,
            'movie' => $movie,
            'date' => $date,
        ]);
    }

    private function getSomeDays()
    {
        $days =  [];
        for ($i = 0; $i < 7; $i++) {
            $day = Carbon::now()->addDays($i)->toDateString('Y-m-d');
            array_push($days, $day);
        }
        return $days;
    }

    public function search(Request $request)
    {

        $validated = $request->validate([
            'movie' => 'required|numeric',
            'date' => 'required|date'
        ]);
        return redirect()->route('clientview.results', ['movie' => $validated['movie'], 'date' => $validated['date']]);
    }

    public function filterFunctions(Request $request)
    {
        $movie = Movie::find(request('movie'));
        $date = Carbon::parse(request('date'))->format('Y-m-d');
        $functions = Funxtion::where('movie', $movie->id)->where('showtime', 'like', $date . '%')->orderBy('showtime', 'asc')->get();
        return Inertia::render('clientview/results', [
            'functions' => $functions,
            'movie' => $movie,
            'date' => $date,
        ]);
    }
    public function chooseSeats($id)
    {
        $function = Funxtion::findOrFail($id);
        // insert the movie into the function
        $function->movie = $function->movie()->first();
        // insert the hall into the function
        $function->hall = $function->hall()->first();

        // get the seats of the function
        $seats = $function->hall->seats()->get();

        // set the status of the seat, if it is on a ticket for the function, it is busy else it is free
        foreach ($seats as $seat) {
            $seat->status = $seat->tickets()->where('funxtion_id', $function->id)->first() ? 'busy' : 'free';
        }

        return Inertia::render('clientview/seats', [
            'function' => $function,
            'seats' => $seats,
        ]);
    }
    public function createTickets(Request $request, $id)
    {

        $clients = Client::all();
        $function = Funxtion::findOrFail($id);
        $function->movie = $function->movie()->first();
        $function->hall = $function->hall()->first();
        $seatsIds = $request->seats;
        $seats = $function->hall->seats()->whereIn('id', $seatsIds)->get();
        return Inertia::render(
            'clientview/tickets/create',
            [
                'function' => $function,
                'seats' => $seats,
                'clients' => $clients,
            ]
        );
    }
    public function storeTickets(Request $request, $id)
    {
        // validate the request...
        $validated = $request->validate([
            'seats' => 'required|array',
            'seats.*' => 'required|integer|exists:seats,id',
            'client_id' => 'required|integer|exists:clients,id',
        ]);
        $function = Funxtion::findOrFail($id);
        $function->movie = $function->movie()->first();
        $function->hall = $function->hall()->first();
        $seatsIds = $validated['seats'];
        $seats = $function->hall->seats()->whereIn('id', $seatsIds)->get();
        $client = Client::find($validated['client_id']);
        $tickets = [];
        foreach ($seats as $seat) {
            $ticket = new Ticket();
            $ticket->seat_id = $seat->id;
            $ticket->funxtion_id = $function->id;
            $ticket->client_id = $client->id;
            $ticket->save();
            array_push($tickets, $ticket);
        }
        // get a array of the id's of the tickets
        $ticketIds = array_map(function ($ticket) {
            return $ticket->id;
        }, $tickets);
        return redirect()->route('clientview.tickets.show', ['id' => $function->id, 'tickets' => $ticketIds, 'function' => $function, 'client_id' => $client->id]);
    }
    public function showTickets(Request $request, $functionId)
    {
        $validated = $request->validate([
            'tickets' => 'required|array',
            'client_id' => 'required|integer|exists:clients,id',
        ]);
        //get client
        $client = Client::find($validated['client_id']);
        //get tickets
        $tickets = Ticket::whereIn('id', $validated['tickets'])->get();
        $function = Funxtion::findOrFail($functionId);
        $function->movie = $function->movie()->first();
        $function->hall = $function->hall()->first();
        // insert seat into ticket
        foreach ($tickets as $ticket) {
            $ticket->seat = $ticket->seat()->first();
        }
        return Inertia::render('clientview/tickets/success', [
            'tickets' => $tickets,
            'function' => $function,
            'client' => $client
        ]);
    }

    public function getBillboard()
    {
        // get the movies wich their release_date is in these days
        $movies = Movie::where('release_date', '>=', Carbon::now()->toDateString())->where('release_date', '<=', Carbon::now()->addMonth()->toDateString())->get();
        return Inertia::render('clientview/premiere/index', [
            'movies' => $movies,
        ]);
    }
}
