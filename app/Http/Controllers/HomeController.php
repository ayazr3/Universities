<?php

namespace App\Http\Controllers;

use App\Models\Guidance;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function home()
    {
        $articles = Guidance::where('type', 'article')->get();
        $books = Guidance::where('type', 'book')->get();
        $videos = Guidance::where('type', 'video')->get();

        return Inertia::render('HomePage', [
            'articles' => $articles,
            'books' => $books,
            'videos' => $videos,
        ]);
    }
}
