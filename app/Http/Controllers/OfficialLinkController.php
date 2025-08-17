<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\OfficialLink;

class OfficialLinkController extends Controller
{

    // عرض جميع الروابط الرسمية
    public function index()
    {
        $officialLinks = OfficialLink::latest()->get();

        return inertia('Admin/OfficialLinks/Index', [
            'officialLinks' => $officialLinks,
            'stats' => [
                'total' => OfficialLink::count(),
                'recent' => OfficialLink::where('created_at', '>', now()->subDays(7))->count(),
            ]
        ]);
    }

    // عرض نموذج إضافة رابط رسمي جديد
    public function create()
    {
        return inertia('Admin/OfficialLinks/Create');
    }

    // حفظ رابط رسمي جديد
    public function store(Request $request)
    {
        $validated = $request->validate([
            'entity_name' => 'required|string|max:100',
            'link' => 'required|url|max:255',
        ]);

        OfficialLink::create($validated);

        return redirect()->route('official-links.index')->with('success', 'تمت إضافة الرابط الرسمي بنجاح.');
    }

    // عرض تفاصيل رابط رسمي معين
    public function show(OfficialLink $officialLink)
    {
        return inertia('Admin/OfficialLinks/Show', [
            'officialLink' => $officialLink
        ]);
    }

    // عرض نموذج تعديل رابط رسمي
    public function edit(OfficialLink $officialLink)
    {
        return inertia('Admin/OfficialLinks/Edit', [
            'officialLink' => $officialLink
        ]);
    }

    // تحديث رابط رسمي معين
    public function update(Request $request, OfficialLink $officialLink)
    {
        $validated = $request->validate([
            'entity_name' => 'required|string|max:100',
            'link' => 'required|url|max:255',
        ]);

        $officialLink->update($validated);

        return redirect()->route('official-links.index')->with('success', 'تم تحديث الرابط الرسمي بنجاح.');
    }

    // حذف رابط رسمي معين
    public function destroy(OfficialLink $officialLink)
    {
        $officialLink->delete();

        return redirect()->route('official-links.index')->with('success', 'تم حذف الرابط الرسمي بنجاح.');
    }
}
