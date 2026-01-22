<?php

namespace App\Repositories\Customer;

use App\Interfaces\Customer\CategoryRepositoryInterface;

use Inertia\Inertia;
use Inertia\Response;

class CategoryRepository implements CategoryRepositoryInterface{
    public function index(): Response {
       
        return Inertia::render('customer/category/index');
    }
}