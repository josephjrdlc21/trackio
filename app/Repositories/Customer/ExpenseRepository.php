<?php

namespace App\Repositories\Customer;

use App\Interfaces\Customer\ExpenseRepositoryInterface;

use App\Models\Expense;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use App\Services\FileUploader;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseRepository implements ExpenseRepositoryInterface{
    
    public function index(array $data): Response {
        $user = Auth::guard('web')->user();

        $filters = $data['filters'] ?? [];
        $keyword = $filters['keyword'] ?? null;
        $per_page = $data['per_page'] ?? 10;

        $data['records'] = Expense::when($keyword, function ($query) use ($keyword) {
            $query->whereRaw("LOWER(note) LIKE '%{$keyword}%'");
        })
        ->where('user_id', $user->id)
        ->latest()
        ->paginate($per_page)
        ->withQueryString();
       
        return Inertia::render('customer/expense/index', $data);
    }

    public function create(): Response {

        return Inertia::render('customer/expense/create');
    }

    public function store(array $data): RedirectResponse {
        DB::beginTransaction();
        try {
            $user = Auth::guard('web')->user();

            $expense = new Expense();
            $expense->user_id = $user->id;
            $expense->category_id = $data['category'];
            $expense->amount = $data['amount'];
            $expense->expense_date = $data['expense_date'];
            $expense->note = $data['note'];
            $expense->save();

            if(!empty($data['receipt'])) {
                $image = FileUploader::upload($data['image'], "uploads/expense/{$expense->id}");
                $expense->path = $image['path'];
                $expense->directory = $image['directory'];
                $expense->filename = $image['filename'];
                $expense->source = $image['source'];
                $expense->save();
            }

            DB::commit();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Expense created successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Server Error: Code #{$e->getLine()}.");
            return redirect()->back();
        }

        return redirect()->route('customer.expense.index');
    }

    public function edit(int $id): Response {
        $data['expense'] = Expense::find($id);

        if (!$data['expense']) {
            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Record not found.");
            return redirect()->back();
        }

        return Inertia::render('customer/expense/edit', $data);
    }

    public function update(int $id, array $data): RedirectResponse {
        $expense = Expense::find($id);

        if (!$expense) {
            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Record not found.");
            return redirect()->back();
        }

        DB::beginTransaction();
        try {
            $expense->category_id = $data['category'];
            $expense->amount = $data['amount'];
            $expense->expense_date = $data['expense_date'];
            $expense->note = $data['note'];
            $expense->save();

            if(!empty($data['receipt'])) {
                $image = FileUploader::upload($data['image'], "uploads/expense/{$expense->id}");
                $expense->path = $image['path'];
                $expense->directory = $image['directory'];
                $expense->filename = $image['filename'];
                $expense->source = $image['source'];
                $expense->save();
            }

            DB::commit();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Expense updated successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Server Error: Code #{$e->getLine()}.");
            return redirect()->back();
        }

        return redirect()->route('customer.expense.index');
    }

    public function destroy(int $id): RedirectResponse {
        $expense = Expense::find($id);

        if (!$expense) {
            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Record not found.");
            return redirect()->back();
        }

        DB::beginTransaction();
        try {
            $expense->delete();

            DB::commit();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Expense deleted successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Server Error: Code #{$e->getLine()}.");
            return redirect()->back();
        }

        return redirect()->route('customer.expense.index');
    }
}