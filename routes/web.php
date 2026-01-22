<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Customer\MainController;
use App\Http\Controllers\Customer\AuthController;
use App\Http\Controllers\Customer\CategoryController;

//Route::get('/', [MainController::class, 'home'])->name('home');

Route::name('customer.')->group(function () {
    Route::name('auth.')->group(function () {
        Route::get('/login', [AuthController::class, 'login'])->name('login')->middleware('customer.guest');
        Route::post('/authenticate', [AuthController::class, 'authenticate'])->name('authenticate')->middleware('customer.guest');
        Route::get('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('customer.auth');
    });

    Route::middleware('customer.auth')->group(function () {
        Route::get('/dashboard', [MainController::class, 'dashboard'])->name('dashboard');

        Route::prefix('category')->name('category.')->group(function () { 
            Route::get('/', [CategoryController::class, 'index'])->name('index');
        });
    });
});
