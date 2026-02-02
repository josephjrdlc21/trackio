<?php

namespace App\Repositories\Customer;

use App\Interfaces\Customer\BudgetRepositoryInterface;

use App\Models\Budget;
use App\Models\Category;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BudgetRepository implements BudgetRepositoryInterface{

    public function index(array $data): Response {
        $user = Auth::guard('web')->user();

        $filters = $data['filters'] ?? [];
        $keyword = $filters['keyword'] ?? null;
        $per_page = $data['per_page'] ?? 10;

        $data['records'] = Budget::with(['category'])->when($keyword, function ($query) use ($keyword) {
            $query->whereHas('category', function ($q) use ($keyword){
                $q->whereRaw("LOWER(name) LIKE '%{$keyword}%'");
            });
        })
        ->where('user_id', $user->id)
        ->latest()
        ->paginate($per_page)
        ->withQueryString();
       
        return Inertia::render('customer/budget/index', $data);
    }

    public function create(): Response {
        $user = Auth::guard('web')->user();

        $data['categories'] = Category::where('user_id', $user->id)->where('status', 'active')->get();

        return Inertia::render('customer/budget/create', $data);
    }

    public function store(array $data): RedirectResponse {
        DB::beginTransaction();
        try {
            $user = Auth::guard('web')->user();

            $budget = new Budget();
            $budget->user_id = $user->id;
            $budget->category_id = $data['category'];
            $budget->amount = $data['amount'];
            $budget->budget_date = $data['budget_date'];
            $budget->save();

            DB::commit();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Budget created successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Server Error: Code #{$e->getLine()}.");
            return redirect()->back();
        }

        return redirect()->route('customer.budget.index');
    }

    public function edit(int $id): Response {
        $user = Auth::guard('web')->user();

        $data['categories'] = Category::where('user_id', $user->id)->where('status', 'active')->get();
        $data['budget'] = Budget::find($id);

        if (!$data['budget']) {
            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Record not found.");
            return redirect()->back();
        }

        return Inertia::render('customer/budget/edit', $data);
    }

    public function update(int $id, array $data): RedirectResponse {
        $budget = Budget::find($id);

        if (!$budget) {
            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Record not found.");
            return redirect()->back();
        }

        DB::beginTransaction();
        try {
            $budget->category_id = $data['category'];
            $budget->amount = $data['amount'];
            $budget->budget_date = $data['budget_date'];
            $budget->save();

            DB::commit();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Budget updated successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Server Error: Code #{$e->getLine()}.");
            return redirect()->back();
        }

        return redirect()->route('customer.budget.index');
    }

    public function destroy(int $id): RedirectResponse {
        $budget = Budget::find($id);

        if (!$budget) {
            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Record not found.");
            return redirect()->back();
        }

        DB::beginTransaction();
        try {
            $budget->delete();

            DB::commit();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Budget deleted successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Server Error: Code #{$e->getLine()}.");
            return redirect()->back();
        }

        return redirect()->route('customer.budget.index');
    }
}