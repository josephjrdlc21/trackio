export interface Report {
    id: number;
    user_id: number;
    name: string;
    type: string;
    expenses_sum_amount: string | null;
    expenses_max_expense_date: string | null;
    incomes_sum_amount: string | null;
    incomes_max_income_date: string | null;

    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface Filter {
    keyword: string | null;
    start_date: string | null;
    end_date: string | null;
}

export interface Link {
    url: string | null;
    label: string | null;
    page: number | null;
    active: boolean;
}

export interface Pagination {
    current_page: number;
    data: Report;
    first_page_url: string | null;
    from: number | null;
    last_page: number | null;
    last_page_url: string | null;
    links: Link[];
    next_page_url: string | null;
    path: string | null;
    per_page: number | null;
    prev_page_url: string | null;
    to: number | string;
    total: number | string;
}

export interface ReportDataProps {
    records: Pagination;
    filters?: Filter;
}

export interface ReportListProps {
    list: Pagination;
    filters?: Filter;
}

export interface ReportFilterProps {
    filters?: Filter;
}