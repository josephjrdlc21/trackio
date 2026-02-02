<?php

namespace App\Interfaces\Customer;

use Illuminate\Http\RedirectResponse;
use Inertia\Response;

interface IncomeRepositoryInterface {

    public function index(array $data): Response;
    public function create(): Response;
    public function store(array $data): RedirectResponse;
    public function edit(int $id): Response;
    public function update(int $id, array $data): RedirectResponse;
    public function destroy(int $id): RedirectResponse;
}