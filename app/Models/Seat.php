<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Seat extends Model
{
    use HasFactory;
    use CascadesDeletes;
    protected $fillable = ['hall_id', 'row', 'column'];

    protected $cascadeDeletes = ['tickets'];
    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
