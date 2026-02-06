export interface DashboardDataProps {
    total_budget: number;
    total_expenses: number;
    total_incomes: number;

    recent_expenses: {
        category: {
            name: string;
        }
        id: number;
        amount: number;
        created_at: string;
    }

    recent_incomes: {
        category: {
            name: string;
        }
        id: number;
        amount: number;
        created_at: string;
    }
}

export interface DashboardHistoryProps {
    recent_expenses: {
        category: {
            name: string;
        }
        id: number;
        amount: number;
        created_at: string;
    }

    recent_incomes: {
        category: {
            name: string;
        }
        id: number;
        amount: number;
        created_at: string;
    }
}

export interface CardData {
    label: string;
    amount: number;
    previousAmount: number;
    icon: React.ReactNode;
}

export interface ChartData {
    category: string;
    amount: number;
}
