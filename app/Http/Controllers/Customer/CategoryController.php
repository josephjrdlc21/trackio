<?php

namespace App\Http\Controllers\Customer;

use App\Interfaces\Customer\CategoryRepositoryInterface;
use App\Http\Requests\PageRequest;
use App\Http\Requests\Customer\Category\StoreCategoryRequest;
use App\Http\Requests\Customer\Category\UpdateCategoryRequest;
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
        $this->data['filters'] = $request->all();
        $this->data['per_page'] = $this->per_page;

        return $this->category_repo->index($this->data);
    }

    public function create(PageRequest $request): Response {

        return $this->category_repo->create();
    }

    public function store(StoreCategoryRequest $request): RedirectResponse {

        return $this->category_repo->store($request->validated());
    }

    public function edit(PageRequest $request, ?int $id = null): Response {

        return $this->category_repo->edit($id);
    }

    public function update(UpdateCategoryRequest $request, ?int $id = null): RedirectResponse {

        return $this->category_repo->update($id, $request->validated());
    }

    public function destroy(PageRequest $request,?int $id = null): RedirectResponse {

        return $this->category_repo->destroy($id);
    }
}