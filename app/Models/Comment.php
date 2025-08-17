<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'name', 'email', 'content', 'specialization_id',
        'graduation_project_id', 'parent_id'
    ];

    public function project()
    {
        return $this->belongsTo(GraduationProject::class, 'graduation_project_id');
    }

    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }
}

