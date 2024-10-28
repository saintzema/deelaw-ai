<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;  // Add this import

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->json('tokens')->nullable();
            $table->string('avatar')->nullable();
            $table->string('role')->default('user');
            $table->json('plan')->nullable();
            $table->string('referral_id')->nullable();
            $table->string('company')->nullable();
            $table->string('website')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('job_role')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });

        // Set default tokens value after creation
        DB::statement("
            UPDATE users
            SET tokens = ?
            WHERE tokens IS NULL",
            [json_encode([
                'words' => 5000,
                'images' => 0,
                'minutes' => 5,
                'characters' => 1000
            ])]
        );
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
