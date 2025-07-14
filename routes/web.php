<?php

use App\Http\Controllers\AdmissionScheduleController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\GuidanceController;
use App\Http\Controllers\OfficialLinkController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegistrationStepController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\TermController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
//Route::resource('announcements', AnnouncementController::class);
//Route::get('announcements',[AnnouncementController::class,'store']);
// الصفحة الرئيسية
// Route::get('/', function () {
//     return view('app');
// });

Route::middleware('auth')->group(function () {
    Route::resource('/announcement', AnnouncementController::class);
    Route::resource('/faq', FaqController::class);
    Route::resource('/admissionSchedule', AdmissionScheduleController::class);
    Route::resource('/registrationstep', RegistrationStepController::class);
    Route::resource('/settings', SettingController::class);
    Route::resource('/official-links', OfficialLinkController::class);
    Route::resource('terms', TermController::class);
    Route::resource('/guidances', GuidanceController::class);

});


require __DIR__.'/auth.php';
