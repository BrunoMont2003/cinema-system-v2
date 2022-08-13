<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Seat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SeatController extends Controller
{
    protected $rules = [
        'hall' => 'required|exists:halls,id',
        'row' => 'required|string|size:1',
        'column' => 'required|integer|min:1|max:25',
    ];
    public function index()
    {
        $seats = Seat::all();
        foreach ($seats as $seat) {
            $seat['hall'] = Hall::find($seat['hall']);
        }
        return Inertia::render('seats/index', [
            'seats' => $seats,
        ]);
    }
    public function create()
    {
        $halls = Hall::all();
        return Inertia::render('seats/create', [
            'halls' => $halls,
        ]);
    }
    public function store(Request $request)
    {
        // validate the request...
        $validator = Validator::make($request->all(), $this->rules);
        if ($validator->fails()) {
            return redirect('/seats/create')
                ->withErrors($validator)
                ->withInput();
        }
        // validate if the row and column are unique together
        $seat = Seat::where('hall_id', $request->hall)
            ->where('row', $request->row)
            ->where('column', $request->column)
            ->first();
        if ($seat) {
            return redirect('/seats/create')
                ->withErrors(['row' => 'Row and column combination already exists'])
                ->withInput();
        }

        // store the new seat
        $seat = new Seat;
        $seat->hall_id = $request->hall;
        // row uppercase
        $seat->row = strtoupper($request->row);
        $seat->column = $request->column;
        $seat->save();
        // redirect to the index
        return redirect('/seats')->with('alert', ['type' => 'success', 'message' => 'Seat ' . $seat->row . $seat->column . ' created successfully']);
    }
    public function show($id)
    {
        $seat = Seat::find($id);
        $seat['hall'] = Hall::find($seat['hall_id']);
        return Inertia::render('seats/show', [
            'seat' => $seat,
        ]);
    }

    public function edit($id)
    {
        $seat = Seat::find($id);
        $halls = Hall::all();
        return Inertia::render('seats/edit', [
            'seat' => $seat,
            'halls' => $halls,
        ]);
    }

    public function update(Request $request, $id)
    {
        // validate the request...
        $validator = Validator::make($request->all(), $this->rules);
        if ($validator->fails()) {
            return redirect('/seats/' . $id . '/edit')
                ->withErrors($validator)
                ->withInput();
        }
        $seat = Seat::find($id);
        // validate if the row and column are unique together
        $seats = Seat::where('hall_id', $request->hall)
            ->where('row', $request->row)
            ->where('column', $request->column)->get();
        $is_this_seat = $seats->count() == 1 && ($seat->row == $seats[0]->row) && ($seat->column == $seats[0]->column) && ($seat->hall->id == $seats[0]->hall->id);
        if ($seats->count() > 0 && !$is_this_seat) {
            return redirect('/seats/' . $id . '/edit')
                ->withErrors(['row' => 'Row and column combination already exists'])
                ->withInput();
        }
        // update the seat
        $seat->hall_id = $request->hall;
        // row uppercase
        $seat->row = strtoupper($request->row);
        $seat->column = $request->column;
        $seat->save();
        // redirect to the index
        return redirect('/seats')->with('alert', ['type' => 'success', 'message' => 'Seat ' . $seat->row . $seat->column . ' updated successfully']);
    }

    public function destroy($id)
    {
        $seat = Seat::find($id);
        $seat->delete();
        return redirect('/seats')->with('alert', ['type' => 'success', 'message' => 'Seat ' . $seat->row . $seat->column . ' deleted successfully']);
    }
}
