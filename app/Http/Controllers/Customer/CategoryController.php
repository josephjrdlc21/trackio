<?php

namespace App\Http\Controllers\Customer;

use App\Interfaces\Customer\CategoryRepositoryInterface;
use App\Http\Requests\PageRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class CategoryController extends Controller{
    protected CategoryRepositoryInterface $category_repo;
    protected array $data = [];
    protected ?int $per_page;

    public function __construct(CategoryRepositoryInterface $category_repo) {
        parent::__construct();
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
        $this->category_repo = $category_repo;
    }

    public function index(PageRequest $request): Response {

        return $this->category_repo->index();
    }
}