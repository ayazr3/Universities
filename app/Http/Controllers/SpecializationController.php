<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\Specialization;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
    // عرض جميع التخصصات
    public function index()
    {
        $specializations = Specialization::with('college')->latest()->get();

        return inertia('Admin/Specializations/Index', [
            'specializations' => $specializations,
            'stats' => [
                'total' => Specialization::count(),
                'recent' => Specialization::where('created_at', '>', now()->subDays(7))->count(),
            ],
        ]);
    }

    // عرض نموذج إضافة تخصص جديد
    public function create()
    {
        $colleges = College::all();

        return inertia('Admin/Specializations/Create', [
            'colleges' => $colleges,
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
        $adminspecialization->load('college');

        return inertia('Admin/Specializations/Show', [
            'specialization' => $adminspecialization
        ]);
    }

    // عرض نموذج تعديل تخصص
    public function edit(Specialization $adminspecialization)
    {
        $colleges = College::all();

        return inertia('Admin/Specializations/Edit', [
            'specialization' => $adminspecialization,
            'colleges' => $colleges,
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
