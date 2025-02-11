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
        Schema::table('appointment_notes', function (Blueprint $table) {
            $table->enum('status_change_type', ['scheduled', 'canceled', 'completed', 'pending'])->default('scheduled')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('appointment_notes', function (Blueprint $table) {
            $table->dropColumn('status_change_type');
        });
    }
};
