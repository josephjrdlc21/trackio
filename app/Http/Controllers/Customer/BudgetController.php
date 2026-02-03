<?php

namespace App\Http\Controllers\Customer;

use App\Interfaces\Customer\BudgetRepositoryInterface;
use App\Http\Requests\PageRequest;
use App\Http\Requests\Customer\Budget\StoreBudgetRequest;
use App\Http\Requests\Customer\Budget\UpdateBudgetRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class BudgetController extends Controller{
    protected BudgetRepositoryInterface $budget_repo;
    protected array $data = [];
    protected ?int $per_page;

    public function __construct(BudgetRepositoryInterface $budget_repo) {
        parent::__construct();
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
        $this->budget_repo = $budget_repo;
    }

    public function index(PageRequest $request): Response {
        $this->data['filters'] = $request->all();
        $this->data['per_page'] = $this->per_page;

        return $this->budget_repo->index($this->data);
    }

    public function create(PageRequest $request): Response {

        return $this->budget_repo->create();
    }

    public function store(StoreBudgetRequest $request): RedirectResponse {

        return $this->budget_repo->store($request->validated());
    }

    public function edit(PageRequest $request, ?int $id = null): Response|RedirectResponse {

        return $this->budget_repo->edit($id);
    }

    public function update(UpdateBudgetRequest $request, ?int $id = null): RedirectResponse {

        return $this->budget_repo->update($id, $request->validated());
    }

    public function destroy(PageRequest $request,?int $id = null): RedirectResponse {

        return $this->budget_repo->destroy($id);
    }
}