<?php

namespace App\Http\Controllers;

use App\Models\Funxtion;
use App\Models\Hall;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class FunxtionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $functions = Funxtion::all();
        foreach ($functions as $function) {
            $function['movie'] = Movie::find($function['movie']);
            $function['hall'] = Hall::find($function['hall']);
        }
        // $functions = $functions->sortBy('showtime')->toArray();
        return Inertia::render('functions/index', [
            'functions' => $functions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $movies = Movie::all();
        $halls = Hall::all();
        return Inertia::render('functions/create', [
            'movies' => $movies,
            'halls' => $halls,
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
        // create a validator
        $validator = Validator::make($request->all(), [
            'movie' => 'required|exists:movies,id',
            'hall' => 'required|exists:halls,id',
            'showtime' => 'required|date',
        ]);
        // if the validator fails, redirect back to the form
        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }
        //custom hook validator
        //validate showtime and hall are free at least the duration of the movie
        $movie = Movie::find($request->movie);
        $showtime = $request->showtime;
        $duration = $movie->duration;
        $showtime_end = date('Y-m-d H:i:s', strtotime($showtime . ' + ' . $duration . ' minutes'));
        $functions = Funxtion::where('hall_id', $request->hall)
            ->where('showtime', '>=', $showtime)
            ->where('showtime', '<=', $showtime_end)
            ->get();
        if (count($functions) > 0) {
            return redirect()
                ->back()
                ->withErrors(['showtime' => 'The hall is not free at this time.']);
        }

       


        // if the validator passes, create the function
        $function = Funxtion::create([
            'movie_id' => $request->movie,
            'hall_id' => $request->hall,
            'showtime' => $request->showtime,
        ]);
        // redirect to index
        return redirect()->route('functions.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Funxtion  $funxtion
     * @return \Illuminate\Http\Response
     */
    public function show(Funxtion $funxtion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Funxtion  $funxtion
     * @return \Illuminate\Http\Response
     */
    public function edit(Funxtion $funxtion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Funxtion  $funxtion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Funxtion $funxtion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Funxtion  $funxtion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Funxtion $funxtion)
    {
        //
    }
}
