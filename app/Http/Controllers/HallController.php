<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HallController extends Controller
{
    protected function getRules($id)
    {
        $pattern = '/^hall [A-Z]{1}[0-9]{2}$/i';
        return [
            'name' => ['required', 'string', 'regex:' . $pattern, 'unique:halls,name,' . $id],
            'capacity' => 'required|integer|min:100|max:1000',
        ];
    }
    protected $messages = [
        'name.regex' => 'The name must be in the format of "hall A12".',
        'name.unique' => 'The name has already been taken.',
    ];
    public function index()
    {
        return Inertia::render('halls/index', [
            'halls' => Hall::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('halls/create');
    }

    public function store(Request $request)
    {
        // create a regex pattern in format:Hall A## or hall A##

        $request->validate(
            $this->getRules(null),
            $this->messages
        );
        $hall = Hall::create($request->all());
        return redirect()->route('halls.index')->with('alert', [
            'type' => 'success',
            'message' => $hall->name . ' created successfully.',
        ]);
    }

    public function show($id)
    {
        $hall = Hall::findOrFail($id);
        return Inertia::render('halls/show', [
            'hall' => $hall,
        ]);
    }

    public function edit($id)
    {
        $hall = Hall::findOrFail($id);
        return Inertia::render('halls/edit', [
            'hall' => $hall,
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate(
            $this->getRules($id),
            $this->messages
        );
        $hall = Hall::findOrFail($id);
        $hall->update($request->all());
        return redirect()->route('halls.index')->with('alert', [
            'type' => 'success',
            'message' => $hall->name . ' updated successfully.',
        ]);
    }

    public function destroy($id)
    {
        $hall = Hall::findOrFail($id);
        $hall->delete();
        return redirect()->route('halls.index')->with('alert', [
            'type' => 'success',
            'message' => $hall->name . ' deleted successfully.',
        ]);
    }
}
