<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdmissionSchedule;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdmissionScheduleController extends Controller
{
    public function indexUser()
    {
        $schedules = AdmissionSchedule::orderBy('date')->get();

        return inertia('UniversitySelectionPage', [
            'admissionSchedules' => $schedules,
        ]);
    }


    // عرض جميع الجداول
    public function index()
    {
        $schedules = AdmissionSchedule::latest()->get();

        return inertia('Admin/AdmissionSchedules/Index', [
            'schedules' => $schedules,
            'stats' => [
                'total' => AdmissionSchedule::count(),
                'recent' => AdmissionSchedule::where('created_at', '>', now()->subDays(7))->count(),
            ]
        ]);
    }

    // عرض نموذج إضافة جدول جديد
    public function create()
    {
        return inertia('Admin/AdmissionSchedules/Create');
    }

    // حفظ جدول جديد
    public function store(Request $request)
    {
                $validated = $request->validate([
            'title' => 'required|string|max:100',
            'body' => 'required|string',
            'date' => 'required|date',
            'name' => 'required|string|max:100',
            'file_url' => 'nullable|file|mimes:pdf,doc,docx,txt|max:2048', // تحقق من الملف بنسبة مناسبة
        ]);

        // إذا كان هناك ملف
        if ($request->hasFile('file_url')) {
            $filePath = $request->file('file_url')->store('admission_files', 'public');
            $validated['file_url'] = $filePath;
        }

        AdmissionSchedule::create($validated);

        return redirect()->route('admissionSchedule.index')->with('success', 'تم إنشاء الجدول بنجاح.');
    }

    // عرض جدول معين
    public function show(AdmissionSchedule $admissionSchedule)
    {
        return inertia('Admin/AdmissionSchedules/Show', [
            'admissionSchedule' => $admissionSchedule
        ]);
    }

    // عرض نموذج تعديل جدول
    public function edit(AdmissionSchedule $admissionSchedule)
    {
        return inertia('Admin/AdmissionSchedules/Edit', [
            'admissionSchedule' => $admissionSchedule
        ]);
    }

    // تحديث جدول معين
    public function update(Request $request, AdmissionSchedule $admissionSchedule)
    {
          $validated = $request->validate([
            'title' => 'required|string|max:100',
            'body' => 'required|string',
            'date' => 'required|date',
            'name' => 'required|string|max:100',
            'file_url' => 'nullable|file|mimes:pdf,doc,docx,txt|max:2048',
        ]);

        if ($request->hasFile('file_url')) {
            // حذف الملف القديم لو أردت
            if ($admissionSchedule->file_url && Storage::disk('public')->exists($admissionSchedule->file_url)) {
                Storage::disk('public')->delete($admissionSchedule->file_url);
            }
            $filePath = $request->file('file_url')->store('admission_files', 'public');
            $validated['file_url'] = $filePath;
        }

        $admissionSchedule->update($validated);

        return redirect()->route('admissionSchedule.index')->with('success', 'تم تحديث الجدول بنجاح.');
    }

    // حذف جدول معين
    public function destroy(AdmissionSchedule $admissionSchedule)
    {
        // $admissionSchedule->delete();

        // return redirect()->route('admissionSchedule.index')->with('success', 'تم حذف الجدول بنجاح.');
         // حذف الملف المرتبط (اختياري)
        if ($admissionSchedule->file_url && Storage::disk('public')->exists($admissionSchedule->file_url)) {
            Storage::disk('public')->delete($admissionSchedule->file_url);
        }
        $admissionSchedule->delete();

        return redirect()->route('admissionSchedule.index')->with('success', 'تم حذف الجدول بنجاح.');
    }
}
