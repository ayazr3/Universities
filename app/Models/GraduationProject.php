<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GraduationProject extends Model
{
    use HasFactory;
    protected $fillable = [
        'specialization_id',
        'name',
        'description',
        'thesis_file',
        'project_images',
        'graduation_year',
        'team_members',
        'supervisor',
    ];

    protected $casts = [
        'project_images' => 'array',
        'team_members' => 'array',
    ];

    // علاقة مع التخصص
    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }
}
