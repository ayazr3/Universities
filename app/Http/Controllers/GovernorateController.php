<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Governorate;
use Inertia\Inertia;

class GovernorateController extends Controller
{
    public function index()
    {
        $governorates = Governorate::latest()->get();
        return Inertia::render('Admin/Governorates/Index', [
            'governorates' => $governorates,
            'stats' => [
                'total' => Governorate::count(),
                'recent' => Governorate::where('created_at', '>', now()->subDays(7))->count(),
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Governorates/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:governorates,name',
        ]);
        Governorate::create($validated);

        return redirect()->route('governorates.index')->with('success', 'تمت إضافة المحافظة بنجاح.');
    }

    public function show(Governorate $governorate)
    {
        return Inertia::render('Admin/Governorates/Show', [
            'governorate' => $governorate
        ]);
    }

    public function edit(Governorate $governorate)
    {
        return Inertia::render('Admin/Governorates/Edit', [
            'governorate' => $governorate
        ]);
    }

    public function update(Request $request, Governorate $governorate)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:governorates,name,' . $governorate->id,
        ]);
        $governorate->update($validated);

        return redirect()->route('governorates.index')->with('success', 'تم تحديث المحافظة بنجاح.');
    }

    public function destroy(Governorate $governorate)
    {
        $governorate->delete();
        return redirect()->route('governorates.index')->with('success', 'تم حذف المحافظة بنجاح.');
    }
}
