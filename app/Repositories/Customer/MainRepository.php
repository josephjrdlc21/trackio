<?php

namespace App\Repositories\Customer;

use App\Interfaces\Customer\MainRepositoryInterface;

use Inertia\Inertia;
use Inertia\Response;

class MainRepository implements MainRepositoryInterface{
    public function dashboard(): Response {
       
        return Inertia::render('customer/dashboard');
    }
}