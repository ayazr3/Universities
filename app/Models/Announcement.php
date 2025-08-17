<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'summary',
        'publisher',
        'image',
        'publish_date',
        'details',
    ];

    protected $dates = ['publish_date'];
}
