<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ChatAIController extends Controller
{
    public function indexUser()
    {
        // عرض صفحة الـ React التي تحتوي مكون GeminiChat
        return Inertia::render('ChatAIPage');
    }
}
