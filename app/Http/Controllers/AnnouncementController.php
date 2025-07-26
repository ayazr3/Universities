<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Announcement;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia; // إذا كنت تستخدم Inertia.js
use Illuminate\Support\Facades\View; // إذا كنت تريد استخدام طريقة عرض عادية


class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcement::latest()->get();
        //dd($announcements);
        return inertia('Announcements/Index', [
            'announcements' => $announcements,
            'stats' => [
                'total' => Announcement::count(),
                'recent' => Announcement::where('created_at', '>', now()->subDays(7))->count(),
            ]
        ]);

    //     return inertia('Announcements/Index', [
    //     'announcements' => [
    //         [
    //             'id' => 1,
    //             'title' => 'عنوان تجريبي',
    //             'summary' => 'ملخص تجريبي',
    //             'publisher' => 'ناشر تجريبي',
    //             'publish_date' => now()->toDateString(),
    //         ],
    //     ],
    //     'stats' => [
    //         'total' => 1,
    //         'recent' => 1,
    //     ],
    // ]);
        //return "hi";
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Announcements/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'summary' => 'required|string',
            'publisher' => 'required|string|max:100',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'publish_date' => 'required|date',
            'details' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('announcements', 'public');
        }

        Announcement::create($validated);

        return redirect()->route('announcement.index')->with('success', 'تم إنشاء الإعلان بنجاح.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Announcement $announcement)
    {
        return inertia('Announcements/Show', [
            'announcement' => $announcement
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Announcement $announcement)
    {
        return inertia('Announcements/Edit', [
            'announcement' => $announcement
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Announcement $announcement)
    {
    //     $validated = $request->validate([
    //     'title' => 'required|string|max:100',
    //     'summary' => 'required|string',
    //     'publisher' => 'required|string|max:100',
    //     'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    //     'publish_date' => 'required|date',
    //     'details' => 'required|string',
    // ]);

    // // إذا لم يتم رفع صورة جديدة، احتفظ بالصورة القديمة
    // if (!$request->hasFile('image')) {
    //     $validated['image'] = $announcement->image;
    // } else {
    //     // إذا تم رفع صورة جديدة
    //     if ($announcement->image) {
    //         Storage::disk('public')->delete($announcement->image);
    //     }
    //     $validated['image'] = $request->file('image')->store('announcement', 'public');
    // }

    // $announcement->update($validated);

    // return redirect()->route('announcement.index')->with('success', 'تم تحديث الإعلان بنجاح.');

     $validated = $request->validate([
        'title' => 'required|string|max:100',
        'summary' => 'required|string',
        'publisher' => 'required|string|max:100',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'publish_date' => 'required|date',
        'details' => 'required|string',
    ]);

    if ($request->hasFile('image')) {
        // حذف الصورة القديمة اذا وجدت
        if ($announcement->image && Storage::disk('public')->exists($announcement->image)) {
            Storage::disk('public')->delete($announcement->image);
        }
        $validated['image'] = $request->file('image')->store('announcements', 'public');
    } else {
        // لم يتم رفع صورة جديدة، احتفظ بالصورة القديمة
        $validated['image'] = $announcement->image;
    }

    $announcement->update($validated);

    return redirect()->route('announcement.index')->with('success', 'تم تحديث الإعلان بنجاح.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Announcement $announcement)
    {
        if ($announcement->image) {
            Storage::disk('public')->delete($announcement->image);
        }

        $announcement->delete();

        return redirect()->route('announcement.index')->with('success', 'تم حذف الإعلان بنجاح.');
    }

}
