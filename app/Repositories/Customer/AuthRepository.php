<?php

namespace App\Repositories\Customer;

use App\Interfaces\Customer\AuthRepositoryInterface;

use App\Models\User;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

use Inertia\Inertia;
use Inertia\Response;

class AuthRepository implements AuthRepositoryInterface{
    public function login(): Response {
       
        return Inertia::render('customer/auth/login');
    }

    public function authenticate(array $data): RedirectResponse {
        $guard = "web";

        if(Auth::guard($guard)->attempt(['email' => Str::lower($data['email']), 'password' => $data['password']])){
            $account = Auth::guard($guard)->user();

            if(!$account->email_verified_at) {
                session()->flash('notification-status', "warning");
                session()->flash('notification-msg', "Account is not verified.");

                Auth::guard($guard)->logout();
            }

            if($account->status == "inactive") {
                session()->flash('notification-status', "warning");
                session()->flash('notification-msg', "Account is inactive.");

                Auth::guard($guard)->logout();
            }

            $account->last_login_at = now();
            $account->save();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Welcome {$account->name}!.");
            return redirect()->route('customer.dashboard');
        }

        session()->flash('notification-status', "failed");
        session()->flash('notification-msg', "Invalid account credentials.");
        return redirect()->route('customer.auth.login');
    }

    public function logout(): RedirectResponse {
        Auth::guard("web")->logout();

        session()->flash('notification-status', "success");
        session()->flash('notification-msg', "You have been logged out.");
        return redirect()->route('customer.auth.login');
    }
}