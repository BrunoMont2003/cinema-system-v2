<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieController extends Controller
{
    // rules
    protected function getRules($id)
    {
        return [
            'title' => 'required|string|max:255|unique:movies,title,' . $id,
            'description' => 'string|max:255',
            'duration' => 'required|numeric|min:0|max:300',
            'director' => 'required|string|max:255',
            'poster_path' => 'url|max:255',
            'release_date' => 'required|date',
        ];
    }
    public function index()
    {
        return Inertia::render('movies/index', [
            'movies' => Movie::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('movies/create');
    }

    public function store(Request $request)
    {
        // Validate the request...
        $request->validate($this->getRules(null));
        // Create the movie...
        $movie = Movie::create($request->all());
        // Redirect to the movie's index
        return redirect()->route('movies.index')->with('alert', [
            'type' => 'success',
            'message' => 'Movie ' . $movie->title . ' was created successfully.',
        ]);
    }

    public function show(Movie $movie)
    {
        return Inertia::render('movies/show', [
            'movie' => $movie,
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('movies/edit', [
            'movie' => Movie::find($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        // validate the request...
        $request->validate($this->getRules($id));
        // update the movie...
        $movie = Movie::find($id);
        $movie->update($request->all());
        // Redirect to the movie's index
        return redirect()->route('movies.index')->with('alert', [
            'type' => 'success',
            'message' => 'Movie ' . $movie->title . ' was updated successfully.',
        ]);
    }

    public function destroy($id)
    {
        // Delete the movie...
        $movie = Movie::find($id);
        $movie->delete();
        // Redirect to the movie's index
        return redirect()->route('movies.index')->with('alert', [
            'type' => 'success',
            'message' => 'Movie ' . $movie->title . ' was deleted successfully.',
        ]);
    }
}
