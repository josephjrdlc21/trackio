<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Customer Repositories
        $this->app->bind(\App\Interfaces\Customer\AuthRepositoryInterface::class,\App\Repositories\Customer\AuthRepository::class);
        $this->app->bind(\App\Interfaces\Customer\MainRepositoryInterface::class,\App\Repositories\Customer\MainRepository::class);
        $this->app->bind(\App\Interfaces\Customer\CategoryRepositoryInterface::class,\App\Repositories\Customer\CategoryRepository::class);
    }
}