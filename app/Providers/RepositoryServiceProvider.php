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
        $this->app->bind(\App\Interfaces\Customer\ExpenseRepositoryInterface::class,\App\Repositories\Customer\ExpenseRepository::class);
        $this->app->bind(\App\Interfaces\Customer\IncomeRepositoryInterface::class,\App\Repositories\Customer\IncomeRepository::class);
        $this->app->bind(\App\Interfaces\Customer\BudgetRepositoryInterface::class,\App\Repositories\Customer\BudgetRepository::class);
        $this->app->bind(\App\Interfaces\Customer\ReportRepositoryInterface::class,\App\Repositories\Customer\ReportRepository::class);
    }
}