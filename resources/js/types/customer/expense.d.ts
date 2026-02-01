export interface Expense {
    id: number;
    user_id: number;
    category_id: number;
    amount: string;
    expense_date: string;
    note: string;

    source: string | null;
    filename: string | null;
    path: string | null;
    directory: string | null;

    created_at: string;
    updated_at: string;
    deleted_at: string | null;

    category: Category[];
}

export interface Category {
    id: number;
    user_id: number;
    name: string;
    type: "income" | "expense";
    status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface Filter {
    keyword: string | null;
}

export interface Link {
    url: string | null;
    label: string | null;
    page: number | null;
    active: boolean;
}

export interface Pagination {
    current_page: number;
    data: Expense;
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

export interface ExpenseDataProps {
    records: Pagination;
    filters?: Filter;
    categories?: Category[];
}

export interface ExpenseListProps {
    list: Pagination;
    filters?: Filter;
}

export interface ExpenseEditProps {
    expense: Expense;
    categories?: Category[];
}

export interface ExpenseFilterProps {
    filters?: Filter;
}

export interface ExpenseCreateProps {
    categories?: Category[];
}