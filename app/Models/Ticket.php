<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    protected $fillable = ['client_id', 'seat_id', 'funxtion_id'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function seat()
    {
        return $this->belongsTo(Seat::class);
    }
    public function funxtion()
    {
        return $this->belongsTo(Funxtion::class);
    }
}
