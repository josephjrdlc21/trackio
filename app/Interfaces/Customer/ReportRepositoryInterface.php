<?php

namespace App\Interfaces\Customer;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;

interface ReportRepositoryInterface {

    public function index(array $data): Response;
}