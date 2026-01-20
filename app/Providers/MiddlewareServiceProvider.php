<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class MiddlewareServiceProvider extends ServiceProvider
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
        $router = $this->app['router'];
        $router->aliasMiddleware('customer.auth', \App\Http\Middlewares\Customer\Authenticate::class);
        $router->aliasMiddleware('customer.guest', \App\Http\Middlewares\Customer\RedirectIfAuthenticated::class);
        $router->aliasMiddleware('backoffice.auth', \App\Http\Middlewares\Backoffice\Authenticate::class);
        $router->aliasMiddleware('backoffice.guest', \App\Http\Middlewares\Backoffice\RedirectIfAuthenticated::class);
        $router->aliasMiddleware('throttle', \Illuminate\Routing\Middleware\ThrottleRequests::class);
    }
}