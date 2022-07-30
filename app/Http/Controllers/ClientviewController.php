<?php

namespace App\Http\Controllers;

use App\Models\Funxtion;
use App\Models\Movie;
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
}
