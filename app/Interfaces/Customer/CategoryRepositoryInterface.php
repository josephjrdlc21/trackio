<?php

namespace App\Interfaces\Customer;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;

interface CategoryRepositoryInterface {

    public function index(): Response;
}