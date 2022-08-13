<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Funxtion extends Model
{
    use HasFactory;
    use CascadesDeletes;
    protected $fillable = ['movie_id', 'hall_id', 'showtime'];

    protected $cascadeDeletes = ['tickets'];
    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }
    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }
    public function ticket()
    {
        return $this->hasMany(Ticket::class);
    }
}
