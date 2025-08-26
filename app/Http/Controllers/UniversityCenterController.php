<?php

namespace App\Http\Controllers;

use App\Models\UniversityCenter;
use App\Models\Governorate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UniversityCenterController extends Controller
{
     public function index()
    {
        $centers = UniversityCenter::with('governorate')->latest()->get();

        return Inertia::render('Admin/UniversityCenters/Index', [
            'universityCenters' => $centers,
            'stats' => [
                'total' => UniversityCenter::count(),
                'recent' => UniversityCenter::where('created_at', '>', now()->subDays(7))->count(),
            ]
        ]);
    }

    public function create()
    {
        $governorates = Governorate::all();
        return Inertia::render('Admin/UniversityCenters/Create', ['governorates' => $governorates]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'governorate_id' => 'required|exists:governorates,id',
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048', // حسب الحاجة
            'location.lat' => 'nullable|numeric',
            'location.lng' => 'nullable|numeric',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('university_centers', 'public');
        }

        if (isset($validated['location']) && (is_array($request->location) || is_object($request->location))) {
            $validated['location'] = json_encode($request->location);
        }

        UniversityCenter::create($validated);

        return redirect()->route('adminuniversitycenters.index')->with('success', 'تم إنشاء المركز الجامعي بنجاح.');
    }

    public function show($id)
    {
        $center = UniversityCenter::with('governorate')->findOrFail($id);
        return Inertia::render('Admin/UniversityCenters/Show', [
            'universityCenter' => $center
        ]);
    }

    public function edit($id)
    {
        $center = UniversityCenter::with('governorate')->findOrFail($id);
        $governorates = Governorate::all();

        return Inertia::render('Admin/UniversityCenters/Edit', [
            'universityCenter' => $center,
            'governorates' => $governorates,
        ]);
    }

    public function update(Request $request, $id)
    {
        $center = UniversityCenter::findOrFail($id);

        $validated = $request->validate([
            'governorate_id' => 'required|exists:governorates,id',
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048', // حسب الحاجة
            'location.lat' => 'nullable|numeric',
            'location.lng' => 'nullable|numeric',
        ]);

        if ($request->hasFile('image')) {
            if ($center->image && Storage::disk('public')->exists($center->image)) {
                Storage::disk('public')->delete($center->image);
            }
            $validated['image'] = $request->file('image')->store('university_centers', 'public');
        } else {
            $validated['image'] = $center->image;
        }

        if (isset($validated['location']) && (is_array($request->location) || is_object($request->location))) {
            $validated['location'] = json_encode($request->location);
        }

        $center->update($validated);

        return redirect()->route('adminuniversitycenters.index')->with('success', 'تم تحديث المركز الجامعي بنجاح.');
    }

    public function destroy($id)
    {
        $center = UniversityCenter::findOrFail($id);
        if ($center->image && Storage::disk('public')->exists($center->image)) {
            Storage::disk('public')->delete($center->image);
        }
        $center->delete();

        return redirect()->route('adminuniversitycenters.index')->with('success', 'تم حذف المركز الجامعي بنجاح.');
    }
}
