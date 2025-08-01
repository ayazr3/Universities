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
        Schema::create('admission_schedules', function (Blueprint $table) {
            $table->id();
            $table->string('title',100);
            $table->text('body');
            $table->date('date');
            $table->string('name',100);
            $table->string('file_url',255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admission_schedules');
    }
};
