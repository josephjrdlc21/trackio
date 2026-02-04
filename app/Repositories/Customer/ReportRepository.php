<?php

namespace App\Repositories\Customer;

use App\Interfaces\Customer\ReportRepositoryInterface;

use App\Models\Category;
use App\Models\Expense;
use App\Models\Income;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class ReportRepository implements ReportRepositoryInterface{

    public function index(array $data): Response {
        $user = Auth::guard('web')->user();

        $filters = $data['filters'] ?? [];
        $keyword = $filters['keyword'] ?? null;
        $start_date = $filters['start_date'] ?? null;
        $end_date = $filters['end_date'] ?? null;
        $per_page = $data['per_page'] ?? 10;

        if (!$start_date) {
            $first_record = Category::oldest()->first();
            $start_date = $first_record ? $first_record->created_at : now()->startOfMonth();
        }

        $start_date = Carbon::parse($start_date)->format('Y-m-d');
        $end_date = $end_date ? Carbon::parse($end_date)->format('Y-m-d') : now()->endOfMonth()->format('Y-m-d');
        $data['filters']['start_date'] = $start_date;
        $data['filters']['end_date'] = $end_date;

        $data['records'] = Category::when($keyword, function ($query) use ($keyword) {
            $query->whereRaw("LOWER(name) LIKE '%{$keyword}%'");
        })
        ->where(function ($query) use ($start_date, $end_date) {
            $query->when(strlen($start_date) > 0, function ($q) use ($start_date) {
                $q->whereDate('created_at', '>=', Carbon::parse($start_date)->format("Y-m-d"));
            })
            ->when(strlen($end_date) > 0, function ($q) use ($end_date) {
                $q->whereDate('created_at', '<=', Carbon::parse($end_date)->format("Y-m-d"));
            });
        })
        ->withSum('incomes', 'amount')
        ->withMax('incomes', 'income_date')
        ->withSum('expenses', 'amount')
        ->withMax('expenses', 'expense_date')
        ->where('user_id', $user->id)
        ->latest()
        ->paginate($per_page)
        ->withQueryString();

        return Inertia::render('customer/report/index', $data);
    }
}