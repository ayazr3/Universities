<?php

namespace App\Http\Controllers;

use App\Models\TopStudent;
use Illuminate\Http\Request;
use App\Models\Specialization;
use Inertia\Inertia;

class TopStudentController extends Controller
{

     public function showUser($specializationId)
    {
    //     $specialization = Specialization::findOrFail($specializationId);

    //     $topStudents = TopStudent::where('specialization_id', $specializationId)
    //         ->orderBy('rank')
    //         ->get()
    //         ->map(function ($student) {
    //             return [
    //                 'id' => $student->id,
    //                 'name' => $student->name,
    //                 'image' => $student->image,
    //                 'gpa' => $student->gpa,
    //                 'rank' => $student->rank,
    //                 'graduation_year' => $student->graduation_year,
    //             ];
    //         });

    //     return Inertia::render('TopStudentsPage', [
    //         'specialization' => $specialization,
    //         'students' => $topStudents,
    //     ]);
    // }
   
        // جلب التخصص مع الكلية والمحافظة
        $specialization = Specialization::with('college.governorate')->findOrFail($specializationId);

        // جلب طلاب الاوائل المرتبطين بالتخصص
        $topStudents = TopStudent::where('specialization_id', $specializationId)
            ->orderBy('rank')
            ->get()
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'image' => $student->image,
                    'gpa' => $student->gpa,
                    'rank' => $student->rank,
                    'graduation_year' => $student->graduation_year,
                ];
            });

        return Inertia::render('TopStudentsPage', [
            'specialization' => [
                'id' => $specialization->id,
                'name' => $specialization->name,
                'college' => [
                    'id' => $specialization->college->id,
                    'name' => $specialization->college->name,
                    'governorate' => $specialization->college->governorate ? $specialization->college->governorate->name : null,
                ],
            ],
            'students' => $topStudents,
        ]);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(TopStudent $topStudent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TopStudent $topStudent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TopStudent $topStudent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TopStudent $topStudent)
    {
        //
    }
}
