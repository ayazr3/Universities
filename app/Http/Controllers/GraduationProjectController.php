<?php

namespace App\Http\Controllers;

use App\Models\GraduationProject;
use App\Models\Specialization;
use App\Models\College;
use App\Models\Governorate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class GraduationProjectController extends Controller
{
    // عرض جميع مشاريع التخرج مع الفلترة
    public function index(Request $request)
    {
        $governorates = Governorate::all();
    $specializations = Specialization::with('college.governorate')->get();

    $query = GraduationProject::with('specialization.college.governorate');

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

    $projects = $query->latest()->get();

    return Inertia::render('Admin/GraduationProjects/Index', [
        'graduation_projects' => $projects,
        'specializations' => $specializations,
        'governorates' => $governorates,
        'stats' => [
            'total' => GraduationProject::count(),
            'recent' => GraduationProject::where('created_at', '>', now()->subDays(7))->count(),
        ],
    ]);
    }

    // صفحة الانشاء
    public function create()
    {
        $governorates = Governorate::all();
        $colleges = College::all();
        $specializations = Specialization::all();
        return Inertia::render('Admin/GraduationProjects/Create', [
            'governorates' => $governorates,
            'colleges' => $colleges,
            'specializations' => $specializations,
        ]);
    }

    // الحفظ
    public function store(Request $request)
    {
        $validated = $request->validate([
            'specialization_id' => 'required|exists:specializations,id',
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'thesis_file' => 'required|file|mimes:pdf,docx|max:10000',
            'project_images' => 'required|array',
            'project_images.*' => 'image|mimes:jpg,jpeg,png,webp|max:4096',
            'graduation_year' => 'required|digits:4|integer',
             'team_members' => 'required|string',
            'supervisor' => 'required|string|max:100',
        ]);
        $thesisFilePath = $request->file('thesis_file')->store('graduation_theses', 'public');

        $images = [];
        foreach ($request->file('project_images', []) as $img) {
            $images[] = $img->store('graduation_images', 'public');
        }
          $teamMembersArray = array_map('trim', explode(',', $request->input('team_members')));

        GraduationProject::create([
            'specialization_id' => $validated['specialization_id'],
            'name' => $validated['name'],
            'description' => $validated['description'],
            'thesis_file' => $thesisFilePath,
            'project_images' => json_encode($images),
            'graduation_year' => $validated['graduation_year'],
            'team_members' => json_encode($teamMembersArray),
            'supervisor' => $validated['supervisor'],
        ]);

        return redirect()->route('admingraduation_projects.index')->with('success', 'تم إضافة المشروع بنجاح.');
    }

    // عرض مشروع معين
    public function show(GraduationProject $admingraduation_project)
    {
        $admingraduation_project->load('specialization.college.governorate');
        return Inertia::render('Admin/GraduationProjects/Show', [
            'graduation_project' => $admingraduation_project
        ]);
    }

    // صفحة التعديل
    public function edit(GraduationProject $admingraduation_project)
    {
        $governorates = Governorate::all();
        $colleges = College::all();
        $specializations = Specialization::all();
        $admingraduation_project->load('specialization.college.governorate');
        return Inertia::render('Admin/GraduationProjects/Edit', [
            'graduation_project' => $admingraduation_project,
            'governorates' => $governorates,
            'colleges' => $colleges,
            'specializations' => $specializations,
        ]);
    }


    public function update(Request $request, GraduationProject $admingraduation_project)
    {
        $validator = Validator::make($request->all(), [
            'specialization_id' => 'required|exists:specializations,id',
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'thesis_file' => 'nullable|file|mimes:pdf,docx|max:10000',
            'project_images' => 'nullable|array',
            'project_images.*' => 'image|mimes:jpg,jpeg,png,webp|max:4096',
            'graduation_year' => 'required|digits:4|integer',
            'team_members' => 'required|array',
            'team_members.*' => 'string',
            'supervisor' => 'required|string|max:100',
            'existing_images' => 'nullable|array',
            'existing_images.*' => 'string',
            'deleted_images' => 'nullable|json',
        ]);

        if ($validator->fails()) {
            Log::error('Validation errors on update:', $validator->errors()->toArray());
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $validated = $validator->validated();

        // التعامل مع الصور القديمة والصور المحذوفة
        $existingImages = $request->input('existing_images', []);
        $deletedImages = json_decode($request->input('deleted_images', '[]'), true);

        // حذف الصور المطلوبة حذفها من التخزين
        if ($deletedImages && count($deletedImages)) {
            foreach ($deletedImages as $img) {
                if ($img && Storage::disk('public')->exists($img)) {
                    Storage::disk('public')->delete($img);
                }
            }
        }

        // الصور المتبقية بعد حذف المحذوفة
        $remainingImages = array_values(array_diff($existingImages, $deletedImages ?? []));

        $dataToUpdate = [
            'specialization_id' => $validated['specialization_id'],
            'name' => $validated['name'],
            'description' => $validated['description'],
            'graduation_year' => $validated['graduation_year'],
            'team_members' => json_encode($validated['team_members']),
            'supervisor' => $validated['supervisor'],
        ];

        // معالجة رفع ملف البحث النهائي إن تم تعديله
        if ($request->hasFile('thesis_file')) {
            if ($admingraduation_project->thesis_file && Storage::disk('public')->exists($admingraduation_project->thesis_file)) {
                Storage::disk('public')->delete($admingraduation_project->thesis_file);
            }
            $dataToUpdate['thesis_file'] = $request->file('thesis_file')->store('graduation_theses', 'public');
        }

        // معالجة رفع صور المشروع الجديدة، مع الجمع مع الصور القديمة المتبقية
        if ($request->hasFile('project_images')) {
            $images = $remainingImages;
            foreach ($request->file('project_images') as $img) {
                $images[] = $img->store('graduation_images', 'public');
            }
            $dataToUpdate['project_images'] = json_encode($images);
        } else {
            $dataToUpdate['project_images'] = json_encode($remainingImages);
        }

        Log::info('Project data BEFORE update:', $admingraduation_project->toArray());

        $admingraduation_project->fill($dataToUpdate);
        $saved = $admingraduation_project->save();

        Log::info('Project data AFTER update:', $admingraduation_project->toArray());
        Log::info('Save result:', ['saved' => $saved]);

        return redirect()->route('admingraduation_projects.index')->with('success', 'تم تحديث المشروع بنجاح.');
    }




    // حذف
    public function destroy(GraduationProject $admingraduation_project)
    {

        if ($admingraduation_project->thesis_file && Storage::disk('public')->exists($admingraduation_project->thesis_file)) {
            Storage::disk('public')->delete($admingraduation_project->thesis_file);
        }
        foreach (json_decode($admingraduation_project->project_images, true) ?? [] as $img) {
            if (Storage::disk('public')->exists($img)) Storage::disk('public')->delete($img);
        }
        $admingraduation_project->delete();
        return redirect()->route('admingraduation_projects.index')->with('success', 'تم حذف المشروع بنجاح.');
    }
}
