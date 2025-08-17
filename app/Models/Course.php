<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
       use HasFactory;
    // اسم الجدول في قاعدة البيانات (اختياري إذا كان اسم الجدول بالجمع وبصيغة الافتراضية)
    protected $table = 'courses';

    // الحقول التي يمكن تعيينها بشكل مباشر من خلال Mass Assignment
    protected $fillable = [
        'specialization_id',
        'name',
        'description',
        'file_url',
        'academic_year_number',
    ];

    // تحويل الحقول تلقائياً إذا لزم الأمر
    protected $casts = [
        'academic_year_number' => 'integer',
    ];

    // العلاقة مع تخصص (Specialization)
    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }
}
