<?php
use App\Models\Announcement;
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
use App\Models\Governorate;
use App\Http\Controllers\CollegeController;
use App\Http\Controllers\GovernorateController;
use App\Http\Controllers\SpecializationController;
use App\Http\Controllers\UniversitySelectionPageController;
use App\Http\Controllers\ChatAIController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TopStudentController;

use App\Http\Controllers\GraduationProjectController;

/*
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
    $GOVERNORATES = Governorate::latest()->get();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'GOVERNORATES' => $GOVERNORATES,

    ]);
})->name('welcome');

// Route::get('/', function () {
//     $GOVERNORATES = Governorate::latest()->get();


//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//         'GOVERNORATES' => $GOVERNORATES,

//     ]);
// })->name('welcome'); // إضافة اسم للراوت هنا

//من اجل المفاضلة على الصفحة الرئيسية
Route::get('/', [UniversitySelectionPageController::class, 'welcomeUser'])->name('welcome');



// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });



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
    Route::resource('/terms', TermController::class);
    Route::resource('/guidances', GuidanceController::class);
    Route::resource('/governorates', GovernorateController::class);
    Route::resource('/Admincolleges', CollegeController::class);
    Route::resource('/adminspecializations', SpecializationController::class);
    Route::resource('/admingraduation_projects', GraduationProjectController::class);
    Route::resource('/admincourses', CourseController::class);
    Route::resource('admintopstudents', TopStudentController::class);



});



require __DIR__.'/auth.php';




Route::get('/colleges', [CollegeController::class, 'indexUser'])->name('colleges.indexUser');
// صفحة التفاصيل للكلية
Route::get('/universities/{id}', [CollegeController::class, 'showUser'])->name('colleges.showUser');



// راوت صفحة التوجيه والدعم للواجهة الأمامية
Route::get('/guidance', [GuidanceController::class, 'frontendIndexUser'])->name('guidance.indexUser');

// صفحة الأسئلة الشائعة -
Route::get('/questions', [FaqController::class, 'indexUser'])->name('faq.indexUser');




Route::get('/university-selection', [UniversitySelectionPageController::class, 'indexUser'])->name('university.selection');

////رات الشات

Route::get('/chat-ai', [ChatAIController::class, 'indexUser'])->name('chat.ai');


//راوت الاختصاصات
    Route::get('/specializations/{id}', [SpecializationController::class, 'showUser'])->name('specializations.showUser');


//راوت الاوئل

Route::get('/specializations/{id}/top-students', [TopStudentController::class, 'showUser'])
    ->name('specializations.topStudents');



//راوتات مشاريع التخرج

Route::get('/specializations/{id}/graduation-projects/years', [GraduationProjectController::class, 'bySpecialization']);
Route::get('/specializations/{id}/graduation-projects/{year}', [GraduationProjectController::class, 'showByYear']);
Route::post('/graduation-projects/comments', [GraduationProjectController::class, 'addComment']);


