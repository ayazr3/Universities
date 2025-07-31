<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class SettingController extends Controller
{
    // عرض جميع الإعدادات
    public function index()
    {
        $settings = Setting::latest()->get()->map(function ($setting) {
            $setting->location = json_decode($setting->location, true) ?: ['lat' => 24.7136, 'lng' => 46.6753];
            return $setting;
        });

        return inertia('Admin/Settings/Index', [
            'settings' => $settings,
            'stats' => [
                'total' => Setting::count(),
                'recent' => Setting::where('created_at', '>', now()->subDays(7))->count(),
            ]
        ]);
    }

    // عرض نموذج إضافة إعداد جديد
    public function create()
    {
        return inertia('Admin/Settings/Create');
    }

    // حفظ إعداد جديد
    public function store(Request $request)
    {
        $validated = $request->validate([
            'site_name'   => 'required|string|max:100',
            'logo'        => 'required|string|max:100',
            'url'         => 'required|string|max:255',
            'location.lat' => 'required|numeric',
            'location.lng' => 'required|numeric',
            'description' => 'required|string',
        ]);

        Setting::create([
            'site_name'   => $validated['site_name'],
            'logo'        => $validated['logo'],
            'url'         => $validated['url'],
            'location'    => json_encode($validated['location']),
            'description' => $validated['description'],
        ]);

        return redirect()->route('settings.index')->with('success', 'تمت إضافة الإعداد بنجاح.');
    }

    // عرض تفاصيل إعداد معين
    public function show(Setting $setting)
    {
        $setting->location = json_decode($setting->location, true) ?: ['lat' => 24.7136, 'lng' => 46.6753];

        return inertia('Admin/Settings/Show', [
            'setting' => $setting
        ]);
    }

    // عرض نموذج تعديل إعداد
    public function edit(Setting $setting)
    {
        $setting->location = json_decode($setting->location, true) ?: ['lat' => 24.7136, 'lng' => 46.6753];

        return inertia('Admin/Settings/Edit', [
            'setting' => $setting
        ]);
    }

    // تحديث إعداد معين
    public function update(Request $request, Setting $setting)
    {
        $validated = $request->validate([
            'site_name'   => 'required|string|max:100',
            'logo'        => 'required|string|max:100',
            'url'         => 'required|string|max:255',
            'location.lat' => 'required|numeric',
            'location.lng' => 'required|numeric',
            'description' => 'required|string',
        ]);

        $setting->update([
            'site_name'   => $validated['site_name'],
            'logo'        => $validated['logo'],
            'url'         => $validated['url'],
            'location'    => json_encode($validated['location']),
            'description' => $validated['description'],
        ]);

        return redirect()->route('settings.index')->with('success', 'تم تحديث الإعداد بنجاح.');
    }

    // حذف إعداد معين
    public function destroy(Setting $setting)
    {
        $setting->delete();

        return redirect()->route('settings.index')->with('success', 'تم حذف الإعداد بنجاح.');
    }
}
