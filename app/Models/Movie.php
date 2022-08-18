<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Movie extends Model
{
    use HasFactory;
    use CascadesDeletes;
    protected $fillable = ['title', 'duration', 'director', 'description', 'poster_path', 'release_date'];

    protected $deletesCascade = ['funxtions'];
    public function funxtions()
    {
        return $this->hasMany(Funxtion::class);
    }
}
