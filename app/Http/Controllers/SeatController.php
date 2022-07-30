<?php

namespace App\Http\Controllers;

use App\Models\Hall;
use App\Models\Seat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SeatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $halls = Hall::all();
        return Inertia::render('seats/create', [
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
        // validate the request...
        $validator = Validator::make($request->all(), [
            'hall' => 'required|exists:halls,id',
            'row' => 'required|string|size:1',
            'column' => 'required|integer|min:1|max:25',
        ]);
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
        return redirect('/seats');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Seat  $seat
     * @return \Illuminate\Http\Response
     */
    public function show(Seat $seat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Seat  $seat
     * @return \Illuminate\Http\Response
     */
    public function edit(Seat $seat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Seat  $seat
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Seat $seat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Seat  $seat
     * @return \Illuminate\Http\Response
     */
    public function destroy(Seat $seat)
    {
        //
    }
}
