<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class College extends Model
{
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
}
