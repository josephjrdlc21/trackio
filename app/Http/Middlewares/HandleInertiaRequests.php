<?php

namespace App\Http\Middlewares;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),

            'auth' => [
                'customer' => Auth::guard('web')->check()
                    ? Auth::guard('web')->user()
                    : null,

                // 'admin' => Auth::guard('backoffice')->check()
                //     ? Auth::guard('backoffice')->user()
                //     : null,
            ],

            'flash' => [
                'status' => session()->get('notification-status'),
                'message' => session()->get('notification-msg'),
            ],
        ];
    }
}
