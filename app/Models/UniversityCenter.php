<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UniversityCenter extends Model
{
    use HasFactory;

     protected $fillable = [
        'name',
        'description',
        'governorate_id',
    ];

    public function governorate()
    {
        return $this->belongsTo(Governorate::class);
        //  return $this->hasMany(\App\Models\UniversityCenter::class);
}
    }

