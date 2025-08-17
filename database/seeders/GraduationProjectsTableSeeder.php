<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GraduationProject;
use Illuminate\Support\Facades\Storage;

class GraduationProjectsTableSeeder extends Seeder
{
    public function run(): void
    {
        // تأكد من وجود مجلدات التخزين الافتراضية للصور والملفات
        Storage::disk('public')->makeDirectory('theses');
        Storage::disk('public')->makeDirectory('images/projects');
        
        // نسخ ملف بصيغة PDF وهمية وصورة وهمية في مجلد التخزين (مرة واحدة فقط)
        $dummyPdfPath = 'theses/dummy.pdf';
        $dummyJpgPath = 'images/projects/dummy.jpg';
        if (!Storage::disk('public')->exists($dummyPdfPath)) {
            Storage::disk('public')->put($dummyPdfPath, 'Dummy PDF content');
        }
        if (!Storage::disk('public')->exists($dummyJpgPath)) {
            Storage::disk('public')->put($dummyJpgPath, 'dummy image content');
        }

        GraduationProject::factory()
            ->count(5)
            ->state(function () use ($dummyPdfPath, $dummyJpgPath) {
                return [
                    'thesis_file' => $dummyPdfPath,
                    'project_images' => json_encode([$dummyJpgPath]),
                ];
            })
            ->create();
    }
}
