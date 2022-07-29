<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $fillable = ['dni', 'first_name', 'last_name', 'birth_date'];

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
