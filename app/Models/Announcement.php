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

     // إذا أردت تحويل تاريخ النشر إلى كائن Carbon تلقائيًا
    protected $dates = [
        'publish_date',
    ];
}
