<?php

namespace App\Http\Controllers\Customer;

use App\Interfaces\Customer\ExpenseRepositoryInterface;
use App\Http\Requests\PageRequest;
use App\Http\Requests\Customer\Expense\StoreExpenseRequest;
use App\Http\Requests\Customer\Expense\UpdateExpenseRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class ExpenseController extends Controller{
    protected ExpenseRepositoryInterface $expense_repo;
    protected array $data = [];
    protected ?int $per_page;

    public function __construct(ExpenseRepositoryInterface $expense_repo) {
        parent::__construct();
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
        $this->expense_repo = $expense_repo;
    }

    public function index(PageRequest $request): Response {
        $this->data['filters'] = $request->all();
        $this->data['per_page'] = $this->per_page;

        return $this->expense_repo->index($this->data);
    }

    public function create(PageRequest $request): Response {

        return $this->expense_repo->create();
    }

    public function store(StoreExpenseRequest $request): RedirectResponse {

        return $this->expense_repo->store($request->validated());
    }

    public function edit(PageRequest $request, ?int $id = null): Response|RedirectResponse {

        return $this->expense_repo->edit($id);
    }

    public function update(UpdateExpenseRequest $request, ?int $id = null): RedirectResponse {

        return $this->expense_repo->update($id, $request->validated());
    }

    public function destroy(PageRequest $request,?int $id = null): RedirectResponse {

        return $this->expense_repo->destroy($id);
    }
}