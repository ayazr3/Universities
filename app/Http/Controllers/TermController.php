<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Term;

class TermController extends Controller
{
    public function index()
    {
        $terms = Term::latest()->get();

        return inertia('Admin/Terms/Index', [
            'terms' => $terms,
            'stats' => [
                'total' => Term::count(),
                'recent' => Term::where('created_at', '>', now()->subDays(7))->count(),
            ],
        ]);
    }

    public function create()
    {
        return inertia('Admin/Terms/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'content' => 'required|string|max:255',
            'type' => 'required|in:termsofservice,privacypolicy',
        ]);

        Term::create($validated);

        return redirect()->route('terms.index')->with('success', 'تمت إضافة الشرط بنجاح.');
    }

    public function show(Term $term)
    {
        return inertia('Admin/Terms/Show', ['term' => $term]);
    }

    public function edit(Term $term)
    {
        return inertia('Admin/Terms/Edit', ['term' => $term]);
    }

    public function update(Request $request, Term $term)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'content' => 'required|string|max:255',
            'type' => 'required|in:termsofservice,privacypolicy',
        ]);

        $term->update($validated);

        return redirect()->route('terms.index')->with('success', 'تم تحديث الشرط بنجاح.');
    }

    public function destroy(Term $term)
    {
        $term->delete();

        return redirect()->route('terms.index')->with('success', 'تم حذف الشرط بنجاح.');
    }
}
