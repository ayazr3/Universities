<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Governorate extends Model
{

    use HasFactory;

    protected $fillable = ['name'];

    public function college()
    {
        return $this->hasOne(College::class);
    }
    public function universitycenter()
    {
        return $this->hasOne(UniversityCenter::class);
    }


}
