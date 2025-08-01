<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'specialization_id',
        'name',
        'description',
        'file_url',
        'academic_year_number',
    ];

    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }
}
