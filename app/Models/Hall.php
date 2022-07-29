<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'capacity'];

    public function funxtions()
    {
        return $this->hasMany(Funxtion::class);
    }
    public function seats()
    {
        return $this->hasMany(Seat::class);
    }
}
