<?php

namespace App\Http\Controllers;

use App\Models\AdmissionSchedule;
use App\Models\RegistrationStep;
use Illuminate\Http\Request;
use App\Models\Governorate;
use App\Models\UniversityCenter;
use App\Models\College;
use App\Models\Specialization;




class UniversitySelectionPageController extends Controller
{
    
    public function indexUser()
{
    $admissionSchedules = AdmissionSchedule::orderBy('date')->get();
    $registrationSteps = RegistrationStep::all();
    $admissionFile = null;
    $firstFile = AdmissionSchedule::whereNotNull('file_url')->first();
    if ($firstFile) {
        $admissionFile = $firstFile->file_url;
    }

    // عدد التخصصات الكلي (في كل الكليات بكل المحافظات)
    $totalSpecializationsCount = Specialization::count();

    // تجميع المراكز حسب المحافظة مع بيانات المحافظة
    $universityCentersByGovernorate = Governorate::with('universityCenters')->get()->map(function ($gov) {
        return [
            'id' => $gov->id,
            'name' => $gov->name,
            'centers' => $gov->universityCenters->map(function ($center) {
                return [
                    'id' => $center->id,
                    'name' => $center->name,
                    'description' => $center->description,
                ];
            }),
            'centers_count' => $gov->universityCenters->count()
        ];
    });

    // السنة الحالية مباشرة من PHP
    $currentYear = date('Y');

    return inertia('UniversitySelectionPage', [
        'admissionSchedules' => $admissionSchedules,
        'registrationSteps' => $registrationSteps,
        'admissionFile' => $admissionFile,
        'totalSpecializationsCount' => $totalSpecializationsCount,
        'currentYear' => $currentYear,
        'universityCentersByGovernorate' => $universityCentersByGovernorate, 
    ]);
}
public function welcomeUser()
{
     $totalSpecializationsCount = Specialization::count();
    $registrationSteps = RegistrationStep::all();
    $firstFile = AdmissionSchedule::whereNotNull('file_url')->first();
    $admissionFile = $firstFile ? asset('storage/' . $firstFile->file_url) : null;

  
    $governorates = \App\Models\Governorate::all(); 

    return inertia('Welcome', [
        'GOVERNORATES' => $governorates,
        'registrationSteps' => $registrationSteps,
        'admissionFile' => $admissionFile,
         'totalSpecializationsCount' => $totalSpecializationsCount,
    ]);
}


}
