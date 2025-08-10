<?php

namespace App\Http\Controllers;

use App\Models\Specialization;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SpecializationController extends Controller
{
    public function indexUser()
    {
        // جلب جميع التخصصات مع بياناتها
        $specializations = Specialization::all();

        // ارسال البيانات لـ Inertia لصفحة React
        return Inertia::render('SpecializationDetails', [
            'specializations' => $specializations
        ]);
    }
    public function showUser($id)
{
    $specialization = Specialization::findOrFail($id);

    return Inertia::render('SpecializationDetails', [
        // نمرر مصفوفة تحتوي تخصص واحد فقط للعرض
        'specializations' => [$specialization]
    ]);
}

}
