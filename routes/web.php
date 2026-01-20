<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Customer\MainController;

//Route::get('/', [MainController::class, 'home'])->name('home');

Route::name('customer.')->group(function () {
    Route::get('/dashboard', [MainController::class, 'dashboard'])->name('dashboard');
});
