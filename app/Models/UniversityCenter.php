<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UniversityCenter extends Model
{
    use HasFactory;

    public function governorate()
    {
        return $this->belongsTo(Governorate::class);
    }
}
