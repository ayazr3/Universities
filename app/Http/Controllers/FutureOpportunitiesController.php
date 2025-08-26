<?php

namespace App\Http\Controllers;

use App\Models\FutureOpportunities;
use App\Models\Specialization;
use App\Models\College;
use App\Models\Governorate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FutureOpportunitiesController extends Controller
{
    // عرض جميع الفرص مع إمكانية فلترة
    public function index(Request $request)
    {
        $governorates = Governorate::all();
        $specializations = Specialization::with('college.governorate')->get();

        $query = FutureOpportunities::with('specialization.college.governorate');

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

        $opportunities = $query->latest()->get();

        return Inertia::render('Admin/FutureOpportunities/Index', [
            'future_opportunities' => $opportunities,
            'specializations' => $specializations,
            'governorates' => $governorates,
            'stats' => [
                'total' => FutureOpportunities::count(),
                'recent' => FutureOpportunities::where('created_at', '>', now()->subDays(7))->count(),
            ],
            'filters' => $request->only(['search', 'governorate_id', 'college_id', 'specialization_id']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/FutureOpportunities/Create', [
            'governorates' => Governorate::all(),
            'colleges' => College::all(),
            'specializations' => Specialization::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'specialization_id' => 'required|exists:specializations,id',
            'name' => 'required|string|max:100',
            'details' => 'required|string',
            'icon' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // رفع وتخزين صورة الأيقونة
        if ($request->hasFile('icon')) {
            $path = $request->file('icon')->store('future_icons', 'public');
            $validated['icon'] = $path;
        }

        FutureOpportunities::create($validated);

        return redirect()->route('adminfutureopportunities.index')->with('success', 'تم إضافة الآفاق المستقبلية بنجاح.');
    }

    public function show(FutureOpportunities $adminfutureopportunity)
    {
        $adminfutureopportunity->load('specialization.college.governorate');

        return Inertia::render('Admin/FutureOpportunities/Show', [
            'future_opportunity' => $adminfutureopportunity,
        ]);
    }

    public function edit(FutureOpportunities $adminfutureopportunity)
    {
        $governorates = Governorate::all();
        $colleges = College::all();
        $specializations = Specialization::all();

        $adminfutureopportunity->load('specialization.college.governorate');

        return Inertia::render('Admin/FutureOpportunities/Edit', [
            'future_opportunity' => $adminfutureopportunity,
            'governorates' => $governorates,
            'colleges' => $colleges,
            'specializations' => $specializations,
        ]);
    }

    public function update(Request $request, FutureOpportunities $adminfutureopportunity)
    {
        $validated = $request->validate([
            'specialization_id' => 'required|exists:specializations,id',
            'name' => 'required|string|max:100',
            'details' => 'required|string',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $dataToUpdate = [
            'specialization_id' => $validated['specialization_id'],
            'name' => $validated['name'],
            'details' => $validated['details'],
        ];

        if ($request->hasFile('icon')) {
            // حذف الصورة القديمة إذا كانت موجودة
            if ($adminfutureopportunity->icon && Storage::disk('public')->exists($adminfutureopportunity->icon)) {
                Storage::disk('public')->delete($adminfutureopportunity->icon);
            }
            // تخزين الصورة الجديدة
            $dataToUpdate['icon'] = $request->file('icon')->store('future_icons', 'public');
        }

        $adminfutureopportunity->update($dataToUpdate);

        return redirect()->route('adminfutureopportunities.index')->with('success', 'تم تحديث الآفاق المستقبلية بنجاح.');
    }

    public function destroy(FutureOpportunities $adminfutureopportunity)
    {
        // حذف صورة الأيقونة
        if ($adminfutureopportunity->icon && Storage::disk('public')->exists($adminfutureopportunity->icon)) {
            Storage::disk('public')->delete($adminfutureopportunity->icon);
        }

        $adminfutureopportunity->delete();

        return redirect()->route('adminfutureopportunities.index')->with('success', 'تم حذف الآفاق المستقبلية بنجاح.');
    }
}
