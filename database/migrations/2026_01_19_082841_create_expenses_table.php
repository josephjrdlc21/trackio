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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->nullable()->index();
            $table->bigInteger('category_id')->nullable()->index();
            $table->decimal('amount', 15, 2)->nullable();
            $table->date('expense_date')->nullable();
            $table->text('note')->nullable();

            $table->string('source')->nullable();
            $table->string('filename')->nullable();
            $table->string('path')->nullable();
            $table->string('directory')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
