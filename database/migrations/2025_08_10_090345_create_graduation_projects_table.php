<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('graduation_projects', function (Blueprint $table) {
            $table->id();
        //    $table->foreignId('specialization_id')->constrained()->onDelete('cascade');
        $table->unsignedBigInteger('specialization_id');
$table->foreign('specialization_id')->references('id')->on('specializations')->onDelete('cascade');

            $table->string('name',100);
            $table->text('description');
            $table->string('thesis_file',255);
            $table->json('project_images');
            $table->year('graduation_year');
            $table->json('team_members');
            $table->string('supervisor',100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('graduation_projects');
    }
};
