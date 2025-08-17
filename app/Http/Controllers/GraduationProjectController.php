<?php
namespace App\Http\Controllers;

use App\Models\GraduationProject;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GraduationProjectController extends Controller
{
    public function bySpecialization($specializationId)
    {
        $years = GraduationProject::where('specialization_id', $specializationId)
            ->pluck('graduation_year')->unique();
        return response()->json($years);
    }

    public function showByYear($specializationId, $year)
    {
        $projects = GraduationProject::where('specialization_id', $specializationId)
            ->where('graduation_year', $year)
            ->with(['comments', 'specialization.college.governorate'])
            ->get()
            ->map(function($project) {
                $project->team_members_as_string = is_array($project->team_members) ? implode(' - ', $project->team_members) : $project->team_members;
                $project->governorate_name = $project->specialization->college->governorate->name ?? '';
                $project->college_name = $project->specialization->college->name ?? '';
                return $project;
            });

        return Inertia::render('GraduationProjects', [
            'projects' => $projects
        ]);
    }

    public function addComment(Request $request)
    {
        $request->validate([
            'name' => 'required|max:100',
            'content' => 'required|max:500',
            'graduation_project_id' => 'required|exists:graduation_projects,id',
        ]);

             $comment = Comment::create([
            'name' => $request->name,
            'email' => $request->email ?? '',
            'content' => $request->content,
            'specialization_id' => $request->specialization_id,
            'graduation_project_id' => $request->graduation_project_id,
            'parent_id' => $request->parent_id,
            'is_approved' => true, // تعيين موافقة تلقائية
            ]);

       

        return response()->json($comment, 201);
    }
}
