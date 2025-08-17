<?php

namespace App\Http\Controllers;

use App\Models\Specialization;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\FutureOpportunities;
class SpecializationController extends Controller
{
   public function showUser($id)
{
    $specialization = Specialization::with(['courses', 'futureOpportunities'])->findOrFail($id);

    // نفترض أن برنامج أكاديمي مرتبط بالتخصص في علاقة "academicPrograms"
    return Inertia::render('SpecializationDetails', [
        'specialization' => [
            'id' => $specialization->id,
            'name' => $specialization->name,
            'summary' => $specialization->summary,
            'details' => $specialization->details,
            'title' => $specialization->title,
            'degree_type' => $specialization->degree_type,
            'academic_year_number' => $specialization->academic_year_number,
            'icon' => $specialization->icon,
        ],
        'courses' => $specialization->courses->map(function ($course) {
            return [
                'id' => $course->id,
                'name' => $course->name,
                'description' => $course->description,
                'file_url' => $course->file_url,
                'academic_year_number' => $course->academic_year_number,
            ];
        }),
        
   
              'futureOpportunities' => $specialization->futureOpportunities->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'details' => $item->details,
                'icon' => $item->icon, // رابط الصورة المخزنة في قاعدة البيانات
            ];
        }),
     // 'futureOpportunities' => $specialization->futureOpportunities->map(function ($opportunity) {
        //     return [
        //         'id' => $opportunity->id,
        //         'name' => $opportunity->name,
        //         'details' => $opportunity->details,
        //         'icon' => $opportunity->icon,
        //     ];


        // 'programs' => $specialization->academicPrograms->map(function ($program) {
        //     return [
        //         'id' => $program->id,
        //         'title' => $program->title,
        //         'duration' => $program->duration,
        //         'desc' => $program->desc,
        //         'icon_url' => $program->icon, // رابط الصورة المخزنة في الحقل icon
        //     ];
       // }),
    ]);
}

}
