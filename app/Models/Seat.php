<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    use HasFactory;
    protected $fillable = ['hall_id', 'row', 'column'];

    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
