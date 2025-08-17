<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\Governorate;
use App\Models\Specialization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
     'futureOpportunities' => $specialization->futureOpportunities->map(function ($opportunity) {
            return [
                'id' => $opportunity->id,
                'name' => $opportunity->name,
                'details' => $opportunity->details,
                'icon' => $opportunity->icon,
            ];



       }),
    ]);
}

public function index()
    {
        // التأكد من تحميل العلاقة governorate عبر college
        $specializations = Specialization::with('college.governorate')->latest()->get();

        // جلب المحافظات لإظهار خيارات البحث
        $governorates = \App\Models\Governorate::all();

        return inertia('Admin/Specializations/Index', [
            'specializations' => $specializations,
            'governorates' => $governorates,
            'stats' => [
                'total' => Specialization::count(),
                'recent' => Specialization::where('created_at', '>', now()->subDays(7))->count(),
            ],
        ]);
    }

    // عرض نموذج إضافة تخصص جديد
    public function create()
    {
        // $colleges = College::all();

        // return inertia('Admin/Specializations/Create', [
        //     'colleges' => $colleges,
        // ]);
        $colleges = College::all();
        $governorates = Governorate::all(); // جلب المحافظات

        return inertia('Admin/Specializations/Create', [
            'colleges' => $colleges,
            'governorates' => $governorates,
        ]);
    }

    // حفظ تخصص جديد
    public function store(Request $request)
    {
        $validated = $request->validate([
            'college_id' => 'required|exists:colleges,id',
            'name' => 'required|string|max:100',
            'summary' => 'required|string',
            'details' => 'required|string',
            'title' => 'required|string|max:255',
            'icon' => 'required|image|mimes:jpg,jpeg,png,webp|max:4096',
            'degree_type' => 'required|string|max:100',
            'academic_year_number' => 'required|integer|min:1',
        ]);

        $iconPath = $request->file('icon')->store('specializations_icons', 'public');

        Specialization::create([
            'college_id' => $validated['college_id'],
            'name' => $validated['name'],
            'summary' => $validated['summary'],
            'details' => $validated['details'],
            'title' => $validated['title'],
            'icon' => $iconPath,
            'degree_type' => $validated['degree_type'],
            'academic_year_number' => $validated['academic_year_number'],
        ]);

        return redirect()->route('adminspecializations.index')->with('success', 'تم إضافة التخصص بنجاح.');
    }

    // عرض تفاصيل تخصص معين
    public function show(Specialization $adminspecialization)
    {
         // تحميل العلاقة college مع governorate أيضاً
        $adminspecialization->load('college.governorate');

        return inertia('Admin/Specializations/Show', [
            'specialization' => $adminspecialization
        ]);
    }

    // عرض نموذج تعديل تخصص
    public function edit(Specialization $adminspecialization)
    {
        $colleges = College::all();
        $governorates = \App\Models\Governorate::all();

        return inertia('Admin/Specializations/Edit', [
            'specialization' => $adminspecialization,
            'colleges' => $colleges,
            'governorates' => $governorates,
        ]);
    }

    // تحديث تخصص معين
    public function update(Request $request, Specialization $adminspecialization)
    {
        $validated = $request->validate([
            'college_id' => 'required|exists:colleges,id',
            'name' => 'required|string|max:100',
            'summary' => 'required|string',
            'details' => 'required|string',
            'title' => 'required|string|max:255',
            'icon' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'degree_type' => 'required|string|max:100',
            'academic_year_number' => 'required|integer|min:1',
        ]);

        $dataToUpdate = [
            'college_id' => $validated['college_id'],
            'name' => $validated['name'],
            'summary' => $validated['summary'],
            'details' => $validated['details'],
            'title' => $validated['title'],
            'degree_type' => $validated['degree_type'],
            'academic_year_number' => $validated['academic_year_number'],
        ];

        if ($request->hasFile('icon')) {
            // حذف الأيقونة القديمة إن وجدت
            if ($adminspecialization->icon && Storage::disk('public')->exists($adminspecialization->icon)) {
                Storage::disk('public')->delete($adminspecialization->icon);
            }
            $iconPath = $request->file('icon')->store('specializations_icons', 'public');
            $dataToUpdate['icon'] = $iconPath;
        }

        $adminspecialization->update($dataToUpdate);

        return redirect()->route('adminspecializations.index')->with('success', 'تم تحديث التخصص بنجاح.');
    }

    // حذف تخصص معين
    public function destroy(Specialization $adminspecialization)
    {
        // dd($adminspecialization->id);
        if ($adminspecialization->icon && Storage::disk('public')->exists($adminspecialization->icon)) {
            Storage::disk('public')->delete($adminspecialization->icon);
        }

        $adminspecialization->delete();


        return redirect()->route('adminspecializations.index')->with('success', 'تم حذف التخصص بنجاح.');
    }


}
