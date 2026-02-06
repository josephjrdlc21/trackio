import { DashboardDataProps } from "@/types/customer/dashboard"

import MainLayout from "@/layouts/main-layout"
import DashboardHeading from "@/features/customer/dashboard-heading"
import DashboardFinance from "@/features/customer/dashboard-finance"
import DashboardCategoryChart from "@/features/customer/dashboard-category-chart"
import DashboardRecentHistory from "@/features/customer/dashboard-recent-history"

export default function dashboard({ 
    total_budget, 
    total_incomes, 
    total_expenses,
    recent_expenses,
    recent_incomes
}: DashboardDataProps) {

    return (
        <MainLayout>
            <DashboardHeading />

            <DashboardFinance 
                total_budget={total_budget} 
                total_incomes={total_incomes} 
                total_expenses={total_expenses} 
            />

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full">
                    <DashboardCategoryChart />
                </div>
                <DashboardRecentHistory 
                    recent_expenses={recent_expenses} 
                    recent_incomes={recent_incomes} 
                />
            </div>
        </MainLayout>
    )
}
