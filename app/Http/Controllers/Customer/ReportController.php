<?php

namespace App\Http\Controllers\Customer;

use App\Interfaces\Customer\ReportRepositoryInterface;
use App\Http\Requests\PageRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;

class ReportController extends Controller{
    protected ReportRepositoryInterface $report_repo;
    protected array $data = [];
    protected ?int $per_page;

    public function __construct(ReportRepositoryInterface $report_repo) {
        parent::__construct();
        $this->per_page = env("DEFAULT_PER_PAGE", 10);
        $this->report_repo = $report_repo;
    }

    public function index(PageRequest $request): Response {
        $this->data['filters'] = $request->all();
        $this->data['per_page'] = $this->per_page;

        return $this->report_repo->index($this->data);
    }
}