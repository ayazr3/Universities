<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RegistrationStep;
use Inertia\Inertia;

class RegistrationStepController extends Controller
{
    // عرض جميع الخطوات
    public function index()
    {
         $steps = RegistrationStep::latest()->get()->map(function($step) {
            $step->sub_step = json_decode($step->sub_step, true) ?: [];
            return $step;
        });

        return inertia('RegistrationSteps/Index', [
            'steps' => $steps,
            'stats' => [
                'total' => RegistrationStep::count(),
                'recent' => RegistrationStep::where('created_at', '>', now()->subDays(7))->count(),
            ]
        ]);
    }

    // عرض نموذج إضافة خطوة جديدة
    public function create()
    {
        return inertia('RegistrationSteps/Create');
    }

    // حفظ خطوة جديدة
    public function store(Request $request)
    {
        $validated = $request->validate([
            'step_name' => 'required|string|max:100',
            'description' => 'required|string',
            'sub_step' => 'required|array',
        ]);

        RegistrationStep::create([
            'step_name' => $validated['step_name'],
            'description' => $validated['description'],
            'sub_step' => json_encode($validated['sub_step']),
        ]);

        return redirect()->route('registrationstep.index')->with('success', 'تم إنشاء الخطوة بنجاح.');
    }

    // عرض خطوة معينة
    public function show(RegistrationStep $registrationstep)
    {
        // return inertia('RegistrationSteps/Show', [
        //     'registrationstep' => $registrationstep
        // ]);

         $registrationstep->sub_step = json_decode($registrationstep->sub_step, true) ?: [];

        return inertia('RegistrationSteps/Show', [
            'registrationstep' => $registrationstep
        ]);
    }

    // عرض نموذج تعديل خطوة
    public function edit(RegistrationStep $registrationstep)
    {
         $registrationstep->sub_step = json_decode($registrationstep->sub_step, true) ?: [];
        return inertia('RegistrationSteps/Edit', [
            'registrationstep' => $registrationstep
        ]);
    }

    // تحديث خطوة معينة
    public function update(Request $request, RegistrationStep $registrationstep)
    {
        $validated = $request->validate([
            'step_name' => 'required|string|max:100',
            'description' => 'required|string',
            'sub_step' => 'required|array',
        ]);

        $registrationstep->update([
            'step_name' => $validated['step_name'],
            'description' => $validated['description'],
            'sub_step' => json_encode($validated['sub_step']),
        ]);

        return redirect()->route('registrationstep.index')->with('success', 'تم تحديث الخطوة بنجاح.');
    }

    // حذف خطوة معينة
    public function destroy(RegistrationStep $registrationstep)
    {
        $registrationstep->delete();

        return redirect()->route('registrationstep.index')->with('success', 'تم حذف الخطوة بنجاح.');
    }
}
