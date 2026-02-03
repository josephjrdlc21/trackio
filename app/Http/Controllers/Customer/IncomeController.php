<?php

namespace App\Http\Controllers\Customer;

use App\Interfaces\Customer\IncomeRepositoryInterface;
use App\Http\Requests\PageRequest;
use App\Http\Requests\Customer\Income\StoreIncomeRequest;
use App\Http\Requests\Customer\Income\UpdateIncomeRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class IncomeController extends Controller{
    protected IncomeRepositoryInterface $income_repo;
    protected array $data = [];
    protected ?int $per_page;

    public function __construct(IncomeRepositoryInterface $income_repo) {
        parent::__construct();
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
        $this->income_repo = $income_repo;
    }

    public function index(PageRequest $request): Response {
        $this->data['filters'] = $request->all();
        $this->data['per_page'] = $this->per_page;

        return $this->income_repo->index($this->data);
    }

    public function create(PageRequest $request): Response {

        return $this->income_repo->create();
    }

    public function store(StoreIncomeRequest $request): RedirectResponse {

        return $this->income_repo->store($request->validated());
    }

    public function edit(PageRequest $request, ?int $id = null): Response|RedirectResponse {

        return $this->income_repo->edit($id);
    }

    public function update(UpdateIncomeRequest $request, ?int $id = null): RedirectResponse {

        return $this->income_repo->update($id, $request->validated());
    }

    public function destroy(PageRequest $request,?int $id = null): RedirectResponse {

        return $this->income_repo->destroy($id);
    }
}