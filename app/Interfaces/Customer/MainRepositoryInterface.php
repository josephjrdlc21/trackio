<?php

namespace App\Interfaces\Customer;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;

interface MainRepositoryInterface {

    public function dashboard(array $data): Response;
}