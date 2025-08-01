<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


use Illuminate\Database\Eloquent\Factories\HasFactory;


class Specialization extends Model
{
        use HasFactory;
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

    public function college()
    {
        return $this->belongsTo(College::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    // دالة للحصول على المقررات حسب السنة الدراسية
    public function getCoursesByYear($year)
    {
        return $this->courses()->where('academic_year_number', $year)->get();
    }
}
// في موديل Specialization.php
