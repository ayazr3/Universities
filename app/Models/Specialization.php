<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Specialization extends Model
{
    protected $fillable = [
        'college_id',
        'name',
        'summary',
        'details',
        'graduate_future',
        'name_graduate_future',
        'icon',
        'degree_type',
        'academic_year_number',
    ];

    // العلاقة مع College
    public function college()
    {
        return $this->belongsTo(College::class);
    }
}
