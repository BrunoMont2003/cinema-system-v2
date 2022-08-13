<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Hall extends Model
{
    use HasFactory;
    use CascadesDeletes;
    protected $fillable = ['name', 'capacity'];
    protected $deletesCascade = ['funxtions', 'seats'];
    public function funxtions()
    {
        return $this->hasMany(Funxtion::class);
    }
    public function seats()
    {
        return $this->hasMany(Seat::class);
    }
}
