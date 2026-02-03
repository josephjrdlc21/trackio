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
        Schema::table('incomes', function (Blueprint $table) {
            $table->string('source')->nullable()->after('note');
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
        Schema::table('incomes', function (Blueprint $table) {
            $table->dropColumn([
                'source',
                'filename',
                'path',
                'directory',
            ]);
        });
    }
};
