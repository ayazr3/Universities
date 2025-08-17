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
        'title',
        'icon',
        'degree_type',
        'academic_year_number',
    ];

    // العلاقة مع College
    public function college()
    {
        return $this->belongsTo(College::class);
    }
    

    public function courses()
{
    return $this->hasMany(Course::class);
}


public function futureOpportunities()
{
    return $this->hasMany(FutureOpportunities::class);
}


// public function academicPrograms()
// {
//     return $this->hasMany(AcademicProgram::class);
// }

public function graduationProjects()
{
  return $this->hasMany(GraduationProject::class);
}

}
