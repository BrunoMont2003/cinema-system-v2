<?php

namespace App\Http\Controllers;

use App\Models\Funxtion;
use App\Models\Hall;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class FunxtionController extends Controller
{
    protected $rules = [
        'movie' => 'required|exists:movies,id',
        'hall' => 'required|exists:halls,id',
        'showtime' => 'required|date',
    ];

    public function index()
    {
        return Inertia::render('functions/index', [
            'functions' => DB::table('funxtions')
                ->join('movies', 'funxtions.movie_id', '=', 'movies.id')
                ->join('halls', 'funxtions.hall_id', '=', 'halls.id')
                ->select('funxtions.id', 'movies.title as movie', 'halls.name as hall', 'funxtions.showtime')
                ->get(),
        ]);
    }

    public function create()
    {
        $movies = Movie::all();
        $halls = Hall::all();
        return Inertia::render('functions/create', [
            'movies' => $movies,
            'halls' => $halls,
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
        return redirect()->route('functions.index')->with('alert', ['type' => 'success', 'message' => 'Function created successfully.']);
    }
    public function show($id)
    {
        $function = Funxtion::find($id);
        $function['movie'] = Movie::find($function['movie']);
        $function['hall'] = Hall::find($function['hall']);
        return Inertia::render('functions/show', [
            'function' => $function,
        ]);
    }

    public function edit($id)
    {
        $function = Funxtion::find($id);
        $movies = Movie::all();
        $halls = Hall::all();
        return Inertia::render('functions/edit', [
            'function' => $function,
            'movies' => $movies,
            'halls' => $halls,
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
        $function = Funxtion::find($id);
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
        $is_this_function =  ($functions->count() == 1) && ($functions[0]->movie_id == $function->movie->id) && ($functions[0]->hall_id == $function->hall->id);
        if (!$is_this_function && count($functions) > 0) {
            return redirect()
                ->back()
                ->withErrors(['showtime' => 'The hall is not free at this time.']);
        }
        // if the validator passes, create the function
        $function->update([
            'movie_id' => $request->movie,
            'hall_id' => $request->hall,
            'showtime' => $request->showtime,
        ]);
        // redirect to index
        return redirect()->route('functions.index')->with('alert', ['type' => 'success', 'message' => 'Function updated successfully.']);
    }

    public function destroy($id)
    {
        $function = Funxtion::find($id);
        $function->delete();
        return redirect()->route('functions.index')->with('alert', ['type' => 'success', 'message' => 'Function deleted successfully.']);
    }
}
