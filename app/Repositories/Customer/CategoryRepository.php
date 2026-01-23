<?php

namespace App\Repositories\Customer;

use App\Interfaces\Customer\CategoryRepositoryInterface;

use App\Models\Category;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;

use Inertia\Inertia;
use Inertia\Response;

class CategoryRepository implements CategoryRepositoryInterface{

    public function index(array $data): Response {
        $user = Auth::guard('web')->user();

        $filters = $data['filters'] ?? [];
        $keyword = $filters['keyword'] ?? null;
        $per_page = $data['per_page'] ?? 10;

        $data['records'] = Category::when($keyword, function ($query) use ($keyword) {
            $query->whereRaw("LOWER(name) LIKE '%{$keyword}%'")
                ->orWhereRaw("LOWER(type) LIKE '%{$keyword}%'");
        })
        ->latest()
        ->paginate($per_page);
       
        return Inertia::render('customer/category/index', $data);
    }

    public function create(): Response {

        return Inertia::render('customer/category/create');
    }

    public function store(array $data): RedirectResponse {
        DB::beginTransaction();
        try {
            $user = Auth::guard('web')->user();

            $category = new Category();
            $category->user_id = $user->id;
            $category->name = $data['name'];
            $category->type = $data['type'];
            $category->status = $data['status'];
            $category->save();

            DB::commit();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Category created successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Server Error: Code #{$e->getLine()}.");
            return redirect()->back();
        }

        return redirect()->route('customer.category.index');
    }

    public function edit(int $id): Response {
        $data['category'] = Category::find($id);

        if (!$data['category']) {
            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Record not found.");
            return redirect()->back();
        }

        return Inertia::render('customer/category/edit', $data);
    }

    public function update(int $id, array $data): RedirectResponse {
        $category = Category::find($id);

        if (!$category) {
            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Record not found.");
            return redirect()->back();
        }

        DB::beginTransaction();
        try {
            $category->name = $data['name'];
            $category->type = $data['type'];
            $category->status = $data['status'];
            $category->save();

            DB::commit();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Category updated successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Server Error: Code #{$e->getLine()}.");
            return redirect()->back();
        }

        return redirect()->route('customer.category.index');
    }

    public function destroy(int $id): RedirectResponse {
        $category = Category::find($id);

        if (!$category) {
            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Record not found.");
            return redirect()->back();
        }

        DB::beginTransaction();
        try {
            $category->delete();

            DB::commit();

            session()->flash('notification-status', "success");
            session()->flash('notification-msg', "Category deleted successfully.");
        } catch (\Exception $e) {
            DB::rollBack();

            session()->flash('notification-status', "failed");
            session()->flash('notification-msg', "Server Error: Code #{$e->getLine()}.");
            return redirect()->back();
        }

        return redirect()->route('customer.category.index');
    }
}