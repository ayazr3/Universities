<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OfficialLink extends Model
{
    use HasFactory;

     protected $fillable = [
        'entity_name',
        'link',
    ];
}
