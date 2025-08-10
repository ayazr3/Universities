<?php

namespace App\Http\Controllers;

use App\Models\College;
use App\Models\Governorate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CollegeController extends Controller
{
    public function indexUser(Request $request)
    {
        $governorateId = $request->query('govId');

        // جلب بيانات المحافظة للحصول على الاسم (اختياري)
        $governorate = Governorate::find($governorateId);
        if (!$governorate) {
            abort(404, 'المحافظة غير موجودة');
        }

        // جلب الكليات الخاصة بهذه المحافظة
        $colleges = College::where('governorate_id', $governorateId)->get(['id', 'name', 'image', 'summary', 'establishment_year', 'student_count']);


        return Inertia::render('CollegesList', [
            'governorateName' => $governorate->name,
            'colleges' => $colleges,
        ]);
    }


    public function showUser($id)

{
    $college = College::with(['governorate', 'specializations'])->findOrFail($id);

    return Inertia::render('CollegeDetails', [
        'college' => $college,
        'specializations' => $college->specializations->map(function($specialization) {
            return [
                'id' => $specialization->id,
                'name' => $specialization->name,
                'summary' => $specialization->summary,
            ];
        }),
    ]);
}


 

    // public function index()
    // {
    //     $colleges = College::latest()->get();
    //     return inertia('Admin/Colleges/Index', [
    //         'colleges' => $colleges,
    //         'stats' => [
    //             'total' => College::count(),
    //             'recent' => College::where('created_at', '>', now()->subDays(7))->count(),
    //         ]
    //     ]);
    // }
    public function index()
    {
        $colleges = College::with('governorate')->latest()->get();

        return inertia('Admin/Colleges/Index', [
            'colleges' => $colleges,
            'stats' => [
                'total' => College::count(),
                'recent' => College::where('created_at', '>', now()->subDays(7))->count(),
            ]
        ]);
    }

    public function create()
    {
        $governorates = Governorate::all(); // لعرض الخيارات في السيلكت
        return inertia('Admin/Colleges/Create', ['governorates' => $governorates]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
        'governorate_id'      => 'required|exists:governorates,id',
        'name'                => 'required|string|max:255',
        'image'               => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        'summary'             => 'required|string',
        'details'             => 'required|string',
        'location.lat'        => 'required|numeric',
        'location.lng'        => 'required|numeric',
        'establishment_year'  => 'required|digits:4|integer|min:1800|max:' . date('Y'),
        'student_count'       => 'required|integer|min:0',
        'official_link'       => 'required|url|max:255',
        'college'             => 'required|boolean',
    ]);

    if (is_array($request->location) || is_object($request->location)) {
        $validated['location'] = json_encode($request->location);
    } else {
        $validated['location'] = $request->location;
    }

    if ($request->hasFile('image')) {
        $validated['image'] = $request->file('image')->store('colleges', 'public');
    } else if (filter_var($request->image, FILTER_VALIDATE_URL)) {
        $validated['image'] = $request->image; // رابط إنترنت
    }

    College::create($validated);

    return redirect()->route('Admincolleges.index')->with('success', 'تم إنشاء الكلية بنجاح.');
    }

    public function show($id)
    {
        // return inertia('Admin/Colleges/Show', ['college' => $college]);
         // حماية: إذا لم يجد الكلية
         $college = College::with('governorate')->findOrFail($id);

        return inertia('Admin/Colleges/Show', [
            'college' => [
                'id' => $college->id,
                'governorate_id' => $college->governorate_id,
                'governorate' => $college->governorate,
                'name' => $college->name,
                'image' => $college->image,
                'summary' => $college->summary,
                'details' => $college->details,
                'location' => $college->location,
                'establishment_year' => $college->establishment_year,
                'student_count' => $college->student_count,
                'official_link' => $college->official_link,
                'college' => $college->college,
            ]
        ]);
    }

    public function edit($id)
    {
        // $governorates = Governorate::all();

        // // فك ترميز location إذا كان نص مؤمن من JSON نصي
        // if (is_string($college->location)) {
        //     $college->location = json_decode($college->location, true) ?: ['lat' => 24.7136, 'lng' => 46.6753];
        // } else {
        //     $college->location = $college->location ?? ['lat' => 24.7136, 'lng' => 46.6753];
        // }

        // return inertia('Admin/Colleges/Edit', [
        //     'college' => $college,
        //     'governorates' => $governorates,
        // ]);
        $college = College::with('governorate')->findOrFail($id);
        $governorates = Governorate::all();

        return inertia('Admin/Colleges/Edit', [
            'college' => [
                'id' => $college->id,
                'governorate_id' => $college->governorate_id,
                'governorate' => $college->governorate,
                'name' => $college->name,
                'image' => $college->image,
                'summary' => $college->summary,
                'details' => $college->details,
                'location' => $college->location,
                'establishment_year' => $college->establishment_year,
                'student_count' => $college->student_count,
                'official_link' => $college->official_link,
                'college' => $college->college,
            ],
            'governorates' => $governorates,
        ]);
    }

    public function update(Request $request,  $id)
    {
        $college = College::findOrFail($id);

        $validated = $request->validate([
            'governorate_id'     => 'required|exists:governorates,id',
            'name'               => 'required|string|max:255',
            'image'              => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'summary'            => 'required|string',
            'details'            => 'required|string',
            'location.lat'       => 'required|numeric',
            'location.lng'       => 'required|numeric',
            'establishment_year' => 'required|digits:4|integer|min:1800|max:' . date('Y'),
            'student_count'      => 'required|integer|min:0',
            'official_link'      => 'required|url|max:255',
            'college'            => 'required|boolean',
        ]);

        // تحويل الموقع إلى نص JSON
        $validated['location'] = json_encode([
            'lat' => $validated['location']['lat'],
            'lng' => $validated['location']['lng'],
        ]);

        // معالجة رفع الصورة وحذف القديمة
        if ($request->hasFile('image')) {
            if ($college->image && \Illuminate\Support\Facades\Storage::disk('public')->exists($college->image)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($college->image);
            }
            $validated['image'] = $request->file('image')->store('colleges', 'public');
        } else {
            // الاحتفاظ بالصورة القديمة إذا لم يتم رفع جديدة
            $validated['image'] = $college->image;
        }

        $college->update($validated);

        return redirect()->route('Admincolleges.index')->with('success', 'تم تحديث الكلية بنجاح.');

    }

    public function destroy($id)
    {
        $college = College::findOrFail($id);
        if ($college->image && Storage::disk('public')->exists($college->image)) {
            Storage::disk('public')->delete($college->image);
        }
        $college->delete();
        return redirect()->route('Admincolleges.index')->with('success', 'تم حذف الكلية بنجاح.');
    }

}
