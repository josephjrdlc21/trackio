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
        Schema::table('users', function (Blueprint $table) {
            $table->softDeletes();
            $table->string('google_id')->nullable()->after('id');
            $table->string('role')->nullable()->after('email');
            $table->string('status')->nullable()->default('inactive')->after('role');
            $table->timestamp('last_login_at')->nullable()->after('status');

            $table->string('source')->nullable()->after('remember_token');
            $table->string('filename')->nullable()->after('source');
            $table->string('path')->nullable()->after('filename');
            $table->string('directory')->nullable()->after('path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropColumn([
                'google_id',
                'role',
                'status',
                'last_login_at',
                'source',
                'filename',
                'path',
                'directory',
            ]);
        });
    }
};
