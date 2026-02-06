<?php

namespace App\Repositories\Customer;

use App\Models\Expense;
use App\Models\Budget;
use App\Models\Income;
use App\Models\Category;

use App\Interfaces\Customer\MainRepositoryInterface;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MainRepository implements MainRepositoryInterface{

    public function dashboard(array $data): Response {
        $user = Auth::guard('web')->user();

        $data['total_expenses'] = Expense::where('user_id', $user->id)->sum('amount');
        $data['total_incomes'] = Income::where('user_id', $user->id)->sum('amount');
        $data['total_budget'] = Budget::where('user_id', $user->id)->sum('amount');

        $data['recent_expenses'] = Expense::with('category')->where('user_id', $user->id)->limit(3)->latest()->get();
        $data['recent_incomes'] = Income::with('category')->where('user_id', $user->id)->limit(2)->latest()->get();

        $categories = Category::where('user_id', $user->id)->get();
        $data['categories'] = [];

        foreach($categories as $category){
            if($category->type == "income") {
                $income = Income::where('user_id', $user->id)->where('category_id', $category->id)->first();

                $amount = $income->amount;
            }
            else {
                $expense = Expense::where('user_id', $user->id)->where('category_id', $category->id)->first();

                $amount = $expense->amount;
            }

            $data['categories'][] = [
                'category' => $category->name,
                'amount' => $amount,
            ];
        }

        return Inertia::render('customer/dashboard', $data);
    }
}