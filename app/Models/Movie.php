<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'duration', 'director', 'description', 'poster_path', 'release_year'];

    public function funxtions()
    {
        return $this->hasMany(Funxtion::class);
    }
}
