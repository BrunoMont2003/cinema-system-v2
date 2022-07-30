<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Funxtion;
use App\Models\Seat;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tickets = Ticket::all();
        foreach ($tickets as $ticket) {
            $ticket['funxtion'] = $ticket->funxtion;
            $ticket['client'] = $ticket->client;
            $ticket['seat'] = $ticket->seat;
            $ticket['movie'] = $ticket->funxtion->movie;
            $ticket['hall'] = $ticket->funxtion->hall;
        }
        return Inertia::render('tickets/index', [
            'tickets' => $tickets,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validate request
        $request->validate([
            'function' => 'required|exists:funxtions,id',
            'client' => 'required|exists:clients,id',
            'seat' => 'required|exists:seats,id',
        ]);
        //create ticket
        $ticket = Ticket::create([
            'funxtion_id' => $request->function,
            'client_id' => $request->client,
            'seat_id' => $request->seat,
        ]);
        //redirect to index
        return redirect()->route('tickets.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function show(Ticket $ticket)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ticket $ticket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ticket $ticket)
    {
        //
    }
}
