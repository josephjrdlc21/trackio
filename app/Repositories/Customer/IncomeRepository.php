<?php

namespace App\Repositories\Customer;

use App\Interfaces\Customer\IncomeRepositoryInterface;

use App\Models\Income;
use App\Models\Category;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use App\Services\FileUploader;
use Inertia\Inertia;
use Inertia\Response;

class IncomeRepository implements IncomeRepositoryInterface{

    public function index(array $data): Response {
        $user = Auth::guard('web')->user();

        $filters = $data['filters'] ?? [];
        $keyword = $filters['keyword'] ?? null;
        $per_page = $data['per_page'] ?? 10;

        $data['records'] = Income::with(['category'])->when($keyword, function ($query) use ($keyword) {
            $query->whereRaw("LOWER(note) LIKE '%{$keyword}%'");
        })
        ->where('user_id', $user->id)
        ->latest()
        ->paginate($per_page)
        ->withQueryString();
       
        return Inertia::render('customer/income/index', $data);
    }

    public function create(): Response {
        $user = Auth::guard('web')->user();

        $data['categories'] = Category::where('user_id', $user->id)->where('status', 'active')->get();

        return Inertia::render('customer/income/create', $data);
    }

    public function store(array $data): RedirectResponse {
        DB::beginTransaction();
        try {
            $user = Auth::guard('web')->user();

            $income = new Income();
            $income->user_id = $user->id;
            $income->category_id = $data['category'];
            $income->amount = $data['amount'];
            $income->income_date = $data['income_date'];
            $income->note = $data['note'];
            $income->save();

            if(!empty($data['receipt'])) {
                $image = FileUploader::upload($data['receipt'], "uploads/income/{$income->id}");
                $income->path = $image['path'];
                $income->directory = $image['directory'];
                $income->filename = $image['filename'];
                $income->source = $image['source'];
                $income->save();
            }

            DB::commit();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Income created successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Server Error: Code #{$e->getLine()}.");
            return redirect()->back();
        }

        return redirect()->route('customer.income.index');
    }

    public function edit(int $id): Response {
        $user = Auth::guard('web')->user();

        $data['categories'] = Category::where('user_id', $user->id)->where('status', 'active')->get();
        $data['income'] = Income::find($id);

        if (!$data['income']) {
            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Record not found.");
            return redirect()->back();
        }

        return Inertia::render('customer/income/edit', $data);
    }

    public function update(int $id, array $data): RedirectResponse {
        $income = Income::find($id);

        if (!$income) {
            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Record not found.");
            return redirect()->back();
        }

        DB::beginTransaction();
        try {
            $income->category_id = $data['category'];
            $income->amount = $data['amount'];
            $income->income_date = $data['income_date'];
            $income->note = $data['note'];
            $income->save();

            if(!empty($data['receipt'])) {
                $image = FileUploader::upload($data['receipt'], "uploads/income/{$income->id}");
                $income->path = $image['path'];
                $income->directory = $image['directory'];
                $income->filename = $image['filename'];
                $income->source = $image['source'];
                $income->save();
            }

            DB::commit();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Income updated successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Server Error: Code #{$e->getLine()}.");
            return redirect()->back();
        }

        return redirect()->route('customer.income.index');
    }

    public function destroy(int $id): RedirectResponse {
        $income = Income::find($id);

        if (!$income) {
            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Record not found.");
            return redirect()->back();
        }

        DB::beginTransaction();
        try {
            $income->delete();

            DB::commit();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Income deleted successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Server Error: Code #{$e->getLine()}.");
            return redirect()->back();
        }

        return redirect()->route('customer.income.index');
    }
}