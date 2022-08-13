<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Funxtion;
use App\Models\Seat;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class TicketController extends Controller
{

    protected $rules = [
        'function' => 'required|exists:funxtions,id',
        'client' => 'required|exists:clients,id',
        'seat' => 'required|exists:seats,id',
    ];
    public function index()
    {
        $tickets = DB::table('tickets')
            ->join('clients', 'tickets.client_id', '=', 'clients.id')
            ->join('funxtions', 'tickets.funxtion_id', '=', 'funxtions.id')
            ->join('seats', 'tickets.seat_id', '=', 'seats.id')
            ->join('movies', 'funxtions.movie_id', '=', 'movies.id')
            ->join('halls', 'funxtions.hall_id', '=', 'halls.id')
            ->select('tickets.id', DB::raw('CONCAT(clients.first_name," ", clients.last_name) as client_name'), 'movies.title as movie_title', 'halls.name as hall_name', DB::raw('CONCAT(seats.row,"",seats.column) as seat'), 'funxtions.showtime as showtime')
            ->get();
        return Inertia::render('tickets/index', [
            'tickets' => $tickets
        ]);
    }

    public function create()
    {
        $functions = Funxtion::all();
        $client = Client::all();
        $seats  = Seat::all();
        // insert movies and halls inner functions
        foreach ($functions as $function) {
            $function['movie'] = $function->movie;
            $function['hall'] = $function->hall;
        }

        return Inertia::render('tickets/create', [
            'functions' => $functions,
            'clients' => $client,
            'seats' => $seats,
        ]);
    }

    public function store(Request $request)
    {
        // create a validator
        $validator = Validator::make($request->all(), $this->rules);
        // if the validator fails, redirect back to the form
        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }
        //custom hook validator
        // validate if the seat is free for the function
        $funxtion = Funxtion::find($request->function);
        $seat = Seat::find($request->seat);
        $seat_funxtion = DB::table('tickets')
            ->where('funxtion_id', $funxtion->id)
            ->where('seat_id', $seat->id)
            ->first();
        if ($seat_funxtion) {
            return redirect()
                ->back()
                ->withErrors(['seat' => 'The seat is not free for the function.']);
        }

        //create ticket
        $ticket = Ticket::create([
            'funxtion_id' => $request->function,
            'client_id' => $request->client,
            'seat_id' => $request->seat,
        ]);
        //redirect to index
        return redirect()->route('tickets.index')->with('alert', [
            'type' => 'success',
            'message' => 'Ticket created successfully',
        ]);
    }

    public function show($id)
    {
        //get the ticket
        $ticket = Ticket::find($id);
        //get the client
        $client = Client::find($ticket->client_id);
        //get the function
        $function = Funxtion::find($ticket->funxtion_id);
        //get the seat
        $seat = Seat::find($ticket->seat_id);
        //get the movie
        $movie = $function->movie;
        //get the hall
        $hall = $function->hall;
        //return the view
        return Inertia::render('tickets/show', [
            'client' => $client,
            'function' => $function,
            'seat' => $seat,
            'movie' => $movie,
            'hall' => $hall,
        ]);
    }
    public function edit($id)
    {
        //get the ticket
        $ticket = Ticket::find($id);
        $functions = Funxtion::all();
        $client = Client::all();
        $seats  = Seat::all();
        // insert movies and halls inner functions
        foreach ($functions as $function) {
            $function['movie'] = $function->movie;
            $function['hall'] = $function->hall;
        }

        return Inertia::render('tickets/edit', [
            'functions' => $functions,
            'clients' => $client,
            'seats' => $seats,
            'ticket' => $ticket,
        ]);
    }
    public function update(Request $request, $id)
    {
        // create a validator
        $validator = Validator::make($request->all(), $this->rules);
        // if the validator fails, redirect back to the form
        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }
        //custom hook validator
        // validate if the seat is free for the function but ignore the current ticket
        $funxtion = Funxtion::find($request->function);
        $seat = Seat::find($request->seat);
        $seat_funxtion = DB::table('tickets')
            ->where('funxtion_id', $funxtion->id)
            ->where('seat_id', $seat->id)
            ->where('id', '!=', $id)
            ->first();
        if ($seat_funxtion) {
            return redirect()
                ->back()
                ->withErrors(['seat' => 'The seat is not free for the function.']);
        }
        //update ticket
        $ticket = Ticket::find($id);
        $ticket->funxtion_id = $request->function;
        $ticket->client_id = $request->client;
        $ticket->seat_id = $request->seat;
        $ticket->save();
        //redirect to index
        return redirect()->route('tickets.index')->with('alert', [
            'type' => 'success',
            'message' => 'Ticket updated successfully',
        ]);
    }
    public function destroy($id)
    {
        // get the ticket
        $ticket = Ticket::find($id);
        // delete the ticket
        $ticket->delete();
        // redirect to index
        return redirect()->route('tickets.index')->with('alert', [
            'type' => 'success',
            'message' => 'Ticket deleted successfully',
        ]);
    }
}
