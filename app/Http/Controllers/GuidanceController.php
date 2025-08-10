<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Guidance;
use Illuminate\Support\Facades\Storage;

class GuidanceController extends Controller
{
    public function frontendIndexUser(Request $request)
{
    $articles = Guidance::where('type', 'article')->get();
    $books = Guidance::where('type', 'booke')->get();
    $videos = Guidance::where('type', 'video')->get();
    $advices = Guidance::where('type', 'advice')->get();

    return Inertia::render('Guidances/indexUser', [
        'articles' => $articles,
        'books' => $books,
        'videos' => $videos,
        'advices' => $advices,

  
    ]);
}
     public function index()
    {
        $guidances = Guidance::latest()->get();

        return inertia('Admin/Guidances/Index', [
            'guidances' => $guidances,
            'stats' => [
                'total' => Guidance::count(),
                'recent' => Guidance::where('created_at', '>', now()->subDays(7))->count(),
            ]
        ]);
    }

    public function create()
    {
        return inertia('Admin/Guidances/Create');
    }

    public function store(Request $request)
    {
         $validated = $request->validate([
            'title' => 'required|string|max:100',
            'image' => 'nullable|file|image|max:2048',
            'description' => 'required|string',
            'link' => 'nullable|url|max:255',
            'type' => 'required|in:article,booke,video,advice',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('guidances', 'public');
        }

        Guidance::create($validated);

        return redirect()->route('guidances.index')->with('success', 'تمت إضافة التوجيه بنجاح.');
    }

    public function show(Guidance $guidance)
    {
        return inertia('Admin/Guidances/Show', [
            'guidance' => $guidance
        ]);
    }

    public function edit(Guidance $guidance)
    {
        // dd($guidance->all());
        return inertia('Admin/Guidances/Edit', [
            'guidance' => $guidance
        ]);
    }

    public function update(Request $request, Guidance $guidance)
    {
         $validated = $request->validate([
        'title' => 'required|string|max:100',
        'description' => 'required|string',
        'link' => 'nullable|string|max:255',
        'type' => 'required|in:article,booke,video,advice',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($request->hasFile('image')) {
        if ($guidance->image && Storage::disk('public')->exists($guidance->image)) {
            Storage::disk('public')->delete($guidance->image);
        }

        $validated['image'] = $request->file('image')->store('guidances', 'public');
    } else {
        $validated['image'] = $guidance->image;
    }

    $guidance->update($validated);

    return redirect()->route('guidances.index')->with('success', 'تم تحديث التوجيه بنجاح.');


    }

    public function destroy(Guidance $guidance)
    {
        // حذف الصورة من التخزين إن وجدت
    if ($guidance->image) {
        \Illuminate\Support\Facades\Storage::disk('public')->delete($guidance->image);
    }

    $guidance->delete();

    return redirect()->route('guidances.index')->with('success', 'تم حذف التوجيه بنجاح.');
    }
}
