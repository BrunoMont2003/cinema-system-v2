<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    // rules
    protected function getRules($id)
    {
        return [
            'dni' => 'required|digits:8|unique:clients,dni,' . $id,
            'first_name' => 'required',
            'last_name' => 'required',
            'birth_date' => 'required|date',
        ];
    }
    public function index()
    {
        return Inertia::render('clients/index', [
            'clients' => Client::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('clients/create');
    }

    public function store(Request $request)
    {
        $validate = $request->validate($this->getRules(''));
        $client = Client::create($validate);
        return redirect()->route('clients.index')->with('alert', [
            'type' => 'success',
            'message' => 'Client ' . $client->first_name .  ' ' . $client->last_name  . ' created successfully',
        ]);
    }

    public function show($id)
    {
        return Inertia::render('clients/show', [
            'client' => Client::find($id),
        ]);
    }
    public function edit(Client $client)
    {
        return Inertia::render('clients/edit', [
            'client' => $client,
        ]);
    }
    public function update(Request $request, $id)
    {
        // validate
        $validate = $request->validate($this->getRules($id));
        // update
        $client = Client::find($id);
        $client->update($validate);
        // redirect
        return redirect()->route('clients.index')->with('alert', [
            'type' => 'success',
            'message' => 'Client ' . $client->first_name . ' ' . $client->last_name . ' updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $client = Client::find($id);
        $client->delete();
        return redirect()->route('clients.index')->with('alert', [
            'type' => 'success',
            'message' => 'Client ' . $client->first_name . ' ' . $client->last_name . ' deleted successfully',
        ]);
    }
}
