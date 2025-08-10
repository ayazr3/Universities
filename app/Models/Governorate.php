<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
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
     public function colleges()
    {
        return $this->hasMany(College::class);
    }
    public function universityCenters()
    {
        return $this->hasMany(UniversityCenter::class);
    }


}
