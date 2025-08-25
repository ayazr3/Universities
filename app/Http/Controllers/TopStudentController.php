<?php

namespace App\Http\Controllers;

use App\Models\TopStudent;
use App\Models\Specialization;
use App\Models\College;
use App\Models\Governorate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

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


    // قائمة الطلاب مع الفلاتر والبحث
    public function index(Request $request)
    {
        $governorates = Governorate::all();
        $specializations = Specialization::with('college.governorate')->get();

        $query = TopStudent::with('specialization.college.governorate');

        if ($request->filled('governorate_id')) {
            $query->whereHas('specialization.college', fn($q) => $q->where('governorate_id', $request->governorate_id));
        }
        if ($request->filled('college_id')) {
            $query->whereHas('specialization', fn($q) => $q->where('college_id', $request->college_id));
        }
        if ($request->filled('specialization_id')) {
            $query->where('specialization_id', $request->specialization_id);
        }
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%$search%");
        }
        $topStudents = $query->latest()->get();

        return Inertia::render('Admin/TopStudents/Index', [
            'top_students' => $topStudents,
            'specializations' => $specializations,
            'governorates' => $governorates,
            'stats' => [
                'total' => TopStudent::count(),
                'recent' => TopStudent::where('created_at', '>', now()->subDays(7))->count(),
            ],
        ]);
    }

    // صفحة إنشاء طالب جديد
    public function create()
    {
        return Inertia::render('Admin/TopStudents/Create', [
            'governorates' => Governorate::all(),
            'colleges' => College::all(),
            'specializations' => Specialization::all(),
        ]);
    }

    // حفظ طالب جديد
    public function store(Request $request)
    {
        $validated = $request->validate([
            'specialization_id' => 'required|exists:specializations,id',
            'name' => 'required|string|max:100',
            'image' => 'required|image|mimes:jpeg,jpg,png,webp|max:2048',
            'gpa' => 'required|numeric|between:0,100',
            'rank' => 'required|integer|min:1',
            'graduation_year' => 'required|digits:4|integer',
        ]);

        $imgPath = $request->file('image')->store('top_students', 'public');

        TopStudent::create([
            'specialization_id' => $validated['specialization_id'],
            'name' => $validated['name'],
            'image' => $imgPath,
            'gpa' => $validated['gpa'],
            'rank' => $validated['rank'],
            'graduation_year' => $validated['graduation_year'],
        ]);

        return redirect()->route('admintopstudents.index')->with('success', 'تم إضافة الطالب الأوّل بنجاح.');
    }

    // عرض تفاصيل طالب
    public function show(TopStudent $admintopstudent)
    {
        $admintopstudent->load('specialization.college.governorate');
        return Inertia::render('Admin/TopStudents/Show', [
            'top_student' => $admintopstudent,
        ]);
    }

    // صفحة تعديل طالب
    public function edit(TopStudent $admintopstudent)
    {
        // return Inertia::render('Admin/TopStudents/Edit', [
        //     'top_student' => $admintopstudent->load('specialization.college.governorate'),
        //     'governorates' => Governorate::all(),
        //     'colleges' => College::all(),
        //     'specializations' => Specialization::all(),
        // ]);
        $governorates = Governorate::all();
        $colleges = College::all();
        $specializations = Specialization::all();
        $admintopstudent->load('specialization.college.governorate');
        return Inertia::render('Admin/TopStudents/Edit', [
            'top_student' => $admintopstudent,
            'governorates' => $governorates,
            'colleges' => $colleges,
            'specializations' => $specializations,
        ]);
    }

    // تحديث بيانات طالب
    public function update(Request $request, TopStudent $admintopstudent)
    {
        // dd($request->all());
        $validated = $request->validate([
            'specialization_id' => 'required|exists:specializations,id',
            'name' => 'required|string|max:100',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:2048',
            'gpa' => 'required|numeric|between:0,100',
            'rank' => 'required|integer|min:1',
            'graduation_year' => 'required|digits:4|integer',
        ]);

        $dataToUpdate = [
            'specialization_id' => $validated['specialization_id'],
            'name' => $validated['name'],
            'gpa' => $validated['gpa'],
            'rank' => $validated['rank'],
            'graduation_year' => $validated['graduation_year'],
        ];

        if ($request->hasFile('image')) {
            // حذف الصورة القديمة إن وجدت
            if ($admintopstudent->image && Storage::disk('public')->exists($admintopstudent->image)) {
                Storage::disk('public')->delete($admintopstudent->image);
            }
            $dataToUpdate['image'] = $request->file('image')->store('top_students', 'public');
        }

        $admintopstudent->update($dataToUpdate);

        return redirect()->route('admintopstudents.index')->with('success', 'تم تحديث بيانات الطالب بنجاح.');
    }

    // حذف طالب
    public function destroy(TopStudent $admintopstudent)
    {
        if ($admintopstudent->image && Storage::disk('public')->exists($admintopstudent->image)) {
            Storage::disk('public')->delete($admintopstudent->image);
        }
        $admintopstudent->delete();
        return redirect()->route('admintopstudents.index')->with('success', 'تم حذف الطالب بنجاح.');
    }
}
