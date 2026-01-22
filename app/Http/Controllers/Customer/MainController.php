<?php

namespace App\Http\Controllers\Customer;

use App\Interfaces\Customer\MainRepositoryInterface;
use App\Http\Requests\PageRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class MainController extends Controller{
    protected MainRepositoryInterface $main_repo;
    protected array $data = [];
    protected ?int $per_page;

    public function __construct(MainRepositoryInterface $main_repo) {
        parent::__construct();
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
        $this->main_repo = $main_repo;
    }

    public function dashboard(PageRequest $request): Response {

        return $this->main_repo->dashboard();
    }
}