<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AdmissionSchedule;
use Inertia\Inertia;

class AdmissionScheduleController extends Controller
{
    // عرض جميع الجداول
    public function index()
    {
        $schedules = AdmissionSchedule::latest()->get();

        return inertia('AdmissionSchedules/Index', [
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
        return inertia('AdmissionSchedules/Create');
    }

    // حفظ جدول جديد
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'body' => 'required|string',
            'date' => 'required|date',
            'name' => 'required|string|max:100',
        ]);

        AdmissionSchedule::create($validated);

        return redirect()->route('admissionSchedule.index')->with('success', 'تم إنشاء الجدول بنجاح.');
    }

    // عرض جدول معين
    public function show(AdmissionSchedule $admissionSchedule)
    {
        return inertia('AdmissionSchedules/Show', [
            'admissionSchedule' => $admissionSchedule
        ]);
    }

    // عرض نموذج تعديل جدول
    public function edit(AdmissionSchedule $admissionSchedule)
    {
        return inertia('AdmissionSchedules/Edit', [
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
        ]);

        $admissionSchedule->update($validated);

        return redirect()->route('admissionSchedule.index')->with('success', 'تم تحديث الجدول بنجاح.');
    }

    // حذف جدول معين
    public function destroy(AdmissionSchedule $admissionSchedule)
    {
        $admissionSchedule->delete();

        return redirect()->route('admissionSchedule.index')->with('success', 'تم حذف الجدول بنجاح.');
    }
}
