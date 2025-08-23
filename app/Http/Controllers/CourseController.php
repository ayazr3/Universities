<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Specialization;
use App\Models\College;
use App\Models\Governorate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CourseController extends Controller
{
    // عرض الكل مع فلترة
    public function index(Request $request)
    {
        $governorates = Governorate::all();
        $specializations = Specialization::with('college.governorate')->get();

        $query = Course::with('specialization.college.governorate');

        if ($request->filled('governorate_id')) {
            $query->whereHas('specialization.college', function ($q) use ($request) {
                $q->where('governorate_id', $request->governorate_id);
            });
        }

        if ($request->filled('college_id')) {
            $query->whereHas('specialization', function ($q) use ($request) {
                $q->where('college_id', $request->college_id);
            });
        }

        if ($request->filled('specialization_id')) {
            $query->where('specialization_id', $request->specialization_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                  ->orWhere('description', 'like', "%$search%");
            });
        }

        $courses = $query->latest()->get();

        return Inertia::render('Admin/Courses/Index', [
            'courses' => $courses,
            'specializations' => $specializations,
            'governorates' => $governorates,
            'stats' => [
                'total' => Course::count(),
                'recent' => Course::where('created_at', '>', now()->subDays(7))->count(),
            ],
        ]);
    }

    // صفحة الإنشاء
    public function create()
    {
        $governorates = Governorate::all();
        $colleges = College::all();
        $specializations = Specialization::all();

        return Inertia::render('Admin/Courses/Create', [
            'governorates' => $governorates,
            'colleges' => $colleges,
            'specializations' => $specializations,
        ]);
    }

    // حفظ البيانات
    public function store(Request $request)
    {
        $validated = $request->validate([
            'specialization_id' => 'required|exists:specializations,id',
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'file' => 'required|file|max:10000', // ملف المقرر
            'academic_year_number' => 'required|integer|min:1',
        ]);

        $filePath = $request->file('file')->store('courses_files', 'public');

        Course::create([
            'specialization_id' => $validated['specialization_id'],
            'name' => $validated['name'],
            'description' => $validated['description'],
            'file_url' => $filePath,
            'academic_year_number' => $validated['academic_year_number'],
        ]);

        return redirect()->route('admincourses.index')->with('success', 'تم إضافة المقرر بنجاح.');
    }

    // صفحة العرض
    public function show(Course $admincourse)
    {
        $admincourse->load('specialization.college.governorate');
        return Inertia::render('Admin/Courses/Show', [
            'course' => $admincourse
        ]);
    }

    // صفحة التعديل
    public function edit(Course $admincourse)
    {
        $governorates = Governorate::all();
        $colleges = College::all();
        $specializations = Specialization::all();

        $admincourse->load('specialization.college.governorate');

        return Inertia::render('Admin/Courses/Edit', [
            'course' => $admincourse,
            'governorates' => $governorates,
            'colleges' => $colleges,
            'specializations' => $specializations,
        ]);
    }

    // تحديث البيانات
    public function update(Request $request, Course $admincourse)
    {
        $validated = $request->validate([
            'specialization_id' => 'required|exists:specializations,id',
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'file' => 'nullable|file|max:10000',
            'academic_year_number' => 'required|integer|min:1',
        ]);

        $dataToUpdate = [
            'specialization_id' => $validated['specialization_id'],
            'name' => $validated['name'],
            'description' => $validated['description'],
            'academic_year_number' => $validated['academic_year_number'],
        ];

        if ($request->hasFile('file')) {
            // حذف الملف القديم إذا كان موجوداً
            if ($admincourse->file_url && Storage::disk('public')->exists($admincourse->file_url)) {
                Storage::disk('public')->delete($admincourse->file_url);
            }
            $dataToUpdate['file_url'] = $request->file('file')->store('courses_files', 'public');
        }

        $admincourse->update($dataToUpdate);

        return redirect()->route('admincourses.index')->with('success', 'تم تحديث المقرر بنجاح.');
    }

    // حذف المقرر
    public function destroy(Course $admincourse)
    {
        if ($admincourse->file_url && Storage::disk('public')->exists($admincourse->file_url)) {
            Storage::disk('public')->delete($admincourse->file_url);
        }
        $admincourse->delete();

        return redirect()->route('admincourses.index')->with('success', 'تم حذف المقرر بنجاح.');
    }
}
