<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Customer\MainController;

//Route::get('/', [MainController::class, 'home'])->name('home');
Route::get('/dashboard', [MainController::class, 'dashboard'])->name('dashboard');
