<?php

namespace App\Http\Controllers\Customer;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class MainController extends Controller{
    protected array $data = [];
    protected ?int $per_page;

    public function __construct() {
        parent::__construct();
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
    }

    public function dashboard(): Response {
        $this->data['page_title'] = "Dashboard";

        return inertia('customer/dashboard', $this->data);
    }
}