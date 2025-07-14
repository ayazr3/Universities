<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrationStep extends Model
{
    use HasFactory;

    protected $fillable = [
        'step_name',
        'description',
        'sub_step',
    ];

    protected $casts = [
        'sub_step' => 'array',
    ];
}
