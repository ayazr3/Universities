<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\Governorate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollegeController extends Controller
{
    public function indexUser(Request $request)
    {
        $governorateId = $request->query('govId');

        // جلب بيانات المحافظة للحصول على الاسم (اختياري)
        $governorate = Governorate::find($governorateId);
        if (!$governorate) {
            abort(404, 'المحافظة غير موجودة');
        }

        // جلب الكليات الخاصة بهذه المحافظة
        $colleges = College::where('governorate_id', $governorateId)->get(['id', 'name', 'image', 'summary', 'establishment_year', 'student_count']);

        
        return Inertia::render('CollegesList', [
            'governorateName' => $governorate->name,
            'colleges' => $colleges,
        ]);
    }


    public function showUser($id)
{
    $college = College::with(['governorate', 'specializations'])->findOrFail($id);

    return Inertia::render('CollegeDetails', [
        'college' => $college,
        'specializations' => $college->specializations->map(function($specialization) {
            return [
                'id' => $specialization->id,
                'name' => $specialization->name,
                'summary' => $specialization->summary,
            ];
        }),
    ]);
}

}
