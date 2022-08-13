<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use ShiftOneLabs\LaravelCascadeDeletes\CascadesDeletes;

class Client extends Model
{
    use HasFactory;
    use CascadesDeletes;
    protected $fillable = ['dni', 'first_name', 'last_name', 'birth_date'];
    protected $deletesCascade = ['tickets'];
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
