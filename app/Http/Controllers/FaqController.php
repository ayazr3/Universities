<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Faq;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FaqController extends Controller
{
         public function indexUser()
    {
        $faqs = Faq::orderBy('id')->get(); // جلب جميع الأسئلة بترتيب id

        return Inertia::render('Faqs/IndexUser', [
            'faqs' => $faqs,
        ]);
    }
     // عرض جميع الأسئلة والأجوبة
    public function index()
    {
        $faqs = Faq::latest()->get();

        return inertia('Admin/Faqs/Index', [
            'faqs' => $faqs,
            'stats' => [
                'total' => Faq::count(),
                'recent' => Faq::where('created_at', '>', now()->subDays(7))->count(),
            ]
        ]);
    }

    // عرض نموذج إضافة سؤال جديد
    public function create()
    {
        return inertia('Admin/Faqs/Create');
    }

    // حفظ سؤال جديد
    public function store(Request $request)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
        ]);

        Faq::create($validated);

        return redirect()->route('faq.index')->with('success', 'تم إنشاء السؤال والإجابة بنجاح.');
    }

    // عرض سؤال معين
    public function show(Faq $faq)
    {
        return inertia('Admin/Faqs/Show', [
            'faq' => $faq
        ]);
    }

    // عرض نموذج تعديل سؤال
    public function edit(Faq $faq)
    {
        return inertia('Admin/Faqs/Edit', [
            'faq' => $faq
        ]);
    }

    // تحديث سؤال معين
    public function update(Request $request, Faq $faq)
    {
        $validated = $request->validate([
            'question' => 'required|string',
            'answer' => 'required|string',
        ]);

        $faq->update($validated);

        return redirect()->route('faq.index')->with('success', 'تم تحديث السؤال والإجابة بنجاح.');
    }

    // حذف سؤال معين
    public function destroy(Faq $faq)
    {
        $faq->delete();

        return redirect()->route('faq.index')->with('success', 'تم حذف السؤال والإجابة بنجاح.');
    }
}
