<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class College extends Model
{

     use HasFactory;

    protected $fillable = [
        'governorate_id',
        'name',
        'image',
        'summary',
        'details',
        'location',
        'establishment_year',
        'student_count',
        'official_link',
        'college',
    ];

    protected $casts = [
        'location' => 'array',
        'college' => 'boolean',
    ];

    public function governorate()
    {
        return $this->belongsTo(Governorate::class);
    }
    public function specializations()
    {
        return $this->hasMany(Specialization::class);
    }
}


