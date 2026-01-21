<?php

namespace App\Interfaces\Customer;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;

interface AuthRepositoryInterface {

    public function login(): Response;
    public function authenticate(array $data): RedirectResponse;
    public function logout(): RedirectResponse;
}