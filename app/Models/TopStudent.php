<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class TopStudent extends Model
{
     use HasFactory;
    // اسم الجدول في قاعدة البيانات (اختياري إذا كان الاسم بالجمع وبصيغة الافتراضية)
    protected $table = 'top_students';

    // الحقول التي يمكن تعبئتها بشكل مباشر من خلال Mass Assignment
    protected $fillable = [
        'specialization_id',
        'name',
        'image',
        'gpa',
        'rank',
        'graduation_year',
    ];

    // تحويل الحقول تلقائياً عند الحاجة
    protected $casts = [
        'gpa' => 'float',
        'rank' => 'integer',
        'graduation_year' => 'integer',
    ];

    // العلاقة مع جدول التخصص (Specialization)
    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }
}
